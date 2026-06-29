import { useState, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { hotspots } from '../data/angelina'
import ActionMenu   from '../components/ActionMenu'
import ContentPanel from '../components/ContentPanel'
import NeedsPanel   from '../components/NeedsPanel'

const INITIAL_NEEDS = { energy: 88, creativity: 93, focus: 91, innovation: 94, social: 86 }
const SIM_START = { left: '42%', top: '38%' }

function Plumbob() {
  return (
    <div style={{
      width: 18, height: 18,
      background: 'linear-gradient(135deg, #00E676 0%, #00C853 60%, #1B5E20 100%)',
      transform: 'rotate(45deg)',
      borderRadius: 4,
      boxShadow: '0 0 12px rgba(0,200,83,0.8), 0 0 24px rgba(0,200,83,0.3)',
      animation: 'plumbob-bob 2s ease-in-out infinite',
      flexShrink: 0,
    }} />
  )
}

function SimCharacter({ pos, isMoving, currentAction, avatarFailed, onAvatarError }) {
  return (
    <div style={{
      position: 'absolute',
      left: pos.left, top: pos.top,
      transform: 'translate(-50%, -50%)',
      transition: 'left 0.7s cubic-bezier(0.4,0,0.2,1), top 0.7s cubic-bezier(0.4,0,0.2,1)',
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      zIndex: 50, cursor: 'default',
      userSelect: 'none',
    }}>
      {/* Plumbob */}
      <Plumbob />

      {/* Thought bubble */}
      <AnimatePresence>
        {currentAction && (
          <motion.div
            initial={{ scale: 0.5, opacity: 0, y: 6 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.5, opacity: 0, y: 6 }}
            transition={{ type: 'spring', stiffness: 360, damping: 26 }}
            style={{
              background: '#fff',
              border: '2px solid #A5D6A7',
              borderRadius: 12,
              padding: '5px 10px',
              fontSize: '0.65rem',
              fontFamily: 'var(--font)',
              fontWeight: 700,
              color: '#2E7D32',
              whiteSpace: 'nowrap',
              boxShadow: '0 3px 12px rgba(0,0,0,0.12)',
              marginBottom: 4,
              position: 'relative',
            }}
          >
            {currentAction}
            <div style={{
              position: 'absolute', bottom: -6, left: '50%', transform: 'translateX(-50%)',
              width: 10, height: 6,
              background: '#fff',
              borderLeft: '2px solid #A5D6A7', borderBottom: '2px solid #A5D6A7',
              clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
            }} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sim avatar */}
      <div style={{
        width: 64, height: 80,
        borderRadius: '50% 50% 40% 40% / 40% 40% 60% 60%',
        overflow: 'hidden',
        border: '3px solid #A5D6A7',
        boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
        background: '#E8F5E9',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        animation: isMoving ? 'walk-wobble 0.3s ease-in-out infinite' : 'sim-idle 3s ease-in-out infinite',
      }}>
        {!avatarFailed ? (
          <img
            src="/avatar.jpg"
            alt="Angelina"
            onError={onAvatarError}
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
          />
        ) : (
          <span style={{ fontSize: '2.4rem', lineHeight: 1 }}>🧍‍♀️</span>
        )}
      </div>

      {/* Shadow on floor */}
      <div style={{
        width: 48, height: 8,
        background: 'rgba(0,0,0,0.1)',
        borderRadius: '50%',
        marginTop: 2,
        filter: 'blur(2px)',
      }} />
    </div>
  )
}

function HotspotObject({ hotspot, onHotspotClick }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      onClick={(e) => onHotspotClick(hotspot, e)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'absolute',
        left: hotspot.pos.left, top: hotspot.pos.top,
        transform: 'translate(-50%, -50%)',
        cursor: 'pointer',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
        zIndex: 30, userSelect: 'none',
        transition: 'transform 0.15s',
      }}
    >
      <div style={{
        width: 58, height: 58,
        background: hovered ? hotspot.bgColor : '#fff',
        border: `2.5px solid ${hotspot.borderColor}${hovered ? '' : '80'}`,
        borderRadius: 16,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '1.8rem',
        boxShadow: hovered
          ? `0 8px 28px ${hotspot.borderColor}40, 0 2px 8px rgba(0,0,0,0.1)`
          : '0 4px 16px rgba(0,0,0,0.1)',
        transition: 'all 0.15s',
        transform: hovered ? 'scale(1.1) translateY(-3px)' : 'scale(1)',
        animation: 'hotspot-pulse 3s ease-in-out infinite',
      }}>
        {hotspot.icon}
      </div>
      <div style={{
        background: hovered ? hotspot.borderColor : 'rgba(255,255,255,0.85)',
        color: hovered ? '#fff' : '#424242',
        padding: '2px 8px', borderRadius: 99,
        fontFamily: 'var(--font)', fontWeight: 800,
        fontSize: '0.55rem', letterSpacing: '0.06em',
        boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
        transition: 'all 0.15s',
        whiteSpace: 'nowrap',
      }}>
        {hotspot.label}
      </div>
    </div>
  )
}

