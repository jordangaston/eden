import type { TierName } from '../data'

interface PricingCardProps {
  tier: TierName
  price: number
  cores: number
  ram: string
  storage: string
  bandwidth: string
  highlighted?: boolean
  onGetStarted: (tier: TierName) => void
}

export default function PricingCard({
  tier,
  price,
  cores,
  ram,
  storage,
  bandwidth,
  highlighted,
  onGetStarted,
}: PricingCardProps) {
  return (
    <div
      className={`flex flex-col items-center rounded-2xl py-10 px-8 gap-6 border ${
        highlighted
          ? 'bg-[#222222] border-eden-green/25'
          : 'bg-[#1c1c1c] border-[#2a2a2a]'
      }`}
    >
      <span
        className={`text-xs font-medium uppercase tracking-[0.06em] ${
          highlighted ? 'text-eden-green' : 'text-white/70'
        }`}
      >
        {tier}
      </span>
      <span className="text-[56px] font-semibold tracking-[-0.03em] leading-none text-white">
        ${price}
      </span>
      <span className="text-sm text-white/50">per month</span>
      <div className="w-full max-w-[202px] h-px bg-white/10" />
      <div className="flex flex-col items-center gap-1">
        <span className="text-sm text-white/60">
          {cores} {cores === 1 ? 'core' : 'cores'} · {ram} · {storage}
        </span>
        <span className="text-sm text-white/50">{bandwidth}</span>
      </div>
      <button
        onClick={() => onGetStarted(tier)}
        className={`text-sm rounded-md px-4 py-2 mt-2 cursor-pointer transition-colors w-full max-w-[202px] ${
          highlighted
            ? 'bg-eden-btn text-white border border-eden-green/30 hover:bg-eden-btn-hover'
            : 'bg-[#242424] text-white border border-[#363636] hover:border-[#4a4a4a]'
        }`}
      >
        Get started
      </button>
    </div>
  )
}
