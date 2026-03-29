import { APP_LOGOS } from '../data'

export default function AppCarousel() {
  const items = [...APP_LOGOS, ...APP_LOGOS, ...APP_LOGOS, ...APP_LOGOS]

  return (
    <section className="flex flex-col items-center w-full px-6 xl:px-12 pt-16 xl:pt-20 pb-24 xl:pb-40 gap-8">
      <div className="w-full max-w-[1100px] h-px border-t border-dashed border-eden-border" />
      <h2 className="text-4xl md:text-5xl xl:text-[56px] font-medium tracking-[-0.03em] leading-tight text-eden-text pt-4">
        Perfect for autonomous agents
      </h2>
      <div className="w-full max-w-[1100px] overflow-hidden">
        <div className="animate-carousel flex items-center gap-10 whitespace-nowrap w-max">
          {items.map((app, i) => (
            <img
              key={`${app.name}-${i}`}
              src={app.src}
              alt={app.name}
              style={{ height: app.height, ...(app.name === 'Hermes' ? { position: 'relative' as const, top: 8 } : {}) }}
              className="w-auto shrink-0"
            />
          ))}
        </div>
      </div>
      <div className="w-full max-w-[1100px] h-px border-t border-dashed border-eden-border" />
    </section>
  )
}
