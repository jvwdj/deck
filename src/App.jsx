import { useState, useEffect, useRef, Fragment } from 'react'

const BLUE   = '#396afc'
const PURPLE = '#8b5cf6'
const CYAN   = '#0ea5e9'
const BG     = 'linear-gradient(150deg, #060f20 0%, #091d52 40%, #0f2878 65%, #060f20 100%)'

const PHASES = [
  {
    num: '01',
    title: 'Systeem bouwen',
    sub: '2–3 weken',
    color: BLUE,
    rgb: '57,106,252',
    bullets: [
      'Wij bouwen het volledige cold email systeem',
      'Jij levert input over doelgroep en aanbod',
      'Laatste check samen — dan gaan we live',
    ],
  },
  {
    num: '02',
    title: 'Live Month',
    sub: '30 dagen live campagnes',
    color: PURPLE,
    rgb: '139,92,246',
    bullets: [
      'Wij draaien alle campagnes',
      'Eerste leads komen binnen',
      'Wekelijkse kenniscalls — van A tot Z',
    ],
  },
  {
    num: '03',
    title: 'Handover',
    sub: 'Overdracht op exacte datum',
    color: CYAN,
    rgb: '14,165,233',
    bullets: [
      'Eerste resultaten zijn er',
      'Exacte overdracht — campagnes blijven live gevuld',
      'Daarna zelfstandig runnen',
    ],
  },
]

const PILLARS = [
  {
    num: '01',
    title: 'Doelgroep',
    sub: 'Niet breed schieten — heel kritisch targeten',
    color: BLUE,
    rgb: '57,106,252',
    bullets: ['Sector & bedrijfstak', 'Bedrijfsgrootte', 'Welke besluitnemer? (eigenaar, hoofd afdeling)'],
  },
  {
    num: '02',
    title: 'Scripting',
    sub: 'Elke besluitnemer heeft andere uitdagingen',
    color: PURPLE,
    rgb: '139,92,246',
    bullets: ['Script op basis van functie, niet generiek', 'Aansluiten bij wat zij belangrijk vinden', 'Geen one-size-fits-all boodschap'],
  },
  {
    num: '03',
    title: 'Infrastructuur',
    sub: 'Je bericht moet gezien worden',
    color: CYAN,
    rgb: '14,165,233',
    bullets: ['Niet bouncen', 'Niet in spam belanden', 'Achter elke e-mail zit een echte persoon'],
  },
]

function PillarIcon({ title, color }) {
  if (title === 'Doelgroep') return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round">
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="12" cy="12" r="1.5" fill={color} stroke="none" />
      <line x1="12" y1="2" x2="12" y2="5.5" />
      <line x1="12" y1="18.5" x2="12" y2="22" />
      <line x1="2" y1="12" x2="5.5" y2="12" />
      <line x1="18.5" y1="12" x2="22" y2="12" />
    </svg>
  )
  if (title === 'Scripting') return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
      <line x1="5" y1="13" x2="9" y2="9" />
    </svg>
  )
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2 L20 6 L20 12 Q20 19 12 22 Q4 19 4 12 L4 6 Z" />
      <polyline points="9,12 11,14 15,10" />
    </svg>
  )
}

function useInView(threshold = 0.3) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true) },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return [ref, inView]
}

// ─── Fixed layer: background + blobs ─────────────────────────────────────────

function FixedBackground() {
  return (
    <div data-bg style={{
      position: 'fixed', inset: 0, background: BG, zIndex: 0,
      overflow: 'hidden', pointerEvents: 'none',
    }}>
      <div className="blob blob-1" />
      <div className="blob blob-2" />
      <div className="blob blob-3" />
    </div>
  )
}

// ─── Fixed footer bar ────────────────────────────────────────────────────────

