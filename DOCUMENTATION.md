# Lead Distribution Engine Architecture Documentation

## 1. Core Allocation Algorithm & Business Logic
The system implements a multi-tiered, stateful routing mechanism designed to distribute incoming customer requests safely and equitably among 8 independent Provider Nodes. 

### Implementation Rules:
* **Tier Isolation**: Incoming payloads are categorized by `ServiceType` (`SERVICE_1`, `SERVICE_2`, `SERVICE_3`). Explicit assignment arrays ensure that specific high-priority partner subsets are considered for respective tiers before passing down to the standard routing pool.
* **Fair Round-Robin Balancing**: Within the eligible subset of providers for a given service tier, the system scans the database state and targets nodes based on capacity optimization. Tie-breaking configurations evaluate the `lastAssignedAt` matrix, routing the lead to the node that has been waiting the longest (oldest timestamp). This guarantees zero starvation states across the active resource pool.

## 2. Concurrency Control & Database Integrity
To eliminate potential data races, phantom reads, and double-allocation bugs during rapid concurrent customer form submissions, the system enforces isolation boundaries at the persistence layer.

* **Pessimistic Locking**: The allocation process executes entirely within an explicit Prisma interactive transaction boundary (`prisma.$transaction`). 
* **Row-Level Serialization**: The algorithm reads provider state records by issuing a raw PostgreSQL `FOR UPDATE` suffix query (`SELECT * FROM "Provider" WHERE ... FOR UPDATE`). This blocks other parallel runtime execution threads from touching or modifying the capacity counts of those specific records until the active transaction completes its updates and triggers a formal `COMMIT`.

## 3. Webhook Idempotency & Network Resiliency
To guarantee network fault tolerance and ensure external API retries or duplicated webhook payloads do not trigger unexpected side effects, the endpoint implements an internal unique verification barrier.

* **Deduplication Matrix**: The database maintains an isolated `IdempotencyKey` model enforcing a strict relational unique index constraint on a transactional token header (`x-idempotency-key`).
* **Short-Circuit Evaluation**: If an incoming request passes a key that already resides inside the database logs, the server short-circuits the pipeline immediately. It bypasses the allocation logic entirely and returns a safe, cached `200 OK` handshake response, preserving database performance and structural data integrity.

## 4. User Interface Architecture
* **Customer Interaction Portal (`/request-service`)**: Built using a modern, dark cyberpunk glassmorphic layout. Input elements enforce responsive visual focus-rings, micro-glow wrappers, and inline SVG iconography to maximize visual aesthetics and clarity.
* **Executive Command Hub (`/dashboard`)**: Implements an enterprise management dashboard featuring real-time volumetric capacity gauges, automated 5-second polling synchronization hooks (`setInterval`), metric summary layout cards, and an interactive request content audit log feed.