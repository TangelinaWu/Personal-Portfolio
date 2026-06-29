import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { panels, character } from '../data/angelina'

function TypewriterText({ text }) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)
  useEffect(() => {
    setDisplayed('')
    setDone(false)
    let i = 0
    const id = setInterval(() => {
      setDisplayed(text.slice(0, i + 1))
      i++
      if (i >= text.length) { clearInterval(id); setDone(true) }
    }, 22)
    return () => clearInterval(id)
  }, [text])
  return (
    <p style={{ fontFamily: 'var(--font)', fontSize: '1rem', lineHeight: 1.75, color: '#212121', fontWeight: 600 }}>
      {displayed}
      {!done && <span style={{ display: 'inline-block', width: 2, height: '1em', background: '#43A047', verticalAlign: 'text-bottom', marginLeft: 2, animation: 'blink 0.7s step-end infinite' }} />}
    </p>
  )
}

function SkillBar({ level = 80, color }) {
  const [w, setW] = useState(0)
  useEffect(() => { const t = setTimeout(() => setW(level), 100); return () => clearTimeout(t) }, [level])
  return (
    <div style={{ height: 6, background: '#F3E5F5', borderRadius: 99, overflow: 'hidden', marginTop: 4 }}>
      <div style={{ height: '100%', width: `${w}%`, background: color, borderRadius: 99, transition: 'width 0.8s ease' }} />
    </div>
  )
}

export default function ContentPanel({ panelId, onClose }) {
  const panel = panels[panelId]
  if (!panel) return null

  return (
    <motion.div
      initial={{ x: '100%', opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: '110%', opacity: 0 }}
      transition={{ type: 'spring', stiffness: 320, damping: 36 }}
      style={{
        position: 'absolute', top: 0, right: 0,
        width: 'clamp(300px, 42vw, 520px)',
        height: 'calc(100% - 70px)',
        background: '#fff',
        boxShadow: '-6px 0 40px rgba(0,0,0,0.15)',
        zIndex: 150, display: 'flex', flexDirection: 'column',
        fontFamily: 'var(--font)',
        overflowY: 'auto',
      }}
    >
      {/* Header */}
      <div style={{
        padding: '18px 20px 16px',
        background: panel.color,
        display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0,
      }}>
        <span style={{ fontSize: '1.8rem' }}>{panel.emoji}</span>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 900, fontSize: '1rem', color: '#fff', letterSpacing: '0.05em' }}>
            {panel.title}
          </div>
          <div style={{ fontWeight: 600, fontSize: '0.7rem', color: 'rgba(255,255,255,0.75)', marginTop: 1 }}>
            ANGELINA WU
          </div>
        </div>
        <button
          onClick={onClose}
          style={{
            width: 32, height: 32, borderRadius: '50%',
            background: 'rgba(255,255,255,0.25)', border: 'none',
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontWeight: 900, fontSize: '1rem', color: '#fff', transition: 'background 0.15s',
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.4)'}
          onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.25)'}
        >✕</button>
      </div>

      {/* Body */}
      <div style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
        {panel.type === 'experience' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {panel.items.map((item, i) => (
              <div key={i} style={{
                padding: '16px', borderRadius: 12,
                background: '#F8F9FF', border: '1.5px solid #E3F2FD',
                position: 'relative',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 4 }}>
                  <div>
                    <div style={{ fontWeight: 900, fontSize: '0.92rem', color: panel.color }}>{item.role}</div>
                    <div style={{ fontWeight: 700, fontSize: '0.78rem', color: '#424242', marginTop: 2 }}>{item.company}</div>
                  </div>
                  <div style={{
                    background: '#E3F2FD', color: panel.color,
                    padding: '3px 10px', borderRadius: 99,
                    fontWeight: 700, fontSize: '0.68rem', letterSpacing: '0.03em',
                  }}>{item.period}</div>
                </div>
                <p style={{ marginTop: 10, fontWeight: 600, fontSize: '0.82rem', color: '#616161', lineHeight: 1.6 }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        )}

        {panel.type === 'skills' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {panel.categories.map((cat, ci) => (
              <div key={ci}>
                <div style={{ fontWeight: 800, fontSize: '0.78rem', color: panel.color, letterSpacing: '0.08em', marginBottom: 10 }}>
                  {cat.name}
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {cat.items.map((item, ii) => (
                    <span key={ii} style={{
                      padding: '5px 13px', borderRadius: 99,
                      background: `${panel.color}18`,
                      border: `1.5px solid ${panel.color}40`,
                      fontWeight: 700, fontSize: '0.78rem', color: panel.color,
                    }}>{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {panel.type === 'story' && (
          <div>
            <div style={{
              width: 40, height: 40, borderRadius: 10,
              background: `${panel.color}18`, border: `2px solid ${panel.color}33`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1.4rem', marginBottom: 16,
            }}>{panel.emoji}</div>
            <TypewriterText text={panel.text} />
          </div>
        )}

        {panel.type === 'contact' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <p style={{ fontWeight: 600, fontSize: '0.85rem', color: '#616161', marginBottom: 8, lineHeight: 1.6 }}>
              Want to build something great together? Reach out! 👋
            </p>
            {panel.links.map((link, i) => (
              <a
                key={i}
                href={link.href}
                target={link.label !== 'EMAIL' ? '_blank' : undefined}
                rel="noreferrer"
                style={{
                  display: 'flex', alignItems: 'center', gap: 14,
                  padding: '14px 16px', borderRadius: 12,
                  border: '2px solid #E0F2F1', background: '#F9FFFE',
                  transition: 'all 0.15s', textDecoration: 'none',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = panel.color; e.currentTarget.style.background = `${panel.color}0d` }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#E0F2F1'; e.currentTarget.style.background = '#F9FFFE' }}
              >
                <span style={{
                  width: 38, height: 38, borderRadius: 10,
                  background: `${panel.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.1rem', flexShrink: 0,
                }}>{link.icon}</span>
                <div>
                  <div style={{ fontWeight: 800, fontSize: '0.78rem', color: panel.color }}>{link.label}</div>
                  <div style={{ fontWeight: 600, fontSize: '0.73rem', color: '#757575', marginTop: 1 }}>{link.value}</div>
                </div>
              </a>
            ))}
          </div>
        )}

        {panel.type === 'profile' && (
          <div>
            {/* Name + plumbob */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, marginBottom: 24 }}>
              <div style={{
                width: 20, height: 20,
                background: 'linear-gradient(135deg, #00E676, #00C853)',
                transform: 'rotate(45deg)', borderRadius: 4,
                boxShadow: '0 0 14px rgba(0,200,83,0.5)',
                animation: 'plumbob-bob 2s ease-in-out infinite',
              }} />
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontWeight: 900, fontSize: '1.2rem', color: panel.color }}>{character.name}</div>
                <div style={{ fontWeight: 700, fontSize: '0.75rem', color: '#757575', marginTop: 2 }}>
                  {character.class} · {character.affiliation}
                </div>
              </div>
            </div>

            {/* Stats */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {character.stats.map((s, i) => {
                const colors = ['#F44336','#9C27B0','#2196F3','#FF9800','#4CAF50','#00897B']
                const c = colors[i % colors.length]
                return (
                  <div key={s.label}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: '0.72rem', color: '#424242', marginBottom: 4 }}>
                      <span>{s.label}</span>
                      <span style={{ color: c, fontWeight: 900 }}>{s.value}</span>
                    </div>
                    <SkillBar level={s.value} color={c} />
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  )
}
