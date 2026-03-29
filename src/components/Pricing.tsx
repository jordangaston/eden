import { PRICING_TIERS, type TierName } from '../data'
import PricingCard from './PricingCard'

interface PricingProps {
  onGetStarted: (tier: TierName) => void
}

export default function Pricing({ onGetStarted }: PricingProps) {
  return (
    <section id="pricing" className="flex flex-col items-center w-full px-6 xl:px-12 pt-24 xl:pt-[120px] gap-12">
      <div className="flex flex-col items-center gap-3">
        <h2 className="text-4xl md:text-5xl xl:text-[56px] font-semibold tracking-[-0.03em] leading-tight text-eden-text text-center">
          Simple pricing.
        </h2>
        <p className="text-lg xl:text-[21px] text-eden-muted text-center">
          No contracts. No commitments. Cancel anytime.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 w-full max-w-[1100px] pb-20">
        {PRICING_TIERS.map((t) => (
          <PricingCard
            key={t.tier}
            tier={t.tier}
            price={t.price}
            cores={t.cores}
            ram={t.ram}
            storage={t.storage}
            bandwidth={t.bandwidth}
            highlighted={'highlighted' in t ? t.highlighted : false}
            onGetStarted={onGetStarted}
          />
        ))}
      </div>
    </section>
  )
}
