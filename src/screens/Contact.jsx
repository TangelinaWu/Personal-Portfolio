import { useState, useEffect } from 'react'
import { character } from '../data/angelina'

const CONTACTS = [
  { key: 'A', label: 'EMAIL',    href: `mailto:${character.contact.email}`,  color: 'var(--cyan)',    display: character.contact.email    },
  { key: 'B', label: 'LINKEDIN', href: character.contact.linkedin,            color: 'var(--magenta)', display: 'linkedin.com/in/angelinawu' },
  { key: 'X', label: 'GITHUB',   href: character.contact.github,              color: 'var(--gold)',    display: 'github.com/angelinawu'      },
]

function ControllerBtn({ keyLabel, label, color }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      fontFamily: 'var(--font-mono)',
      fontSize: '0.7rem',
      color: 'var(--text)',
      letterSpacing: '0.06em',
    }}>
      <span style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 26,
        height: 26,
        border: `2px solid ${color}`,
        borderRadius: '50%',
        color: color,
        boxShadow: `0 0 8px ${color}80`,
        fontFamily: 'var(--font-head)',
        fontSize: '0.55rem',
        fontWeight: 700,
        flexShrink: 0,
      }}>
        {keyLabel}
      </span>
      <span style={{ color: color, fontWeight: 600 }}>{label}</span>
    </div>
  )
}

export default function Contact({ navigate }) {
  const [coin, setCoin] = useState(true)

  useEffect(() => {
    const id = setInterval(() => setCoin(c => !c), 900)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="screen" style={{ background: 'var(--bg)' }}>
      <div className="grid-bg" style={{ opacity: 0.25 }} />
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(255,0,110,0.05) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', height: '100%' }}>
        {/* Back */}
        <div style={{ padding: '16px 20px' }}>
          <button className="btn-neon" onClick={() => navigate('menu')} style={{ fontSize: '0.6rem', padding: '6px 14px' }}>
            ← MENU
          </button>
        </div>

        {/* Main content */}
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 40,
          padding: '0 24px',
        }}>
          {/* Title */}
          <div style={{ textAlign: 'center' }}>
            <div style={{
              fontFamily: 'var(--font-head)',
              fontSize: 'clamp(0.8rem, 3.5vw, 1.4rem)',
              fontWeight: 900,
              letterSpacing: '0.15em',
              color: 'var(--magenta)',
              textShadow: 'var(--glow-magenta)',
              animation: 'flash-in 0.6s ease-out both',
              marginBottom: 8,
            }}>
              PLAYER 2 HAS ENTERED THE ARENA
            </div>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.65rem',
              color: 'var(--text-dim)',
              letterSpacing: '0.12em',
            }}>
              SELECT YOUR MOVE
            </div>
          </div>

          {/* Contact panel */}
          <div className="neon-panel" style={{
            padding: '32px 40px',
            border: '1px solid rgba(255,0,110,0.3)',
            boxShadow: '0 0 30px rgba(255,0,110,0.08)',
            minWidth: 'min(400px, 90vw)',
          }}>
            <div className="corner-tl" style={{ borderColor: 'var(--magenta)' }} />
            <div className="corner-tr" style={{ borderColor: 'var(--magenta)' }} />
            <div className="corner-bl" style={{ borderColor: 'var(--magenta)' }} />
            <div className="corner-br" style={{ borderColor: 'var(--magenta)' }} />

            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {CONTACTS.map(c => (
                <a
                  key={c.key}
                  href={c.href}
                  target={c.key !== 'A' ? '_blank' : undefined}
                  rel="noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 16,
                    padding: '12px 16px',
                    border: '1px solid var(--border)',
                    transition: 'all 0.15s',
                    textDecoration: 'none',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = c.color
                    e.currentTarget.style.background = `${c.color}0d`
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'var(--border)'
                    e.currentTarget.style.background = 'transparent'
                  }}
                >
                  <ControllerBtn keyLabel={c.key} label={c.label} color={c.color} />
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.7rem',
                    color: 'var(--text-dim)',
                    marginLeft: 'auto',
                    letterSpacing: '0.04em',
                  }}>
                    {c.display}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Insert coin */}
          <div style={{
            fontFamily: 'var(--font-head)',
            fontSize: '0.65rem',
            letterSpacing: '0.25em',
            color: 'var(--gold)',
            textShadow: 'var(--glow-gold)',
            opacity: coin ? 1 : 0,
            transition: 'opacity 0.1s',
          }}>
            ✦ INSERT COIN ✦
          </div>
        </div>

        {/* Bottom */}
        <div style={{ padding: '14px 16px', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}>
          {[
            { label: 'SELECT FIGHTER', screen: 'character' },
            { label: 'STORY MODE',     screen: 'story'     },
            { label: 'MOVE LIST',      screen: 'moves'     },
          ].map(btn => (
            <button key={btn.label} className="btn-neon" onClick={() => navigate(btn.screen)}>
              {btn.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
