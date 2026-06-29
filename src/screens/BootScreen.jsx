import { useEffect, useState, useCallback } from 'react'

const TIPS = [
  "TIP: Angelina's CREATIVITY bar is almost always full",
  "TIP: Regular coffee breaks prevent ENERGY depletion",
  "TIP: Pushing to production boosts SOCIAL interaction",
  "TIP: Click on objects in the room to learn about Angelina",
  "TIP: The PLUMBOB indicates Angelina is currently selected",
]

export default function BootScreen({ navigate }) {
  const [tipIdx, setTipIdx] = useState(0)
  const [tipKey, setTipKey] = useState(0)
  const [progress, setProgress] = useState(0)

  const advance = useCallback(() => navigate('world'), [navigate])

  useEffect(() => {
    const tipTimer = setInterval(() => {
      setTipIdx(i => (i + 1) % TIPS.length)
      setTipKey(k => k + 1)
    }, 1600)
    return () => clearInterval(tipTimer)
  }, [])

  useEffect(() => {
    let p = 0
    const id = setInterval(() => {
      p += 2
      setProgress(p)
      if (p >= 100) { clearInterval(id); setTimeout(advance, 400) }
    }, 70)
    return () => clearInterval(id)
  }, [advance])

  return (
    <div
      onClick={advance}
      style={{
        width: '100%', height: '100%',
        background: 'linear-gradient(160deg, #C8E6C9 0%, #E8F5E9 40%, #F1F8E9 100%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        gap: 32, cursor: 'pointer', userSelect: 'none', position: 'relative', overflow: 'hidden',
      }}
    >
      {/* Background bubbles */}
      {[...Array(6)].map((_, i) => (
        <div key={i} style={{
          position: 'absolute',
          width: 80 + i * 40, height: 80 + i * 40,
          borderRadius: '50%',
          background: `rgba(0,200,83,${0.04 + i * 0.01})`,
          left: `${10 + i * 15}%`, top: `${5 + i * 12}%`,
          animation: `sim-idle ${3 + i}s ease-in-out infinite`,
          animationDelay: `${i * 0.4}s`,
        }} />
      ))}

      {/* Plumbob */}
      <div style={{
        width: 64, height: 64,
        background: 'linear-gradient(135deg, #00E676 0%, #00C853 50%, #1B5E20 100%)',
        transform: 'rotate(45deg)',
        borderRadius: 8,
        boxShadow: '0 0 30px rgba(0,200,83,0.6), 0 0 60px rgba(0,200,83,0.2)',
        animation: 'plumbob-spin-in 1s cubic-bezier(0.34,1.56,0.64,1) both, plumbob-bob 2s ease-in-out infinite 1s',
      }} />

      {/* Title */}
      <div style={{ textAlign: 'center' }}>
        <div style={{
          fontFamily: 'var(--font)', fontWeight: 900, fontSize: 'clamp(1.8rem,5vw,2.8rem)',
          color: '#1B5E20', letterSpacing: '-0.01em',
        }}>
          ANGELINA WU
        </div>
        <div style={{
          fontFamily: 'var(--font)', fontWeight: 600, fontSize: '0.95rem',
          color: '#43A047', letterSpacing: '0.12em', marginTop: 4,
        }}>
          LOADING NEIGHBORHOOD...
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ width: 'min(360px, 80vw)' }}>
        <div style={{
          height: 18, background: '#C8E6C9', borderRadius: 99,
          overflow: 'hidden', border: '2px solid #81C784',
          boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)',
        }}>
          <div style={{
            height: '100%', width: `${progress}%`,
            background: 'linear-gradient(90deg, #43A047, #00C853)',
            borderRadius: 99, transition: 'width 0.07s linear',
            boxShadow: '0 0 10px rgba(0,200,83,0.5)',
          }} />
        </div>
        <div style={{
          display: 'flex', justifyContent: 'space-between',
          marginTop: 6, fontFamily: 'var(--font)', fontWeight: 600,
          fontSize: '0.7rem', color: '#558B2F',
        }}>
          <span>Loading Angelina's world...</span>
          <span>{progress}%</span>
        </div>
      </div>

      {/* Tip */}
      <div
        key={tipKey}
        style={{
          padding: '12px 20px',
          background: 'rgba(255,255,255,0.7)',
          border: '1.5px solid #A5D6A7',
          borderRadius: 12,
          fontFamily: 'var(--font)', fontWeight: 600, fontSize: '0.82rem',
          color: '#2E7D32', maxWidth: 380, textAlign: 'center',
          backdropFilter: 'blur(4px)',
          animation: 'tip-fade 1.6s ease both',
        }}
      >
        {TIPS[tipIdx]}
      </div>

      <div style={{
        position: 'absolute', bottom: 20,
        fontFamily: 'var(--font)', fontWeight: 600, fontSize: '0.72rem',
        color: '#81C784', letterSpacing: '0.05em',
        animation: 'blink 1.4s step-end infinite',
      }}>
        CLICK ANYWHERE TO SKIP
      </div>
    </div>
  )
}
