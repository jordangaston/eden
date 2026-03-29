import { useState } from 'react'
import { NAV_LINKS } from '../data'

interface NavbarProps {
  onRequestAccess: () => void
}

export default function Navbar({ onRequestAccess }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="w-full bg-eden-bg sticky top-0 z-50 border-b border-[#242424]">
      <div className="flex items-center px-6 xl:px-12 h-14 gap-8">
        <a href="#" className="text-2xl font-bold text-white font-brand tracking-tight">
          🍃 Eden
        </a>
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm text-eden-muted-40 hover:text-white transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
        <div className="hidden md:block ml-auto">
          <button
            onClick={onRequestAccess}
            className="bg-eden-btn text-white text-sm rounded-md px-4 py-2 border border-eden-green/30 hover:bg-eden-btn-hover transition-colors cursor-pointer"
          >
            Get Your Mac
          </button>
        </div>
        <button
          className="md:hidden ml-auto text-white"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {menuOpen ? (
              <path d="M6 6l12 12M6 18L18 6" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>
      {menuOpen && (
        <div className="md:hidden flex flex-col items-center gap-6 py-6 border-t border-eden-border">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm text-eden-muted-40 hover:text-white transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <button
            onClick={() => { onRequestAccess(); setMenuOpen(false) }}
            className="bg-eden-btn text-white text-sm rounded-md px-4 py-2 border border-eden-green/30 hover:bg-eden-btn-hover transition-colors cursor-pointer"
          >
            Get Your Mac
          </button>
        </div>
      )}
    </nav>
  )
}