function WelcomeOverlay({ onDismiss }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: 'absolute', inset: 0, zIndex: 300,
        background: 'rgba(0,0,0,0.4)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        backdropFilter: 'blur(3px)',
      }}
      onClick={onDismiss}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 28, delay: 0.1 }}
        style={{
          background: '#fff', borderRadius: 20, padding: '32px 36px',
          maxWidth: 380, textAlign: 'center',
          boxShadow: '0 20px 60px rgba(0,0,0,0.25)',
          fontFamily: 'var(--font)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ fontSize: '3rem', marginBottom: 12 }}>
          <div style={{
            width: 52, height: 52, margin: '0 auto 12px',
            background: 'linear-gradient(135deg, #00E676, #00C853)',
            transform: 'rotate(45deg)', borderRadius: 8,
            boxShadow: '0 0 20px rgba(0,200,83,0.4)',
          }} />
        </div>
        <div style={{ fontWeight: 900, fontSize: '1.3rem', color: '#2E7D32', marginBottom: 8 }}>
          Welcome to Angelina's World!
        </div>
        <p style={{ fontWeight: 600, fontSize: '0.85rem', color: '#616161', lineHeight: 1.6, marginBottom: 20 }}>
          Click on objects in the room to learn about Angelina.
          Each object has actions that reveal different parts of her story.
        </p>
        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 16 }}>
          {hotspots.map(h => (
            <span key={h.id} style={{
              padding: '5px 12px', borderRadius: 99, fontWeight: 700, fontSize: '0.75rem',
              background: h.bgColor, border: `1.5px solid ${h.borderColor}`,
              color: h.borderColor,
            }}>{h.icon} {h.label}</span>
          ))}
        </div>
        <button
          onClick={onDismiss}
          style={{
            width: '100%', padding: '12px',
            background: '#43A047', color: '#fff',
            border: 'none', borderRadius: 12, cursor: 'pointer',
            fontFamily: 'var(--font)', fontWeight: 800, fontSize: '0.9rem',
            boxShadow: '0 4px 14px rgba(67,160,71,0.4)',
            transition: 'transform 0.1s',
          }}
          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.02)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
        >
          Let's go! ▶
        </button>
      </motion.div>
    </motion.div>
  )
}

