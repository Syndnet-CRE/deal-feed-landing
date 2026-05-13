'use client'

import * as DialogPrimitive from '@radix-ui/react-dialog'
import { X, Loader2, CheckCircle2 } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { useWaitlist } from './waitlist-context'

type FormData = {
  firstName: string
  lastName: string
  email: string
  persona: string
  market: string
  dealVolume: string
  currentTools: string[]
  monthlySpend: string
  howHeard: string
  agreed: boolean
}

const INITIAL: FormData = {
  firstName: '', lastName: '', email: '',
  persona: '', market: '', dealVolume: '',
  currentTools: [], monthlySpend: '',
  howHeard: '',
  agreed: false,
}

const TOOLS = [
  'PropStream', 'BatchLeads', 'DealMachine', 'Privy',
  'Go High Level', 'REIPro', 'Followup Boss', 'Other',
]

const SPEND_RANGES = [
  'Under $50/mo', '$50–$100/mo', '$100–$200/mo',
  '$200–$300/mo', '$400–$500/mo', '$500+/mo',
]

const inputStyle = { background: '#0D0D0D', border: '1px solid rgba(255,255,255,0.08)' }
const inputCls = 'w-full rounded-lg px-3 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:ring-1 focus:ring-[#1DAF29]/60'
const labelCls = 'block text-xs font-medium text-white/50 mb-1.5'

