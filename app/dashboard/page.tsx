'use client';

import { useEffect, useState } from 'react';
import { Cpu, RefreshCcw, Database, Activity, Kanban, FileText, User, MapPin } from 'lucide-react';

interface Provider {
  id: number;
  name: string;
  monthlyQuota: number;
  leadsReceivedCount: number;
  lastAssignedAt: string | null;
}

interface LeadRequest {
  id: string;
  name: string;
  phone: string;
  city: string;
  service: string;
  description: string;
  createdAt: string;
}

export default function AdminDashboard() {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [leads, setLeads] = useState<LeadRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchSystemMetrics = async () => {
    try {
      const [providersRes, leadsRes] = await Promise.all([
        fetch('/api/providers'),
        fetch('/api/leads')
      ]);

      if (!providersRes.ok || !leadsRes.ok) throw new Error("Could not connect to database matrix system.");

      const [providersData, leadsData] = await Promise.all([
        providersRes.json(),
        leadsRes.json()
      ]);

      setProviders(providersData);
      setLeads(leadsData);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSystemMetrics();
    const interval = setInterval(fetchSystemMetrics, 5000);
    return () => clearInterval(interval);
  }, []);

  const totalLeads = providers.reduce((acc, curr) => acc + curr.leadsReceivedCount, 0);
  const totalQuota = providers.reduce((acc, curr) => acc + curr.monthlyQuota, 0);
  const overallCapacity = totalQuota > 0 ? Math.round((totalLeads / totalQuota) * 100) : 0;

  return (
    <main className="min-h-screen bg-[#070a12] text-zinc-300 p-6 sm:p-10 font-sans relative pb-20">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-indigo-900/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto space-y-10 relative z-10">
        
        {/* Title Navigation Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-zinc-800/80 pb-6 gap-4">
          <div className="flex items-center space-x-3.5">
            <div className="p-3 bg-gradient-to-br from-zinc-800 to-zinc-900 border border-zinc-700/50 rounded-2xl text-white">
              <Cpu className="w-5 h-5 text-indigo-400" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-white tracking-tight">System Distribution Hub</h1>
              <p className="text-xs text-zinc-500 mt-0.5 font-mono">NODE MONITOR: ACTIVE</p>
            </div>
          </div>
          <button
            onClick={() => { setLoading(true); fetchSystemMetrics(); }}
            className="flex items-center space-x-2 px-4 py-2 bg-[#0d1321] hover:bg-[#131b2e] border border-zinc-800 text-zinc-300 font-medium text-xs rounded-xl transition"
          >
            <RefreshCcw className={`w-3.5 h-3.5 text-zinc-400 ${loading ? 'animate-spin' : ''}`} />
            <span>Sync Matrix Data</span>
          </button>
        </div>

        {/* Counter Summary block */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="bg-[#0b101d] border border-zinc-800/80 p-6 rounded-2xl flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider block">Processed Transactions</span>
              <p className="text-3xl font-light text-white tracking-tight">{totalLeads} <span className="text-xs font-mono text-indigo-400">leads</span></p>
            </div>
            <div className="p-3 bg-zinc-900 rounded-xl border border-zinc-800 text-zinc-400"><Database className="w-4 h-4" /></div>
          </div>
          <div className="bg-[#0b101d] border border-zinc-800/80 p-6 rounded-2xl flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider block">Operational Allocation Pool</span>
              <p className="text-3xl font-light text-white tracking-tight">{providers.length} <span className="text-xs font-mono text-emerald-400">nodes</span></p>
            </div>
            <div className="p-3 bg-zinc-900 rounded-xl border border-zinc-800 text-zinc-400"><Kanban className="w-4 h-4" /></div>
          </div>
          <div className="bg-[#0b101d] border border-zinc-800/80 p-6 rounded-2xl flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider block">Global Volumetric Saturation</span>
              <p className="text-3xl font-light text-white tracking-tight">{overallCapacity}%</p>
            </div>
            <div className="p-3 bg-zinc-900 rounded-xl border border-zinc-800 text-zinc-400"><Activity className="w-4 h-4" /></div>
          </div>
        </div>

        {/* SECTION 1: Active Capacity Table */}
        <div className="space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-[0.15em] text-zinc-400 pl-1">Partner Resource Registry Matrix</h2>
          <div className="bg-[#090d16] border border-zinc-800/60 rounded-2xl shadow-2xl overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#0c1220]/60 border-b border-zinc-800 text-zinc-500 text-[10px] font-bold uppercase tracking-wider">
                  <th className="p-4 w-16 text-center">ID</th>
                  <th className="p-4">Partner Operator</th>
                  <th className="p-4 text-center">Allocated Leads</th>
                  <th className="p-4 text-center">Assigned Capacity</th>
                  <th className="p-4">Saturation Gauge</th>
                  <th className="p-4">Last Event Vector</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-900 text-xs sm:text-sm">
                {providers.map((p) => {
                  const usagePercentage = Math.min((p.leadsReceivedCount / p.monthlyQuota) * 100, 100);
                  return (
                    <tr key={p.id} className="hover:bg-[#0c1324]/40 transition text-zinc-400">
                      <td className="p-4 text-center font-mono font-bold text-zinc-600">{p.id}</td>
                      <td className="p-4 font-medium text-zinc-200">{p.name}</td>
                      <td className="p-4 text-center font-semibold text-white font-mono text-base">{p.leadsReceivedCount}</td>
                      <td className="p-4 text-center font-mono text-zinc-500">{p.monthlyQuota}</td>
                      <td className="p-4 w-52">
                        <div className="flex items-center space-x-3">
                          <div className="w-full bg-[#05080f] rounded-full h-1.5 border border-zinc-800/80 overflow-hidden">
                            <div
                              className={`h-1.5 rounded-full ${usagePercentage >= 100 ? 'bg-rose-500' : usagePercentage > 75 ? 'bg-amber-500' : 'bg-indigo-500'}`}
                              style={{ width: `${usagePercentage}%` }}
                            ></div>
                          </div>
                          <span className="text-[11px] font-mono font-bold text-zinc-500 w-8">{Math.round(usagePercentage)}%</span>
                        </div>
                      </td>
                      <td className="p-4">
                        {p.lastAssignedAt ? (
                          <span className="text-zinc-400 font-mono text-[11px] bg-zinc-900/60 border border-zinc-800/80 px-2.5 py-1 rounded-md">
                            {new Date(p.lastAssignedAt).toLocaleString()}
                          </span>
                        ) : (
                          <span className="text-zinc-600 italic text-[11px]">Zero entries recorded</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* SECTION 2: Dynamic Live Request Content Feed */}
        <div className="space-y-4 pt-4">
          <div className="flex items-center space-x-2 pl-1">
            <FileText className="w-4 h-4 text-zinc-500" />
            <h2 className="text-sm font-semibold uppercase tracking-[0.15em] text-zinc-400">Incoming Requests Audit Feed</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {leads.length === 0 ? (
              <div className="col-span-2 text-center py-10 bg-[#090d16] border border-zinc-800/60 rounded-2xl text-zinc-600 italic text-sm">
                No active service requests captured inside history logs yet.
              </div>
            ) : (
              leads.map((lead) => (
                <div key={lead.id} className="bg-[#090d16] border border-zinc-800/60 p-5 rounded-2xl space-y-3 shadow-md relative overflow-hidden group hover:border-zinc-700/80 transition-all duration-300">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center space-x-2">
                      <div className="w-7 h-7 rounded-lg bg-zinc-800 flex items-center justify-center text-zinc-300 font-bold text-xs">
                        {lead.name.substring(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-zinc-200">{lead.name}</h3>
                        <p className="text-[11px] font-mono text-zinc-500">{lead.phone}</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 bg-indigo-950/50 border border-indigo-900/40 text-indigo-400 rounded-md">
                      {lead.service}
                    </span>
                  </div>

                  <div className="p-3 bg-[#0d1321] rounded-xl border border-zinc-900 text-xs text-zinc-300 leading-relaxed font-medium">
                    <span className="text-zinc-500 text-[10px] uppercase font-bold tracking-wider block mb-1">Request Content:</span>
                    {lead.description}
                  </div>

                  <div className="flex justify-between items-center text-[10px] font-mono text-zinc-500 pt-1 border-t border-zinc-900/60">
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-3 h-3 text-zinc-600" />
                      <span>{lead.city}</span>
                    </div>
                    <span>{new Date(lead.createdAt).toLocaleTimeString()}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </main>
  );
}