interface HeroProps {
  onRequestAccess: () => void
}

export default function Hero({ onRequestAccess }: HeroProps) {
  return (
    <section className="w-full px-6 xl:px-12 pt-16 md:pt-24 xl:pt-[120px] pb-24 xl:pb-32">
      <div className="max-w-[1320px] mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-12">
        {/* Left — copy */}
        <div className="flex flex-col gap-5 lg:flex-[1.2] text-center lg:text-left">
          <h1 className="text-4xl md:text-5xl xl:text-6xl font-semibold tracking-[-0.04em] leading-[1.1] text-eden-text">
            Get a Mac in the cloud
            <br />
            <span className="text-eden-green-text">For $5/month.</span>
          </h1>
          <p className="text-lg md:text-xl xl:text-[22px] text-eden-muted max-w-[480px] leading-relaxed pt-2 mx-auto lg:mx-0">
            Affordable Mac workspaces running on Apple silicon.  Perfect for running autonomous agents.
          </p>
          <div className="flex items-center gap-4 pt-3 justify-center lg:justify-start">
            <button
              onClick={onRequestAccess}
              className="bg-eden-btn text-white text-[15px] rounded-md px-5 py-2.5 border border-eden-green/30 hover:bg-eden-btn-hover transition-colors cursor-pointer"
            >
              Get Your Mac
            </button>
            <a
              href="#pricing"
              className="bg-[#242424] text-white text-[15px] rounded-md px-5 py-2.5 border border-[#363636] hover:border-[#4a4a4a] transition-colors"
            >
              Learn more
            </a>
          </div>
        </div>

        {/* Right — terminal */}
        <div className="lg:flex-1 w-full max-w-[600px] lg:max-w-none rounded-2xl overflow-hidden border border-white/15 shadow-[0_40px_120px_rgba(0,0,0,0.5)] bg-[linear-gradient(180deg,rgba(255,255,255,0.06)_0%,rgba(255,255,255,0.02)_100%)] bg-[#1a1a1a]">
          {/* Title bar */}
          <div className="flex items-center px-5 py-3.5 gap-2 border-b border-white/8">
            <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
            <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
            <div className="w-3 h-3 rounded-full bg-[#28C840]" />
            <span className="text-[13px] text-white/50 font-mono pl-3">Terminal — eden</span>
          </div>
          {/* Terminal body */}
          <div className="flex flex-col px-5 md:px-7 py-5 md:py-7 gap-1.5 font-mono text-xs md:text-sm leading-6">
            <p>
              <span className="text-white/40">$ </span>
              <span className="text-white">eden login</span>
            </p>
            <p className="text-white/55">Connecting via Tailscale...</p>
            <p className="text-white/55">Welcome to Eden (macOS 15.2, M4 Pro, 4 vCPU)</p>
            <p className="text-white/55">Last login: Wed Mar 26 09:14:02 2026</p>
            <div className="h-2" />
            <p>
              <span className="text-eden-green">eden@mac-medium ~ %</span>
              <span className="text-white"> openclaw run agent.py</span>
            </p>
            <p className="text-eden-green">✓ Agent started on Apple Silicon — running locally</p>
          </div>
        </div>
      </div>
    </section>
  )
}
