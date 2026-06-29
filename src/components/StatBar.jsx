import { useEffect, useRef } from 'react'

export default function StatBar({ label, value, delay = 0, color = 'cyan' }) {
  const barRef = useRef(null)

  useEffect(() => {
    const bar = barRef.current
    if (!bar) return
    const t = setTimeout(() => {
      bar.style.width = `${value}%`
    }, delay)
    return () => clearTimeout(t)
  }, [value, delay])

  const colors = {
    cyan:    { fill: 'var(--cyan)',    glow: 'var(--glow-cyan)'    },
    magenta: { fill: 'var(--magenta)', glow: 'var(--glow-magenta)' },
    gold:    { fill: 'var(--gold)',    glow: 'var(--glow-gold)'    },
  }
  const { fill, glow } = colors[color] || colors.cyan

  return (
    <div style={{ marginBottom: '10px' }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '4px',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.65rem',
        letterSpacing: '0.1em',
        color: 'var(--text-dim)',
        textTransform: 'uppercase',
      }}>
        <span>{label}</span>
        <span style={{ color: fill }}>{value}</span>
      </div>
      <div style={{
        height: '6px',
        background: 'var(--border)',
        borderRadius: '1px',
        overflow: 'hidden',
        position: 'relative',
      }}>
        <div
          ref={barRef}
          style={{
            position: 'absolute',
            inset: '0 auto 0 0',
            width: '0%',
            background: fill,
            boxShadow: glow,
            borderRadius: '1px',
            transition: 'width 0.9s cubic-bezier(0.16,1,0.3,1)',
          }}
        />
      </div>
    </div>
  )
}
