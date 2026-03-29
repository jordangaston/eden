interface CallToActionProps {
  onRequestAccess: () => void
}

export default function CallToAction({ onRequestAccess }: CallToActionProps) {
  return (
    <section className="flex flex-col items-center justify-center text-center w-full px-6 xl:px-12 py-24 xl:py-[140px] gap-5">
      <h2 className="text-4xl md:text-5xl xl:text-[64px] font-semibold tracking-[-0.03em] leading-tight text-eden-text">
        Ready to get your Mac?
      </h2>
      <p className="text-lg xl:text-[21px] text-eden-muted max-w-[500px] leading-relaxed">
        Get started in under five minutes.
      </p>
      <div className="flex items-center gap-4 pt-3">
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
          See pricing
        </a>
      </div>
    </section>
  )
}
