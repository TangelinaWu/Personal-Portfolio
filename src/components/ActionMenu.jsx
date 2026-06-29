import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

export default function ActionMenu({ hotspot, x, y, onAction, onClose }) {
  const ref = useRef(null)

  // Adjust position to stay in viewport
  const vw = window.innerWidth
  const vh = window.innerHeight
  const menuW = 220
  const menuH = 60 + hotspot.actions.length * 48
  const left = Math.min(x + 8, vw - menuW - 12)
  const top  = Math.min(y - 20, vh - menuH - 80)

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) onClose()
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [onClose])

  return (
    <motion.div
      ref={ref}
      initial={{ scale: 0.7, opacity: 0, originX: 0, originY: 0 }}
      animate={{ scale: 1,   opacity: 1 }}
      exit={{    scale: 0.7, opacity: 0 }}
      transition={{ type: 'spring', stiffness: 400, damping: 28 }}
      style={{
        position: 'fixed',
        left, top,
        zIndex: 200,
        width: menuW,
        background: '#fff',
        borderRadius: 14,
        boxShadow: '0 8px 32px rgba(0,0,0,0.18), 0 2px 8px rgba(0,0,0,0.1)',
        overflow: 'hidden',
        fontFamily: 'var(--font)',
        border: `2px solid ${hotspot.borderColor}`,
      }}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Header */}
      <div style={{
        padding: '10px 14px',
        background: hotspot.bgColor,
        borderBottom: `1.5px solid ${hotspot.borderColor}33`,
        display: 'flex', alignItems: 'center', gap: 8,
      }}>
        <span style={{ fontSize: '1.2rem' }}>{hotspot.icon}</span>
        <span style={{ fontWeight: 800, fontSize: '0.82rem', color: '#212121', letterSpacing: '0.05em' }}>
          {hotspot.label}
        </span>
      </div>

      {/* Actions */}
      {hotspot.actions.map((action) => (
        <button
          key={action.id}
          onClick={() => onAction(hotspot, action)}
          style={{
            display: 'flex', alignItems: 'center', gap: 10,
            width: '100%', padding: '11px 14px',
            background: 'transparent', border: 'none',
            borderBottom: '1px solid #F5F5F5',
            cursor: 'pointer', fontFamily: 'var(--font)',
            fontSize: '0.82rem', fontWeight: 700, color: '#212121',
            textAlign: 'left', transition: 'background 0.12s',
          }}
          onMouseEnter={e => e.currentTarget.style.background = '#F8FFF8'}
          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
        >
          <span style={{
            width: 28, height: 28, borderRadius: 8,
            background: hotspot.bgColor,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '0.9rem', flexShrink: 0,
          }}>{action.icon}</span>
          {action.label}
        </button>
      ))}
    </motion.div>
  )
}
