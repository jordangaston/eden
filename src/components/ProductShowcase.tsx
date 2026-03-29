export default function ProductShowcase() {
  return (
    <section id="features" className="flex flex-col items-center px-6 xl:px-12 pb-10">
      <div className="w-full max-w-[1000px] rounded-2xl overflow-hidden border border-white/15 shadow-[0_40px_120px_rgba(0,0,0,0.5)] bg-[linear-gradient(180deg,rgba(255,255,255,0.06)_0%,rgba(255,255,255,0.02)_100%)] bg-[#1a1a1a]">
        {/* Title bar */}
        <div className="flex items-center px-6 py-4 gap-2 border-b border-white/8">
          <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
          <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
          <div className="w-3 h-3 rounded-full bg-[#28C840]" />
          <span className="text-[13px] text-white/50 font-mono pl-3">Terminal — eden</span>
        </div>
        {/* Terminal body */}
        <div className="flex flex-col px-6 md:px-9 py-6 md:py-8 gap-1.5 font-mono text-sm md:text-base leading-7">
          <p>
            <span className="text-white/40">$ </span>
            <span className="text-white">ssh eden</span>
          </p>
          <p className="text-white/55">Connecting via Tailscale...</p>
          <p className="text-white/55">Welcome to Eden (macOS 15.2, M4 Pro, 4 vCPU)</p>
          <p className="text-white/55">Last login: Wed Mar 26 09:14:02 2026</p>
          <div className="h-3" />
          <p>
            <span className="text-eden-green">eden@mac-medium ~ %</span>
            <span className="text-white"> openclaw run agent.py</span>
          </p>
          <p className="text-eden-green">✓ Agent started on Apple Silicon — running locally</p>
        </div>
      </div>
    </section>
  )
}