function FixedFooter() {
  return (
    <div data-footer style={{
      position: 'fixed', bottom: 0, left: 0, right: 0, height: 64,
      zIndex: 20, pointerEvents: 'none',
      borderTop: '1px solid rgba(255,255,255,0.07)',
      background: 'transparent',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <img src="/logo.png" style={{ height: 26 }} />
    </div>
  )
}

// ─── Section 1: Pillars ───────────────────────────────────────────────────────

function PillarSection() {
  const [expanded, setExpanded] = useState(new Set())
  const [hovered, setHovered] = useState(null)

  const toggle = (i) => {
    setExpanded(prev => {
      const next = new Set(prev)
      next.has(i) ? next.delete(i) : next.add(i)
      return next
    })
  }

  return (
    <div data-section style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '80px 80px 100px',
    }}>
      <div className="slide-enter" style={{ maxWidth: 1040, width: '100%' }}>

        {/* Header */}
        <div style={{ marginBottom: 32 }}>
          <p style={{
            fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.3)', marginBottom: 12,
          }}>
            De basis van een goede e-mailcampagne
          </p>
          <h2 style={{
            fontSize: 34, fontWeight: 800, color: 'white',
            lineHeight: 1.2, letterSpacing: -0.5, maxWidth: 660,
          }}>
            3 onderdelen.
          </h2>
        </div>

        {/* Pillar cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, alignItems: 'start' }}>
          {PILLARS.map((p, i) => {
            const isOpen = expanded.has(i)
            return (
              <div
                key={p.title}
                className="pillar-in"
                style={{
                  '--d': `${i * 120}ms`,
                  background: isOpen
                    ? `linear-gradient(160deg, rgba(${p.rgb},0.12) 0%, rgba(255,255,255,0.03) 100%)`
                    : 'rgba(255,255,255,0.04)',
                  border: `1px solid ${isOpen ? `rgba(${p.rgb},0.45)` : hovered === i ? `rgba(${p.rgb},0.25)` : 'rgba(255,255,255,0.09)'}`,
                  borderRadius: 22, cursor: 'pointer',
                  boxShadow: hovered === i ? `0 8px 32px rgba(${p.rgb},0.18), 0 2px 8px rgba(0,0,0,0.3)` : isOpen ? `0 0 40px rgba(${p.rgb},0.12)` : 'none',
                  overflow: 'hidden',
                  transform: hovered === i ? 'translateY(-6px) scale(1.02)' : 'translateY(0) scale(1)',
                  transition: 'transform 0.22s cubic-bezier(0.34,1.4,0.64,1), box-shadow 0.22s ease, border-color 0.2s ease, background 0.3s ease',
                }}
                onClick={() => toggle(i)}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                onAnimationEnd={(e) => { e.currentTarget.style.animation = 'none' }}
              >
                {/* Card top */}
                <div style={{ padding: '28px 28px 24px' }}>

                  {/* Icon row */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
                    <div style={{
                      width: 52, height: 52, borderRadius: 14, flexShrink: 0,
                      background: `rgba(${p.rgb}, 0.12)`,
                      border: `1px solid rgba(${p.rgb}, 0.25)`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      boxShadow: `0 0 20px rgba(${p.rgb},0.15)`,
                    }}>
                      <div>
                        <PillarIcon title={p.title} color={p.color} />
                      </div>
                    </div>
                    <span style={{
                      fontSize: 11, fontWeight: 700, letterSpacing: 2.5,
                      color: `rgba(${p.rgb},0.6)`,
                    }}>
                      {p.num}
                    </span>
                  </div>

                  {/* Title + sub */}
                  <div style={{ marginBottom: 4 }}>
                    <h3 style={{ fontSize: 22, fontWeight: 800, color: 'white', marginBottom: 8, letterSpacing: -0.3 }}>
                      {p.title}
                    </h3>
                    <p style={{ fontSize: 13.5, color: 'rgba(255,255,255,0.45)', lineHeight: 1.5 }}>
                      {p.sub}
                    </p>
                  </div>

                  {/* Toggle hint */}
                  <div style={{
                    marginTop: 20, display: 'flex', alignItems: 'center', gap: 6,
                    opacity: isOpen ? 0 : 0.4, transition: 'opacity 0.2s',
                    pointerEvents: 'none',
                  }}>
                    <div style={{ width: 16, height: 1, background: `rgba(${p.rgb},0.6)` }} />
                    <span style={{ fontSize: 11, color: p.color, letterSpacing: 1.5, textTransform: 'uppercase', fontWeight: 600 }}>
                      details
                    </span>
                  </div>
                </div>

                {/* Expandable bullets */}
                <div style={{
                  maxHeight: isOpen ? 420 : 0, overflow: 'hidden',
                  transition: 'max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                }}>
                  <div style={{ padding: '0 28px 26px' }}>
                    <div style={{ borderTop: `1px solid rgba(${p.rgb},0.2)`, paddingTop: 18, display: 'flex', flexDirection: 'column', gap: 11 }}>
                      {p.bullets.map((b, j) => (
                        <div key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                          <div style={{
                            width: 6, height: 6, borderRadius: '50%', flexShrink: 0,
                            background: p.color, marginTop: 6, opacity: 0.7,
                          }} />
                          <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)', lineHeight: 1.5 }}>{b}</span>
                        </div>
                      ))}
                      {p.note && (
                        <div style={{ marginTop: 6, paddingTop: 12, borderTop: `1px solid rgba(255,255,255,0.06)` }}>
                          <span style={{ fontSize: 12, color: `rgba(${p.rgb},0.5)`, fontStyle: 'italic' }}>{p.note}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>


      </div>
    </div>
  )
}

// ─── Mini pillars (used inside Phase 01 bullet) ───────────────────────────────

function MiniPillars() {
  return (
    <div style={{ display: 'flex', gap: 7, marginTop: 12 }}>
      {PILLARS.map((p) => (
        <div key={p.num} style={{
          width: 0, flex: 1,
          background: `rgba(${p.rgb}, 0.09)`,
          border: `1px solid rgba(${p.rgb}, 0.28)`,
          borderTop: `2px solid rgba(${p.rgb}, 0.7)`,
          borderRadius: 9,
          padding: '9px 10px 10px',
        }}>
          <div style={{ fontSize: 8.5, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: `rgba(${p.rgb}, 0.65)`, marginBottom: 5 }}>
            {p.num}
          </div>
          <div style={{ fontSize: 11.5, fontWeight: 700, color: 'rgba(255,255,255,0.85)', lineHeight: 1.3 }}>
            {p.title === 'Infrastructuur' ? 'Infra' : p.title}
          </div>
        </div>
      ))}
    </div>
  )
}

// ─── Section 2: Phases ────────────────────────────────────────────────────────

function PhaseIcon({ title, color }) {
  if (title === 'Systeem bouwen') return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <path d="M14 17.5h7M17.5 14v7" />
    </svg>
  )
  if (title === 'Live Month') return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <polyline points="12,7 12,12 15,15" />
    </svg>
  )
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20,6 9,17 4,12" />
    </svg>
  )
}