export default function WorldScreen() {
  const [activeMenu, setActiveMenu]     = useState(null)
  const [activePanelId, setActivePanelId] = useState(null)
  const [simPos, setSimPos]             = useState(SIM_START)
  const [currentAction, setCurrentAction] = useState(null)
  const [isMoving, setIsMoving]         = useState(false)
  const [needs, setNeeds]               = useState(INITIAL_NEEDS)
  const [boostedNeed, setBoostedNeed]   = useState(null)
  const [welcome, setWelcome]           = useState(true)
  const [avatarFailed, setAvatarFailed] = useState(false)

  const handleHotspotClick = useCallback((hotspot, e) => {
    e.stopPropagation()
    setActiveMenu({ hotspot, x: e.clientX, y: e.clientY })
  }, [])

  const handleAction = useCallback((hotspot, action) => {
    setActiveMenu(null)
    setActivePanelId(null)
    setCurrentAction(action.verb)
    setIsMoving(true)
    setSimPos({ left: hotspot.pos.left, top: `calc(${hotspot.pos.top} + 12%)` })
    setNeeds(n => ({ ...n, [action.need]: Math.min(100, n[action.need] + 6) }))
    setBoostedNeed(action.need)
    setTimeout(() => setBoostedNeed(null), 1200)
    setTimeout(() => {
      setIsMoving(false)
      setActivePanelId(action.panel)
    }, 750)
  }, [])

  const handleRoomClick = useCallback(() => {
    if (activeMenu) setActiveMenu(null)
  }, [activeMenu])

  const handlePanelClose = useCallback(() => {
    setActivePanelId(null)
    setCurrentAction(null)
    setSimPos(SIM_START)
  }, [])

  return (
    <div
      style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden', fontFamily: 'var(--font)' }}
      onClick={handleRoomClick}
    >
      {/* ── Room ─────────────────────────────── */}
      <div style={{
        position: 'absolute', inset: '0 0 70px 0',
        display: 'flex', flexDirection: 'column',
      }}>
        {/* Wall */}
        <div style={{
          flex: '0 0 62%',
          background: 'linear-gradient(180deg, #FFF9C4 0%, #FFFDE7 60%, #FFF8E1 100%)',
          position: 'relative',
          borderBottom: '6px solid #FFE0B2',
        }}>
          {/* Wall decoration: baseboard */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, height: 20,
            background: 'linear-gradient(180deg, #FFCC80, #FFB74D)',
            borderTop: '2px solid #FFA726',
          }} />
          {/* Wall trim top */}
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: 12,
            background: 'linear-gradient(180deg, #FFF176, #FFF9C4)',
          }} />

          {/* Computer desk surface */}
          <div style={{
            position: 'absolute', left: '52%', top: '28%',
            width: '22%', height: '8%',
            background: 'linear-gradient(180deg, #D7CCC8, #BCAAA4)',
            borderRadius: '4px 4px 0 0',
            border: '2px solid #A1887F',
            boxShadow: '0 4px 8px rgba(0,0,0,0.15)',
          }} />

          {/* Bookshelf surface */}
          <div style={{
            position: 'absolute', left: '1%', top: '26%',
            width: '15%', height: '50%',
            background: 'linear-gradient(180deg, #BCAAA4, #A1887F)',
            borderRadius: 6,
            border: '2px solid #8D6E63',
            boxShadow: '4px 0 12px rgba(0,0,0,0.1)',
          }}>
            {/* Shelf lines */}
            {[33, 66].map(p => (
              <div key={p} style={{
                position: 'absolute', top: `${p}%`, left: 0, right: 0, height: 3,
                background: '#8D6E63',
              }} />
            ))}
            {/* Little books */}
            {['#E91E63','#2196F3','#FF9800','#4CAF50','#9C27B0','#F44336'].map((c, i) => (
              <div key={i} style={{
                position: 'absolute',
                left: `${10 + (i % 3) * 28}%`, top: `${5 + Math.floor(i / 3) * 35}%`,
                width: '22%', height: '26%',
                background: c, borderRadius: 2,
              }} />
            ))}
          </div>
        </div>

        {/* Floor */}
        <div style={{
          flex: 1,
          background: 'repeating-linear-gradient(90deg, #FFCC80 0px, #FFCC80 58px, #FFB74D 58px, #FFB74D 60px)',
          position: 'relative',
        }}>
          {/* Floor reflection line */}
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: 2,
            background: 'rgba(255,255,255,0.4)',
          }} />
        </div>

        {/* Hotspot objects */}
        {hotspots.map(hotspot => (
          <HotspotObject
            key={hotspot.id}
            hotspot={hotspot}
            onHotspotClick={handleHotspotClick}
          />
        ))}

        {/* Sim character */}
        <SimCharacter
          pos={simPos}
          isMoving={isMoving}
          currentAction={currentAction}
          avatarFailed={avatarFailed}
          onAvatarError={() => setAvatarFailed(true)}
        />

        {/* Action menu */}
        <AnimatePresence>
          {activeMenu && (
            <ActionMenu
              key="action-menu"
              hotspot={activeMenu.hotspot}
              x={activeMenu.x}
              y={activeMenu.y}
              onAction={handleAction}
              onClose={() => setActiveMenu(null)}
            />
          )}
        </AnimatePresence>

        {/* Content panel */}
        <AnimatePresence>
          {activePanelId && (
            <ContentPanel
              key={activePanelId}
              panelId={activePanelId}
              onClose={handlePanelClose}
            />
          )}
        </AnimatePresence>
      </div>

      {/* ── Needs HUD ────────────────────────── */}
      <NeedsPanel
        needs={needs}
        boostedNeed={boostedNeed}
        currentAction={currentAction}
        avatarFailed={avatarFailed}
      />

      {/* ── Welcome overlay ──────────────────── */}
      <AnimatePresence>
        {welcome && <WelcomeOverlay key="welcome" onDismiss={() => setWelcome(false)} />}
      </AnimatePresence>
    </div>
  )
}
