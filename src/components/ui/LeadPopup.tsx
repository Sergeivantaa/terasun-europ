'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { FORM_ACTION, CSRF_URL } from '@/lib/constants'

// ─── localStorage keys ───────────────────────────────────────────────────────
const LS_SUBMITTED  = 'tsm_popup_submitted'   // never show again after submission
const LS_SHOW_COUNT = 'tsm_popup_shown_count'  // shows during this session
const LS_LAST_SHOWN = 'tsm_popup_last_shown'   // timestamp of last show (session)

// ─── Timing ──────────────────────────────────────────────────────────────────
const FIRST_TRIGGER_MS    = 35_000   // 35 s after page load
const SCROLL_TRIGGER_PCT  = 0.45     // 45% scroll depth
const RETRY_DELAY_MS      = 120_000  // 2 min after first close, if no interaction
const MAX_SHOWS_PER_VISIT = 2        // hard limit per browser session

// ─── Types ───────────────────────────────────────────────────────────────────
type View   = 'menu' | 'sample' | 'distributor' | 'quotation'
type Status = 'idle' | 'sending' | 'success' | 'error'

const EU_COUNTRIES = [
  'Austria','Belgium','Bulgaria','Croatia','Czech Republic','Denmark','Estonia',
  'Finland','France','Germany','Greece','Hungary','Ireland','Italy','Latvia',
  'Lithuania','Luxembourg','Malta','Netherlands','Norway','Poland','Portugal',
  'Romania','Slovakia','Slovenia','Spain','Sweden','Switzerland','Ukraine',
  'United Kingdom','Other',
]

// ─── Sub-forms ────────────────────────────────────────────────────────────────

function SampleForm({ csrf, onSuccess }: { csrf: string; onSuccess: () => void }) {
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError]   = useState('')

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sending')
    setError('')
    const data = new FormData(e.currentTarget)
    try {
      const res = await fetch(FORM_ACTION, {
        method: 'POST', body: data, credentials: 'include',
        headers: { Accept: 'application/json' },
      })
      if (res.ok) { onSuccess() }
      else { setStatus('error'); setError('Submission failed. Please try again or email us directly.') }
    } catch { setStatus('error'); setError('Network error. Please try again.') }
  }

  return (
    <form onSubmit={submit} className="space-y-3">
      <input type="hidden" name="_token"       value={csrf} />
      <input type="hidden" name="form_type"    value="popup_sample" />
      <input type="hidden" name="request_type" value="sample" />
      <input type="hidden" name="source"       value="popup" />
      <input type="hidden" name="product"      value="Terasun TSM Cement Board" />

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs text-gray-400 mb-1">Your name *</label>
          <input required name="name" className="popup-input" placeholder="Anna Schmidt" />
        </div>
        <div>
          <label className="block text-xs text-gray-400 mb-1">Company *</label>
          <input required name="company" className="popup-input" placeholder="Company name" />
        </div>
      </div>

      <div>
        <label className="block text-xs text-gray-400 mb-1">Business email *</label>
        <input required type="email" name="_replyto" className="popup-input" placeholder="anna@company.com" />
      </div>

      <div>
        <label className="block text-xs text-gray-400 mb-1">Country *</label>
        <select required name="country" className="popup-input bg-card">
          <option value="">Select country…</option>
          {EU_COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      <div>
        <label className="block text-xs text-gray-400 mb-1">Your role / business type</label>
        <select name="business_type" className="popup-input bg-card">
          <option value="">Select…</option>
          <option value="architect">Architect / Designer</option>
          <option value="contractor">Construction contractor</option>
          <option value="distributor">Distributor / Wholesaler</option>
          <option value="developer">Property developer</option>
          <option value="manufacturer">Building manufacturer</option>
          <option value="other">Other</option>
        </select>
      </div>

      {error && <p className="text-red-400 text-xs">{error}</p>}

      <button
        type="submit"
        disabled={status === 'sending'}
        className="w-full btn-primary disabled:opacity-60 text-white font-semibold text-sm py-2.5 rounded transition-colors"
      >
        {status === 'sending' ? 'Sending…' : 'Request Free Sample →'}
      </button>

      <p className="text-[11px] text-gray-600 text-center">
        We verify requests. Samples are provided to qualified companies only.{' '}
        <a href="/en/privacy" className="underline hover:text-gray-400">Privacy policy</a>
      </p>
    </form>
  )
}

