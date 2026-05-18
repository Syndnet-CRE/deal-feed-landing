'use client'

import { createContext, useCallback, useContext, useState } from 'react'

interface WaitlistContextType {
  open: boolean
  openWaitlist: () => void
  closeWaitlist: () => void
  toastVisible: boolean
  showToast: () => void
  dismissToast: () => void
}

const WaitlistContext = createContext<WaitlistContextType | null>(null)

export function WaitlistProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  const [toastVisible, setToastVisible] = useState(false)

  const openWaitlist  = useCallback(() => setOpen(true),          [])
  const closeWaitlist = useCallback(() => setOpen(false),         [])
  const showToast     = useCallback(() => setToastVisible(true),  [])
  const dismissToast  = useCallback(() => setToastVisible(false), [])

  return (
    <WaitlistContext.Provider value={{ open, openWaitlist, closeWaitlist, toastVisible, showToast, dismissToast }}>
      {children}
    </WaitlistContext.Provider>
  )
}

export function useWaitlist() {
  const ctx = useContext(WaitlistContext)
  if (!ctx) throw new Error('useWaitlist must be used within WaitlistProvider')
  return ctx
}
