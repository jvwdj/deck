import { useState, useEffect, useRef, Fragment } from 'react'

const BLUE   = '#396afc'
const PURPLE = '#8b5cf6'
const CYAN   = '#0ea5e9'
const BG     = 'linear-gradient(150deg, #060f20 0%, #091d52 40%, #0f2878 65%, #060f20 100%)'

const PILLARS = {
  nl: [
    {
      num: '01', type: 'target', color: BLUE, rgb: '57,106,252',
      title: 'Doelgroep',
      sub: 'Niet breed schieten — heel kritisch targeten',
      bullets: ['Sector & bedrijfstak', 'Bedrijfsgrootte', 'Welke besluitnemer? (eigenaar, hoofd afdeling)'],
    },
    {
      num: '02', type: 'scripting', color: PURPLE, rgb: '139,92,246',
      title: 'Scripting',
      sub: 'Elke besluitnemer heeft andere uitdagingen',
      bullets: ['Script op basis van functie, niet generiek', 'Aansluiten bij wat zij belangrijk vinden', 'Geen one-size-fits-all boodschap'],
    },
    {
      num: '03', type: 'infra', color: CYAN, rgb: '14,165,233',
      title: 'Infrastructuur',
      sub: 'Je bericht moet gezien worden',
      bullets: ['Niet bouncen', 'Niet in spam belanden', 'Dedicated infrastructuur voor outbound leadgeneratie'],
    },
  ],
  en: [
    {
      num: '01', type: 'target', color: BLUE, rgb: '57,106,252',
      title: 'Target audience',
      sub: 'Not shooting wide — targeting with precision',
      bullets: ['Sector & industry', 'Company size', 'Which decision maker? (owner, department head)'],
    },
    {
      num: '02', type: 'scripting', color: PURPLE, rgb: '139,92,246',
      title: 'Scripting',
      sub: 'Every decision maker has different challenges',
      bullets: ['Script based on role, not generic', 'Aligned with what matters to them', 'No one-size-fits-all message'],
    },
    {
      num: '03', type: 'infra', color: CYAN, rgb: '14,165,233',
      title: 'Infrastructure',
      sub: 'Your message needs to be seen',
      bullets: ['No bounces', 'Not landing in spam', 'Dedicated infrastructure for outbound lead generation'],
    },
  ],
}

const PHASES = {
  nl: [
    {
      num: '01', type: 'build', color: BLUE, rgb: '57,106,252',
      title: 'Systeem bouwen',
      sub: '2–3 weken',
      bullets: [
        'Wij bouwen het volledige outbound systeem',
        'Jij levert input over doelgroep en aanbod',
        'Laatste check samen — dan gaan we live',
      ],
    },
    {
      num: '02', type: 'live', color: PURPLE, rgb: '139,92,246',
      title: 'Live Month',
      sub: '30 dagen live campagnes',
      bullets: [
        'Wij draaien alle campagnes',
        'Eerste leads komen binnen',
        'Meetings worden in je agenda gezet',
        'Wekelijkse iteraties',
        'Wekelijkse kenniscalls — van A tot Z',
      ],
    },
    {
      num: '03', type: 'handover', color: CYAN, rgb: '14,165,233',
      title: 'Handover',
      sub: 'Overdracht op exacte datum',
      bullets: [
        'Eerste resultaten zijn er',
        'Exacte overdracht — campagnes blijven live en gevuld',
        'Daarna zelfstandig runnen',
      ],
    },
  ],
  en: [
    {
      num: '01', type: 'build', color: BLUE, rgb: '57,106,252',
      title: 'System build',
      sub: '2–3 weeks',
      bullets: [
        'We build the complete outbound system',
        'You provide input on target audience and offer',
        'Final check together — then we go live',
      ],
    },
    {
      num: '02', type: 'live', color: PURPLE, rgb: '139,92,246',
      title: 'Live Month',
      sub: '30 days live campaigns',
      bullets: [
        'We run all campaigns',
        'First leads come in',
        'Meetings get added to your calendar',
        'Weekly iterations',
        'Weekly knowledge calls — from A to Z',
      ],
    },
    {
      num: '03', type: 'handover', color: CYAN, rgb: '14,165,233',
      title: 'Handover',
      sub: 'Handover on exact date',
      bullets: [
        'First results are in',
        'Exact handover — campaigns stay live and filled',
        'Then run it independently',
      ],
    },
  ],
}

