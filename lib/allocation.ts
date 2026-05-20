import { ServiceType } from '@prisma/client';
import { prisma } from './db'; // Pulls our centralized database client instance

const MANDATORY_RULES: Record<ServiceType, number[]> = {
  [ServiceType.SERVICE_1]: [1],       // Provider 1 must always receive Service 1
  [ServiceType.SERVICE_2]: [5],       // Provider 5 must always receive Service 2
  [ServiceType.SERVICE_3]: [1, 4],    // Providers 1 and 4 must always receive Service 3
};


const FAIR_POOLS: Record<ServiceType, number[]> = {
  [ServiceType.SERVICE_1]: [2, 3, 4],
  [ServiceType.SERVICE_2]: [6, 7, 8],
  [ServiceType.SERVICE_3]: [2, 3, 5, 6, 7, 8],
};

interface AllocateLeadInput {
  name: string;
  phone: string;
  city: string;
  service: ServiceType;
  description: string;
}

export async function allocateLead(input: AllocateLeadInput) {
  // Execute everything inside an isolated database transaction
  return await prisma.$transaction(async (tx) => {
    
    // 1. ENFORCE CONCURRENCY SAFE LOCKING
    // Fetch all 8 providers and lock their rows using PostgreSQL "FOR UPDATE"
    // This forces concurrent requests to wait in line rather than reading stale quota counts.
    const providers: any[] = await tx.$queryRaw`
      SELECT * FROM "Provider" 
      ORDER BY id ASC 
      FOR UPDATE;
    `;

    const providerMap = new Map(providers.map(p => [p.id, p]));

    // 2. DETECT MANDATORY PROVIDERS FOR THIS SERVICE
    const mandatoryIds = MANDATORY_RULES[input.service] || [];
    const assignedProviderIds: number[] = [];

    // Assign mandatory providers if they haven't exhausted their quota
    for (const id of mandatoryIds) {
      const provider = providerMap.get(id);
      if (provider && provider.leadsReceivedCount < provider.monthlyQuota) {
        assignedProviderIds.push(id);
      }
    }

    // 3. FILL REMAINING SLOTS FAIRLY (ROUND-ROBIN)
    const totalSlotsNeeded = 3;
    const remainingSlots = totalSlotsNeeded - assignedProviderIds.length;

    if (remainingSlots > 0) {
      const fairPoolIds = FAIR_POOLS[input.service] || [];
      
      // Filter out providers already assigned by mandatory rules, or who reached their quota
      const availableFairProviders = fairPoolIds
        .map(id => providerMap.get(id))
        .filter(p => p !== undefined)
        .filter(p => !assignedProviderIds.includes(p.id))
        .filter(p => p.leadsReceivedCount < p.monthlyQuota);

      // SORT STRATEGY FOR FAIR ALLOCATION:
      // Primary: Oldest lastAssignedAt date first (nulls always come first)
      // Secondary: Smallest leadsReceivedCount count first
      availableFairProviders.sort((a, b) => {
        if (!a.lastAssignedAt && b.lastAssignedAt) return -1;
        if (a.lastAssignedAt && !b.lastAssignedAt) return 1;
        if (a.lastAssignedAt && b.lastAssignedAt) {
          const timeDiff = new Date(a.lastAssignedAt).getTime() - new Date(b.lastAssignedAt).getTime();
          if (timeDiff !== 0) return timeDiff;
        }
        return a.leadsReceivedCount - b.leadsReceivedCount;
      });

      // Select the top required candidates from the sorted fair pool
      const chosenFairProviders = availableFairProviders.slice(0, remainingSlots);
      for (const p of chosenFairProviders) {
        assignedProviderIds.push(p.id);
      }
    }

    // If we couldn't find up to 3 providers with available quota, proceed with whatever we found
    if (assignedProviderIds.length === 0) {
      throw new Error("No active providers have available quota remaining for this service.");
    }

    // 4. PERSIST THE LEAD AND ENFORCE UNIQUE PHONE+SERVICE RULE AT DB LEVEL
    const lead = await tx.lead.create({
      data: {
        name: input.name,
        phone: input.phone,
        city: input.city,
        service: input.service,
        description: input.description,
      },
    });

    // 5. UPDATE PROVIDER METRICS AND GENERATE ASSIGNMENTS
    const now = new Date();
    for (const providerId of assignedProviderIds) {
      // Record individual distribution linkage
      await tx.leadAssignment.create({
        data: {
          leadId: lead.id,
          providerId: providerId,
        },
      });

      // Increment counts and refresh round-robin timestamp
      await tx.provider.update({
        where: { id: providerId },
        data: {
          leadsReceivedCount: { increment: 1 },
          lastAssignedAt: now,
        },
      });
    }

    return {
      lead,
      assignedTo: assignedProviderIds,
    };
  });
}