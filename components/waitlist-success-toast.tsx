'use client'

import { useEffect } from 'react'
import { CheckCircle2, X, Mail } from 'lucide-react'
import { useWaitlist } from './waitlist-context'

const AUTO_DISMISS_MS = 10000

export function WaitlistSuccessToast() {
  const { toastVisible, dismissToast } = useWaitlist()

  useEffect(() => {
    if (!toastVisible) return
    const timer = setTimeout(dismissToast, AUTO_DISMISS_MS)
    return () => clearTimeout(timer)
  }, [toastVisible, dismissToast])

  return (
    <div
      role="status"
      aria-live="polite"
      aria-atomic="true"
      className={`fixed bottom-4 left-4 right-4 md:bottom-6 md:left-auto md:right-6 md:w-full md:max-w-sm z-[200] transition-all duration-300 ease-out ${
        toastVisible
          ? 'opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      <div
        className="rounded-2xl p-5 shadow-2xl flex flex-col gap-3"
        style={{ background: '#1E1E24', border: '1px solid rgba(29,175,41,0.25)' }}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-5 h-5 shrink-0" style={{ color: '#1DAF29' }} />
            <p className="text-white font-semibold text-sm">You're on the list.</p>
          </div>
          <button
            onClick={dismissToast}
            className="text-white/30 hover:text-white/70 transition-colors shrink-0 mt-0.5"
            aria-label="Dismiss notification"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="flex items-start gap-2.5 pl-0.5">
          <Mail className="w-4 h-4 shrink-0 mt-0.5" style={{ color: '#1DAF29' }} />
          <p className="text-white/60 text-sm leading-relaxed">
            Check your email for your access token. Add{' '}
            <span className="text-white/80 font-medium">nightdrop.ai</span>{' '}
            to your contacts so it doesn't land in spam.
          </p>
        </div>
      </div>
    </div>
  )
}