const T = {
  nl: {
    pillars: {
      label: 'De basis van een goede outbound campagne',
      heading: '3 onderdelen.',
      emailSub: 'Geautomatiseerde sequenties via persoonlijke inboxen',
      linkedinSub: 'Directe connectieverzoeken en berichten via LinkedIn',
    },
    phases: {
      label: 'Het traject',
      heading: 'Hoe zorgen we er voor dat jullie dit kanaal zelf kunnen runnen?',
    },
    roi: {
      label: 'De investering',
      heading: 'Wat zien we daar gemiddeld uitkomen?',
      funnel: [
        { range: '15 - 30', label: 'leads', sub: 'in maand 1' },
        { range: '5 - 15', label: 'afspraken', sub: 'uit die leads' },
        { range: '2 - 3', label: 'klanten', sub: 'gemiddeld' },
      ],
      calcLabel: 'Bereken jouw break-even',
      dealLabel: 'Gemiddelde dealwaarde',
      margeLabel: 'Winstmarge',
      clientSingular: 'klant',
      clientPlural: 'klanten',
      recover: 'om de investering terug te verdienen',
      profitLine: (deal, marge, profit) => `Bij €${deal.toLocaleString('nl-NL')} dealwaarde en ${marge}% marge = €${Math.round(profit).toLocaleString('nl-NL')} winst per klant`,
      orgLabel: 'Organisatie',
      shareCopied: 'Link gekopieerd!',
      shareBtn: 'Deel dit deck',
    },
    result: {
      label: 'Het resultaat',
      heading: <>Aan het einde heb je{' '}<span style={{ color: 'rgba(255,255,255,0.4)', fontWeight: 600 }}>twee dingen.</span></>,
      card1Title: 'Een werkend systeem',
      card1Sub: 'dat leads genereert',
      card2Title: 'De kennis',
      card2Sub: 'om het zelf te blijven draaien',
      chips: ['Geen extern bureau', 'Geen retainer', 'Geen afhankelijkheid'],
      chipNote: '— ook niet van ons.',
      statement: 'Het kanaal is volledig van jullie.',
    },
    miniInfra: 'Infra',
  },
  en: {
    pillars: {
      label: 'The foundation of a good outbound campaign',
      heading: '3 components.',
      emailSub: 'Automated sequences via personal inboxes',
      linkedinSub: 'Direct connection requests and messages via LinkedIn',
    },
    phases: {
      label: 'The journey',
      heading: 'How do we make sure you can run this channel yourself?',
    },
    roi: {
      label: 'The investment',
      heading: 'Our results',
      funnel: [
        { range: '15 - 30', label: 'leads', sub: 'in month 1' },
        { range: '5 - 15', label: 'meetings', sub: 'from those leads' },
        { range: '2 - 3', label: 'clients', sub: 'on average' },
      ],
      calcLabel: 'Calculate your break-even',
      dealLabel: 'Average deal value',
      margeLabel: 'Profit margin',
      clientSingular: 'client',
      clientPlural: 'clients',
      recover: 'to recover the investment',
      profitLine: (deal, marge, profit) => `At €${deal.toLocaleString('en-GB')} deal value and ${marge}% margin = €${Math.round(profit).toLocaleString('en-GB')} profit per client`,
      orgLabel: 'Organisation',
      shareCopied: 'Link copied!',
      shareBtn: 'Share this deck',
    },
    result: {
      label: 'The result',
      heading: <>At the end you have{' '}<span style={{ color: 'rgba(255,255,255,0.4)', fontWeight: 600 }}>two things.</span></>,
      card1Title: 'A working system',
      card1Sub: 'that generates leads',
      card2Title: 'The knowledge',
      card2Sub: 'to keep running it yourself',
      chips: ['No external agency', 'No retainer', 'No dependency'],
      chipNote: '— not even from us.',
      statement: 'The channel is completely yours.',
    },
    miniInfra: 'Infra',
  },
}