function DistributorForm({ csrf, onSuccess }: { csrf: string; onSuccess: () => void }) {
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError]   = useState('')

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sending')
    setError('')
    const data = new FormData(e.currentTarget)
    try {
      const res = await fetch(FORM_ACTION, {
        method: 'POST', body: data, credentials: 'include',
        headers: { Accept: 'application/json' },
      })
      if (res.ok) { onSuccess() }
      else { setStatus('error'); setError('Submission failed. Please try again or email us directly.') }
    } catch { setStatus('error'); setError('Network error. Please try again.') }
  }

  return (
    <form onSubmit={submit} className="space-y-3">
      <input type="hidden" name="_token"       value={csrf} />
      <input type="hidden" name="form_type"    value="popup_distributor" />
      <input type="hidden" name="request_type" value="partnership" />
      <input type="hidden" name="source"       value="popup" />

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs text-gray-400 mb-1">Your name *</label>
          <input required name="name" className="popup-input" placeholder="Your name" />
        </div>
        <div>
          <label className="block text-xs text-gray-400 mb-1">Company *</label>
          <input required name="company" className="popup-input" placeholder="Company name" />
        </div>
      </div>

      <div>
        <label className="block text-xs text-gray-400 mb-1">Business email *</label>
        <input required type="email" name="_replyto" className="popup-input" placeholder="your@company.com" />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs text-gray-400 mb-1">Country *</label>
          <select required name="country" className="popup-input bg-card">
            <option value="">Select…</option>
            {EU_COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs text-gray-400 mb-1">Estimated annual volume</label>
          <select name="annual_volume" className="popup-input bg-card">
            <option value="">Select…</option>
            <option value="<500m2">&lt; 500 m²</option>
            <option value="500-2000m2">500 – 2 000 m²</option>
            <option value="2000-10000m2">2 000 – 10 000 m²</option>
            <option value=">10000m2">&gt; 10 000 m²</option>
          </select>
        </div>
      </div>

      {error && <p className="text-red-400 text-xs">{error}</p>}

      <button
        type="submit"
        disabled={status === 'sending'}
        className="w-full btn-primary disabled:opacity-60 text-white font-semibold text-sm py-2.5 rounded transition-colors"
      >
        {status === 'sending' ? 'Sending…' : 'Apply to Become a Distributor →'}
      </button>

      <p className="text-[11px] text-gray-600 text-center">
        We review applications within 2 business days.{' '}
        <a href="/en/privacy" className="underline hover:text-gray-400">Privacy policy</a>
      </p>
    </form>
  )
}

function QuotationForm({ csrf, onSuccess }: { csrf: string; onSuccess: () => void }) {
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError]   = useState('')

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sending')
    setError('')
    const data = new FormData(e.currentTarget)
    try {
      const res = await fetch(FORM_ACTION, {
        method: 'POST', body: data, credentials: 'include',
        headers: { Accept: 'application/json' },
      })
      if (res.ok) { onSuccess() }
      else { setStatus('error'); setError('Submission failed. Please try again or email us directly.') }
    } catch { setStatus('error'); setError('Network error. Please try again.') }
  }

  return (
    <form onSubmit={submit} className="space-y-3">
      <input type="hidden" name="_token"       value={csrf} />
      <input type="hidden" name="form_type"    value="popup_quotation" />
      <input type="hidden" name="request_type" value="quotation" />
      <input type="hidden" name="source"       value="popup" />
      <input type="hidden" name="product"      value="Terasun TSM Cement Board" />

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs text-gray-400 mb-1">Your name *</label>
          <input required name="name" className="popup-input" placeholder="Your name" />
        </div>
        <div>
          <label className="block text-xs text-gray-400 mb-1">Company *</label>
          <input required name="company" className="popup-input" placeholder="Company name" />
        </div>
      </div>

      <div>
        <label className="block text-xs text-gray-400 mb-1">Business email *</label>
        <input required type="email" name="_replyto" className="popup-input" placeholder="your@company.com" />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs text-gray-400 mb-1">Country *</label>
          <select required name="country" className="popup-input bg-card">
            <option value="">Select…</option>
            {EU_COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs text-gray-400 mb-1">Thickness needed</label>
          <select name="thickness" className="popup-input bg-card">
            <option value="">Select…</option>
            {[3,4,5,6,8,9,10,12,15,18,20,22,25].map(t => (
              <option key={t} value={`${t}mm`}>{t} mm{t === 12 ? ' (primary)' : ''}</option>
            ))}
          </select>
        </div>
      </div>

      {error && <p className="text-red-400 text-xs">{error}</p>}

      <button
        type="submit"
        disabled={status === 'sending'}
        className="w-full btn-primary disabled:opacity-60 text-white font-semibold text-sm py-2.5 rounded transition-colors"
      >
        {status === 'sending' ? 'Sending…' : 'Request a Quotation →'}
      </button>

      <p className="text-[11px] text-gray-600 text-center">
        We respond within 1 business day.{' '}
        <a href="/en/privacy" className="underline hover:text-gray-400">Privacy policy</a>
      </p>
    </form>
  )
}