export function WaitlistModal() {
  const { open, closeWaitlist } = useWaitlist()
  const [form, setForm] = useState<FormData>(INITIAL)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const set = (field: keyof FormData, value: string | boolean) =>
    setForm(prev => ({ ...prev, [field]: value }))

  const toggleTool = (tool: string) =>
    setForm(prev => ({
      ...prev,
      currentTools: prev.currentTools.includes(tool)
        ? prev.currentTools.filter(t => t !== tool)
        : [...prev.currentTools, tool],
    }))

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!form.agreed) {
      setErrorMsg('Please check the agreement box to continue.')
      setStatus('error')
      return
    }
    setStatus('loading')
    setErrorMsg('')
    try {
      const payload = {
        ...form,
        currentTools: form.currentTools.join(', ') || 'None selected',
      }
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      if (!res.ok) {
        setErrorMsg(data.error || 'Submission failed. Please try again.')
        setStatus('error')
        return
      }
      setStatus('success')
    } catch {
      setErrorMsg('Network error. Please try again.')
      setStatus('error')
    }
  }

  function handleOpenChange(isOpen: boolean) {
    if (!isOpen) {
      closeWaitlist()
      if (status === 'success') {
        setTimeout(() => { setForm(INITIAL); setStatus('idle') }, 300)
      }
    }
  }

  return (
    <DialogPrimitive.Root open={open} onOpenChange={handleOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <DialogPrimitive.Content
          className="fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-2xl shadow-2xl data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 max-h-[90vh] flex flex-col overflow-hidden mx-4"
          style={{ background: '#1E1E24' }}
        >
          <DialogPrimitive.Title className="sr-only">Join the Nightdrop Waitlist</DialogPrimitive.Title>
          <DialogPrimitive.Description className="sr-only">Fill out this form to request early access to Nightdrop.</DialogPrimitive.Description>

          <div className="flex items-center justify-between px-6 pt-6 pb-4 shrink-0" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#1DAF29' }}>Early Access</p>
              <h2 className="text-lg font-semibold text-white mt-0.5">Join the waitlist</h2>
            </div>
            <DialogPrimitive.Close className="text-white/40 hover:text-white transition-colors rounded-lg p-1.5 hover:bg-white/5">
              <X className="w-4 h-4" />
            </DialogPrimitive.Close>
          </div>

          <div className="overflow-y-auto flex-1 px-6 py-5">
            {status === 'success' ? (
              <div className="flex flex-col items-center justify-center py-10 text-center gap-4">
                <CheckCircle2 className="w-12 h-12" style={{ color: '#1DAF29' }} />
                <p className="text-white font-semibold text-lg">You're on the list.</p>
                <p className="text-white/50 text-sm">We'll reach out shortly with your access.</p>
              </div>
            ) : (
              <form id="waitlist-form" onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={labelCls}>First Name</label>
                    <input
                      required value={form.firstName}
                      onChange={e => set('firstName', e.target.value)}
                      placeholder="First"
                      className={inputCls}
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label className={labelCls}>Last Name</label>
                    <input
                      required value={form.lastName}
                      onChange={e => set('lastName', e.target.value)}
                      placeholder="Last"
                      className={inputCls}
                      style={inputStyle}
                    />
                  </div>
                </div>

                <div>
                  <label className={labelCls}>Email</label>
                  <input
                    type="email" required value={form.email}
                    onChange={e => set('email', e.target.value)}
                    placeholder="you@example.com"
                    className={inputCls}
                    style={inputStyle}
                  />
                </div>

                <div>
                  <label className={labelCls}>I am a...</label>
                  <select
                    required value={form.persona}
                    onChange={e => set('persona', e.target.value)}
                    className={inputCls}
                    style={inputStyle}
                  >
                    <option value="" disabled>Select your role</option>
                    {['Investor', 'Wholesaler', 'Residential Investor', 'Commercial Investor', 'Broker/Agent', 'Land Developer', 'Land Wholesaler'].map(p => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className={labelCls}>Primary Market</label>
                  <input
                    required value={form.market}
                    onChange={e => set('market', e.target.value)}
                    placeholder="e.g. Austin, TX"
                    className={inputCls}
                    style={inputStyle}
                  />
                </div>

                <div>
                  <label className={labelCls}>Monthly Deal Volume</label>
                  <select
                    required value={form.dealVolume}
                    onChange={e => set('dealVolume', e.target.value)}
                    className={inputCls}
                    style={inputStyle}
                  >
                    <option value="" disabled>Select volume</option>
                    {['0 — just getting started', '1–5', '6–20', '20+'].map(v => (
                      <option key={v} value={v}>{v}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className={labelCls}>Tools you currently use <span className="text-white/30">(select all that apply)</span></label>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {TOOLS.map(tool => {
                      const selected = form.currentTools.includes(tool)
                      return (
                        <button
                          key={tool}
                          type="button"
                          onClick={() => toggleTool(tool)}
                          className="px-3 py-1.5 rounded-full text-xs font-medium border transition-colors"
                          style={{
                            background: selected ? 'rgba(29,175,41,0.15)' : 'rgba(255,255,255,0.04)',
                            borderColor: selected ? 'rgba(29,175,41,0.5)' : 'rgba(255,255,255,0.08)',
                            color: selected ? '#1DAF29' : 'rgba(255,255,255,0.5)',
                          }}
                        >
                          {tool}
                        </button>
                      )
                    })}
                  </div>
                </div>

                <div>
                  <label className={labelCls}>Monthly spend on tools &amp; software</label>
                  <select
                    value={form.monthlySpend}
                    onChange={e => set('monthlySpend', e.target.value)}
                    className={inputCls}
                    style={inputStyle}
                  >
                    <option value="" disabled>Select a range</option>
                    {SPEND_RANGES.map(r => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className={labelCls}>How did you hear about us?</label>
                  <select
                    required value={form.howHeard}
                    onChange={e => set('howHeard', e.target.value)}
                    className={inputCls}
                    style={inputStyle}
                  >
                    <option value="" disabled>Select source</option>
                    {['Facebook Group', 'LinkedIn', 'Instagram', 'YouTube', 'Google Search', 'Referral', 'Podcast', 'Other'].map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.agreed}
                    onChange={e => set('agreed', e.target.checked)}
                    className="mt-0.5 shrink-0 accent-[#1DAF29]"
                  />
                  <span className="text-xs text-white/50 leading-relaxed">
                    I agree to receive email updates from Nightdrop. We'll only reach out when your access is ready.
                  </span>
                </label>

                {status === 'error' && (
                  <p className="text-red-400 text-sm">{errorMsg}</p>
                )}
              </form>
            )}
          </div>

          {status !== 'success' && (
            <div className="px-6 pb-6 pt-4 shrink-0" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
              <button
                type="submit"
                form="waitlist-form"
                disabled={status === 'loading'}
                className="w-full py-3 rounded-lg font-semibold text-sm text-black flex items-center justify-center gap-2 transition-opacity hover:opacity-90 disabled:opacity-60"
                style={{ background: '#1DAF29' }}
              >
                {status === 'loading' && <Loader2 className="w-4 h-4 animate-spin" />}
                {status === 'loading' ? 'Submitting...' : 'Request Early Access'}
              </button>
            </div>
          )}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}
