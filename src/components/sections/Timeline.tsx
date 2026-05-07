'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

/* ═══════════════════════════════════════════
   VERTICAL KATANA SVG
═══════════════════════════════════════════ */
function KatanaVertical() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <div ref={ref} className="flex justify-center items-center py-4 my-4">
      <svg
        viewBox="0 0 80 580"
        width="72"
        height="580"
        aria-label="Katana — The Journey"
        style={{ filter: 'drop-shadow(0 0 12px rgba(201,168,76,0.25))' }}
      >
        <defs>
          {/* Blade metallic sheen */}
          <linearGradient id="blade-metal" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor="#8a8a9a" stopOpacity="0.85" />
            <stop offset="28%"  stopColor="#c8c8d8" stopOpacity="0.95" />
            <stop offset="50%"  stopColor="#f0f0ff" stopOpacity="1"    />
            <stop offset="72%"  stopColor="#d0d0e0" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#9090a0" stopOpacity="0.8"  />
          </linearGradient>
          {/* Blade edge highlight travelling glint */}
          <linearGradient id="glint-v" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%"   stopColor="white" stopOpacity="0"   />
            <stop offset="40%"  stopColor="white" stopOpacity="0.92"/>
            <stop offset="100%" stopColor="white" stopOpacity="0"   />
          </linearGradient>
          {/* Handle wrap base */}
          <linearGradient id="tsuka-fill" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor="#1a0808" />
            <stop offset="50%"  stopColor="#2e0f0f" />
            <stop offset="100%" stopColor="#1a0808" />
          </linearGradient>
          {/* Tsuba fill */}
          <radialGradient id="tsuba-fill-r" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="rgba(201,168,76,0.18)" />
            <stop offset="100%" stopColor="rgba(201,168,76,0.04)" />
          </radialGradient>
        </defs>

        {/* ── KASHIRA (pommel) ── */}
        <motion.ellipse cx="40" cy="20" rx="11" ry="17"
          fill="rgba(201,168,76,0.12)" stroke="var(--accent-1)" strokeWidth="1.5"
          initial={{ opacity:0, scale:0 }}
          animate={inView ? { opacity:1, scale:1 } : {}}
          style={{ transformOrigin:'40px 20px' }}
          transition={{ duration:0.45, ease:[0.16,1,0.3,1] }}
        />
        <motion.ellipse cx="40" cy="17" rx="7" ry="6"
          fill="none" stroke="var(--accent-1b)" strokeWidth="0.8" strokeOpacity="0.5"
          initial={{ opacity:0 }}
          animate={inView ? { opacity:1 } : {}}
          transition={{ delay:0.1 }}
        />
        {/* kashira cross detail */}
        <motion.line x1="40" y1="7" x2="40" y2="33" stroke="var(--accent-1)" strokeWidth="0.5" strokeOpacity="0.3"
          initial={{ opacity:0 }} animate={inView?{opacity:1}:{}} transition={{ delay:0.12 }} />
        <motion.line x1="30" y1="20" x2="50" y2="20" stroke="var(--accent-1)" strokeWidth="0.5" strokeOpacity="0.3"
          initial={{ opacity:0 }} animate={inView?{opacity:1}:{}} transition={{ delay:0.12 }} />

        {/* ── TSUKA (handle body) ── */}
        <motion.path
          d="M 33,35 L 33,175 Q 34,181 40,182 Q 46,181 47,175 L 47,35 Q 46,29 40,28 Q 34,29 33,35 Z"
          fill="url(#tsuka-fill)" stroke="var(--accent-1)" strokeWidth="0.9"
          initial={{ opacity:0 }}
          animate={inView ? { opacity:1 } : {}}
          transition={{ delay:0.07 }}
        />

        {/* Ito wrapping — crimson diagonals over the handle */}
        {Array.from({ length: 17 }, (_, i) => (
          <motion.g key={i}
            initial={{ opacity:0 }}
            animate={inView ? { opacity:1 } : {}}
            transition={{ delay: 0.1 + i * 0.018 }}
          >
            {/* forward wrap */}
            <line x1="33" y1={40 + i * 8.2} x2="47" y2={40 + i * 8.2 + 6}
              stroke="var(--accent-2)" strokeWidth="1.9" strokeOpacity="0.72" />
            {/* back wrap */}
            <line x1="47" y1={40 + i * 8.2} x2="33" y2={40 + i * 8.2 + 6}
              stroke="#6a1010" strokeWidth="1.1" strokeOpacity="0.42" />
          </motion.g>
        ))}

        {/* Mekugi-ana (pin hole) */}
        <motion.ellipse cx="40" cy="82" rx="2.2" ry="1.6"
          fill="none" stroke="var(--accent-1b)" strokeWidth="0.9" strokeOpacity="0.6"
          initial={{ opacity:0 }} animate={inView?{opacity:1}:{}} transition={{ delay:0.22 }} />

        {/* Menuki ornament bumps */}
        <motion.path d="M 31.5,108 Q 29,113 31.5,118" fill="none" stroke="var(--accent-1b)" strokeWidth="1.6" strokeOpacity="0.7"
          initial={{ opacity:0 }} animate={inView?{opacity:1}:{}} transition={{ delay:0.22 }} />
        <motion.path d="M 48.5,108 Q 51,113 48.5,118" fill="none" stroke="var(--accent-1b)" strokeWidth="1.6" strokeOpacity="0.7"
          initial={{ opacity:0 }} animate={inView?{opacity:1}:{}} transition={{ delay:0.22 }} />

        {/* ── FUCHI (handle collar) ── */}
        <motion.rect x="31" y="181" width="18" height="11" rx="1"
          fill="rgba(201,168,76,0.14)" stroke="var(--accent-1)" strokeWidth="1.3"
          initial={{ opacity:0 }} animate={inView?{opacity:1}:{}} transition={{ delay:0.26 }} />

        {/* ── TSUBA (guard) ── */}
        <motion.ellipse cx="40" cy="210" rx="32" ry="16"
          fill="url(#tsuba-fill-r)" stroke="var(--accent-1)" strokeWidth="2.2"
          initial={{ opacity:0, scaleX:0 }}
          animate={inView ? { opacity:1, scaleX:1 } : {}}
          style={{ transformOrigin:'40px 210px' }}
          transition={{ delay:0.3, duration:0.55, ease:[0.16,1,0.3,1] }}
        />
        <motion.ellipse cx="40" cy="210" rx="25" ry="12"
          fill="none" stroke="var(--accent-1)" strokeWidth="0.8" strokeOpacity="0.35"
          initial={{ opacity:0 }} animate={inView?{opacity:1}:{}} transition={{ delay:0.45 }} />
        {/* Tsuba decorative arcs left/right */}
        <motion.path d="M 10,203 Q 6,210 10,217" fill="none" stroke="var(--accent-1)" strokeWidth="1.1" strokeOpacity="0.55"
          initial={{ opacity:0 }} animate={inView?{opacity:1}:{}} transition={{ delay:0.52 }} />
        <motion.path d="M 70,203 Q 74,210 70,217" fill="none" stroke="var(--accent-1)" strokeWidth="1.1" strokeOpacity="0.55"
          initial={{ opacity:0 }} animate={inView?{opacity:1}:{}} transition={{ delay:0.52 }} />
        {/* Tsuba blade slot */}
        <motion.ellipse cx="40" cy="210" rx="6" ry="4"
          fill="var(--bg-0)" stroke="var(--accent-1)" strokeWidth="1"
          initial={{ opacity:0 }} animate={inView?{opacity:1}:{}} transition={{ delay:0.54 }} />

        {/* ── HABAKI (blade collar/wedge) ── */}
        <motion.path d="M 37,224 L 34.5,252 L 45.5,252 L 43,224 Z"
          fill="rgba(201,168,76,0.22)" stroke="var(--accent-1b)" strokeWidth="1.1"
          initial={{ opacity:0 }} animate={inView?{opacity:1}:{}} transition={{ delay:0.58 }} />

        {/* ── BLADE — filled metallic shape ── */}
        <motion.path
          d="M 34.5,254 C 31.5,380 33,488 35.5,536 L 40,555 L 44.5,536 C 47,488 48.5,380 45.5,254 Z"
          fill="url(#blade-metal)"
          initial={{ opacity:0 }}
          animate={inView ? { opacity:0.92 } : {}}
          transition={{ delay:0.62, duration:0.2 }}
        />

        {/* Blade ha (cutting edge, left) — animated draw */}
        <motion.path
          d="M 34.5,254 C 31.5,380 33,488 35.5,536 L 40,555"
          fill="none" stroke="rgba(200,215,240,0.7)" strokeWidth="0.9"
          initial={{ pathLength:0, opacity:0 }}
          animate={inView ? { pathLength:1, opacity:1 } : {}}
          transition={{ delay:0.65, duration:1.15, ease:[0.16,1,0.3,1] }}
        />
        {/* Blade mune (spine, right) — animated draw */}
        <motion.path
          d="M 45.5,254 C 48.5,380 47,488 44.5,536 L 40,555"
          fill="none" stroke="rgba(150,155,170,0.6)" strokeWidth="0.7"
          initial={{ pathLength:0, opacity:0 }}
          animate={inView ? { pathLength:1, opacity:1 } : {}}
          transition={{ delay:0.68, duration:1.1, ease:[0.16,1,0.3,1] }}
        />
        {/* Shinogi ridge line */}
        <motion.path
          d="M 43.5,254 C 43,380 43,490 43.5,538"
          fill="none" stroke="rgba(240,245,255,0.55)" strokeWidth="0.9"
          initial={{ pathLength:0 }}
          animate={inView ? { pathLength:1 } : {}}
          transition={{ delay:0.8, duration:1.0, ease:[0.16,1,0.3,1] }}
        />
        {/* Blood groove (hi) — crimson */}
        <motion.path
          d="M 44,266 C 43.5,380 43.5,486 44,530"
          fill="none" stroke="var(--accent-2)" strokeWidth="0.85" strokeOpacity="0.45" strokeLinecap="round"
          initial={{ pathLength:0, opacity:0 }}
          animate={inView ? { pathLength:1, opacity:1 } : {}}
          transition={{ delay:0.9, duration:0.95, ease:[0.16,1,0.3,1] }}
        />
        {/* Hamon (temper line) — wavy near the ha */}
        <motion.path
          d="M 36,285 Q 34.5,305 36,325 Q 37.5,345 36,365 Q 34.5,385 36,405 Q 37.5,425 36,445 Q 34.5,465 36,490 Q 37,510 36,525"
          fill="none" stroke="rgba(220,225,245,0.32)" strokeWidth="0.75"
          initial={{ pathLength:0, opacity:0 }}
          animate={inView ? { pathLength:1, opacity:1 } : {}}
          transition={{ delay:1.05, duration:0.85 }}
        />

        {/* ── Kanji engraving on blade ── */}
        <motion.text
          x="42" y="405"
          fontSize="11" textAnchor="middle"
          fill="var(--accent-1)" fillOpacity="0.3"
          fontFamily="serif" fontWeight="700"
          initial={{ opacity:0 }}
          animate={inView ? { opacity:1 } : {}}
          transition={{ delay:1.82 }}
        >旅</motion.text>

        {/* ── GLINT travelling down blade ── */}
        {inView && (
          <motion.rect
            x="33" y="252" width="14" height="40" rx="3"
            fill="url(#glint-v)"
            initial={{ y:252, opacity:0 }}
            animate={{ y:515, opacity:[0, 0.95, 0.95, 0] }}
            transition={{ delay:1.82, duration:0.62, ease:'easeOut' }}
          />
        )}
      </svg>

      {/* Small label */}
      <motion.div
        className="absolute right-4 md:right-[calc(50%-220px)] font-anta text-[9px] tracking-[0.4em] uppercase"
        style={{ color:'var(--text-2)' }}
        initial={{ opacity:0 }} animate={inView?{opacity:1}:{}} transition={{ delay:2 }}
      >
        刀 THE PATH
      </motion.div>
    </div>
  )
}