// ─── Success screen ───────────────────────────────────────────────────────────

function SuccessScreen({ onClose }: { onClose: () => void }) {
  return (
    <div className="text-center py-4">
      <div className="w-14 h-14 rounded-full bg-green-900/40 border border-green-700 flex items-center justify-center mx-auto mb-4">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-7 h-7 text-green-400">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>
      <h3 className="text-white font-bold text-lg mb-2">Message sent</h3>
      <p className="text-gray-400 text-sm mb-6">
        We will review your request and get back to you within 1–2 business days.
      </p>
      <button onClick={onClose} className="text-sm text-[#5CA4D6] hover:text-white transition-colors font-medium">
        Close
      </button>
    </div>
  )
}

// ─── Main popup ───────────────────────────────────────────────────────────────

export default function LeadPopup() {
  const [open, setOpen]       = useState(false)
  const [view, setView]       = useState<View>('menu')
  const [success, setSuccess] = useState(false)
  const [csrf, setCsrf]       = useState('')
  const dialogRef             = useRef<HTMLDivElement>(null)
  const closeButtonRef        = useRef<HTMLButtonElement>(null)
  const shownThisVisit        = useRef(0)
  const retryTimer            = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  // ── fetch CSRF token once ────────────────────────────────────────────────
  useEffect(() => {
    fetch(CSRF_URL, { credentials: 'include' })
      .then(r => r.json())
      .then(d => setCsrf(d.token ?? d.csrf_token ?? ''))
      .catch(() => {})
  }, [])

  // ── shouldShow guard ─────────────────────────────────────────────────────
  const shouldShow = useCallback(() => {
    if (typeof window === 'undefined') return false
    if (localStorage.getItem(LS_SUBMITTED)) return false          // submitted ever
    if (shownThisVisit.current >= MAX_SHOWS_PER_VISIT) return false
    return true
  }, [])

  const showPopup = useCallback(() => {
    if (!shouldShow()) return
    shownThisVisit.current += 1
    localStorage.setItem(LS_SHOW_COUNT, String(shownThisVisit.current))
    localStorage.setItem(LS_LAST_SHOWN, String(Date.now()))
    setView('menu')
    setSuccess(false)
    setOpen(true)
    // fire analytics if available
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'popup_shown', { event_category: 'lead_popup', value: shownThisVisit.current })
    }
  }, [shouldShow])

  // ── triggers: timer + scroll ─────────────────────────────────────────────
  useEffect(() => {
    if (!shouldShow()) return

    let triggered = false

    const trigger = () => {
      if (triggered) return
      triggered = true
      clearTimeout(timer)
      window.removeEventListener('scroll', onScroll)
      showPopup()
    }

    const timer = setTimeout(trigger, FIRST_TRIGGER_MS)

    const onScroll = () => {
      const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight)
      if (pct >= SCROLL_TRIGGER_PCT) trigger()
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      clearTimeout(timer)
      window.removeEventListener('scroll', onScroll)
    }
  }, [shouldShow, showPopup])

  // ── close handler ────────────────────────────────────────────────────────
  const handleClose = useCallback(() => {
    setOpen(false)
    clearTimeout(retryTimer.current)
    if (success) return  // submitted — no retry
    // If first close without interaction, schedule one retry after ~35 s
    if (shownThisVisit.current < MAX_SHOWS_PER_VISIT) {
      retryTimer.current = setTimeout(showPopup, RETRY_DELAY_MS)
    }
  }, [success, showPopup])

  const handleSuccess = useCallback(() => {
    setSuccess(true)
    localStorage.setItem(LS_SUBMITTED, '1')
    clearTimeout(retryTimer.current)
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'popup_submitted', { event_category: 'lead_popup' })
    }
  }, [])

  // ── Escape key + focus trap ──────────────────────────────────────────────
  useEffect(() => {
    if (!open) return
    closeButtonRef.current?.focus()

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { handleClose(); return }
      if (e.key !== 'Tab') return
      const dialog = dialogRef.current
      if (!dialog) return
      const focusable = dialog.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
      const first = focusable[0]
      const last  = focusable[focusable.length - 1]
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last.focus() }
      } else {
        if (document.activeElement === last)  { e.preventDefault(); first.focus() }
      }
    }

    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, handleClose])

  // ── backdrop scroll lock ─────────────────────────────────────────────────
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  if (!open) return null

  const BENEFITS = [
    'Free sample for qualified companies',
    'Technical documentation included',
    'European support & CE compliance',
    'Response within 1 business day',
  ]

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm"
        aria-hidden="true"
        onClick={handleClose}
      />

      {/* Dialog */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Request Terasun TSM Cement Board sample or quotation"
        ref={dialogRef}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
      >
        <div className="relative w-full max-w-md bg-darker border border-border rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto">

          {/* Close button */}
          <button
            ref={closeButtonRef}
            onClick={handleClose}
            aria-label="Close"
            className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-gray-500 hover:text-white hover:bg-white/10 transition-colors z-10"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          <div className="p-6">
            {success ? (
              <SuccessScreen onClose={() => setOpen(false)} />
            ) : view === 'menu' ? (
              <>
                {/* Menu view */}
                <div className="text-center mb-6">
                  <div className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-widest text-[#5CA4D6] uppercase border border-[#5CA4D6]/30 rounded-full px-3 py-1 mb-4">
                    Terasun TSM Cement Board
                  </div>
                  <h2 className="text-xl font-black text-white leading-tight mb-2">
                    Get Your Free TSM<br />Cement Board Sample
                  </h2>
                  <p className="text-gray-400 text-sm">
                    Evaluate the quality before your next project.
                  </p>
                </div>

                {/* Benefits */}
                <ul className="space-y-2 mb-6">
                  {BENEFITS.map(b => (
                    <li key={b} className="flex items-center gap-2.5 text-sm text-gray-300">
                      <span className="w-4 h-4 rounded-full bg-[#5CA4D6]/15 border border-[#5CA4D6]/35 flex items-center justify-center shrink-0">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-2.5 h-2.5 text-[#5CA4D6]">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </span>
                      {b}
                    </li>
                  ))}
                </ul>

                {/* CTA buttons */}
                <div className="space-y-2.5">
                  <button
                    onClick={() => setView('sample')}
                    className="w-full btn-primary text-white font-bold text-sm py-3 rounded-lg transition-colors"
                  >
                    Request Free Sample
                  </button>
                  <button
                    onClick={() => setView('distributor')}
                    className="w-full bg-card hover:bg-white/10 border border-border text-white font-semibold text-sm py-2.5 rounded-lg transition-colors"
                  >
                    Become a Distributor
                  </button>
                  <button
                    onClick={() => setView('quotation')}
                    className="w-full bg-transparent hover:bg-white/5 border border-border/60 text-gray-300 font-medium text-sm py-2.5 rounded-lg transition-colors"
                  >
                    Request a Quotation
                  </button>
                </div>
              </>
            ) : (
              <>
                {/* Sub-form view */}
                <div className="flex items-center gap-3 mb-5">
                  <button
                    onClick={() => setView('menu')}
                    className="text-gray-500 hover:text-white transition-colors"
                    aria-label="Back"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                      <polyline points="15 18 9 12 15 6" />
                    </svg>
                  </button>
                  <h2 className="text-white font-bold text-base">
                    {view === 'sample'      && 'Request Free Sample'}
                    {view === 'distributor' && 'Become a Distributor'}
                    {view === 'quotation'   && 'Request a Quotation'}
                  </h2>
                </div>

                {view === 'sample'      && <SampleForm      csrf={csrf} onSuccess={handleSuccess} />}
                {view === 'distributor' && <DistributorForm csrf={csrf} onSuccess={handleSuccess} />}
                {view === 'quotation'   && <QuotationForm   csrf={csrf} onSuccess={handleSuccess} />}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
