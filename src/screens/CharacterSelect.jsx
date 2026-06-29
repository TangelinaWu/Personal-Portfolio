import { useState } from 'react'
import StatBar from '../components/StatBar'
import { character } from '../data/angelina'

function Portrait() {
  const [imgFailed, setImgFailed] = useState(false)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {/* Plumbob */}
      <div style={{
        width: 22,
        height: 22,
        background: 'var(--green)',
        transform: 'rotate(45deg)',
        boxShadow: 'var(--glow-green)',
        marginBottom: 10,
        animation: 'plumbob-bob 2.5s ease-in-out infinite',
        flexShrink: 0,
      }} />

      {/* Frame */}
      <div className="neon-panel neon-panel--cyan" style={{
        width: 'min(220px, 38vw)',
        aspectRatio: '3/4',
        overflow: 'hidden',
        position: 'relative',
        flexShrink: 0,
      }}>
        <div className="corner-tl" /><div className="corner-tr" />
        <div className="corner-bl" /><div className="corner-br" />

        {!imgFailed ? (
          <img
            src="/avatar.jpg"
            alt="Angelina Wu"
            onError={() => setImgFailed(true)}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'top center',
              display: 'block',
            }}
          />
        ) : (
          <AvatarPlaceholder />
        )}

        {/* Scan sweep line */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, transparent 45%, rgba(0,245,255,0.06) 50%, transparent 55%)',
          animation: 'float 3s ease-in-out infinite',
          pointerEvents: 'none',
        }} />
      </div>

      {/* Name plate */}
      <div style={{ marginTop: 14, textAlign: 'center' }}>
        <div style={{
          fontFamily: 'var(--font-head)',
          fontSize: 'clamp(0.75rem, 2vw, 1rem)',
          fontWeight: 900,
          letterSpacing: '0.12em',
          color: '#fff',
          textShadow: 'var(--glow-cyan)',
        }}>
          {character.name}
        </div>
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.62rem',
          letterSpacing: '0.1em',
          color: 'var(--gold)',
          textShadow: 'var(--glow-gold)',
          marginTop: 4,
        }}>
          {character.class} · {character.affiliation}
        </div>
      </div>
    </div>
  )
}

function AvatarPlaceholder() {
  return (
    <div style={{
      width: '100%',
      height: '100%',
      background: `
        radial-gradient(ellipse 60% 70% at 50% 35%, rgba(0,245,255,0.08) 0%, transparent 70%),
        var(--surface)
      `,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 12,
      position: 'relative',
    }}>
      {/* Abstract head */}
      <div style={{
        width: 48,
        height: 48,
        borderRadius: '50%',
        border: '1px solid rgba(0,245,255,0.3)',
        background: 'radial-gradient(circle, rgba(0,245,255,0.08) 0%, transparent 70%)',
        boxShadow: '0 0 20px rgba(0,245,255,0.1)',
      }} />
      {/* Abstract body */}
      <div style={{
        width: 2,
        height: 40,
        background: 'linear-gradient(to bottom, rgba(0,245,255,0.4), transparent)',
      }} />
      <div style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.55rem',
        letterSpacing: '0.15em',
        color: 'var(--cyan)',
        textShadow: 'var(--glow-cyan)',
        textAlign: 'center',
        animation: 'glow-pulse 1.5s ease-in-out infinite',
        padding: '0 12px',
      }}>
        SCANNING...<br />
        <span style={{ color: 'var(--text-dim)', fontSize: '0.5rem' }}>
          Add /public/avatar.jpg
        </span>
      </div>
    </div>
  )
}

export default function CharacterSelect({ navigate }) {
  return (
    <div className="screen" style={{ background: 'var(--bg)' }}>
      <div className="grid-bg" style={{ opacity: 0.3 }} />
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse 80% 60% at 30% 60%, rgba(0,245,255,0.04) 0%, transparent 60%)',
        pointerEvents: 'none',
      }} />

      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', height: '100%' }}>
        {/* Header */}
        <div style={{
          padding: '20px 0 16px',
          textAlign: 'center',
          borderBottom: '1px solid var(--border)',
        }}>
          <div style={{
            fontFamily: 'var(--font-head)',
            fontSize: 'clamp(0.9rem, 3vw, 1.5rem)',
            fontWeight: 900,
            letterSpacing: '0.2em',
            color: 'var(--gold)',
            textShadow: 'var(--glow-gold)',
            animation: 'flash-in 0.8s ease-out both',
          }}>
            ◈ CHOOSE YOUR FIGHTER ◈
          </div>
        </div>

        {/* Main content */}
        <div style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 'clamp(24px, 5vw, 64px)',
          padding: 'clamp(16px, 3vw, 32px)',
          flexWrap: 'wrap',
          overflowY: 'auto',
        }}>
          {/* Left: Portrait */}
          <Portrait />

          {/* Right: Stats */}
          <div style={{ minWidth: 260, flex: 1, maxWidth: 420 }}>
            <div style={{
              fontFamily: 'var(--font-head)',
              fontSize: 'clamp(1rem, 3.5vw, 1.8rem)',
              fontWeight: 900,
              letterSpacing: '0.1em',
              color: '#fff',
              textShadow: '0 0 20px rgba(255,255,255,0.2)',
              marginBottom: 4,
            }}>
              {character.name}
            </div>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.65rem',
              letterSpacing: '0.15em',
              color: 'var(--cyan)',
              textShadow: 'var(--glow-cyan)',
              marginBottom: 28,
            }}>
              {character.class} · {character.affiliation} · {character.origin}
            </div>

            <div style={{ marginBottom: 32 }}>
              {character.stats.map((s, i) => (
                <StatBar
                  key={s.label}
                  label={s.label}
                  value={s.value}
                  delay={200 + i * 120}
                  color={i % 3 === 0 ? 'cyan' : i % 3 === 1 ? 'gold' : 'magenta'}
                />
              ))}
            </div>

            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.62rem',
              color: 'var(--text-dim)',
              letterSpacing: '0.06em',
              lineHeight: 1.6,
              borderTop: '1px solid var(--border)',
              paddingTop: 14,
            }}>
              Machine learning engineer building AI products that actually work.
              <br />Shipping at Lea — one model at a time.
            </div>
          </div>
        </div>

        {/* Bottom nav */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: 12,
          padding: '14px 16px',
          borderTop: '1px solid var(--border)',
          flexWrap: 'wrap',
        }}>
          {[
            { label: '← MENU',      screen: 'menu'      },
            { label: 'STORY MODE',  screen: 'story'     },
            { label: 'MOVE LIST',   screen: 'moves'     },
            { label: 'CONTACT P2',  screen: 'contact'   },
          ].map(btn => (
            <button
              key={btn.label}
              className="btn-neon"
              onClick={() => navigate(btn.screen)}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