/* ═══════════════════════════════════════════
   DATA
═══════════════════════════════════════════ */
const EVENTS = [
  { year:'2017',     title:'B.E. Computer Science',       org:'Chitkara University, Punjab',        type:'education',   color:'var(--accent-1)',  details:'Data structures, algorithms, distributed computing. The first spark of engineering curiosity ignited.', kanji:'学' },
  { year:'2019',     title:'Smart India Hackathon',       org:'National Competition',               type:'achievement', color:'var(--accent-2)',  details:'Competed nationally under pressure. Forged instincts for building fast, solving hard problems under fire.', kanji:'戦' },
  { year:'2020',     title:'Software Dev Intern',          org:'Smallcase Technologies, Bangalore', type:'experience',  color:'var(--accent-3)',  details:'First production-grade financial tech system. Built real interfaces that thousands depended on daily.', kanji:'実' },
  { year:'2020–21',  title:'Sole Developer — RidezNow',   org:'Swastik Ridez Now Global',          type:'project',     color:'var(--accent-1b)', details:'Built the complete mobile + web bike rental platform solo. Published on Play Store. Startup raised ₹30 Lakhs.', kanji:'創' },
  { year:'2021',     title:'Software Developer',           org:'GeekyAnts, Bangalore',              type:'experience',  color:'var(--accent-2b)', details:'MERN + React Native at enterprise scale. Delivered projects for ABB, MPL, and JIO.', kanji:'企' },
  { year:'2022',     title:'MERN Stack Developer',        org:'Tru India',                          type:'experience',  color:'var(--accent-1)',  details:'Built Maxel Tracker (AI + OpenAI API), PawPatrol. Scalable APIs, robust backend architecture.', kanji:'構' },
  { year:'2023',     title:'MTech Software Engineering',  org:'BITS Pilani (WILP)',                 type:'education',   color:'var(--accent-3)',  details:'Advanced software systems, architecture, and data analysis — pursuing while working full-time.', kanji:'進' },
  { year:'2025 →',   title:'Senior Software Developer',   org:'Tru India — Current',               type:'current',     color:'var(--accent-1b)', details:'Architecting scalable features, HLD/LLD design, direct client engagement, engineering leadership.', kanji:'覇' },
]

