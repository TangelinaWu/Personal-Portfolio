import { useEffect, useState, useCallback } from 'react'

export default function DialogBox({ chapter, text, onAdvance, isLast }) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    setDisplayed('')
    setDone(false)
    let i = 0
    const id = setInterval(() => {
      setDisplayed(text.slice(0, i + 1))
      i++
      if (i >= text.length) {
        clearInterval(id)
        setDone(true)
      }
    }, 28)
    return () => clearInterval(id)
  }, [text])

  const handleClick = useCallback(() => {
    if (!done) {
      setDisplayed(text)
      setDone(true)
    } else {
      onAdvance()
    }
  }, [done, text, onAdvance])

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Enter' || e.key === ' ') handleClick()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [handleClick])

  return (
    <div
      onClick={handleClick}
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 2,
        padding: '24px 28px 20px',
        background: 'rgba(8,8,20,0.92)',
        borderTop: '2px solid var(--cyan)',
        boxShadow: '0 -4px 40px rgba(0,245,255,0.12)',
        cursor: 'pointer',
        backdropFilter: 'blur(8px)',
        minHeight: '160px',
      }}
    >
      <div style={{
        fontFamily: 'var(--font-head)',
        fontSize: '0.6rem',
        letterSpacing: '0.2em',
        color: 'var(--gold)',
        textShadow: 'var(--glow-gold)',
        marginBottom: '12px',
        textTransform: 'uppercase',
      }}>
        ▶ {chapter}
      </div>

      <p style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.9rem',
        lineHeight: '1.7',
        color: 'var(--text)',
        minHeight: '60px',
      }}>
        {displayed}
        {!done && (
          <span style={{
            display: 'inline-block',
            width: '2px',
            height: '1em',
            background: 'var(--cyan)',
            verticalAlign: 'text-bottom',
            marginLeft: '2px',
            animation: 'blink 0.8s step-end infinite',
          }} />
        )}
      </p>

      {done && (
        <div style={{
          marginTop: '12px',
          fontFamily: 'var(--font-head)',
          fontSize: '0.55rem',
          letterSpacing: '0.18em',
          color: 'var(--cyan)',
          textAlign: 'right',
          animation: 'blink 1.2s step-end infinite',
        }}>
          {isLast ? '[ RETURN TO MENU ]' : '[ PRESS TO CONTINUE ▶ ]'}
        </div>
      )}
    </div>
  )
}
