import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#FDFBF7] text-[#2C2A29] font-serif antialiased selection:bg-[#E6DFD3]">
      {/* Top Editorial Banner */}
      <header className="border-b-2 border-[#2C2A29] mx-6 sm:mx-12 pt-8 pb-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-baseline justify-between gap-2">
          <div>
            <p className="font-sans text-xs tracking-widest uppercase font-semibold text-[#8C7A6B] mb-1">
              Book My Packers — Technical Assessment Core
            </p>
            <h1 className="font-sans text-2xl sm:text-3xl font-black tracking-tight text-[#1A1918]">
              INTELLIGENT LEAD ROUTING & ALLOCATION ENGINE
            </h1>
          </div>
          <div className="font-mono text-xs text-right text-[#5A5755] bg-[#F3EFE6] px-3 py-1 border border-[#DCD6CD] rounded">
            SYS_STATUS: DEPLOYED // PRODUCTION_READY
          </div>
        </div>
      </header>

      {/* Main Grid Content */}
      <div className="max-w-6xl mx-auto px-6 sm:px-12 py-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* Left 2 Columns: Deep System Documentation */}
        <div className="lg:col-span-2 space-y-10">
          
          {/* Executive Overview */}
          <section className="space-y-4">
            <h2 className="font-sans text-xs uppercase tracking-widest font-bold text-[#A67C52] border-b border-[#E6DFD3] pb-1">
              01. Executive Specification
            </h2>
            <p className="text-lg sm:text-xl text-[#3A3836] leading-relaxed italic font-light">
              "This platform addresses the core logistics problem of distributing customer demand streams to independent service providers safely, equitably, and concurrently."
            </p>
            <p className="font-sans text-sm text-[#5A5755] leading-relaxed">
              When a consumer requests a moving estimate, the backend processes incoming variables against provider operational capacities. Rather than utilizing basic randomization, this engine relies on structural state management to enforce true fairness metrics while avoiding thread-locking collisions.
            </p>
          </section>

          {/* Core Algorithms Breakdown */}
          <section className="space-y-4">
            <h2 className="font-sans text-xs uppercase tracking-widest font-bold text-[#A67C52] border-b border-[#E6DFD3] pb-1">
              02. Algorithmic Routing Matrix
            </h2>
            
            <div className="space-y-6 font-sans text-sm text-[#3A3836]">
              <div className="p-5 bg-[#F6F3EB] border-l-4 border-[#2C2A29] rounded-r">
                <h3 className="font-bold text-base text-[#1A1918] mb-1">Time-Deterministic Round-Robin</h3>
                <p className="text-[#5A5755] leading-relaxed">
                  The primary sorting tier tracks active queues based on the provider's exact <code className="bg-[#EAE5DA] px-1 rounded text-xs font-mono">lastAssignedAt</code> Unix timestamp. Providers who have gone the longest without acquiring a client consumer lead are instantly bubbled to the top of the queue selection sequence.
                </p>
              </div>

              <div className="p-5 bg-[#F6F3EB] border-l-4 border-[#A67C52] rounded-r">
                <h3 className="font-bold text-base text-[#1A1918] mb-1">Concurrency Guard: Atomic Row Locking</h3>
                <p className="text-[#5A5755] leading-relaxed">
                  To eliminate double-allocation anomalies under heavy user request surges, the transaction block executes an isolated PostgreSQL <code className="bg-[#EAE5DA] px-1 rounded text-xs font-mono">FOR UPDATE</code> query pattern. This intercepts competing runtime threads at the database layer, isolating selected node rows until state evaluation resolves.
                </p>
              </div>

              <div className="p-5 bg-[#F6F3EB] border-l-4 border-[#8C7A6B] rounded-r">
                <h3 className="font-bold text-base text-[#1A1918] mb-1">Dynamic Capacity Restraints</h3>
                <p className="text-[#5A5755] leading-relaxed">
                  Every partner contains individual threshold rules defining limits like maximum daily allowances. If a provider reaches their specific volume limit, the routing array skips their index automatically, re-balancing remaining requests seamlessly across open nodes.
                </p>
              </div>
            </div>
          </section>

          {/* Infrastructure Specs */}
          <section className="space-y-3">
            <h2 className="font-sans text-xs uppercase tracking-widest font-bold text-[#A67C52] border-b border-[#E6DFD3] pb-1">
              03. Architecture Topology
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left font-sans text-xs text-[#5A5755]">
                <thead>
                  <tr className="border-b border-[#2C2A29] text-[#1A1918] font-bold">
                    <th className="py-2">Layer Component</th>
                    <th className="py-2">Technology Used</th>
                    <th className="py-2">Operational Scope</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E6DFD3]">
                  <tr>
                    <td className="py-3 font-semibold text-[#1A1918]">Application Context</td>
                    <td className="py-3">Next.js 15 (App Router)</td>
                    <td className="py-3">Serverless API Router & Unified UI Contexts</td>
                  </tr>
                  <tr>
                    <td className="py-3 font-semibold text-[#1A1918]">Data Access Client</td>
                    <td className="py-3">Prisma ORM</td>
                    <td className="py-3">Type-Safe Interface Compilation & Transaction Blocks</td>
                  </tr>
                  <tr>
                    <td className="py-3 font-semibold text-[#1A1918]">Relational Core Engine</td>
                    <td className="py-3">Neon Serverless PostgreSQL</td>
                    <td className="py-3">State Persistence, Concurrency Locking & Lead Audits</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

        </div>

        {/* Right Column: Prominent Live Execution Gateways */}
        <div className="space-y-6">
          <div className="border-2 border-[#2C2A29] p-6 bg-[#F6F3EB] sticky top-24 rounded shadow-[4px_4px_0px_0px_rgba(44,42,41,1)]">
            <h2 className="font-sans text-xs uppercase tracking-widest font-black text-[#1A1918] mb-4 tracking-wider">
              ENTER SYSTEM ENVIRONMENTS
            </h2>
            
            <p className="font-sans text-xs text-[#5A5755] mb-6 leading-relaxed">
              Use these gateways to execute transactions or inspect system memory logs live.
            </p>

            <div className="space-y-4 font-sans">
              <Link 
                href="/request-service" 
                className="block text-center bg-[#2C2A29] hover:bg-[#A67C52] text-white py-3 px-4 font-bold rounded transition-colors duration-200 shadow-sm"
              >
                Launch Lead Simulator ➔
              </Link>
              <p className="text-[11px] text-[#8C7A6B] text-center italic mt-1 mb-4">
                Step 1: Input mock moving criteria to pass data into the router.
              </p>

              <hr className="border-[#DCD6CD]" />

              <Link 
                href="/dashboard" 
                className="block text-center bg-transparent border-2 border-[#2C2A29] hover:bg-[#2C2A29] hover:text-white text-[#2C2A29] py-3 px-4 font-bold rounded transition-all duration-200"
              >
                Open Analytics Control Board ➔
              </Link>
              <p className="text-[11px] text-[#8C7A6B] text-center italic mt-1">
                Step 2: Track active fair-share indexes and query logs in real time.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-[#DCD6CD] font-mono text-[11px] text-[#8C7A6B] space-y-1">
              <p>📍 Endpoint Scope: Global Cloud</p>
              <p>🛡️ Isolation Tier: Serializable Row-Lock</p>
              <p>📦 Seed Instances: 8 Verified Nodes Active</p>
            </div>
          </div>
        </div>

      </div>

      {/* Mini Technical Footer */}
      <footer className="border-t border-[#E6DFD3] mt-24 py-8 mx-6 sm:mx-12 text-center font-sans text-[11px] text-[#8C7A6B]">
        Engineered specifically for the Book My Packers Core Developer Evaluation Network. All logic compiled natively.
      </footer>
    </main>
  );
}