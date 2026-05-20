import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-900 text-slate-100 flex flex-col justify-between font-sans selection:bg-indigo-500 selection:text-white">
      {/* Navbar */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="bg-indigo-600 text-white p-2 rounded-lg font-bold tracking-wider text-sm shadow-md shadow-indigo-600/20">
              BMP
            </div>
            <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
              Provider Lead Distribution System
            </span>
          </div>
          <span className="text-xs bg-indigo-500/10 text-indigo-400 px-3 py-1 rounded-full border border-indigo-500/20 font-medium shadow-sm">
            Backend Assignment Portal
          </span>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-4xl mx-auto px-4 py-16 text-center flex-grow flex flex-col justify-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-6 leading-tight">
          Smart Lead Allocation <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Engine Backend
          </span>
        </h1>
        
        <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed">
          An automated, production-ready system engineered to route incoming consumer moving requests to verified service providers fairly. Built with atomic concurrency controls to eliminate double-allocation anomalies.
        </p>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-md mx-auto w-full mb-16">
          <Link 
            href="/request-service" 
            className="flex flex-col items-center justify-center p-6 bg-slate-800/40 hover:bg-slate-800/80 border border-slate-700/60 hover:border-indigo-500 rounded-xl transition-all duration-300 group shadow-lg shadow-black/20"
          >
            <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400 mb-1">Step 1: Simulator</span>
            <span className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors">Request Service ➔</span>
            <span className="text-xs text-slate-400 mt-2 text-center">Submit a mock moving request to trigger the live allocation routing logic</span>
          </Link>

          <Link 
            href="/dashboard" 
            className="flex flex-col items-center justify-center p-6 bg-slate-800/40 hover:bg-slate-800/80 border border-slate-700/60 hover:border-purple-500 rounded-xl transition-all duration-300 group shadow-lg shadow-black/20"
          >
            <span className="text-xs font-semibold uppercase tracking-wider text-purple-400 mb-1">Step 2: Monitor</span>
            <span className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors">View Dashboard ➔</span>
            <span className="text-xs text-slate-400 mt-2 text-center">Analyze operational metrics, fair distribution scores, and real-time database rows</span>
          </Link>
        </div>

        {/* System Architecture Section */}
        <div className="border border-slate-800 bg-slate-950/40 rounded-2xl p-6 sm:p-8 text-left backdrop-blur-sm shadow-xl">
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
            Technical Specifications & Architecture
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-slate-400">
            <div className="space-y-2">
              <h3 className="font-semibold text-slate-200">Stack Architecture</h3>
              <p className="text-xs leading-relaxed">Built using Next.js 15 Server Components, leveraging Prisma ORM to connect seamlessly with an elastic Neon PostgreSQL cloud cloud database instance.</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-slate-200">Allocation Model</h3>
              <p className="text-xs leading-relaxed">Implements a strict, time-deterministic deterministic Round-Robin model. It selects providers based on their last-assigned timestamp while managing dynamic capacity limits.</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-slate-200">Concurrency Guard</h3>
              <p className="text-xs leading-relaxed">Utilizes native SQL transactional row locks (<code className="text-indigo-400 bg-slate-900 px-1 rounded font-mono">FOR UPDATE</code>) to protect provider counters against simultaneous execution conditions.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-950/20 py-6 text-center text-xs text-slate-500">
        <p>Designed and Implemented for the Book My Packers Core Backend Intern Evaluation</p>
      </footer>
    </main>
  );
}