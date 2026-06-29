import { useState, useEffect } from 'react'

const NEEDS_META = [
  { key: 'energy',     label: 'ENERGY',     icon: '⚡', color: '#F44336' },
  { key: 'creativity', label: 'CREATIVITY', icon: '🎨', color: '#9C27B0' },
  { key: 'focus',      label: 'FOCUS',      icon: '🎯', color: '#2196F3' },
  { key: 'innovation', label: 'INNOVATION', icon: '💡', color: '#FF9800' },
  { key: 'social',     label: 'SOCIAL',     icon: '💬', color: '#4CAF50' },
]

export default function NeedsPanel({ needs, boostedNeed, currentAction, avatarFailed }) {
  const [flashKey, setFlashKey] = useState({})

  useEffect(() => {
    if (boostedNeed) {
      setFlashKey(k => ({ ...k, [boostedNeed]: (k[boostedNeed] || 0) + 1 }))
    }
  }, [boostedNeed])

  return (
    <div style={{
      position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 100,
      background: 'rgba(255,255,255,0.96)',
      borderTop: '2px solid #A5D6A7',
      boxShadow: '0 -4px 20px rgba(0,0,0,0.1)',
      backdropFilter: 'blur(8px)',
      padding: '8px 16px',
      display: 'flex', alignItems: 'center', gap: 16,
      height: 70,
    }}>
      {/* Sim avatar + action text */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 180, flexShrink: 0 }}>
        <div style={{
          width: 44, height: 44, borderRadius: 12,
          overflow: 'hidden', border: '2px solid #A5D6A7',
          background: '#E8F5E9', flexShrink: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          {!avatarFailed ? (
            <img src="/avatar.jpg" alt="Angelina" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <span style={{ fontSize: '1.6rem' }}>🧍‍♀️</span>
          )}
        </div>
        <div>
          <div style={{ fontFamily: 'var(--font)', fontWeight: 800, fontSize: '0.72rem', color: '#2E7D32' }}>
            ANGELINA WU
          </div>
          <div style={{
            fontFamily: 'var(--font)', fontWeight: 600, fontSize: '0.68rem',
            color: currentAction ? '#43A047' : '#9E9E9E',
            marginTop: 1, fontStyle: currentAction ? 'normal' : 'italic',
          }}>
            {currentAction || 'Waiting for instructions...'}
          </div>
        </div>
      </div>

      {/* Divider */}
      <div style={{ width: 1, height: 44, background: '#E0E0E0', flexShrink: 0 }} />

      {/* Needs */}
      <div style={{
        display: 'flex', gap: 12, flex: 1,
        alignItems: 'center', flexWrap: 'wrap',
        overflowX: 'auto',
      }}>
        {NEEDS_META.map(({ key, label, icon, color }) => (
          <div
            key={`${key}-${flashKey[key] || 0}`}
            style={{
              display: 'flex', flexDirection: 'column', gap: 3, minWidth: 72,
              animation: flashKey[key] ? 'needs-flash 0.8s ease' : 'none',
            }}
          >
            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              fontFamily: 'var(--font)', fontWeight: 700, fontSize: '0.58rem',
              color: '#424242', letterSpacing: '0.04em',
            }}>
              <span>{icon} {label}</span>
              <span style={{ color, fontWeight: 800 }}>{needs[key]}</span>
            </div>
            <div style={{
              height: 7, background: '#EEEEEE', borderRadius: 99, overflow: 'hidden',
            }}>
              <div style={{
                height: '100%', width: `${needs[key]}%`,
                background: `linear-gradient(90deg, ${color}88, ${color})`,
                borderRadius: 99, transition: 'width 0.6s ease',
              }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