function PillarIcon({ type, color }) {
  if (type === 'target') return (
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
  if (type === 'scripting') return (
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

function FixedFooter({ lang, setLang }) {
  return (
    <div data-footer style={{
      position: 'fixed', bottom: 0, left: 0, right: 0, height: 64,
      zIndex: 20, pointerEvents: 'none',
      borderTop: '1px solid rgba(255,255,255,0.07)',
      background: 'transparent',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <img src="/logo.png" style={{ height: 26 }} />
      {/* Language toggle */}
      <div style={{
        position: 'absolute', right: 28,
        display: 'flex', alignItems: 'center', gap: 2,
        pointerEvents: 'auto',
        background: 'rgba(255,255,255,0.05)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: 10, padding: '4px',
      }}>
        {['nl', 'en'].map(l => (
          <button
            key={l}
            onClick={() => setLang(l)}
            style={{
              background: lang === l ? 'rgba(57,106,252,0.3)' : 'transparent',
              border: lang === l ? '1px solid rgba(57,106,252,0.5)' : '1px solid transparent',
              borderRadius: 7, padding: '5px 12px',
              color: lang === l ? 'white' : 'rgba(255,255,255,0.4)',
              fontSize: 12, fontWeight: 700, letterSpacing: 1,
              cursor: 'pointer', textTransform: 'uppercase',
              transition: 'all 0.15s ease',
            }}
          >
            {l}
          </button>
        ))}
      </div>
    </div>
  )
}

function PillarSection({ lang }) {
  const [expanded, setExpanded] = useState(new Set())
  const [hovered, setHovered] = useState(null)
  const pillars = PILLARS[lang]
  const t = T[lang]

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

        <div style={{ marginBottom: 32 }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 12 }}>
            {t.pillars.label}
          </p>
          <h2 style={{ fontSize: 34, fontWeight: 800, color: 'white', lineHeight: 1.2, letterSpacing: -0.5, maxWidth: 660 }}>
            {t.pillars.heading}
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, alignItems: 'start' }}>
          {pillars.map((p, i) => {
            const isOpen = expanded.has(i)
            return (
              <div
                key={p.type}
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
                <div style={{ padding: '28px 28px 24px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
                    <div style={{
                      width: 52, height: 52, borderRadius: 14, flexShrink: 0,
                      background: `rgba(${p.rgb}, 0.12)`,
                      border: `1px solid rgba(${p.rgb}, 0.25)`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      boxShadow: `0 0 20px rgba(${p.rgb},0.15)`,
                    }}>
                      <PillarIcon type={p.type} color={p.color} />
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

                <div style={{ maxHeight: isOpen ? 420 : 0, overflow: 'hidden', transition: 'max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1)' }}>
                  <div style={{ padding: '0 28px 26px' }}>
                    <div style={{ borderTop: `1px solid rgba(${p.rgb},0.2)`, paddingTop: 18, display: 'flex', flexDirection: 'column', gap: 11 }}>
                      {p.bullets.map((b, j) => (
                        <div key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                          <div style={{ width: 6, height: 6, borderRadius: '50%', flexShrink: 0, background: p.color, marginTop: 6, opacity: 0.7 }} />
                          <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)', lineHeight: 1.5 }}>{b}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Channel visuals */}
        <div style={{ display: 'flex', gap: 16, marginTop: 24 }}>
          <div style={{
            flex: 1, borderRadius: 18, padding: '20px 24px',
            background: 'rgba(57,106,252,0.06)', border: '1px solid rgba(57,106,252,0.18)',
            display: 'flex', alignItems: 'center', gap: 18,
          }}>
            <div style={{
              width: 48, height: 48, borderRadius: 13, flexShrink: 0,
              background: 'rgba(57,106,252,0.12)', border: '1px solid rgba(57,106,252,0.25)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 0 20px rgba(57,106,252,0.15)',
            }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={BLUE} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="3"/><polyline points="2,4 12,13 22,4"/>
              </svg>
            </div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 700, color: 'white', marginBottom: 3 }}>Email outreach</div>
              <div style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.4)', lineHeight: 1.5 }}>{t.pillars.emailSub}</div>
            </div>
          </div>

          <div style={{
            flex: 1, borderRadius: 18, padding: '20px 24px',
            background: 'rgba(10,102,194,0.06)', border: '1px solid rgba(10,102,194,0.22)',
            display: 'flex', alignItems: 'center', gap: 18,
          }}>
            <div style={{
              width: 48, height: 48, borderRadius: 13, flexShrink: 0,
              background: 'rgba(10,102,194,0.14)', border: '1px solid rgba(10,102,194,0.28)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 0 20px rgba(10,102,194,0.15)',
            }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0a66c2" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="4"/>
                <line x1="8" y1="11" x2="8" y2="17"/>
                <line x1="8" y1="8" x2="8" y2="8.5" strokeWidth="2.5" strokeLinecap="round"/>
                <path d="M12 17v-4a2 2 0 0 1 4 0v4"/>
                <line x1="12" y1="11" x2="12" y2="17"/>
              </svg>
            </div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 700, color: 'white', marginBottom: 3 }}>LinkedIn outreach</div>
              <div style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.4)', lineHeight: 1.5 }}>{t.pillars.linkedinSub}</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

function MiniPillars({ lang }) {
  const pillars = PILLARS[lang]
  const t = T[lang]
  return (
    <div style={{ display: 'flex', gap: 7, marginTop: 12 }}>
      {pillars.map((p) => (
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
            {p.type === 'infra' ? t.miniInfra : p.title}
          </div>
        </div>
      ))}
    </div>
  )
}

function PhaseIcon({ type, color }) {
  if (type === 'build') return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <path d="M14 17.5h7M17.5 14v7" />
    </svg>
  )
  if (type === 'live') return (
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

function PhaseSection({ lang }) {
  const [ref, inView] = useInView(0.2)
  const [expanded, setExpanded] = useState(new Set())
  const [hovered, setHovered] = useState(null)
  const phases = PHASES[lang]
  const t = T[lang]

  const toggle = (i) => {
    setExpanded(prev => {
      const next = new Set(prev)
      next.has(i) ? next.delete(i) : next.add(i)
      return next
    })
  }

  return (
    <div data-section ref={ref} style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '80px 80px 100px',
    }}>
      <div style={{ maxWidth: 1040, width: '100%', opacity: inView ? 1 : 0, transition: 'opacity 0.5s ease' }}>

        <div style={{ marginBottom: 32 }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 12 }}>
            {t.phases.label}
          </p>
          <h2 style={{ fontSize: 34, fontWeight: 800, color: 'white', lineHeight: 1.2, letterSpacing: -0.5, maxWidth: 700 }}>
            {t.phases.heading}
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, alignItems: 'start' }}>
          {phases.map((p, i) => {
            const isOpen = expanded.has(i)
            return (
              <div
                key={p.type}
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
                <div style={{ padding: '28px 28px 24px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
                    <div style={{
                      width: 52, height: 52, borderRadius: 14, flexShrink: 0,
                      background: `rgba(${p.rgb}, 0.12)`,
                      border: `1px solid rgba(${p.rgb}, 0.25)`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      boxShadow: `0 0 20px rgba(${p.rgb},0.15)`,
                    }}>
                      <PhaseIcon type={p.type} color={p.color} />
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

                <div style={{ maxHeight: isOpen ? 420 : 0, overflow: 'hidden', transition: 'max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1)' }}>
                  <div style={{ padding: '0 28px 26px' }}>
                    <div style={{ borderTop: `1px solid rgba(${p.rgb},0.2)`, paddingTop: 18, display: 'flex', flexDirection: 'column', gap: 11 }}>
                      {p.bullets.map((b, j) => (
                        <div key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                          <div style={{ width: 6, height: 6, borderRadius: '50%', flexShrink: 0, background: p.color, marginTop: 6, opacity: 0.7 }} />
                          <div style={{ flex: 1 }}>
                            <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)', lineHeight: 1.5 }}>{b}</span>
                            {i === 0 && j === 0 && <MiniPillars lang={lang} />}
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

const initParams = new URLSearchParams(window.location.search)
const initDeal = Number(initParams.get('deal')) || 20000
const initMarge = Number(initParams.get('marge')) || 50
const initOrg = decodeURIComponent(window.location.pathname.replace(/^\//, ''))

function ROISection({ lang }) {
  const [ref, inView] = useInView(0.2)
  const [dealwaarde, setDealwaarde] = useState(initDeal)
  const [marge, setMarge] = useState(initMarge)
  const [calcDealwaarde, setCalcDealwaarde] = useState(initDeal)
  const [calcMarge, setCalcMarge] = useState(initMarge)
  const [orgNaam, setOrgNaam] = useState(initOrg)
  const [copied, setCopied] = useState(false)
  const t = T[lang].roi

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
  const be8000 = profit > 0 ? Math.ceil(8000 / profit) : null

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

        <div className={inView ? 'fade-up' : ''} style={{ '--d': '0ms', opacity: inView ? undefined : 0, marginBottom: 36 }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 12 }}>
            {t.label}
          </p>
          <h2 style={{ fontSize: 34, fontWeight: 800, color: 'white', lineHeight: 1.2, letterSpacing: -0.5, maxWidth: 680 }}>
            {t.heading}
          </h2>
        </div>

        <div className={inView ? 'fade-up' : ''} style={{ '--d': '120ms', opacity: inView ? undefined : 0, display: 'flex', alignItems: 'stretch', marginBottom: 28 }}>
          {t.funnel.map((f, i) => {
            const colors = [{ color: BLUE, rgb: '57,106,252' }, { color: PURPLE, rgb: '139,92,246' }, { color: CYAN, rgb: '14,165,233' }]
            const c = colors[i]
            return (
              <Fragment key={f.label}>
                <div style={{
                  flex: 1, background: `rgba(${c.rgb}, 0.08)`, border: `1px solid rgba(${c.rgb}, 0.25)`,
                  borderRadius: 18, padding: '24px 20px', textAlign: 'center',
                }}>
                  <div style={{ fontSize: 38, fontWeight: 800, color: 'white', letterSpacing: -1.5, lineHeight: 1 }}>{f.range}</div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: c.color, marginTop: 8 }}>{f.label}</div>
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
            )
          })}
        </div>

        <div className={inView ? 'fade-up' : ''} style={{
          '--d': '240ms', opacity: inView ? undefined : 0,
          background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.09)',
          borderRadius: 22, padding: '32px',
        }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 20 }}>
            {t.calcLabel}
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 28 }}>
            <div>
              <label style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase', display: 'block', marginBottom: 8 }}>
                {t.dealLabel}
              </label>
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.35)', fontSize: 15, fontWeight: 600, pointerEvents: 'none' }}>€</span>
                <input type="number" className="deck-input" value={dealwaarde}
                  onChange={e => setDealwaarde(Math.max(0, Number(e.target.value)))}
                  onBlur={e => setCalcDealwaarde(Math.max(0, Number(e.target.value)))}
                  style={{ ...inputStyle, paddingLeft: 30 }}
                />
              </div>
            </div>
            <div>
              <label style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase', display: 'block', marginBottom: 8 }}>
                {t.margeLabel}
              </label>
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.35)', fontSize: 15, fontWeight: 600, pointerEvents: 'none' }}>%</span>
                <input type="number" className="deck-input" value={marge}
                  onChange={e => setMarge(Math.min(100, Math.max(0, Number(e.target.value))))}
                  onBlur={e => setCalcMarge(Math.min(100, Math.max(0, Number(e.target.value))))}
                  style={{ ...inputStyle, paddingRight: 34 }}
                />
              </div>
            </div>
          </div>

          <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: 24 }}>
            <div style={{ background: 'rgba(57,106,252, 0.07)', border: '1px solid rgba(57,106,252, 0.2)', borderRadius: 14, padding: '20px 22px' }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: 'rgba(255,255,255,0.5)', marginBottom: 14 }}>€8.000</div>
              <div key={be8000} className="scale-in" style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                <span style={{ fontSize: 44, fontWeight: 800, color: 'white', letterSpacing: -2, lineHeight: 1 }}>{be8000 ?? '?'}</span>
                <span style={{ fontSize: 16, color: 'rgba(255,255,255,0.45)', fontWeight: 600 }}>
                  {be8000 !== null ? (be8000 === 1 ? t.clientSingular : t.clientPlural) : ''}
                </span>
              </div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)', marginTop: 8 }}>{t.recover}</div>
            </div>
          </div>

          {profit > 0 && (
            <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.25)', marginTop: 18, fontStyle: 'italic' }}>
              {t.profitLine(calcDealwaarde, calcMarge, profit)}
            </p>
          )}
        </div>

        <div style={{ marginTop: 32, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
          <div style={{ width: '100%', maxWidth: 360 }}>
            <label style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase', display: 'block', marginBottom: 8 }}>
              {t.orgLabel}
            </label>
            <input type="text" className="deck-input" value={orgNaam} onChange={e => setOrgNaam(e.target.value)}
              style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, padding: '11px 14px', color: 'white', fontSize: 15, fontWeight: 600, outline: 'none' }}
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button onClick={copyLink} style={{
              background: copied ? 'rgba(57,106,252,0.15)' : 'rgba(255,255,255,0.06)',
              border: `1px solid ${copied ? 'rgba(57,106,252,0.4)' : 'rgba(255,255,255,0.11)'}`,
              borderRadius: 12, padding: '12px 28px',
              color: copied ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.55)',
              fontSize: 14, fontWeight: 600, cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: 8,
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
              {copied ? t.shareCopied : t.shareBtn}
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}

function ResultSection({ lang }) {
  const [ref, inView] = useInView(0.2)
  const [hovered, setHovered] = useState(null)
  const [hoveredChip, setHoveredChip] = useState(null)
  const t = T[lang].result

  return (
    <div data-section ref={ref} style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '80px 80px 100px',
    }}>
      <div style={{ maxWidth: 1040, width: '100%' }}>

        <div className={inView ? 'fade-up' : ''} style={{ '--d': '0ms', opacity: inView ? undefined : 0, marginBottom: 36 }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 12 }}>
            {t.label}
          </p>
          <h2 style={{ fontSize: 34, fontWeight: 800, color: 'white', lineHeight: 1.2, letterSpacing: -0.5 }}>
            {t.heading}
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
          <div className={inView ? 'from-left' : ''} onMouseEnter={() => setHovered(0)} onMouseLeave={() => setHovered(null)}
            style={{
              '--d': '180ms', opacity: inView ? undefined : 0,
              background: 'linear-gradient(160deg, rgba(57,106,252,0.14) 0%, rgba(255,255,255,0.03) 100%)',
              border: `1px solid ${hovered === 0 ? 'rgba(57,106,252,0.55)' : 'rgba(57,106,252,0.35)'}`,
              borderRadius: 22, padding: '32px',
              boxShadow: hovered === 0 ? '0 12px 40px rgba(57,106,252,0.22), 0 2px 8px rgba(0,0,0,0.3)' : '0 0 40px rgba(57,106,252,0.1)',
              transform: hovered === 0 ? 'translateY(-6px) scale(1.02)' : 'translateY(0) scale(1)',
              transition: 'transform 0.22s cubic-bezier(0.34,1.4,0.64,1), box-shadow 0.22s ease, border-color 0.2s ease',
            }}
          >
            <div style={{ width: 60, height: 60, borderRadius: 16, marginBottom: 26, background: 'rgba(57,106,252,0.15)', border: '1px solid rgba(57,106,252,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 24px rgba(57,106,252,0.2)' }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={BLUE} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="22,7 13.5,15.5 8.5,10.5 2,17" /><polyline points="16,7 22,7 22,13" />
              </svg>
            </div>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2.5, textTransform: 'uppercase', color: 'rgba(57,106,252,0.6)', marginBottom: 12 }}>01</div>
            <h3 style={{ fontSize: 27, fontWeight: 800, color: 'white', letterSpacing: -0.4, lineHeight: 1.2, marginBottom: 10 }}>{t.card1Title}</h3>
            <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.45)', lineHeight: 1.6 }}>{t.card1Sub}</p>
          </div>

          <div className={inView ? 'from-right' : ''} onMouseEnter={() => setHovered(1)} onMouseLeave={() => setHovered(null)}
            style={{
              '--d': '180ms', opacity: inView ? undefined : 0,
              background: 'linear-gradient(160deg, rgba(139,92,246,0.14) 0%, rgba(255,255,255,0.03) 100%)',
              border: `1px solid ${hovered === 1 ? 'rgba(139,92,246,0.55)' : 'rgba(139,92,246,0.35)'}`,
              borderRadius: 22, padding: '32px',
              boxShadow: hovered === 1 ? '0 12px 40px rgba(139,92,246,0.22), 0 2px 8px rgba(0,0,0,0.3)' : '0 0 40px rgba(139,92,246,0.1)',
              transform: hovered === 1 ? 'translateY(-6px) scale(1.02)' : 'translateY(0) scale(1)',
              transition: 'transform 0.22s cubic-bezier(0.34,1.4,0.64,1), box-shadow 0.22s ease, border-color 0.2s ease',
            }}
          >
            <div style={{ width: 60, height: 60, borderRadius: 16, marginBottom: 26, background: 'rgba(139,92,246,0.15)', border: '1px solid rgba(139,92,246,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 24px rgba(139,92,246,0.2)' }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={PURPLE} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" />
              </svg>
            </div>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2.5, textTransform: 'uppercase', color: 'rgba(139,92,246,0.6)', marginBottom: 12 }}>02</div>
            <h3 style={{ fontSize: 27, fontWeight: 800, color: 'white', letterSpacing: -0.4, lineHeight: 1.2, marginBottom: 10 }}>{t.card2Title}</h3>
            <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.45)', lineHeight: 1.6 }}>{t.card2Sub}</p>
          </div>
        </div>

        <div className={inView ? 'fade-up result-glow' : ''} onMouseEnter={() => setHovered(2)} onMouseLeave={() => setHovered(null)}
          style={{
            '--d': '420ms', opacity: inView ? undefined : 0,
            background: 'linear-gradient(135deg, rgba(57,106,252,0.07) 0%, rgba(139,92,246,0.07) 50%, rgba(14,165,233,0.05) 100%)',
            border: `1px solid ${hovered === 2 ? 'rgba(255,255,255,0.18)' : 'rgba(255,255,255,0.1)'}`,
            borderRadius: 22, padding: '32px 40px',
            transform: hovered === 2 ? 'translateY(-4px)' : 'translateY(0)',
            transition: 'transform 0.22s cubic-bezier(0.34,1.4,0.64,1), border-color 0.2s ease',
          }}
        >
          <div style={{ display: 'flex', gap: 10, marginBottom: 22, flexWrap: 'wrap' }}>
            {t.chips.map((item, i) => (
              <div key={i} onMouseEnter={() => setHoveredChip(i)} onMouseLeave={() => setHoveredChip(null)}
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
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', marginBottom: 18, fontStyle: 'italic' }}>{t.chipNote}</p>
          <p style={{ fontSize: 30, fontWeight: 800, color: 'white', letterSpacing: -0.6, lineHeight: 1.25 }}>{t.statement}</p>
        </div>

      </div>
    </div>
  )
}

export default function App() {
  const [lang, setLang] = useState('nl')

  return (
    <>
      <FixedBackground />
      <FixedFooter lang={lang} setLang={setLang} />
      <div data-scroll style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 64, overflowY: 'auto', zIndex: 1 }}>
        <PillarSection lang={lang} />
        <PhaseSection lang={lang} />
        <ResultSection lang={lang} />
        <ROISection lang={lang} />
      </div>
    </>
  )
}
