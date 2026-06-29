import { character } from '../data/angelina'

const CATEGORIES = [
  { key: 'special',   title: '⚡ SUPER MOVES',    color: 'var(--magenta)' },
  { key: 'languages', title: '◈ LANGUAGES',        color: 'var(--cyan)'    },
  { key: 'tools',     title: '⚙ TOOLS',            color: 'var(--gold)'    },
  { key: 'passives',  title: '✦ PASSIVE TRAITS',   color: 'var(--green)'   },
]

function MoveRow({ name, notation, color }) {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '7px 12px',
      borderBottom: '1px solid var(--border)',
      transition: 'background 0.12s',
      cursor: 'default',
    }}
    onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,245,255,0.04)'}
    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
    >
      <span style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.75rem',
        color: 'var(--text)',
        letterSpacing: '0.04em',
      }}>
        {name}
      </span>
      <span style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.65rem',
        color: color,
        letterSpacing: '0.1em',
        textShadow: color === 'var(--cyan)' ? 'var(--glow-cyan)' :
                    color === 'var(--gold)'  ? 'var(--glow-gold)'  : 'none',
        whiteSpace: 'nowrap',
        marginLeft: 12,
      }}>
        {notation}
      </span>
    </div>
  )
}

export default function MoveList({ navigate }) {
  return (
    <div className="screen" style={{ background: 'var(--bg)' }}>
      <div className="grid-bg" style={{ opacity: 0.25 }} />

      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', height: '100%' }}>
        {/* Header */}
        <div style={{
          padding: '18px 24px 14px',
          borderBottom: '1px solid var(--border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <div>
            <div style={{
              fontFamily: 'var(--font-head)',
              fontSize: 'clamp(0.8rem, 2.5vw, 1.2rem)',
              fontWeight: 900,
              letterSpacing: '0.18em',
              color: 'var(--cyan)',
              textShadow: 'var(--glow-cyan)',
            }}>
              MOVE LIST
            </div>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.6rem',
              color: 'var(--text-dim)',
              letterSpacing: '0.1em',
              marginTop: 2,
            }}>
              {character.name} · {character.class}
            </div>
          </div>
          <button className="btn-neon" onClick={() => navigate('menu')} style={{ fontSize: '0.6rem', padding: '6px 14px' }}>
            ← MENU
          </button>
        </div>

        {/* Move list panels */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '20px clamp(12px, 4vw, 40px)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 20,
          alignContent: 'start',
        }}>
          {CATEGORIES.map(cat => (
            <div key={cat.key} className="neon-panel" style={{ overflow: 'hidden' }}>
              <div className="corner-tl" style={{ borderColor: cat.color }} />
              <div className="corner-tr" style={{ borderColor: cat.color }} />
              <div className="corner-bl" style={{ borderColor: cat.color }} />
              <div className="corner-br" style={{ borderColor: cat.color }} />

              {/* Category header */}
              <div style={{
                padding: '10px 12px',
                borderBottom: `1px solid ${cat.color}33`,
                fontFamily: 'var(--font-head)',
                fontSize: '0.62rem',
                fontWeight: 700,
                letterSpacing: '0.18em',
                color: cat.color,
                background: `${cat.color}0a`,
              }}>
                {cat.title}
              </div>

              {/* Moves */}
              {character.skills[cat.key].map(move => (
                <MoveRow
                  key={move.name}
                  name={move.name}
                  notation={move.notation}
                  color={cat.color}
                />
              ))}
            </div>
          ))}
        </div>

        {/* Bottom nav */}
        <div style={{
          borderTop: '1px solid var(--border)',
          padding: '12px 16px',
          display: 'flex',
          justifyContent: 'center',
          gap: 12,
          flexWrap: 'wrap',
        }}>
          {[
            { label: 'SELECT FIGHTER', screen: 'character' },
            { label: 'STORY MODE',     screen: 'story'     },
            { label: 'CONTACT P2',     screen: 'contact'   },
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
