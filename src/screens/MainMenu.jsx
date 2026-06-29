import { useState, useEffect, useCallback } from 'react'

const MENU_ITEMS = [
  { label: 'SELECT FIGHTER', screen: 'character' },
  { label: 'STORY MODE',     screen: 'story'     },
  { label: 'MOVE LIST',      screen: 'moves'     },
  { label: 'CONTACT P2',     screen: 'contact'   },
]

export default function MainMenu({ navigate }) {
  const [selected, setSelected] = useState(0)

  const go = useCallback((idx) => navigate(MENU_ITEMS[idx].screen), [navigate])

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'ArrowDown')  setSelected(i => (i + 1) % MENU_ITEMS.length)
      if (e.key === 'ArrowUp')    setSelected(i => (i - 1 + MENU_ITEMS.length) % MENU_ITEMS.length)
      if (e.key === 'Enter' || e.key === ' ') go(selected)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [selected, go])

  return (
    <div className="screen" style={{ background: 'var(--bg)' }}>
      <div className="grid-bg" />

      {/* Background title glow */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(0,245,255,0.04) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{
        position: 'relative',
        zIndex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        gap: 0,
      }}>
        {/* Title block */}
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <div style={{
            fontFamily: 'var(--font-head)',
            fontSize: 'clamp(1.6rem, 5vw, 3.2rem)',
            fontWeight: 900,
            letterSpacing: '0.15em',
            color: 'var(--cyan)',
            textShadow: 'var(--glow-cyan)',
            lineHeight: 1,
            animation: 'flicker 8s ease-in-out infinite',
          }}>
            ANGELINA WU
          </div>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'clamp(0.6rem, 1.5vw, 0.8rem)',
            letterSpacing: '0.35em',
            color: 'var(--gold)',
            textShadow: 'var(--glow-gold)',
            marginTop: 10,
            textTransform: 'uppercase',
          }}>
            ML ENGINEER · LEA · BUILD 2024
          </div>
        </div>

        {/* Menu panel */}
        <div className="neon-panel neon-panel--cyan" style={{ padding: '32px 48px', minWidth: 340 }}>
          <div className="corner-tl" /><div className="corner-tr" />
          <div className="corner-bl" /><div className="corner-br" />

          {MENU_ITEMS.map((item, i) => (
            <div
              key={item.label}
              onMouseEnter={() => setSelected(i)}
              onClick={() => go(i)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                padding: '12px 0',
                cursor: 'pointer',
                fontFamily: 'var(--font-head)',
                fontSize: '0.8rem',
                fontWeight: 700,
                letterSpacing: '0.15em',
                color: selected === i ? '#fff' : 'var(--text-dim)',
                textShadow: selected === i ? 'var(--glow-cyan)' : 'none',
                transition: 'all 0.12s',
                borderBottom: i < MENU_ITEMS.length - 1 ? '1px solid var(--border)' : 'none',
              }}
            >
              <span style={{
                color: 'var(--cyan)',
                textShadow: 'var(--glow-cyan)',
                width: 14,
                display: 'inline-block',
                opacity: selected === i ? 1 : 0,
                transition: 'opacity 0.12s',
                animation: selected === i ? 'glow-pulse 1.2s ease-in-out infinite' : 'none',
              }}>▶</span>
              {item.label}
            </div>
          ))}
        </div>

        <div style={{
          marginTop: 48,
          fontFamily: 'var(--font-mono)',
          fontSize: '0.58rem',
          letterSpacing: '0.2em',
          color: 'var(--text-dim)',
          animation: 'insert-coin 2s step-end infinite',
        }}>
          ↑ ↓ NAVIGATE  ·  ENTER SELECT
        </div>
      </div>

      <div style={{
        position: 'absolute',
        bottom: 16,
        left: 0,
        right: 0,
        textAlign: 'center',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.55rem',
        color: 'var(--text-dim)',
        letterSpacing: '0.1em',
      }}>
        © ANGELINA WU INDUSTRIES — ALL RIGHTS RESERVED
      </div>
    </div>
  )
}