function PhaseSection() {
  const [ref, inView] = useInView(0.2)
  const [expanded, setExpanded] = useState(new Set())
  const [hovered, setHovered] = useState(null)

  const toggle = (i) => {
    setExpanded(prev => {
      const next = new Set(prev)
      next.has(i) ? next.delete(i) : next.add(i)
      return next
    })
  }

  return (
    <div
      data-section
      ref={ref}
      style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '80px 80px 100px',
      }}
    >
      <div style={{ maxWidth: 1040, width: '100%', opacity: inView ? 1 : 0, transition: 'opacity 0.5s ease' }}>

        {/* Header */}
        <div style={{ marginBottom: 32 }}>
          <p style={{
            fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.3)', marginBottom: 12,
          }}>
            Het traject
          </p>
          <h2 style={{
            fontSize: 34, fontWeight: 800, color: 'white',
            lineHeight: 1.2, letterSpacing: -0.5, maxWidth: 700,
          }}>
            Hoe zorgen we er voor dat jullie dit kanaal zelf kunnen runnen?
          </h2>
        </div>

        {/* Phase cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, alignItems: 'start' }}>
          {PHASES.map((p, i) => {
            const isOpen = expanded.has(i)
            return (
              <div
                key={p.title}
                className={inView ? 'pillar-in' : ''}
                style={{
                  '--d': `${i * 120}ms`,
                  background: isOpen
                    ? `linear-gradient(160deg, rgba(${p.rgb},0.12) 0%, rgba(255,255,255,0.03) 100%)`
                    : 'rgba(255,255,255,0.04)',
                  border: `1px solid ${isOpen ? `rgba(${p.rgb},0.45)` : hovered === i ? `rgba(${p.rgb},0.25)` : 'rgba(255,255,255,0.09)'}`,
                  borderRadius: 22, cursor: 'pointer',
                  boxShadow: hovered === i ? `0 8px 32px rgba(${p.rgb},0.18), 0 2px 8px rgba(0,0,0,0.3)` : isOpen ? `0 0 40px rgba(${p.rgb},0.12)` : 'none',
                  overflow: 'hidden',
                  transform: hovered === i ? 'translateY(-6px) scale(1.02)' : 'translateY(0) scale(1)',
                  transition: 'transform 0.22s cubic-bezier(0.34,1.4,0.64,1), box-shadow 0.22s ease, border-color 0.2s ease, background 0.3s ease',
                }}
                onClick={() => toggle(i)}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                onAnimationEnd={(e) => { e.currentTarget.style.animation = 'none' }}
              >
                {/* Card top */}
                <div style={{ padding: '28px 28px 24px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
                    <div style={{
                      width: 52, height: 52, borderRadius: 14, flexShrink: 0,
                      background: `rgba(${p.rgb}, 0.12)`,
                      border: `1px solid rgba(${p.rgb}, 0.25)`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      boxShadow: `0 0 20px rgba(${p.rgb},0.15)`,
                    }}>
                      <PhaseIcon title={p.title} color={p.color} />
                    </div>
                    <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2.5, color: `rgba(${p.rgb},0.6)` }}>
                      {p.num}
                    </span>
                  </div>

                  <div style={{ marginBottom: 4 }}>
                    <h3 style={{ fontSize: 22, fontWeight: 800, color: 'white', marginBottom: 8, letterSpacing: -0.3 }}>
                      {p.title}
                    </h3>
                    <p style={{ fontSize: 13.5, color: 'rgba(255,255,255,0.45)', lineHeight: 1.5 }}>
                      {p.sub}
                    </p>
                  </div>

                  <div style={{
                    marginTop: 20, display: 'flex', alignItems: 'center', gap: 6,
                    opacity: isOpen ? 0 : 0.4, transition: 'opacity 0.2s',
                    pointerEvents: 'none',
                  }}>
                    <div style={{ width: 16, height: 1, background: `rgba(${p.rgb},0.6)` }} />
                    <span style={{ fontSize: 11, color: p.color, letterSpacing: 1.5, textTransform: 'uppercase', fontWeight: 600 }}>
                      details
                    </span>
                  </div>
                </div>

                {/* Expandable bullets */}
                <div style={{
                  maxHeight: isOpen ? 420 : 0, overflow: 'hidden',
                  transition: 'max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                }}>
                  <div style={{ padding: '0 28px 26px' }}>
                    <div style={{ borderTop: `1px solid rgba(${p.rgb},0.2)`, paddingTop: 18, display: 'flex', flexDirection: 'column', gap: 11 }}>
                      {p.bullets.map((b, j) => (
                        <div key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                          <div style={{
                            width: 6, height: 6, borderRadius: '50%', flexShrink: 0,
                            background: p.color, marginTop: 6, opacity: 0.7,
                          }} />
                          <div style={{ flex: 1 }}>
                            <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)', lineHeight: 1.5 }}>{b}</span>
                            {i === 0 && j === 0 && <MiniPillars />}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </div>
  )
}

// ─── Section 3: ROI calculator ───────────────────────────────────────────────

const FUNNEL = [
  { range: '15 - 30', label: 'leads', sub: 'in maand 1', color: BLUE, rgb: '57,106,252' },
  { range: '5 - 15', label: 'afspraken', sub: 'uit die leads', color: PURPLE, rgb: '139,92,246' },
  { range: '2 - 3', label: 'klanten', sub: 'gemiddeld', color: CYAN, rgb: '14,165,233' },
]

const initParams = new URLSearchParams(window.location.search)
const initDeal = Number(initParams.get('deal')) || 20000
const initMarge = Number(initParams.get('marge')) || 50
const initOrg = decodeURIComponent(window.location.pathname.replace(/^\//, ''))

function ROISection() {
  const [ref, inView] = useInView(0.2)
  const [dealwaarde, setDealwaarde] = useState(initDeal)
  const [marge, setMarge] = useState(initMarge)
  const [calcDealwaarde, setCalcDealwaarde] = useState(initDeal)
  const [calcMarge, setCalcMarge] = useState(initMarge)
  const [orgNaam, setOrgNaam] = useState(initOrg)
  const [copied, setCopied] = useState(false)

  const copyLink = async () => {
    const slug = encodeURIComponent(orgNaam.trim())
    const url = `${window.location.origin}/${slug}?deal=${dealwaarde}&marge=${marge}`
    try {
      await navigator.clipboard.writeText(url)
    } catch {
      const el = document.createElement('textarea')
      el.value = url
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const profit = calcDealwaarde * (calcMarge / 100)
  const be7500 = profit > 0 ? Math.ceil(7500 / profit) : null
  const be9000 = profit > 0 ? Math.ceil(9000 / profit) : null

  const inputStyle = {
    width: '100%', background: 'rgba(255,255,255,0.07)',
    border: '1px solid rgba(255,255,255,0.12)', borderRadius: 12,
    padding: '13px 14px', color: 'white', fontSize: 17, fontWeight: 700,
    outline: 'none',
  }

  return (
    <div data-section ref={ref} style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '80px 80px 100px',
    }}>
      <div style={{ maxWidth: 1040, width: '100%' }}>

        {/* Header */}
        <div className={inView ? 'fade-up' : ''} style={{ '--d': '0ms', opacity: inView ? undefined : 0, marginBottom: 36 }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 12 }}>
            De investering
          </p>
          <h2 style={{ fontSize: 34, fontWeight: 800, color: 'white', lineHeight: 1.2, letterSpacing: -0.5, maxWidth: 680 }}>
            Wat zien we daar gemiddeld uitkomen?
          </h2>
        </div>

        {/* Funnel */}
        <div className={inView ? 'fade-up' : ''} style={{ '--d': '120ms', opacity: inView ? undefined : 0, display: 'flex', alignItems: 'stretch', marginBottom: 28 }}>
          {FUNNEL.map((f, i) => (
            <Fragment key={f.label}>
              <div style={{
                flex: 1,
                background: `rgba(${f.rgb}, 0.08)`,
                border: `1px solid rgba(${f.rgb}, 0.25)`,
                borderRadius: 18, padding: '24px 20px', textAlign: 'center',
              }}>
                <div style={{ fontSize: 38, fontWeight: 800, color: 'white', letterSpacing: -1.5, lineHeight: 1 }}>{f.range}</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: f.color, marginTop: 8 }}>{f.label}</div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', marginTop: 4 }}>{f.sub}</div>
              </div>
              {i < 2 && (
                <div style={{ width: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2,7 L12,7 M8,3 L12,7 L8,11" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              )}
            </Fragment>
          ))}
        </div>

        {/* Calculator */}
        <div className={inView ? 'fade-up' : ''} style={{
          '--d': '240ms', opacity: inView ? undefined : 0,
          background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.09)',
          borderRadius: 22, padding: '32px',
        }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 20 }}>
            Bereken jouw break-even
          </p>

          {/* Inputs */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 28 }}>
            <div>
              <label style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase', display: 'block', marginBottom: 8 }}>
                Gemiddelde dealwaarde
              </label>
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.35)', fontSize: 15, fontWeight: 600, pointerEvents: 'none' }}>€</span>
                <input
                  type="number"
                  className="deck-input"
                  value={dealwaarde}
                  onChange={e => setDealwaarde(Math.max(0, Number(e.target.value)))}
                  onBlur={e => setCalcDealwaarde(Math.max(0, Number(e.target.value)))}
                  style={{ ...inputStyle, paddingLeft: 30 }}
                />
              </div>
            </div>
            <div>
              <label style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase', display: 'block', marginBottom: 8 }}>
                Winstmarge
              </label>
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.35)', fontSize: 15, fontWeight: 600, pointerEvents: 'none' }}>%</span>
                <input
                  type="number"
                  className="deck-input"
                  value={marge}
                  onChange={e => setMarge(Math.min(100, Math.max(0, Number(e.target.value))))}
                  onBlur={e => setCalcMarge(Math.min(100, Math.max(0, Number(e.target.value))))}
                  style={{ ...inputStyle, paddingRight: 34 }}
                />
              </div>
            </div>
          </div>

          {/* Results */}
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: 24, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {[
              { price: '€7.500', sub: 'zonder appointment setting', be: be7500, rgb: '57,106,252' },
              { price: '€9.000', sub: 'incl. appointment setting', be: be9000, rgb: '139,92,246' },
            ].map((opt) => (
              <div key={opt.price} style={{
                background: `rgba(${opt.rgb}, 0.07)`,
                border: `1px solid rgba(${opt.rgb}, 0.2)`,
                borderRadius: 14, padding: '20px 22px',
              }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'rgba(255,255,255,0.5)', marginBottom: 14 }}>
                  {opt.price}{' '}
                  <span style={{ fontWeight: 400, opacity: 0.7 }}>— {opt.sub}</span>
                </div>
                <div key={`${opt.price}-${opt.be}`} className="scale-in" style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                  <span style={{ fontSize: 44, fontWeight: 800, color: 'white', letterSpacing: -2, lineHeight: 1 }}>
                    {opt.be ?? '?'}
                  </span>
                  <span style={{ fontSize: 16, color: 'rgba(255,255,255,0.45)', fontWeight: 600 }}>
                    {opt.be !== null ? (opt.be === 1 ? 'klant' : 'klanten') : ''}
                  </span>
                </div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)', marginTop: 8 }}>
                  om de investering terug te verdienen
                </div>
              </div>
            ))}
          </div>

          {profit > 0 && (
            <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.25)', marginTop: 18, fontStyle: 'italic' }}>
              Bij €{calcDealwaarde.toLocaleString('nl-NL')} dealwaarde en {calcMarge}% marge = €{Math.round(profit).toLocaleString('nl-NL')} winst per klant
            </p>
          )}
        </div>

        {/* Org naam + share */}
        <div style={{ marginTop: 32, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
          <div style={{ width: '100%', maxWidth: 360 }}>
            <label style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase', display: 'block', marginBottom: 8 }}>
              Organisatie
            </label>
            <input
              type="text"
              className="deck-input"
              value={orgNaam}
              onChange={e => setOrgNaam(e.target.value)}
              style={{
                width: '100%', background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12,
                padding: '11px 14px', color: 'white', fontSize: 15, fontWeight: 600,
                outline: 'none',
              }}
            />
          </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button
            onClick={copyLink}
            style={{
              background: copied ? 'rgba(57,106,252,0.15)' : 'rgba(255,255,255,0.06)',
              border: `1px solid ${copied ? 'rgba(57,106,252,0.4)' : 'rgba(255,255,255,0.11)'}`,
              borderRadius: 12, padding: '12px 28px',
              color: copied ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.55)',
              fontSize: 14, fontWeight: 600,
              cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8,
              transition: 'background 0.2s ease, color 0.2s ease, border-color 0.2s ease',
            }}
            onMouseEnter={e => { if (!copied) { e.currentTarget.style.background = 'rgba(255,255,255,0.11)'; e.currentTarget.style.color = 'rgba(255,255,255,0.85)' } }}
            onMouseLeave={e => { if (!copied) { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = 'rgba(255,255,255,0.55)' } }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {copied
                ? <polyline points="20,6 9,17 4,12" />
                : <><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></>
              }
            </svg>
            {copied ? 'Link gekopieerd!' : 'Deel dit deck'}
          </button>
        </div>
        </div>

      </div>
    </div>
  )
}

