import { FOOTER_COLUMNS } from '../data'

export default function Footer() {
  return (
    <footer className="flex flex-col items-center w-full px-6 xl:px-12 pt-12 pb-9">
      <div className="w-full max-w-[1000px] flex flex-col md:flex-row justify-between pb-8 border-b border-eden-border gap-10">
        <div className="flex flex-col gap-3">
          <span className="text-base font-bold text-white/80 font-brand">🍃 Eden</span>
          <span className="text-xs text-white/35">Your Mac in the cloud.</span>
        </div>
        <div className="flex gap-16">
          {FOOTER_COLUMNS.map((col) => (
            <div key={col.title} className="flex flex-col gap-2.5">
              <span className="text-xs font-semibold text-white/80">{col.title}</span>
              {col.links.map((link) => (
                <a
                  key={link}
                  href="#"
                  className="text-xs text-white/35 hover:text-white/60 transition-colors"
                >
                  {link}
                </a>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="w-full max-w-[1000px] flex justify-between items-center pt-5">
        <span className="text-xs text-eden-muted-25">© 2026 Eden. All rights reserved.</span>
        <div className="flex gap-5">
          <a href="#" className="text-xs text-eden-muted-25 hover:text-white/60 transition-colors">Privacy</a>
          <a href="#" className="text-xs text-eden-muted-25 hover:text-white/60 transition-colors">Terms</a>
        </div>
      </div>
    </footer>
  )
}
