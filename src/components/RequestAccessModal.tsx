import { useRef, useEffect, useState, type FormEvent } from 'react'
import { PRICING_TIERS, USE_CASES, type TierName } from '../data'

interface RequestAccessModalProps {
  open: boolean
  defaultTier?: TierName
  onClose: () => void
}

export default function RequestAccessModal({ open, defaultTier, onClose }: RequestAccessModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [submitted, setSubmitted] = useState(false)
  const [tier, setTier] = useState<TierName>(defaultTier ?? 'Small')

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (open) {
      setSubmitted(false)
      setTier(defaultTier ?? 'Small')
      dialog.showModal()
    } else {
      dialog.close()
    }
  }, [open, defaultTier])

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    const handleClose = () => onClose()
    dialog.addEventListener('close', handleClose)
    return () => dialog.removeEventListener('close', handleClose)
  }, [onClose])

  function handleBackdropClick(e: React.MouseEvent<HTMLDialogElement>) {
    if (e.target === dialogRef.current) {
      onClose()
    }
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const data = {
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      email: formData.get('email'),
      tier: formData.get('tier'),
      useCases: formData.getAll('useCases'),
    }
    console.log('Request Access submission:', data)
    setSubmitted(true)
    setTimeout(() => onClose(), 2000)
  }

  return (
    <dialog
      ref={dialogRef}
      onClick={handleBackdropClick}
      className="bg-transparent p-0 max-w-lg w-full mx-auto my-auto"
    >
      <div className="bg-[#1a1a1a] border border-eden-border-highlight rounded-2xl p-8 mx-4 md:mx-0">
        {submitted ? (
          <div className="flex flex-col items-center gap-4 py-12">
            <div className="w-12 h-12 rounded-full bg-eden-green/20 flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4ED87C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-xl font-semibold text-white">You're on the list!</p>
            <p className="text-sm text-eden-muted">We'll reach out when your Mac is ready.</p>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-white">Request Access</h3>
              <button
                onClick={onClose}
                className="text-eden-muted-40 hover:text-white transition-colors cursor-pointer bg-transparent border-none"
                aria-label="Close"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 6l12 12M6 18L18 6" />
                </svg>
              </button>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="firstName" className="text-xs font-medium text-eden-muted-40">First name</label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    required
                    className="bg-white/5 border border-eden-border rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-eden-muted-25 focus:outline-none focus:border-eden-green/50 transition-colors"
                    placeholder="Jane"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="lastName" className="text-xs font-medium text-eden-muted-40">Last name</label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    required
                    className="bg-white/5 border border-eden-border rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-eden-muted-25 focus:outline-none focus:border-eden-green/50 transition-colors"
                    placeholder="Smith"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="email" className="text-xs font-medium text-eden-muted-40">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="bg-white/5 border border-eden-border rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-eden-muted-25 focus:outline-none focus:border-eden-green/50 transition-colors"
                  placeholder="jane@company.com"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="tier" className="text-xs font-medium text-eden-muted-40">Size</label>
                <select
                  id="tier"
                  name="tier"
                  value={tier}
                  onChange={(e) => setTier(e.target.value as TierName)}
                  className="bg-white/5 border border-eden-border rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-eden-green/50 transition-colors appearance-none cursor-pointer"
                >
                  {PRICING_TIERS.map((t) => (
                    <option key={t.tier} value={t.tier} className="bg-[#1a1a1a]">
                      {t.tier} — ${t.price}/mo
                    </option>
                  ))}
                </select>
              </div>
              <fieldset className="flex flex-col gap-2.5 border-none p-0 m-0">
                <legend className="text-xs font-medium text-eden-muted-40 mb-1">Use cases</legend>
                <div className="grid grid-cols-2 gap-2">
                  {USE_CASES.map((uc) => (
                    <label key={uc} className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="checkbox"
                        name="useCases"
                        value={uc}
                        className="w-4 h-4 rounded border-eden-border bg-white/5 accent-eden-green cursor-pointer"
                      />
                      <span className="text-sm text-eden-muted group-hover:text-white transition-colors">{uc}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
              <button
                type="submit"
                className="bg-eden-btn text-white text-sm rounded-md px-5 py-2.5 mt-2 border border-eden-green/30 hover:bg-eden-btn-hover transition-colors cursor-pointer"
              >
                Request Access
              </button>
            </form>
          </>
        )}
      </div>
    </dialog>
  )
}