const TYPE_ICONS: Record<string,string> = {
  education:'◎', experience:'◈', project:'◇', achievement:'★', current:'●'
}

/* ═══════════════════════════════════════════
   EVENT CONTENT — reusable for both sides
═══════════════════════════════════════════ */
function EventContent({ ev, right=false }: { ev: typeof EVENTS[0]; right?: boolean }) {
  return (
    <div className={right ? 'text-right' : 'text-left'}>
      {/* Year + type badge */}
      <div className={`flex items-center gap-2 mb-2 flex-wrap ${right ? 'justify-end' : 'justify-start'}`}>
        <span className="font-bebas text-4xl md:text-5xl leading-none" style={{ color:ev.color, opacity:0.2 }}>
          {ev.year}
        </span>
        <span className="font-anta text-[9px] px-2 py-0.5 tracking-widest uppercase"
          style={{ background:ev.color+'14', color:ev.color, border:`1px solid ${ev.color}28` }}>
          {TYPE_ICONS[ev.type]} {ev.type}
        </span>
      </div>
      {/* Title */}
      <h3 className="font-cormorant font-bold text-xl md:text-2xl leading-tight mb-1" style={{ color:'var(--text-0)' }}>
        {ev.title}
      </h3>
      {/* Org */}
      <p className="font-anta text-[10px] tracking-widest mb-3" style={{ color:ev.color, opacity:0.8 }}>
        {ev.org}
      </p>
      {/* Details */}
      <p className="font-dm text-sm leading-relaxed" style={{ color:'var(--text-1)' }}>
        {ev.details}
      </p>
      {/* Current badge */}
      {ev.type === 'current' && (
        <div className={`inline-flex items-center gap-2 mt-3 px-3 py-1.5 font-anta text-[9px] tracking-widest`}
          style={{ background:'rgba(16,185,129,0.1)', border:'1px solid rgba(16,185,129,0.3)', color:'#10b981' }}>
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          CURRENTLY ACTIVE
        </div>
      )}
    </div>
  )
}