// ─── Section 4: Result ───────────────────────────────────────────────────────

function ResultSection() {
  const [ref, inView] = useInView(0.2)
  const [hovered, setHovered] = useState(null)
  const [hoveredChip, setHoveredChip] = useState(null)

  return (
    <div data-section ref={ref} style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '80px 80px 100px',
    }}>
      <div style={{ maxWidth: 1040, width: '100%' }}>

        {/* Label + heading */}
        <div className={inView ? 'fade-up' : ''} style={{ '--d': '0ms', opacity: inView ? undefined : 0, marginBottom: 36 }}>
          <p style={{
            fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.3)', marginBottom: 12,
          }}>
            Het resultaat
          </p>
          <h2 style={{ fontSize: 34, fontWeight: 800, color: 'white', lineHeight: 1.2, letterSpacing: -0.5 }}>
            Aan het einde heb je{' '}
            <span style={{ color: 'rgba(255,255,255,0.4)', fontWeight: 600 }}>twee dingen.</span>
          </h2>
        </div>

        {/* Two outcome cards */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>

          {/* Card 1: Systeem */}
          <div
            className={inView ? 'from-left' : ''}
            onMouseEnter={() => setHovered(0)}
            onMouseLeave={() => setHovered(null)}
            style={{
              '--d': '180ms',
              opacity: inView ? undefined : 0,
              background: 'linear-gradient(160deg, rgba(57,106,252,0.14) 0%, rgba(255,255,255,0.03) 100%)',
              border: `1px solid ${hovered === 0 ? 'rgba(57,106,252,0.55)' : 'rgba(57,106,252,0.35)'}`,
              borderRadius: 22, padding: '32px',
              boxShadow: hovered === 0 ? '0 12px 40px rgba(57,106,252,0.22), 0 2px 8px rgba(0,0,0,0.3)' : '0 0 40px rgba(57,106,252,0.1)',
              transform: hovered === 0 ? 'translateY(-6px) scale(1.02)' : 'translateY(0) scale(1)',
              transition: 'transform 0.22s cubic-bezier(0.34,1.4,0.64,1), box-shadow 0.22s ease, border-color 0.2s ease',
            }}
          >
            <div style={{
              width: 60, height: 60, borderRadius: 16, marginBottom: 26,
              background: 'rgba(57,106,252,0.15)', border: '1px solid rgba(57,106,252,0.3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 0 24px rgba(57,106,252,0.2)',
            }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={BLUE} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="22,7 13.5,15.5 8.5,10.5 2,17" />
                <polyline points="16,7 22,7 22,13" />
              </svg>
            </div>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2.5, textTransform: 'uppercase', color: 'rgba(57,106,252,0.6)', marginBottom: 12 }}>01</div>
            <h3 style={{ fontSize: 27, fontWeight: 800, color: 'white', letterSpacing: -0.4, lineHeight: 1.2, marginBottom: 10 }}>
              Een werkend systeem
            </h3>
            <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.45)', lineHeight: 1.6 }}>
              dat leads genereert
            </p>
          </div>

          {/* Card 2: Kennis */}
          <div
            className={inView ? 'from-right' : ''}
            onMouseEnter={() => setHovered(1)}
            onMouseLeave={() => setHovered(null)}
            style={{
              '--d': '180ms',
              opacity: inView ? undefined : 0,
              background: 'linear-gradient(160deg, rgba(139,92,246,0.14) 0%, rgba(255,255,255,0.03) 100%)',
              border: `1px solid ${hovered === 1 ? 'rgba(139,92,246,0.55)' : 'rgba(139,92,246,0.35)'}`,
              borderRadius: 22, padding: '32px',
              boxShadow: hovered === 1 ? '0 12px 40px rgba(139,92,246,0.22), 0 2px 8px rgba(0,0,0,0.3)' : '0 0 40px rgba(139,92,246,0.1)',
              transform: hovered === 1 ? 'translateY(-6px) scale(1.02)' : 'translateY(0) scale(1)',
              transition: 'transform 0.22s cubic-bezier(0.34,1.4,0.64,1), box-shadow 0.22s ease, border-color 0.2s ease',
            }}
          >
            <div style={{
              width: 60, height: 60, borderRadius: 16, marginBottom: 26,
              background: 'rgba(139,92,246,0.15)', border: '1px solid rgba(139,92,246,0.3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 0 24px rgba(139,92,246,0.2)',
            }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={PURPLE} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                <path d="M6 12v5c3 3 9 3 12 0v-5" />
              </svg>
            </div>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2.5, textTransform: 'uppercase', color: 'rgba(139,92,246,0.6)', marginBottom: 12 }}>02</div>
            <h3 style={{ fontSize: 27, fontWeight: 800, color: 'white', letterSpacing: -0.4, lineHeight: 1.2, marginBottom: 10 }}>
              De kennis
            </h3>
            <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.45)', lineHeight: 1.6 }}>
              om het zelf te blijven draaien
            </p>
          </div>
        </div>

        {/* Result statement */}
        <div
          className={inView ? `fade-up result-glow` : ''}
          onMouseEnter={() => setHovered(2)}
          onMouseLeave={() => setHovered(null)}
          style={{
            '--d': '420ms',
            opacity: inView ? undefined : 0,
            background: 'linear-gradient(135deg, rgba(57,106,252,0.07) 0%, rgba(139,92,246,0.07) 50%, rgba(14,165,233,0.05) 100%)',
            border: `1px solid ${hovered === 2 ? 'rgba(255,255,255,0.18)' : 'rgba(255,255,255,0.1)'}`,
            borderRadius: 22, padding: '32px 40px',
            transform: hovered === 2 ? 'translateY(-4px)' : 'translateY(0)',
            transition: 'transform 0.22s cubic-bezier(0.34,1.4,0.64,1), border-color 0.2s ease',
          }}
        >
          <div style={{ display: 'flex', gap: 10, marginBottom: 22, flexWrap: 'wrap' }}>
            {['Geen extern bureau', 'Geen retainer', 'Geen afhankelijkheid'].map((item, i) => (
              <div
                key={i}
                onMouseEnter={() => setHoveredChip(i)}
                onMouseLeave={() => setHoveredChip(null)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 7,
                  background: hoveredChip === i ? 'rgba(255,255,255,0.09)' : 'rgba(255,255,255,0.05)',
                  border: `1px solid ${hoveredChip === i ? 'rgba(255,255,255,0.18)' : 'rgba(255,255,255,0.09)'}`,
                  borderRadius: 10, padding: '7px 13px',
                  transform: hoveredChip === i ? 'translateY(-2px)' : 'translateY(0)',
                  transition: 'transform 0.18s ease, background 0.18s ease, border-color 0.18s ease',
                  cursor: 'default',
                }}>
                <span style={{ color: 'rgba(255,100,100,0.6)', fontSize: 13, fontWeight: 700 }}>×</span>
                <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', fontWeight: 600, textDecoration: 'line-through', textDecorationColor: 'rgba(255,255,255,0.2)' }}>
                  {item}
                </span>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', marginBottom: 18, fontStyle: 'italic' }}>
            — ook niet van ons.
          </p>
          <p style={{ fontSize: 30, fontWeight: 800, color: 'white', letterSpacing: -0.6, lineHeight: 1.25 }}>
            Het kanaal is volledig van jullie.
          </p>
        </div>

      </div>
    </div>
  )
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <>
      <FixedBackground />
      <FixedFooter />
      {/* Scrollable content layer — stops above the footer */}
      <div data-scroll style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 64, overflowY: 'auto', zIndex: 1 }}>
        <PillarSection />
        <PhaseSection />
        <ResultSection />
        <ROISection />
      </div>
    </>
  )
}
