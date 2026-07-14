'use client'

import { useState, useEffect } from 'react'
import { FORM_ACTION, CSRF_URL, CONTACT } from '@/lib/constants'

type Status = 'idle' | 'sending' | 'success' | 'error'

const THICKNESSES = ['6mm', '8mm', '9mm', '10mm', '12mm', '15mm', '18mm', '20mm']
const BOARD_SIZES = ['1200×2400mm', '1200×2440mm', '1220×2440mm', '1220×3660mm', 'Custom']
const BUSINESS_TYPES = ['contractor', 'distributor', 'architect', 'developer', 'manufacturer', 'trader', 'other']
const INCOTERMS = ['EXW', 'FOB', 'CFR', 'CIF', 'DAP', 'DDP']
const REQUEST_TYPES = ['quotation', 'sample', 'technical', 'partnership', 'other']
const APP_TYPES = ['facade', 'interior', 'flooring', 'roofing', 'balcony', 'ceiling', 'other']

export default function QuotationForm({ locale }: { locale: string }) {
  const [csrf, setCsrf] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [requestType, setRequestType] = useState('quotation')

  useEffect(() => {
    fetch(CSRF_URL, { credentials: 'include' })
      .then(r => r.json())
      .then(d => setCsrf(d.token ?? d.csrf_token ?? ''))
      .catch(() => {})
  }, [])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sending')
    const form = e.currentTarget
    const data = new FormData(form)
    try {
      const res = await fetch(FORM_ACTION, {
        method: 'POST',
        body: data,
        credentials: 'include',
        headers: { Accept: 'application/json' },
      })
      setStatus(res.ok ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-xl border border-green-700 bg-green-950/40 p-8 text-center">
        <div className="text-4xl mb-3">✓</div>
        <h3 className="text-xl font-bold text-green-400 mb-2">Request sent successfully</h3>
        <p className="text-gray-300 text-sm">We will respond within 1 business day to <strong className="text-white">{CONTACT.email}</strong></p>
        <button onClick={() => setStatus('idle')} className="mt-6 btn-secondary text-sm px-6 py-2">Send another request</button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <input type="hidden" name="_token" value={csrf} />
      <input type="hidden" name="form_type" value="quotation_enquiry" />
      <input type="hidden" name="source" value="website" />
      <input type="hidden" name="product" value="TSM Fiber Cement Board" />
      <input type="hidden" name="inquiry_reference" value={`WEB-${Date.now()}`} />

      {/* Section 1: Request type */}
      <fieldset>
        <legend className="text-sm font-bold text-gold2 uppercase tracking-wider mb-4">1. Request type</legend>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {REQUEST_TYPES.map(rt => (
            <label key={rt} className={`flex items-center gap-2 p-3 rounded-lg border cursor-pointer transition-colors ${requestType === rt ? 'border-gold bg-gold/10 text-gold2' : 'border-border text-gray-400 hover:border-gray-500'}`}>
              <input type="radio" name="request_type" value={rt} checked={requestType === rt} onChange={() => setRequestType(rt)} className="sr-only" />
              <span className="text-sm font-medium capitalize">{rt}</span>
            </label>
          ))}
        </div>
      </fieldset>

      {/* Section 2: Contact */}
      <fieldset>
        <legend className="text-sm font-bold text-gold2 uppercase tracking-wider mb-4">2. Contact information</legend>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-gray-400 mb-1">Full name <span className="text-red-400">*</span></label>
            <input name="name" required className="form-input" placeholder="John Smith" />
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-1">Company <span className="text-red-400">*</span></label>
            <input name="company" required className="form-input" placeholder="Company Ltd" />
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-1">Email <span className="text-red-400">*</span></label>
            <input name="email" type="email" required className="form-input" placeholder="you@company.com" />
            <input type="hidden" name="_replyto" value="" />
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-1">Phone</label>
            <input name="phone" type="tel" className="form-input" placeholder="+49 123 456 789" />
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-1">Country <span className="text-red-400">*</span></label>
            <input name="country" required className="form-input" placeholder="Germany" />
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-1">Website</label>
            <input name="website" type="url" className="form-input" placeholder="https://company.com" />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-xs text-gray-400 mb-1">Business type</label>
            <select name="business_type" className="form-input">
              <option value="">Select…</option>
              {BUSINESS_TYPES.map(b => <option key={b} value={b}>{b.charAt(0).toUpperCase() + b.slice(1)}</option>)}
            </select>
          </div>
        </div>
      </fieldset>

      {/* Section 3: Product specification */}
      <fieldset>
        <legend className="text-sm font-bold text-gold2 uppercase tracking-wider mb-4">3. Product specification</legend>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-gray-400 mb-1">Thickness</label>
            <select name="thickness" className="form-input">
              <option value="">Select…</option>
              {THICKNESSES.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-1">Board size</label>
            <select name="board_size" className="form-input">
              <option value="">Select…</option>
              {BOARD_SIZES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-1">Application</label>
            <select name="application" className="form-input">
              <option value="">Select…</option>
              {APP_TYPES.map(a => <option key={a} value={a}>{a.charAt(0).toUpperCase() + a.slice(1)}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-1">Annual volume (m²)</label>
            <input name="annual_volume" type="number" min="0" className="form-input" placeholder="e.g. 5000" />
          </div>
        </div>
      </fieldset>

      {/* Section 4: Quantity */}
      <fieldset>
        <legend className="text-sm font-bold text-gold2 uppercase tracking-wider mb-4">4. Quantity required</legend>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs text-gray-400 mb-1">Boards (pcs)</label>
            <input name="quantity_boards" type="number" min="0" className="form-input" placeholder="—" />
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-1">m²</label>
            <input name="quantity_m2" type="number" min="0" className="form-input" placeholder="—" />
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-1">Pallets</label>
            <input name="quantity_pallets" type="number" min="0" className="form-input" placeholder="—" />
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-1">Containers</label>
            <input name="quantity_container" type="number" min="0" className="form-input" placeholder="—" />
          </div>
        </div>
      </fieldset>

      {/* Section 5: Logistics */}
      <fieldset>
        <legend className="text-sm font-bold text-gold2 uppercase tracking-wider mb-4">5. Logistics & delivery</legend>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-gray-400 mb-1">Incoterms</label>
            <select name="incoterms" className="form-input">
              <option value="">Select…</option>
              {INCOTERMS.map(i => <option key={i} value={i}>{i}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-1">Arrival port</label>
            <input name="arrival_port" className="form-input" placeholder="e.g. Hamburg" />
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-1">Delivery country</label>
            <input name="delivery_country" className="form-input" placeholder="Germany" />
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-1">Delivery city</label>
            <input name="delivery_city" className="form-input" placeholder="Hamburg" />
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-1">Postal code</label>
            <input name="delivery_postal_code" className="form-input" placeholder="20095" />
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-1">Full delivery address</label>
            <input name="delivery_address" className="form-input" placeholder="Street, building" />
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-1">Unloading equipment</label>
            <input name="unloading_equipment" className="form-input" placeholder="Forklift / crane / none" />
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-1">Site access</label>
            <input name="delivery_access" className="form-input" placeholder="e.g. loading dock" />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-xs text-gray-400 mb-1">Required delivery window</label>
            <input name="delivery_time" className="form-input" placeholder="e.g. Q3 2025 or within 6 weeks" />
          </div>
        </div>
      </fieldset>

      {/* Section 6: Project */}
      <fieldset>
        <legend className="text-sm font-bold text-gold2 uppercase tracking-wider mb-4">6. Project details</legend>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-gray-400 mb-1">Project name</label>
            <input name="project_name" className="form-input" placeholder="e.g. Riverside Apartments" />
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-1">Project type</label>
            <input name="project_type" className="form-input" placeholder="e.g. residential / commercial" />
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-1">Supply type</label>
            <input name="supply_type" className="form-input" placeholder="e.g. one-off / recurring" />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-xs text-gray-400 mb-1">Message / additional details</label>
            <textarea name="message" rows={5} className="form-input resize-none" placeholder="Any additional information, questions, or special requirements…" />
            <input type="hidden" name="_subject" value="New quotation/enquiry from terasun-europe.eu" />
          </div>
        </div>
      </fieldset>

      {status === 'error' && (
        <p className="text-red-400 text-sm bg-red-950/40 border border-red-700 rounded-lg p-3">
          Submission failed. Please try again or email us at <a href={`mailto:${CONTACT.email}`} className="underline">{CONTACT.email}</a>
        </p>
      )}

      <div className="flex items-center gap-4">
        <button type="submit" disabled={status === 'sending'} className="btn-primary px-8 py-3 text-sm font-bold disabled:opacity-60 disabled:cursor-not-allowed">
          {status === 'sending' ? 'Sending…' : 'Submit request'}
        </button>
        <p className="text-xs text-gray-500">We respond within 1 business day</p>
      </div>
    </form>
  )
}