/* ═══════════════════════════════════════════
   SINGLE EVENT ROW
═══════════════════════════════════════════ */
function Event({ ev, idx }: { ev: typeof EVENTS[0]; idx: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once:true, margin:'-70px' })
  const isLeft = idx % 2 === 0 // even = left side on desktop

  return (
    <div ref={ref} className="relative flex items-start mb-14 md:mb-16">

      {/* ── LEFT COLUMN (desktop even items) ── */}
      <div className="hidden md:flex flex-1 justify-end pr-10">
        {isLeft ? (
          <motion.div
            className="max-w-[340px] w-full"
            initial={{ opacity:0, x:35, filter:'blur(6px)' }}
            animate={inView ? { opacity:1, x:0, filter:'blur(0px)' } : {}}
            transition={{ duration:0.72, ease:[0.16,1,0.3,1] }}
          >
            <EventContent ev={ev} right />
          </motion.div>
        ) : (
          /* empty spacer so dot stays centered */
          <div className="max-w-[340px] w-full" />
        )}
      </div>

      {/* ── CENTER DOT ── */}
      <div className="flex-shrink-0 ml-4 md:ml-0 z-10">
        <motion.div
          initial={{ scale:0, opacity:0 }}
          animate={inView ? { scale:1, opacity:1 } : {}}
          transition={{ duration:0.45, ease:[0.16,1,0.3,1] }}
          className="w-8 h-8 rounded-full flex items-center justify-center font-anta text-xs"
          style={{
            background: ev.color+'18',
            border: `2px solid ${ev.color}`,
            boxShadow: `0 0 14px ${ev.color}50`,
            color: ev.color,
          }}
        >
          {TYPE_ICONS[ev.type]}
        </motion.div>
      </div>

      {/* ── RIGHT COLUMN (mobile: all items · desktop: odd items) ── */}
      <div className="flex-1 pl-6 md:pl-10">
        {/* Always visible on mobile */}
        <motion.div
          className="block md:hidden"
          initial={{ opacity:0, x:-20, filter:'blur(5px)' }}
          animate={inView ? { opacity:1, x:0, filter:'blur(0px)' } : {}}
          transition={{ duration:0.72, ease:[0.16,1,0.3,1] }}
        >
          <EventContent ev={ev} />
        </motion.div>

        {/* Desktop: only odd items on the right */}
        {!isLeft && (
          <motion.div
            className="hidden md:block max-w-[340px]"
            initial={{ opacity:0, x:-35, filter:'blur(6px)' }}
            animate={inView ? { opacity:1, x:0, filter:'blur(0px)' } : {}}
            transition={{ duration:0.72, ease:[0.16,1,0.3,1] }}
          >
            <EventContent ev={ev} />
          </motion.div>
        )}
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════
   EXPORT
═══════════════════════════════════════════ */
export default function Timeline() {
  const titleRef = useRef<HTMLDivElement>(null)
  const inView = useInView(titleRef, { once:true })

  return (
    <section id="timeline" className="relative py-32 md:py-40 overflow-hidden">
      <div className="absolute inset-0" style={{ background:'radial-gradient(ellipse at left, rgba(201,168,76,0.04) 0%, transparent 55%)' }} />

      <div className="max-w-5xl mx-auto px-4 md:px-8">

        {/* ── HEADER ── */}
        <div ref={titleRef} className="mb-4">
          <motion.div initial={{opacity:0,x:-30}} animate={inView?{opacity:1,x:0}:{}} transition={{duration:0.6}}
            className="flex items-center gap-4 mb-6">
            <span className="font-anta text-[11px] tracking-[0.35em] uppercase" style={{ color:'var(--accent-1)', opacity:0.75 }}>
              CHAPTER 04
            </span>
            <div className="h-px flex-1 max-w-[80px]" style={{ background:'linear-gradient(to right,var(--accent-1),transparent)' }} />
          </motion.div>
          <div className="overflow-hidden">
            <motion.h2 className="font-bebas leading-none" style={{ fontSize:'clamp(3.5rem,9vw,7rem)', color:'var(--text-0)' }}
              initial={{y:'105%'}} animate={inView?{y:'0%'}:{}} transition={{duration:0.8,delay:0.1,ease:[0.16,1,0.3,1]}}>
              The Journey
            </motion.h2>
          </div>
          <div className="overflow-hidden mb-3">
            <motion.h2 className="font-bebas leading-none gradient-text" style={{ fontSize:'clamp(3.5rem,9vw,7rem)' }}
              initial={{y:'105%'}} animate={inView?{y:'0%'}:{}} transition={{duration:0.8,delay:0.18,ease:[0.16,1,0.3,1]}}>
              Timeline
            </motion.h2>
          </div>
          <motion.p initial={{opacity:0}} animate={inView?{opacity:1}:{}} transition={{delay:0.4}}
            className="font-cormorant italic text-xl" style={{ color:'var(--text-1)' }}>
            Every scar tells the story. Every year sharpens the blade.
          </motion.p>
        </div>

        {/* ── KATANA DIVIDER ── */}
        <div className="relative">
          <KatanaVertical />
        </div>

        {/* ── TIMELINE EVENTS ── */}
        <div className="relative mt-8">
          {/* Vertical spine */}
          <div className="absolute left-3.5 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-px"
            style={{ background:'linear-gradient(to bottom,transparent,var(--accent-1),var(--accent-2),var(--accent-1),transparent)', opacity:0.3 }} />

          {EVENTS.map((ev, i) => (
            <Event key={i} ev={ev} idx={i} />
          ))}
        </div>

        {/* ── OUTRO ── */}
        <motion.div
          initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.8}}
          className="mt-10 p-8 relative overflow-hidden text-center"
          style={{ border:'1px solid var(--border)', background:'var(--bg-card)' }}
        >
          <div className="font-cormorant text-5xl font-bold mb-4 select-none" style={{ color:'rgba(201,168,76,0.18)' }}>未</div>
          <h3 className="font-cormorant font-bold text-2xl mb-2" style={{ color:'var(--text-0)' }}>What Comes Next</h3>
          <p className="font-dm text-sm max-w-xs mx-auto" style={{ color:'var(--text-1)' }}>
            Building autonomous AI systems, leading engineering teams, architecting the intelligent products of tomorrow.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
