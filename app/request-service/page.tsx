'use client';

import { useState } from 'react';
import { User, Phone, MapPin, Layers, ArrowUpRight, CheckCircle2, ShieldAlert } from 'lucide-react';

export default function RequestServicePage() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    city: '',
    service: 'SERVICE_1',
    description: ''
  });

  const [status, setStatus] = useState<{ type: 'idle' | 'success' | 'error'; message: string }>({
    type: 'idle',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: 'idle', message: '' });

    try {
      const response = await fetch('/api/request-service', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error || "Execution failed.");

      setStatus({
        type: 'success',
        message: `Routing completed. Allocated to Node Providers: [${data.result.assignedTo.join(', ')}]`
      });
      
      setForm({ name: '', phone: '', city: '', service: 'SERVICE_1', description: '' });

    } catch (err: any) {
      setStatus({ type: 'error', message: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#030712] flex items-center justify-center p-4 relative overflow-hidden font-sans selection:bg-zinc-800 selection:text-white">
      {/* Premium ambient structural glow rings */}
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-indigo-900/10 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-emerald-950/10 rounded-full blur-[130px] pointer-events-none"></div>

      <div className="w-full max-w-xl bg-[#090d16] border border-zinc-800/60 rounded-3xl p-8 sm:p-10 shadow-[0_24px_70px_-15px_rgba(0,0,0,0.9)] relative z-10">
        
        {/* Portal Header */}
        <div className="border-b border-zinc-800/80 pb-6 mb-8">
          <div className="flex items-center space-x-2 text-zinc-500 uppercase tracking-[0.2em] text-[10px] font-bold mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse"></span>
            <span>Secure Request Interface</span>
          </div>
          <h1 className="text-3xl font-light text-zinc-100 tracking-tight">
            Initialize <span className="font-medium text-white">Service Query</span>
          </h1>
          <p className="text-sm text-zinc-400 mt-1.5">Enter parameter metrics to deploy instantaneous round-robin partner mapping.</p>
        </div>

        {/* Dynamic Status Notifications */}
        {status.message && (
          <div className={`mb-6 p-4 rounded-2xl flex items-start space-x-3 border text-xs tracking-wide transition-all ${
            status.type === 'success' 
              ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.05)]' 
              : 'bg-rose-950/20 border-rose-500/30 text-rose-400'
          }`}>
            {status.type === 'success' ? <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" /> : <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />}
            <span className="font-mono leading-relaxed">{status.message}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="text-[11px] font-medium text-zinc-400 uppercase tracking-wider">Client Label</label>
              <div className="relative group">
                <User className="absolute left-3.5 top-3 w-4 h-4 text-zinc-600 group-focus-within:text-indigo-400 transition" />
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-[#0d1321] border border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-zinc-100 text-sm placeholder-zinc-700 focus:outline-none focus:border-indigo-500/80 focus:ring-1 focus:ring-indigo-500/30 transition-all font-medium"
                  placeholder="Identity String"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-medium text-zinc-400 uppercase tracking-wider">Secure Comms line</label>
              <div className="relative group">
                <Phone className="absolute left-3.5 top-3 w-4 h-4 text-zinc-600 group-focus-within:text-indigo-400 transition" />
                <input
                  type="text"
                  required
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full bg-[#0d1321] border border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-zinc-100 text-sm placeholder-zinc-700 focus:outline-none focus:border-indigo-500/80 focus:ring-1 focus:ring-indigo-500/30 transition-all font-mono"
                  placeholder="10-Digit Vector"
                />
              </div>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-medium text-zinc-400 uppercase tracking-wider">Regional Router (City)</label>
            <div className="relative group">
              <MapPin className="absolute left-3.5 top-3 w-4 h-4 text-zinc-600 group-focus-within:text-indigo-400 transition" />
              <input
                type="text"
                required
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
                className="w-full bg-[#0d1321] border border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-zinc-100 text-sm placeholder-zinc-700 focus:outline-none focus:border-indigo-500/80 focus:ring-1 focus:ring-indigo-500/30 transition-all font-medium"
                placeholder="Target Destination Node"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-medium text-zinc-400 uppercase tracking-wider">Allocation Architecture Level</label>
            <div className="relative group">
              <Layers className="absolute left-3.5 top-3 w-4 h-4 text-zinc-600 pointer-events-none group-focus-within:text-indigo-400 transition" />
              <select
                value={form.service}
                onChange={(e) => setForm({ ...form, service: e.target.value })}
                className="w-full bg-[#0d1321] border border-zinc-800 rounded-xl pl-10 pr-10 py-2.5 text-zinc-100 text-sm focus:outline-none focus:border-indigo-500/80 focus:ring-1 focus:ring-indigo-500/30 transition-all appearance-none cursor-pointer font-medium"
              >
                <option value="SERVICE_1">Enterprise Layer Vector (Service 1)</option>
                <option value="SERVICE_2">Standard Pipeline Matrix (Service 2)</option>
                <option value="SERVICE_3">Foundational Data Node (Service 3)</option>
              </select>
              <div className="absolute right-3.5 top-3.5 w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[4px] border-t-zinc-500 pointer-events-none"></div>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-medium text-zinc-400 uppercase tracking-wider">Operational Directives</label>
            <textarea
              required
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full bg-[#0d1321] border border-zinc-800 rounded-xl p-4 text-zinc-100 text-sm placeholder-zinc-700 focus:outline-none focus:border-indigo-500/80 focus:ring-1 focus:ring-indigo-500/30 transition-all font-medium resize-none min-h-[90px]"
              placeholder="Provide architectural summary parameters..."
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-zinc-100 hover:bg-white text-zinc-950 font-semibold py-3 px-4 rounded-xl transition-all duration-300 active:scale-[0.99] disabled:opacity-40 flex items-center justify-center space-x-2 shadow-[0_4px_20px_rgba(255,255,255,0.1)] text-sm"
          >
            {loading ? (
              <span className="w-5 h-5 border-2 border-zinc-950/30 border-t-zinc-950 rounded-full animate-spin"></span>
            ) : (
              <>
                <span>Deploy Engine Allocation</span>
                <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
              </>
            )}
          </button>
        </form>
      </div>
    </main>
  );
}