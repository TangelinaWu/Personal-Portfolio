import { useEffect, useRef } from 'react'

// ─── Static data ─────────────────────────────────────────────────────────────

const experience = [
  {
    period: 'May 2026 — Present',
    role: 'Software Engineering Intern',
    company: 'Lea Technologies · New York City',
    desc: 'Designed and refined AI-powered data-extraction models for multiple $10B+ AUM wealth-management firms, hitting 100% accuracy on validated extraction benchmarks. Built internal admin dashboards for model monitoring and ran evaluation pipelines that iteratively improved accuracy and reliability.',
    stack: ['Python', 'Machine Learning', 'Model Eval', 'Dashboards'],
  },
  {
    period: 'Dec 2025 — May 2026',
    role: 'Full-Stack Engineering Intern',
    company: 'The Commons XR · San Diego',
    desc: 'Built a responsive React dashboard powered by Plotly.js that turned complex datasets into real-time visual insights. Architected scalable frontend state with Context + useReducer and client-side caching, integrated with secure Flask / BigQuery APIs for reliable data delivery.',
    stack: ['React', 'Plotly.js', 'Flask', 'BigQuery'],
  },
  {
    period: 'Aug 2025 — Present',
    role: 'Software Engineer Intern',
    company: 'Kodely.io · New York City',
    desc: 'Shipped education-management software used in 60+ schools running nationwide turn-key after-school programs. Maintained the full stack — React Native app, Node.js / TypeScript backend, PostgreSQL / Redis — for a staffing system connecting 300+ substitute teachers with real-time shift requests, availability, and curriculum updates.',
    stack: ['React Native', 'Node.js', 'TypeScript', 'PostgreSQL', 'Redis'],
  },
  {
    period: 'Jun — Aug 2024',
    role: 'Software Engineering Intern',
    company: 'UC Santa Cruz · Baskin School of Engineering',
    desc: 'Co-authored a working paper with a faculty mentor (Frontiers Research). Prototyped interactive systems in Unity (C#), instrumented telemetry surveys, and built a cooperative cooking game studying UX patterns among Latinx players — refined through usability testing and heuristic evaluation.',
    stack: ['Unity', 'C#', 'UX Research'],
  },
]

const projects = [
  {
    no: '01',
    name: 'CivicSpeech',
    tagline: 'presidential speech analytics',
    desc: "Scraped UVA's presidential speech archive with Selenium + BeautifulSoup, normalizing metadata into an SQLite3 schema, then ran 3,064+ audio recordings through an ASR speech-to-text pipeline. Computed readability features (Gunning Fog, lexical counts) and trained Random Forest, clustering, and regression models in scikit-learn to track text-complexity trends across administrations.",
    metric: '2nd Place · NYU Expo',
    tags: ['Python', 'scikit-learn', 'Selenium', 'NLP'],
    href: 'https://github.com/TangelinaWu',
  },
  {
    no: '02',
    name: 'Frame Her',
    tagline: 'semantic video search',
    desc: 'A vector-based retrieval engine that indexes video frames by visual content using OpenCLIP and Ultralytics object detection. Stores embeddings and frame samples in SQLite3 and performs cosine-similarity search for top-k frame retrieval.',
    metric: 'vector search',
    tags: ['Python', 'Flask', 'OpenCLIP', 'React'],
    href: 'https://github.com/TangelinaWu',
  },
]

const skillGroups = [
  { label: 'LANGUAGES', items: ['Python', 'Java', 'C++', 'C#', 'JavaScript', 'TypeScript', 'Swift', 'SQL'] },
  { label: 'FRAMEWORKS & FRONTEND', items: ['React', 'React Native (Expo)', 'Node / Express', 'Flask'] },
  { label: 'DATA & ML', items: ['scikit-learn', 'OpenCLIP', 'Ultralytics', 'BigQuery', 'Selenium', 'NLP'] },
  { label: 'DATABASES & TOOLS', items: ['PostgreSQL', 'SQLite3', 'MongoDB', 'Redis', 'Plotly.js', 'Unity'] },
]

const coursework = [
  'Data Structures', 'Algorithms', 'Computer Systems Organization',
  'OOP', 'Discrete Math', 'Statistics', 'Fundamentals of ML',
]

const NAV_LINKS = ['about', 'experience', 'projects', 'skills', 'leadership', 'research']

// ─── Inline style helpers ─────────────────────────────────────────────────────

const mono = { fontFamily: "'JetBrains Mono',monospace" }
const serif = { fontFamily: "'Instrument Serif',serif" }
const sans = { fontFamily: "'Space Grotesk',sans-serif" }

const chip = {
  ...mono,
  fontSize: '11.5px',
  padding: '5px 11px',
  border: '1px solid oklch(0.33 0.007 280)',
  borderRadius: '6px',
  color: 'oklch(0.72 0.02 255)',
}

const tagChip = {
  ...mono,
  fontSize: '11px',
  padding: '4px 9px',
  border: '1px solid oklch(0.33 0.007 280)',
  borderRadius: '6px',
  color: 'oklch(0.68 0.02 255)',
}

const largeChip = {
  fontSize: '14px',
  padding: '8px 14px',
  background: 'oklch(0.19 0.008 280)',
  border: '1px solid oklch(0.30 0.007 280 / 0.7)',
  borderRadius: '8px',
  color: 'oklch(0.86 0.012 250)',
}

const eyebrow = {
  ...mono,
  fontSize: '12px',
  letterSpacing: '0.1em',
  color: 'oklch(0.62 0.20 305)',
}

const sectionTitle = {
  ...serif,
  fontWeight: 400,
  fontSize: 'clamp(30px,4.5vw,58px)',
  margin: '14px 0 0',
  color: 'oklch(0.96 0.008 250)',
}

const timelineGrid = {
  display: 'grid',
  gridTemplateColumns: 'minmax(0,180px) 1fr',
  gap: 'clamp(16px,4vw,56px)',
}

