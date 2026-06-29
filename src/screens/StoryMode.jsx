import { useState, useCallback } from 'react'
import DialogBox from '../components/DialogBox'
import { character } from '../data/angelina'

const BG_SCENES = [
  'radial-gradient(ellipse 70% 50% at 20% 80%, rgba(0,120,200,0.15) 0%, transparent 60%)',
  'radial-gradient(ellipse 70% 50% at 80% 20%, rgba(120,0,200,0.12) 0%, transparent 60%)',
  'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(0,200,180,0.10) 0%, transparent 60%)',
  'radial-gradient(ellipse 70% 50% at 30% 70%, rgba(0,200,80,0.10)  0%, transparent 60%)',
]

export default function StoryMode({ navigate }) {
  const [chapterIdx, setChapterIdx] = useState(0)
  const chapters = character.story

  const advance = useCallback(() => {
    if (chapterIdx < chapters.length - 1) {
      setChapterIdx(i => i + 1)
    } else {
      navigate('menu')
    }
  }, [chapterIdx, chapters.length, navigate])

  const chapter = chapters[chapterIdx]

  return (
    <div className="screen" style={{ background: 'var(--bg)', position: 'relative' }}>
      <div className="grid-bg" style={{ opacity: 0.2 }} />

      {/* Dynamic background gradient per chapter */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: BG_SCENES[chapterIdx],
        transition: 'background 1s ease',
        pointerEvents: 'none',
      }} />

      {/* Chapter number indicator (top right) */}
      <div style={{
        position: 'absolute',
        top: 20,
        right: 24,
        zIndex: 2,
        display: 'flex',
        gap: 8,
      }}>
        {chapters.map((_, i) => (
          <div key={i} style={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            background: i === chapterIdx ? 'var(--cyan)' : 'var(--border)',
            boxShadow: i === chapterIdx ? 'var(--glow-cyan)' : 'none',
            transition: 'all 0.3s',
          }} />
        ))}
      </div>

      {/* Back button */}
      <button
        className="btn-neon"
        onClick={() => navigate('menu')}
        style={{ position: 'absolute', top: 16, left: 20, zIndex: 5, fontSize: '0.6rem', padding: '6px 14px' }}
      >
        ← MENU
      </button>

      {/* Center ambient art */}
      <div style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'none',
        zIndex: 1,
      }}>
        <div style={{
          fontFamily: 'var(--font-head)',
          fontSize: 'clamp(4rem, 18vw, 12rem)',
          fontWeight: 900,
          color: 'rgba(255,255,255,0.012)',
          letterSpacing: '0.05em',
          userSelect: 'none',
          textAlign: 'center',
          lineHeight: 1,
        }}>
          {chapterIdx === 0 ? 'ORIGIN' :
           chapterIdx === 1 ? 'TRAIN' :
           chapterIdx === 2 ? 'GUILD' : 'LEA'}
        </div>
      </div>

      {/* Dialog box — self-positions at bottom, back button sits above it */}
      <DialogBox
        key={chapterIdx}
        chapter={chapter.chapter}
        text={chapter.text}
        onAdvance={advance}
        isLast={chapterIdx === chapters.length - 1}
      />
    </div>
  )
}
