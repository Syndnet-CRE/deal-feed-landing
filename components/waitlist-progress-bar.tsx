'use client'

import React, { useRef, useState, useEffect } from 'react'

const PALETTE = { primary: '#5BCC48', light: '#89EA60', lightest: '#C2FF9C' }

function EQTicker({ progress }: { progress: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [tickCount, setTickCount] = useState(180)

  useEffect(() => {
    function measure() {
      if (!ref.current) return
      setTickCount(Math.max(30, Math.floor((ref.current.offsetWidth + 3) / 5)))
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  return (
    <div
      ref={ref}
      style={{
        position: 'absolute', left: 0, right: 0, top: '50%',
        height: 12, marginTop: -6,
        display: 'flex', alignItems: 'center', gap: 3, overflow: 'hidden',
      }}
    >
      {Array.from({ length: tickCount }).map((_, i) => {
        const pct = i / (tickCount - 1)
        const dist = pct - progress
        const isDone = dist < -0.005
        const isLeading = dist >= -0.06 && dist <= 0.015
        const leadH = Math.max(4, 11 - Math.abs(dist) * 130)
        const h = isLeading ? leadH : isDone ? 3 + (i % 2) : 2
        const color = isLeading ? PALETTE.lightest : isDone ? PALETTE.primary : 'rgba(255,255,255,0.10)'
        return (
          <div
            key={i}
            style={{
              width: 2, height: h, background: color, borderRadius: 1,
              boxShadow: isLeading ? `0 0 4px ${PALETTE.primary}` : 'none',
              animation: isLeading
                ? `pt-tick-rise ${0.55 + (i % 5) * 0.08}s ease-in-out infinite ${(i % 7) * 0.05}s`
                : 'none',
              transformOrigin: 'center', flex: '0 0 auto',
              transition: 'background 0.18s, height 0.18s',
            }}
          />
        )
      })}
    </div>
  )
}

function Rocket({ size = 28 }: { size?: number }) {
  return (
    <div style={{ position: 'relative', width: size, height: size, display: 'block' }}>
      <div style={{
        position: 'absolute', top: '50%', right: `calc(100% - ${size * 0.18}px)`,
        width: `${size * 1.7}px`, height: 3, marginTop: -1.5,
        background: 'linear-gradient(90deg, transparent 0%, rgba(89,234,96,0) 6%, rgba(248,180,65,0.85) 60%, rgba(255,255,255,1) 100%)',
        borderRadius: 2, filter: 'blur(1.2px)', pointerEvents: 'none',
      }} />
      <svg
        width={size} height={size} viewBox="0 0 24 24" fill="none"
        strokeLinecap="round" strokeLinejoin="round"
        style={{ position: 'relative', zIndex: 2, display: 'block', transform: 'rotate(45deg)' }}
      >
        <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" fill={PALETTE.primary} stroke="#1A1A20" strokeWidth="1.2" />
        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09" fill="#F97316" stroke="#EA580C" strokeWidth="1.4" />
        <path d="M9 12a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.4 22.4 0 0 1-4 2z" fill={PALETTE.primary} stroke="#1A1A20" strokeWidth="1.2" />
        <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 .05 5 .05" fill={PALETTE.primary} stroke="#1A1A20" strokeWidth="1.2" />
      </svg>
    </div>
  )
}

function MidnightGate() {
  return (
    <div style={{
      position: 'absolute', left: '50%', top: '50%',
      transform: 'translate(-50%, -50%)', zIndex: 3,
    }}>
      <div style={{
        width: 8, height: 8,
        background: PALETTE.primary,
        border: `1.5px solid ${PALETTE.primary}`,
        transform: 'rotate(45deg)',
        boxShadow: `0 0 0 3px #0F1211, 0 0 12px ${PALETTE.primary}`,
      }} />
    </div>
  )
}

export function WaitlistProgressBar({ progress }: { progress: number }) {
  return (
    <>
      <style>{`
        @keyframes pt-tick-rise {
          0%, 100% { transform: scaleY(1); }
          50%       { transform: scaleY(1.6); }
        }
      `}</style>
      <div style={{ position: 'relative', width: '100%', height: 26 }}>
        <EQTicker progress={progress} />
        <MidnightGate />
        <div style={{
          position: 'absolute',
          left: `${progress * 100}%`,
          top: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 4,
          filter: `drop-shadow(0 0 8px ${PALETTE.primary}aa)`,
        }}>
          <Rocket size={28} />
        </div>
      </div>
    </>
  )
}