const sectionPad = {
  scrollMarginTop: '80px',
  padding: 'clamp(80px,12vh,150px) clamp(20px,5vw,48px)',
  borderTop: '1px solid oklch(0.26 0.007 280 / 0.6)',
}

const inner = { maxWidth: '1180px', margin: '0 auto' }

const sectionHeader = { marginBottom: '54px' }

// ─── Component ───────────────────────────────────────────────────────────────

export default function Portfolio() {
  const rootRef = useRef(null)
  const canvasRef = useRef(null)
  const progressRef = useRef(null)
  const contentRef = useRef(null)
  const cursorRef = useRef(null)
  const cursorRingRef = useRef(null)
  const cursorLabelRef = useRef(null)
  const cursorDotRef = useRef(null)
  const marqueeRef = useRef(null)
  const marqueeTrackRef = useRef(null)

  // Hero canvas — twinkling star field, cursor-reactive
  useEffect(() => {
    const c = canvasRef.current
    if (!c) return
    const ctx = c.getContext('2d')
    const PURPLE = '160,90,220'
    let w = 0, h = 0, nodes = [], pulses = [], last = 0
    const mouse = { x: -9999, y: -9999, active: false }
    let rafId

    const drawStar = (cx, cy, outerR, innerR, points) => {
      const step = Math.PI / points
      ctx.beginPath()
      for (let i = 0; i < points * 2; i++) {
        const r = i % 2 === 0 ? outerR : innerR
        const angle = i * step - Math.PI / 2
        if (i === 0) ctx.moveTo(cx + r * Math.cos(angle), cy + r * Math.sin(angle))
        else ctx.lineTo(cx + r * Math.cos(angle), cy + r * Math.sin(angle))
      }
      ctx.closePath()
    }

    const build = () => {
      const count = Math.max(14, Math.min(42, Math.round(w * h / 20000)))
      nodes = []
      for (let i = 0; i < count; i++) {
        const speed = 0.02 + Math.random() * 0.04
        const angle = Math.random() * Math.PI * 2
        nodes.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          wobbleAmp: 0.1 + Math.random() * 0.15,
          wobbleSpeed: 0.0003 + Math.random() * 0.0005,
          wobblePhase: Math.random() * Math.PI * 2,
          size: 3 + Math.random() * 9,
          points: Math.random() < 0.55 ? 4 : 5,
          innerRatio: 0.30 + Math.random() * 0.25,
          twinklePhase: Math.random() * Math.PI * 2,
          twinkleSpeed: 0.0006 + Math.random() * 0.001,
          opacityBase: 0.18 + Math.random() * 0.18,
          opacityAmp: 0.06 + Math.random() * 0.08,
          scaleAmp: 0.04 + Math.random() * 0.08,
          color: PURPLE,
        })
      }
    }

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = c.clientWidth; h = c.clientHeight
      c.width = Math.max(1, w * dpr); c.height = Math.max(1, h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      build()
    }

    const getEdges = () => {
      const out = [], max = Math.min(w, h) * 0.28
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j]
          const d = Math.hypot(a.x - b.x, a.y - b.y)
          if (d < max) out.push([i, j, d / max])
        }
      }
      return out
    }

    const draw = (t) => {
      ctx.clearRect(0, 0, w, h)

      for (const n of nodes) {
        // wobble perpendicular to velocity direction
        const spd = Math.hypot(n.vx, n.vy)
        const px = spd > 0 ? -n.vy / spd : 0
        const py = spd > 0 ? n.vx / spd : 0
        const wobble = Math.sin(t * n.wobbleSpeed + n.wobblePhase) * n.wobbleAmp
        n.x += n.vx + px * wobble * 0.01
        n.y += n.vy + py * wobble * 0.01

        // cursor repulsion
        if (mouse.active) {
          const dx = n.x - mouse.x, dy = n.y - mouse.y
          const d2 = dx * dx + dy * dy
          const R = 160
          if (d2 < R * R && d2 > 0.01) {
            const d = Math.sqrt(d2)
            n.x += (dx / d) * (1 - d / R) * 2.6
            n.y += (dy / d) * (1 - d / R) * 2.6
          }
        }

        if (n.x < 0) { n.x = 0; n.vx *= -1 } else if (n.x > w) { n.x = w; n.vx *= -1 }
        if (n.y < 0) { n.y = 0; n.vy *= -1 } else if (n.y > h) { n.y = h; n.vy *= -1 }
      }

      // edges
      const es = getEdges()
      ctx.lineWidth = 0.7
      for (const [i, j, nd] of es) {
        ctx.strokeStyle = `rgba(${nodes[i].color},${(1 - nd) * 0.13})`
        ctx.beginPath(); ctx.moveTo(nodes[i].x, nodes[i].y); ctx.lineTo(nodes[j].x, nodes[j].y); ctx.stroke()
      }

      // cursor lines
      if (mouse.active) {
        for (const n of nodes) {
          const d = Math.hypot(n.x - mouse.x, n.y - mouse.y)
          if (d < 220) {
            ctx.strokeStyle = `rgba(${PURPLE},${(1 - d / 220) * 0.4})`
            ctx.lineWidth = 0.7
            ctx.beginPath(); ctx.moveTo(mouse.x, mouse.y); ctx.lineTo(n.x, n.y); ctx.stroke()
          }
        }
      }

      // pulses along edges
      if (t - last > 500 && es.length) {
        last = t
        const e = es[Math.floor(Math.random() * es.length)]
        pulses.push({ i: e[0], j: e[1], t: 0, sp: 0.010 + Math.random() * 0.008 })
        if (pulses.length > 14) pulses.shift()
      }
      for (const p of pulses) {
        p.t += p.sp
        const a = nodes[p.i], b = nodes[p.j]
        if (!a || !b) continue
        const px = a.x + (b.x - a.x) * p.t, py = a.y + (b.y - a.y) * p.t
        ctx.fillStyle = `rgba(${PURPLE},0.9)`
        ctx.beginPath(); ctx.arc(px, py, 2.2, 0, Math.PI * 2); ctx.fill()
      }
      pulses = pulses.filter(p => p.t < 1)

      // stars
      for (const n of nodes) {
        const contactDist = mouse.active ? Math.hypot(n.x - mouse.x, n.y - mouse.y) : Infinity
        const inContact = contactDist < n.size * 3 + 18

        const opacity = inContact
          ? 0.95
          : Math.max(0.06, Math.min(0.6, n.opacityBase + n.opacityAmp * Math.sin(t * n.twinkleSpeed + n.twinklePhase)))
        const scale = inContact
          ? 1.6
          : 1 + n.scaleAmp * Math.sin(t * n.twinkleSpeed * 1.4 + n.twinklePhase + 1.3)
        const outerR = n.size * scale
        const innerR = outerR * n.innerRatio

        // soft glow halo
        const glowR = outerR * (inContact ? 5 : 2.8)
        const grd = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, glowR)
        grd.addColorStop(0, `rgba(${n.color},${opacity * (inContact ? 0.45 : 0.12)})`)
        grd.addColorStop(1, `rgba(${n.color},0)`)
        ctx.fillStyle = grd
        ctx.beginPath(); ctx.arc(n.x, n.y, glowR, 0, Math.PI * 2); ctx.fill()

        // contact ring
        if (inContact) {
          ctx.strokeStyle = `rgba(${PURPLE},0.6)`
          ctx.lineWidth = 1
          ctx.beginPath(); ctx.arc(n.x, n.y, outerR * 2.2, 0, Math.PI * 2); ctx.stroke()
        }

        // star body
        ctx.shadowBlur = inContact ? outerR * 3.5 : outerR * 1.2
        ctx.shadowColor = `rgba(${n.color},${opacity * (inContact ? 1 : 0.5)})`
        ctx.fillStyle = `rgba(${n.color},${opacity})`
        drawStar(n.x, n.y, outerR, innerR, n.points)
        ctx.fill()
        ctx.shadowBlur = 0
      }

      rafId = requestAnimationFrame(draw)
    }

    resize()
    window.addEventListener('resize', resize)
    // Canvas is fixed full-screen with pointer-events:none, so track mouse on window
    const onMove = (e) => { mouse.x = e.clientX; mouse.y = e.clientY; mouse.active = true }
    const onLeave = () => { mouse.active = false }
    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseleave', onLeave)
    rafId = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  // Scroll reveal
  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const els = Array.from(root.querySelectorAll('[data-reveal]'))
    els.forEach(el => {
      el.style.opacity = '0'
      el.style.transform = 'translateY(28px)'
      el.style.transition = 'opacity .9s cubic-bezier(.2,.7,.2,1), transform .9s cubic-bezier(.2,.7,.2,1)'
    })
    const io = new IntersectionObserver((ents) => {
      ents.forEach(e => {
        if (e.isIntersecting) {
          const el = e.target
          const d = el.getAttribute('data-delay') || 0
          el.style.transitionDelay = d + 'ms'
          el.style.opacity = '1'
          el.style.transform = 'none'
          io.unobserve(el)
        }
      })
    }, { threshold: 0.14 })
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])

  // Active nav highlight
  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const links = Array.from(root.querySelectorAll('[data-navlink]'))
    const map = {}
    links.forEach(l => { map[l.getAttribute('data-navlink')] = l })
    const io = new IntersectionObserver((ents) => {
      ents.forEach(e => {
        if (e.isIntersecting) {
          links.forEach(l => { l.style.color = 'oklch(0.66 0.02 255)' })
          const a = map[e.target.id]
          if (a) a.style.color = 'oklch(0.80 0.14 255)'
        }
      })
    }, { rootMargin: '-45% 0px -50% 0px' })
    root.querySelectorAll('section[id]').forEach(s => io.observe(s))
    return () => io.disconnect()
  }, [])

  // Scroll progress bar
  useEffect(() => {
    const bar = progressRef.current
    if (!bar) return
    const update = () => {
      const dh = document.documentElement.scrollHeight - window.innerHeight
      bar.style.width = (dh > 0 ? (window.scrollY / dh * 100) : 0) + '%'
    }
    window.addEventListener('scroll', update, { passive: true })
    update()
    return () => window.removeEventListener('scroll', update)
  }, [])

  // Custom cursor (pointer:fine only)
  useEffect(() => {
    if (!window.matchMedia('(pointer:fine)').matches) return
    const ring = cursorRef.current, dot = cursorDotRef.current
    const ringBox = cursorRingRef.current, label = cursorLabelRef.current
    if (!ring || !dot) return

    document.body.style.cursor = 'none'
    let mx = window.innerWidth / 2, my = window.innerHeight / 2
    let rx = mx, ry = my, rafId

    const move = (e) => {
      mx = e.clientX; my = e.clientY
      dot.style.transform = `translate(${mx}px,${my}px) translate(-50%,-50%)`
    }
    window.addEventListener('mousemove', move)

    const loop = () => {
      rx += (mx - rx) * 0.18; ry += (my - ry) * 0.18
      ring.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%)`
      rafId = requestAnimationFrame(loop)
    }
    rafId = requestAnimationFrame(loop)

    const root = rootRef.current
    if (root) {
      const enter = (el) => {
        const lbl = el.getAttribute('data-cursor')
        if (lbl) {
          label.textContent = lbl; label.style.opacity = '1'
          ringBox.style.width = '64px'; ringBox.style.height = '64px'
          ringBox.style.background = 'rgba(255,255,255,0.96)'
        } else {
          ringBox.style.width = '52px'; ringBox.style.height = '52px'
          ringBox.style.background = 'transparent'
        }
      }
      const leave = () => {
        label.style.opacity = '0'
        ringBox.style.width = '34px'; ringBox.style.height = '34px'
        ringBox.style.background = 'transparent'
      }
      root.querySelectorAll('a,button,[data-cursor],[data-tilt],[data-magnetic]').forEach(el => {
        el.addEventListener('mouseenter', () => enter(el))
        el.addEventListener('mouseleave', leave)
      })
    }

    const hide = () => { ring.style.opacity = '0'; dot.style.opacity = '0' }
    const show = () => { ring.style.opacity = '1'; dot.style.opacity = '1' }
    document.addEventListener('mouseleave', hide)
    document.addEventListener('mouseenter', show)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('mousemove', move)
      document.removeEventListener('mouseleave', hide)
      document.removeEventListener('mouseenter', show)
      document.body.style.cursor = ''
    }
  }, [])

  // Magnetic buttons (pointer:fine only)
  useEffect(() => {
    if (!window.matchMedia('(pointer:fine)').matches) return
    const root = rootRef.current
    if (!root) return
    const cleanups = []
    root.querySelectorAll('[data-magnetic]').forEach(el => {
      const onMove = (e) => {
        const r = el.getBoundingClientRect()
        const x = e.clientX - (r.left + r.width / 2)
        const y = e.clientY - (r.top + r.height / 2)
        el.style.transition = 'transform .1s ease-out'
        el.style.transform = `translate(${x * 0.4}px,${y * 0.4}px)`
      }
      const onLeave = () => {
        el.style.transition = 'transform .45s cubic-bezier(.2,.8,.2,1)'
        el.style.transform = 'translate(0,0)'
      }
      el.addEventListener('mousemove', onMove)
      el.addEventListener('mouseleave', onLeave)
      cleanups.push(() => {
        el.removeEventListener('mousemove', onMove)
        el.removeEventListener('mouseleave', onLeave)
      })
    })
    return () => cleanups.forEach(fn => fn())
  }, [])

  // 3D tilt cards (pointer:fine only)
  useEffect(() => {
    if (!window.matchMedia('(pointer:fine)').matches) return
    const root = rootRef.current
    if (!root) return
    const cleanups = []
    root.querySelectorAll('[data-tilt]').forEach(el => {
      const onMove = (e) => {
        const r = el.getBoundingClientRect()
        const px = (e.clientX - r.left) / r.width - 0.5
        const py = (e.clientY - r.top) / r.height - 0.5
        el.style.transition = 'transform .12s ease-out'
        el.style.transform = `perspective(900px) rotateY(${px * 9}deg) rotateX(${-py * 9}deg) translateY(-6px) scale(1.015)`
      }
      const onLeave = () => {
        el.style.transition = 'transform .5s cubic-bezier(.2,.8,.2,1)'
        el.style.transform = 'perspective(900px) rotateY(0) rotateX(0) translateY(0) scale(1)'
      }
      el.addEventListener('mousemove', onMove)
      el.addEventListener('mouseleave', onLeave)
      cleanups.push(() => {
        el.removeEventListener('mousemove', onMove)
        el.removeEventListener('mouseleave', onLeave)
      })
    })
    return () => cleanups.forEach(fn => fn())
  }, [])

  // Kinetic marquee with scroll coupling and drag
  useEffect(() => {
    const track = marqueeTrackRef.current, wrap = marqueeRef.current
    if (!track || !wrap) return

    if (!track.getAttribute('data-duped')) {
      track.innerHTML += track.innerHTML
      track.setAttribute('data-duped', '1')
    }

    let half = track.scrollWidth / 2
    let x = 0, base = 0.6, vel = base, dragging = false, lastDragX = 0
    let idleTimer = 0, rafId

    const ro = new ResizeObserver(() => { half = track.scrollWidth / 2 })
    ro.observe(track)

    const loop = () => {
      if (!dragging) vel += (base - vel) * 0.04
      x -= vel
      if (x <= -half) x += half
      if (x > 0) x -= half
      track.style.transform = `translateX(${x}px)`
      rafId = requestAnimationFrame(loop)
    }
    rafId = requestAnimationFrame(loop)

    let lastScroll = window.scrollY
    const onScroll = () => {
      const dy = window.scrollY - lastScroll; lastScroll = window.scrollY
      vel = Math.max(-6, Math.min(6, base + dy * 0.25))
      clearTimeout(idleTimer)
      idleTimer = setTimeout(() => { vel = base }, 120)
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    const down = (e) => {
      dragging = true
      lastDragX = e.touches ? e.touches[0].clientX : e.clientX
      wrap.style.cursor = 'grabbing'
    }
    const moveD = (e) => {
      if (!dragging) return
      const cx = e.touches ? e.touches[0].clientX : e.clientX
      const d = cx - lastDragX; lastDragX = cx
      x += d; vel = -d * 0.5
    }
    const up = () => { dragging = false; wrap.style.cursor = 'grab' }

    wrap.addEventListener('mousedown', down)
    window.addEventListener('mousemove', moveD)
    window.addEventListener('mouseup', up)
    wrap.addEventListener('touchstart', down, { passive: true })
    wrap.addEventListener('touchmove', moveD, { passive: true })
    wrap.addEventListener('touchend', up)

    return () => {
      cancelAnimationFrame(rafId)
      clearTimeout(idleTimer)
      ro.disconnect()
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('mousemove', moveD)
      window.removeEventListener('mouseup', up)
    }
  }, [])


  // Smooth slow scroll (wheel only — touch/keyboard unaffected)
  useEffect(() => {
    let target = window.scrollY
    let current = window.scrollY
    let rafId = null

    const tick = () => {
      current += (target - current) * 0.08
      window.scrollTo(0, current)
      if (Math.abs(target - current) > 0.5) {
        rafId = requestAnimationFrame(tick)
      } else {
        window.scrollTo(0, target)
        rafId = null
      }
    }

    const onWheel = (e) => {
      e.preventDefault()
      const max = document.documentElement.scrollHeight - window.innerHeight
      target = Math.max(0, Math.min(max, target + e.deltaY * 0.28))
      if (!rafId) rafId = requestAnimationFrame(tick)
    }

    window.addEventListener('wheel', onWheel, { passive: false })
    return () => {
      window.removeEventListener('wheel', onWheel)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  // ─── Render ──────────────────────────────────────────────────────────────────

  return (
    <div ref={rootRef} style={{ position: 'relative', overflowX: 'hidden' }}>

      {/* Fixed star canvas — persists behind all content while scrolling */}
      <canvas ref={canvasRef} style={{
        position: 'fixed', inset: 0, width: '100%', height: '100%',
        display: 'block', zIndex: 0, pointerEvents: 'none',
      }} />

      {/* Scroll progress bar */}
      <div ref={progressRef} style={{
        position: 'fixed', top: 0, left: 0, height: '2px', width: '0%',
        background: 'oklch(0.63 0.18 255)', zIndex: 100,
      }} />

      {/* Custom cursor ring */}
      <div ref={cursorRef} style={{
        position: 'fixed', top: 0, left: 0, zIndex: 130, pointerEvents: 'none',
        transform: 'translate(-50%,-50%)', mixBlendMode: 'difference', willChange: 'transform',
      }}>
        <div ref={cursorRingRef} style={{
          width: '34px', height: '34px', border: '1.5px solid #fff', borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'width .3s cubic-bezier(.2,.7,.2,1), height .3s cubic-bezier(.2,.7,.2,1), background .3s',
        }}>
          <span ref={cursorLabelRef} style={{
            ...mono, fontSize: '9px', letterSpacing: '0.08em', color: '#000',
            opacity: 0, transition: 'opacity .2s', whiteSpace: 'nowrap',
          }}>VIEW</span>
        </div>
      </div>
      {/* Cursor dot */}
      <div ref={cursorDotRef} style={{
        position: 'fixed', top: 0, left: 0, zIndex: 131, width: '5px', height: '5px',
        borderRadius: '50%', background: '#fff', pointerEvents: 'none',
        transform: 'translate(-50%,-50%)', mixBlendMode: 'difference', willChange: 'transform',
      }} />

      {/* ── Sticky nav ─────────────────────────────── */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 90,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '24px',
        padding: '0 clamp(20px,5vw,48px)', height: '66px',
        background: 'oklch(0.13 0.008 280 / 0.72)', backdropFilter: 'blur(14px)',
        borderBottom: '1px solid oklch(0.27 0.025 262 / 0.7)',
      }}>
        <a href="#home" style={{ display: 'flex', alignItems: 'baseline', gap: '10px', flexShrink: 0 }}>
          <span style={{ ...mono, fontWeight: 500, fontSize: '15px', letterSpacing: '0.06em', color: 'oklch(0.95 0.01 250)' }}>AW</span>
          <span style={{ ...mono, fontSize: '11px', letterSpacing: '0.08em', color: 'oklch(0.62 0.02 255)' }}>/ swe · full-stack &amp; ml</span>
        </a>
        <div className="nav-links" style={{
          display: 'flex', alignItems: 'center', gap: 'clamp(14px,2.2vw,30px)',
          overflowX: 'auto', scrollbarWidth: 'none', whiteSpace: 'nowrap',
        }}>
          {NAV_LINKS.map(id => (
            <a key={id} href={`#${id}`} data-navlink={id} style={{
              ...mono, fontSize: '12px', letterSpacing: '0.04em',
              color: 'oklch(0.66 0.02 255)', transition: 'color .25s', textTransform: 'capitalize',
            }}>
              {id.charAt(0).toUpperCase() + id.slice(1)}
            </a>
          ))}
          <a href="#contact" style={{
            ...mono, fontSize: '12px', letterSpacing: '0.04em',
            color: 'oklch(0.14 0.008 280)', background: 'oklch(0.63 0.18 255)',
            padding: '7px 15px', borderRadius: '999px',
          }}>Contact</a>
        </div>
      </nav>

      <div ref={contentRef} style={{ position: 'relative', zIndex: 1 }}>

        {/* ── Hero ─────────────────────────────────── */}
        <section id="home" style={{
          position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center',
          padding: '90px clamp(20px,5vw,48px) 60px',
        }}>
          <div style={{
            position: 'absolute', inset: 0,
            background: 'radial-gradient(ellipse 90% 60% at 70% 40%, transparent, oklch(0.14 0.008 280) 78%)',
          }} />
          <div style={{ position: 'relative', maxWidth: '1180px', margin: '0 auto', width: '100%' }}>

            {/* Status pill */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '9px',
              padding: '7px 14px', border: '1px solid oklch(0.33 0.007 280)',
              borderRadius: '999px', background: 'oklch(0.19 0.008 280 / 0.6)', marginBottom: '34px',
            }}>
              <span style={{
                width: '7px', height: '7px', borderRadius: '50%',
                background: 'oklch(0.63 0.18 255)', animation: 'blink 1.8s infinite',
              }} />
              <span style={{ ...mono, fontSize: '11.5px', letterSpacing: '0.06em', color: 'oklch(0.74 0.02 255)' }}>
                OPEN TO SWE INTERNSHIPS &amp; NEW-GRAD ROLES
              </span>
            </div>

            {/* Name */}
            <h1 style={{
              ...serif, fontWeight: 400, fontSize: 'clamp(52px,9vw,128px)',
              lineHeight: 0.95, letterSpacing: '-0.01em', margin: '0 0 22px', color: 'oklch(0.97 0.008 250)',
            }}>
              Angelina Wu
            </h1>

            {/* Tagline */}
            <p style={{
              ...sans, fontWeight: 300, fontSize: 'clamp(19px,2.6vw,30px)',
              lineHeight: 1.4, maxWidth: '680px', margin: '0 0 14px', color: 'oklch(0.82 0.015 252)',
            }}>
              I&apos;m a CS &amp; Economics student at NYU building across the stack — from{' '}
              <span style={{ ...serif, fontStyle: 'italic', color: 'oklch(0.62 0.20 305)' }}>AI data-extraction models</span>
              {' '}for $10B+ wealth firms to education software running in 60+ schools.
            </p>

            {/* Sub-line */}
            <p style={{ ...mono, fontSize: '13px', letterSpacing: '0.03em', color: 'oklch(0.60 0.02 255)', margin: '0 0 42px' }}>
              Software Engineer &nbsp;·&nbsp; Full-Stack &amp; Applied ML &nbsp;·&nbsp; New York City
            </p>

            {/* CTAs */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', alignItems: 'center' }}>
              <a href="#projects" data-magnetic data-cursor="GO"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '10px',
                  padding: '14px 26px', background: 'oklch(0.63 0.18 255)',
                  color: 'oklch(0.13 0.008 280)', borderRadius: '999px',
                  fontWeight: 500, fontSize: '15px', transition: 'box-shadow .25s', willChange: 'transform',
                }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 12px 30px oklch(0.55 0.17 255 / 0.4)' }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none' }}
              >
                View selected work &nbsp;→
              </a>
              <a href="/Angelina-Wu-Resume.pdf" download data-magnetic
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '10px',
                  padding: '14px 26px', border: '1px solid oklch(0.37 0.007 280)',
                  color: 'oklch(0.90 0.012 250)', borderRadius: '999px',
                  fontWeight: 500, fontSize: '15px', ...sans,
                  transition: 'background .25s, border-color .25s', willChange: 'transform',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'oklch(0.215 0.008 280)'; e.currentTarget.style.borderColor = 'oklch(0.52 0.008 280)' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'oklch(0.37 0.007 280)' }}
              >
                ↓ Résumé
              </a>
            </div>
          </div>

        </section>

        {/* ── About ────────────────────────────────── */}
        <section id="about" style={sectionPad}>
          <div style={inner}>
            <div data-reveal style={sectionHeader}>
              <span style={eyebrow}>01 — ABOUT</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 'clamp(36px,6vw,90px)', alignItems: 'start' }}>
              <div data-reveal>
                <h2 style={{ ...serif, fontWeight: 400, fontSize: 'clamp(30px,4vw,52px)', lineHeight: 1.1, margin: '0 0 26px', color: 'oklch(0.96 0.008 250)' }}>
                  I build software that turns messy data into things people actually use.
                </h2>
                <p style={{ fontSize: '17px', lineHeight: 1.7, color: 'oklch(0.78 0.015 252)', margin: '0 0 20px', fontWeight: 300 }}>
                  I&apos;m a junior at NYU studying computer science and economics, and I&apos;ve spent the last two years interning across the stack — training AI models that extract data for multi-billion-dollar wealth firms, shipping ed-tech used in dozens of schools, and turning raw datasets into real-time dashboards.
                </p>
                <p style={{ fontSize: '17px', lineHeight: 1.7, color: 'oklch(0.78 0.015 252)', margin: '0 0 26px', fontWeight: 300 }}>
                  I&apos;m equally at home in a Jupyter notebook tuning a model and in a React Native codebase wiring up a mobile app. I care about the details that make software trustworthy — accuracy, reliability, and an interface people don&apos;t have to think about. Outside class I lead the Google Developer Group at NYU.
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {['Python', 'TypeScript', 'React', 'Machine Learning', 'SQL', 'Node.js'].map(tech => (
                    <span key={tech} style={chip}>{tech}</span>
                  ))}
                </div>
              </div>
              <div data-reveal data-delay="120" style={{
                display: 'flex', flexDirection: 'column', gap: '1px',
                background: 'oklch(0.28 0.007 280 / 0.5)', border: '1px solid oklch(0.28 0.007 280 / 0.5)',
                borderRadius: '14px', overflow: 'hidden',
              }}>
                {[
                  { label: 'FOCUS', value: 'Full-Stack & Applied ML', color: 'oklch(0.90 0.012 250)' },
                  { label: 'EDUCATION', value: "NYU · CS & Econ '27", color: 'oklch(0.90 0.012 250)' },
                  { label: 'LOCATION', value: 'New York City', color: 'oklch(0.90 0.012 250)' },
                  { label: 'CURRENTLY', value: '@ Lea Technologies', color: 'oklch(0.63 0.18 255)' },
                ].map(row => (
                  <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '18px 22px', background: 'oklch(0.175 0.008 280)' }}>
                    <span style={{ ...mono, fontSize: '12px', color: 'oklch(0.60 0.02 255)' }}>{row.label}</span>
                    <span style={{ fontSize: '14px', color: row.color }}>{row.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Experience ───────────────────────────── */}
        <section id="experience" style={sectionPad}>
          <div style={inner}>
            <div data-reveal style={sectionHeader}>
              <span style={eyebrow}>02 — EXPERIENCE</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {experience.map((job, i) => (
                <div key={i} data-reveal style={{ ...timelineGrid, padding: '34px 0', borderTop: '1px solid oklch(0.28 0.007 280 / 0.6)' }}>
                  <div style={{ ...mono, fontSize: '13px', color: 'oklch(0.58 0.02 255)', paddingTop: '5px' }}>{job.period}</div>
                  <div>
                    <h3 style={{ fontSize: 'clamp(20px,2.5vw,26px)', fontWeight: 500, margin: '0 0 4px', color: 'oklch(0.95 0.01 250)' }}>{job.role}</h3>
                    <div style={{ ...mono, fontSize: '13px', color: 'oklch(0.63 0.18 255)', marginBottom: '16px' }}>{job.company}</div>
                    <p style={{ fontSize: '16px', lineHeight: 1.65, color: 'oklch(0.76 0.015 252)', margin: '0 0 18px', fontWeight: 300, maxWidth: '680px' }}>{job.desc}</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      {job.stack.map(tech => <span key={tech} style={chip}>{tech}</span>)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Projects ─────────────────────────────── */}
        <section id="projects" style={sectionPad}>
          <div style={inner}>
            <div data-reveal style={sectionHeader}>
              <span style={eyebrow}>03 — SELECTED WORK</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(290px,1fr))', gap: '22px' }}>
              {projects.map(p => (
                <a key={p.no} href={p.href} data-reveal data-tilt data-cursor="VIEW"
                  style={{
                    display: 'flex', flexDirection: 'column', padding: '30px',
                    background: 'oklch(0.175 0.008 280)', border: '1px solid oklch(0.28 0.007 280 / 0.7)',
                    borderRadius: '16px', transition: 'border-color .3s, background .3s',
                    height: '100%', transformStyle: 'preserve-3d', willChange: 'transform',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'oklch(0.55 0.16 255)'; e.currentTarget.style.background = 'oklch(0.205 0.008 280)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'oklch(0.28 0.007 280 / 0.7)'; e.currentTarget.style.background = 'oklch(0.175 0.008 280)' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                    <span style={{ ...mono, fontSize: '12px', color: 'oklch(0.50 0.02 255)' }}>{p.no}</span>
                    <span style={{ ...mono, fontSize: '11.5px', padding: '5px 11px', borderRadius: '999px', background: 'oklch(0.63 0.18 255 / 0.16)', color: 'oklch(0.63 0.18 255)' }}>{p.metric}</span>
                  </div>
                  <h3 style={{ ...mono, fontSize: '21px', fontWeight: 500, margin: '0 0 6px', color: 'oklch(0.96 0.01 250)' }}>{p.name}</h3>
                  <div style={{ ...serif, fontStyle: 'italic', fontSize: '18px', color: 'oklch(0.66 0.14 305)', marginBottom: '14px' }}>{p.tagline}</div>
                  <p style={{ fontSize: '15px', lineHeight: 1.6, color: 'oklch(0.74 0.015 252)', margin: '0 0 22px', fontWeight: 300, flex: 1 }}>{p.desc}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '7px', marginBottom: '20px' }}>
                    {p.tags.map(tag => <span key={tag} style={tagChip}>{tag}</span>)}
                  </div>
                  <div style={{ ...mono, fontSize: '13px', color: 'oklch(0.63 0.18 255)', display: 'flex', alignItems: 'center', gap: '6px', marginTop: 'auto' }}>
                    View on GitHub ↗
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ── Skills ───────────────────────────────── */}
        <section id="skills" style={sectionPad}>
          <div style={inner}>
            <div data-reveal style={sectionHeader}>
              <span style={eyebrow}>04 — TOOLKIT</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: '34px 48px' }}>
              {skillGroups.map(g => (
                <div key={g.label} data-reveal>
                  <div style={{ ...mono, fontSize: '12px', letterSpacing: '0.06em', color: 'oklch(0.60 0.02 255)', paddingBottom: '14px', marginBottom: '18px', borderBottom: '1px solid oklch(0.28 0.007 280 / 0.7)' }}>
                    {g.label}
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '9px' }}>
                    {g.items.map(s => (
                      <span key={s} style={{ ...largeChip, transition: 'border-color .25s, color .25s', cursor: 'default' }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = 'oklch(0.58 0.16 255)'; e.currentTarget.style.color = 'oklch(0.80 0.14 255)' }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = 'oklch(0.30 0.007 280 / 0.7)'; e.currentTarget.style.color = 'oklch(0.86 0.012 250)' }}
                      >{s}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Leadership ───────────────────────────── */}
        <section id="leadership" style={sectionPad}>
          <div style={inner}>
            <div data-reveal style={sectionHeader}>
              <span style={eyebrow}>05 — LEADERSHIP</span>
            </div>
            <div data-reveal style={{ ...timelineGrid, padding: '34px 0', borderTop: '1px solid oklch(0.28 0.007 280 / 0.6)' }}>
              <div style={{ ...mono, fontSize: '13px', color: 'oklch(0.58 0.02 255)', paddingTop: '5px' }}>Feb 2025 — Present</div>
              <div>
                <h3 style={{ fontSize: 'clamp(20px,2.5vw,26px)', fontWeight: 500, margin: '0 0 4px', color: 'oklch(0.95 0.01 250)' }}>Tech Lead</h3>
                <div style={{ ...mono, fontSize: '13px', color: 'oklch(0.63 0.18 255)', marginBottom: '16px' }}>Google Developer Group @ NYU</div>
                <p style={{ fontSize: '16px', lineHeight: 1.65, color: 'oklch(0.76 0.015 252)', margin: 0, fontWeight: 300, maxWidth: '680px' }}>
                  Mentor a 5-person board building an AI investor–startup matching platform — owning code reviews, sprint planning, and demo readiness. Run hands-on sessions on LLM patterns, applied ML, and API integration, and maintain starter repos that accelerate project setup.
                </p>
              </div>
            </div>
            <div data-reveal style={{ marginTop: '44px' }}>
              <div style={{ ...mono, fontSize: '12px', letterSpacing: '0.06em', color: 'oklch(0.60 0.02 255)', paddingBottom: '14px', marginBottom: '18px', borderBottom: '1px solid oklch(0.28 0.007 280 / 0.7)' }}>
                AFFILIATIONS &amp; ORGANIZATIONS
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '9px' }}>
                {['Joint Honors Program', 'Smart Woman Securities', 'Society of Women Engineers', 'Model United Nations', 'Hemmes Engineering & Research Society'].map(org => (
                  <span key={org} style={largeChip}>{org}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Education ────────────────────────────── */}
        <section id="education" style={sectionPad}>
          <div style={inner}>
            <div data-reveal style={sectionHeader}>
              <span style={eyebrow}>06 — EDUCATION</span>
            </div>
            <div data-reveal style={{ ...timelineGrid, paddingTop: '8px' }}>
              <div style={{ ...mono, fontSize: '13px', color: 'oklch(0.58 0.02 255)' }}>Expected May 2027</div>
              <div>
                <h3 style={{ ...serif, fontWeight: 400, fontSize: 'clamp(26px,3.5vw,40px)', margin: '0 0 6px', color: 'oklch(0.96 0.008 250)' }}>
                  B.S. Computer Science &amp; Economics
                </h3>
                <div style={{ ...mono, fontSize: '14px', color: 'oklch(0.63 0.18 255)', marginBottom: '18px' }}>
                  New York University · Joint Honors Program · GPA 3.8
                </div>
                <p style={{ fontSize: '16px', lineHeight: 1.65, color: 'oklch(0.76 0.015 252)', margin: '0 0 18px', fontWeight: 300, maxWidth: '680px' }}>
                  A joint-honors degree spanning computer science and economics, with coursework across systems, algorithms, and machine learning. Tech Lead of the Google Developer Group and active in Society of Women Engineers and Smart Woman Securities.
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {coursework.map(c => <span key={c} style={chip}>{c}</span>)}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Research ─────────────────────────────── */}
        <section id="research" style={sectionPad}>
          <div style={inner}>
            <div data-reveal style={sectionHeader}>
              <span style={eyebrow}>07 — RESEARCH</span>
              <h2 style={sectionTitle}>Selected research</h2>
            </div>
            <div data-reveal style={{ ...timelineGrid, padding: '34px 0', borderTop: '1px solid oklch(0.28 0.007 280 / 0.6)' }}>
              <div style={{ ...mono, fontSize: '13px', color: 'oklch(0.58 0.02 255)', paddingTop: '5px' }}>2024 · Frontiers</div>
              <div>
                <h3 style={{ fontSize: 'clamp(20px,2.5vw,26px)', fontWeight: 500, margin: '0 0 4px', color: 'oklch(0.95 0.01 250)' }}>
                  UX Patterns of Acculturative Behavior in Cooperative Play
                </h3>
                <div style={{ ...mono, fontSize: '13px', color: 'oklch(0.63 0.18 255)', marginBottom: '16px' }}>UC Santa Cruz · Baskin School of Engineering</div>
                <p style={{ fontSize: '16px', lineHeight: 1.65, color: 'oklch(0.76 0.015 252)', margin: '0 0 18px', fontWeight: 300, maxWidth: '680px' }}>
                  Co-authored a working paper with a faculty mentor (Frontiers Research). Prototyped interactive systems in Unity (C#), instrumented telemetry surveys, and built a cooperative cooking game to study machismo dynamics and acculturative behavior among Latinx players — iterating through usability testing and heuristic evaluation.
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {['Unity', 'C#', 'UX Research', 'Telemetry'].map(t => <span key={t} style={chip}>{t}</span>)}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Contact ──────────────────────────────── */}
        <section id="contact" style={{
          ...sectionPad,
          padding: 'clamp(90px,14vh,170px) clamp(20px,5vw,48px)',
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 60% 80% at 50% 120%, oklch(0.45 0.22 305 / 0.30), transparent 70%)' }} />
          <div style={{ ...inner, position: 'relative', textAlign: 'center' }}>
            <div data-reveal>
              <span style={eyebrow}>08 — CONTACT</span>
              <h2 style={{ ...serif, fontWeight: 400, fontSize: 'clamp(40px,7vw,92px)', lineHeight: 1.02, margin: '20px 0 18px', color: 'oklch(0.97 0.008 250)' }}>
                Get in touch
              </h2>
              <p style={{ ...mono, fontSize: '13px', letterSpacing: '0.03em', color: 'oklch(0.60 0.02 255)', margin: '0 0 30px' }}>
                Open to Summer 2027 SWE internships &amp; new-grad opportunities
              </p>
              <a href="mailto:aw5287@nyu.edu"
                style={{ display: 'inline-block', ...serif, fontSize: 'clamp(22px,3.5vw,38px)', color: 'oklch(0.90 0.012 250)', borderBottom: '1px solid oklch(0.40 0.008 280)', paddingBottom: '5px', transition: 'color .25s, border-color .25s' }}
                onMouseEnter={e => { e.currentTarget.style.color = 'oklch(0.63 0.18 255)'; e.currentTarget.style.borderColor = 'oklch(0.63 0.18 255)' }}
                onMouseLeave={e => { e.currentTarget.style.color = 'oklch(0.90 0.012 250)'; e.currentTarget.style.borderColor = 'oklch(0.40 0.008 280)' }}
              >
                aw5287@nyu.edu
              </a>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', justifyContent: 'center', marginTop: '44px' }}>
                <a href="/Angelina-Wu-Resume.pdf" download data-magnetic
                  style={{ padding: '14px 26px', background: 'oklch(0.63 0.18 255)', color: 'oklch(0.13 0.008 280)', borderRadius: '999px', fontWeight: 500, fontSize: '15px', willChange: 'transform' }}>
                  ↓ Download Résumé
                </a>
                <a href="https://github.com/TangelinaWu" data-magnetic
                  style={{ padding: '14px 26px', border: '1px solid oklch(0.37 0.007 280)', borderRadius: '999px', fontWeight: 500, fontSize: '15px', color: 'oklch(0.90 0.012 250)', transition: 'background .25s', willChange: 'transform' }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'oklch(0.215 0.008 280)' }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}
                >
                  GitHub
                </a>
                <a href="https://linkedin.com/in/angelina-wu-nyu" data-magnetic
                  style={{ padding: '14px 26px', border: '1px solid oklch(0.37 0.007 280)', borderRadius: '999px', fontWeight: 500, fontSize: '15px', color: 'oklch(0.90 0.012 250)', transition: 'background .25s', willChange: 'transform' }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'oklch(0.215 0.008 280)' }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── Footer ───────────────────────────────── */}
        <footer style={{
          padding: '34px clamp(20px,5vw,48px)',
          borderTop: '1px solid oklch(0.26 0.007 280 / 0.6)',
          display: 'flex', flexWrap: 'wrap', gap: '14px', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <span style={{ ...mono, fontSize: '12px', color: 'oklch(0.52 0.02 255)' }}>© 2026 Angelina Wu</span>
          <span style={{ ...mono, fontSize: '12px', color: 'oklch(0.52 0.02 255)' }}>Designed &amp; built with care · New York City</span>
        </footer>

      </div>{/* end skew wrapper */}
    </div>
  )
}
