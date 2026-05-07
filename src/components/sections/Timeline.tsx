'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

/* ═══════════════════════════════
   KATANA SVG — animated unsheath
═══════════════════════════════ */
function KatanaDivider() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-120px' })

  return (
    <div ref={ref} className="relative w-full py-6 md:py-10 flex items-center justify-center overflow-hidden">
      <svg viewBox="0 0 820 60" className="w-full max-w-3xl" height="60" aria-hidden="true">
        {/* ─ Pommel ─ */}
        <motion.ellipse cx="62" cy="30" rx="9" ry="12" fill="none"
          stroke="var(--accent-1)" strokeWidth="1.5"
          initial={{ opacity:0, scale:0 }} style={{ transformOrigin:'62px 30px' }}
          animate={inView ? { opacity:1, scale:1 } : {}}
          transition={{ duration:0.4, ease:[0.16,1,0.3,1] }} />

        {/* ─ Tsuka (grip) ─ */}
        <motion.rect x="68" y="22" width="68" height="16" rx="3" fill="none"
          stroke="var(--accent-1)" strokeWidth="1.5" strokeOpacity="0.8"
          initial={{ opacity:0 }}
          animate={inView ? { opacity:1 } : {}}
          transition={{ delay:0.12, duration:0.3 }} />

        {/* wrapping lines on grip */}
        {[78,88,98,108,118,128].map((x,i) => (
          <motion.line key={i} x1={x} y1={22} x2={x+4} y2={38}
            stroke="var(--accent-2)" strokeWidth="1" strokeOpacity="0.5"
            initial={{ opacity:0 }}
            animate={inView ? { opacity:1 } : {}}
            transition={{ delay:0.18 + i*0.03 }} />
        ))}

        {/* ─ Tsuba (guard) ─ */}
        <motion.ellipse cx="142" cy="30" rx="11" ry="17" fill="none"
          stroke="var(--accent-1)" strokeWidth="2"
          initial={{ opacity:0, scaleY:0 }} style={{ transformOrigin:'142px 30px' }}
          animate={inView ? { opacity:1, scaleY:1 } : {}}
          transition={{ delay:0.28, duration:0.45, ease:[0.16,1,0.3,1] }} />

        {/* tsuba inner detail */}
        <motion.ellipse cx="142" cy="30" rx="6" ry="10" fill="none"
          stroke="var(--accent-1)" strokeWidth="1" strokeOpacity="0.4"
          initial={{ opacity:0 }}
          animate={inView ? { opacity:1 } : {}}
          transition={{ delay:0.4 }} />

        {/* ─ Habaki (blade collar) ─ */}
        <motion.rect x="153" y="26" width="12" height="8" rx="1" fill="none"
          stroke="var(--accent-1b)" strokeWidth="1.2" strokeOpacity="0.7"
          initial={{ opacity:0 }}
          animate={inView ? { opacity:1 } : {}}
          transition={{ delay:0.46 }} />

        {/* ─ BLADE — main draw animation ─ */}
        <motion.path d="M 165,29.5 L 800,28"
          fill="none" stroke="var(--accent-1)" strokeWidth="2"
          initial={{ pathLength:0, opacity:0 }}
          animate={inView ? { pathLength:1, opacity:1 } : {}}
          transition={{ delay:0.5, duration:1.15, ease:[0.16,1,0.3,1] }}
          style={{ filter:'drop-shadow(0 0 5px var(--glow-1))' }} />

        {/* blade edge (thinner top line) */}
        <motion.path d="M 165,28.2 L 795,26.8"
          fill="none" stroke="var(--accent-1b)" strokeWidth="0.6" strokeOpacity="0.5"
          initial={{ pathLength:0, opacity:0 }}
          animate={inView ? { pathLength:1, opacity:1 } : {}}
          transition={{ delay:0.55, duration:1.1, ease:[0.16,1,0.3,1] }} />

        {/* ─ Kissaki (tip) ─ */}
        <motion.path d="M 796,28 L 810,29 L 796,30.5"
          fill="none" stroke="var(--accent-1)" strokeWidth="1.5"
          initial={{ opacity:0 }}
          animate={inView ? { opacity:1 } : {}}
          transition={{ delay:1.55, duration:0.25 }} />

        {/* ─ Blood / energy groove on blade ─ */}
        <motion.path d="M 220,29 L 680,28.5"
          fill="none" stroke="var(--accent-2)" strokeWidth="0.5" strokeOpacity="0.35"
          initial={{ pathLength:0, opacity:0 }}
          animate={inView ? { pathLength:1, opacity:1 } : {}}
          transition={{ delay:0.7, duration:0.9, ease:[0.16,1,0.3,1] }} />

        {/* ─ Kanji on blade ─ */}
        <motion.text x="490" y="25.5" fontSize="10" textAnchor="middle"
          fill="var(--accent-1)" fillOpacity="0.35"
          fontFamily="serif" fontWeight="700"
          initial={{ opacity:0 }}
          animate={inView ? { opacity:1 } : {}}
          transition={{ delay:1.7 }}>
          旅
        </motion.text>

        {/* ─ Glint travelling along blade ─ */}
        {inView && (
          <motion.rect x="165" y="27" width="60" height="3" rx="1.5"
            fill="url(#glint-grad)"
            initial={{ x: 165, opacity:0 }}
            animate={{ x: 760, opacity:[0, 0.9, 0.9, 0] }}
            transition={{ delay:1.65, duration:0.55, ease:'easeOut' }} />
        )}

        <defs>
          <linearGradient id="glint-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="40%" stopColor="white" stopOpacity="0.9" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>

      {/* Label */}
      <motion.span
        className="absolute right-0 font-mono text-[10px] tracking-[0.35em] uppercase"
        style={{ color:'var(--text-2)' }}
        initial={{ opacity:0 }} animate={inView ? { opacity:1 } : {}} transition={{ delay:1.8 }}>
        刀
      </motion.span>
    </div>
  )
}

/* ═══════════════════════════════
   TIMELINE DATA
═══════════════════════════════ */
const EVENTS = [
  { year:'2017', title:'B.E. Computer Science',    org:'Chitkara University, Punjab',            type:'education', color:'var(--accent-1)', details:'Data structures, algorithms, distributed computing. The first spark of engineering curiosity.', kanji:'学' },
  { year:'2019', title:'Smart India Hackathon',    org:'National Competition',                    type:'achievement', color:'var(--accent-2)', details:'Collaborated on national-scale problem solving under competitive pressure. Forged instincts for building fast.', kanji:'戦' },
  { year:'2020', title:'Software Dev Intern',       org:'Smallcase Technologies, Bangalore',      type:'experience', color:'var(--accent-3)', details:'First production-grade financial tech system. Built real interfaces that thousands of users depended on daily.', kanji:'実' },
  { year:'2020–21', title:'Sole Developer — RidezNow', org:'Swastik Ridez Now Global',           type:'project', color:'var(--accent-1b)', details:'Built complete mobile + web bike rental platform solo. Published on Play Store. Startup raised ₹30 Lakhs in funding.', kanji:'創' },
  { year:'2021', title:'Software Developer',        org:'GeekyAnts, Bangalore',                   type:'experience', color:'var(--accent-2b)', details:'MERN + React Native at enterprise scale. Delivered projects for ABB, MPL, and JIO.', kanji:'企' },
  { year:'2022', title:'MERN Stack Developer',      org:'Tru India',                              type:'experience', color:'var(--accent-1)', details:'Built Maxel Tracker (AI + OpenAI), PawPatrol. Scalable APIs, robust backend architecture.', kanji:'構' },
  { year:'2023', title:'MTech Software Engineering','org':'BITS Pilani (WILP)',                   type:'education', color:'var(--accent-3)', details:'Advanced software systems, architecture, data analysis — pursuing while working full-time.', kanji:'進' },
  { year:'2025 →', title:'Senior Software Developer','org':'Tru India (Current)',                 type:'current', color:'var(--accent-1b)', details:'Architecting scalable features, HLD/LLD design, direct client engagement, engineering leadership.', kanji:'覇' },
]

const TYPE_ICONS: Record<string,string> = { education:'◎', experience:'◈', project:'◇', achievement:'★', current:'●' }

function Event({ ev, index, left }: { ev: typeof EVENTS[0]; index: number; left: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once:true, margin:'-80px' })

  return (
    <div ref={ref} className="relative flex items-start flex-row">
      {/* Content */}
      <motion.div
        initial={{ opacity:0, x: left ? 40 : -40, filter:'blur(6px)' }}
        animate={inView ? { opacity:1, x:0, filter:'blur(0px)' } : {}}
        transition={{ duration:0.75, delay:0.08, ease:[0.16,1,0.3,1] }}
        className={`flex-1 pb-14 ${left ? 'md:pl-0 md:pr-14 md:text-right' : 'md:pr-0 md:pl-14'} pl-14`}>

        <div className={`flex items-center gap-2 mb-3 flex-wrap ${left ? 'md:flex-row-reverse' : ''}`}>
          <span className="font-bebas text-4xl leading-none" style={{ color: ev.color, opacity:0.22 }}>{ev.year}</span>
          <span className="font-mono text-[10px] px-2 py-0.5 tracking-widest uppercase"
            style={{ background: ev.color + '14', color: ev.color, border:`1px solid ${ev.color}30` }}>
            {TYPE_ICONS[ev.type]} {ev.type.toUpperCase()}
          </span>
        </div>

        <h3 className="font-cormorant font-bold text-2xl md:text-3xl mb-1" style={{ color:'var(--text-0)' }}>{ev.title}</h3>
        <p className="font-mono text-xs mb-3" style={{ color: ev.color, opacity:0.8 }}>{ev.org}</p>
        <p className="font-dm text-sm leading-relaxed" style={{ color:'var(--text-1)' }}>{ev.details}</p>

        {ev.type === 'current' && (
          <div className="inline-flex items-center gap-2 mt-3 px-3 py-1.5 font-mono text-xs"
            style={{ background:'rgba(16,185,129,0.1)', border:'1px solid rgba(16,185,129,0.3)', color:'#10b981' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"/>
            CURRENTLY ACTIVE
          </div>
        )}
      </motion.div>

      {/* Centre dot */}
      <div className="absolute left-0 md:relative md:left-auto md:flex-none md:w-14 flex justify-center">
        <motion.div
          initial={{ scale:0, opacity:0 }}
          animate={inView ? { scale:1, opacity:1 } : {}}
          transition={{ duration:0.5, ease:[0.16,1,0.3,1] }}
          className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold z-10 relative"
          style={{ background: ev.color + '18', border:`2px solid ${ev.color}`, boxShadow:`0 0 14px ${ev.color}50`, color: ev.color }}>
          {TYPE_ICONS[ev.type]}
        </motion.div>
      </div>

      <div className="hidden md:block flex-1" />
    </div>
  )
}

/* ═══════════════════════════════
   EXPORT
═══════════════════════════════ */
export default function Timeline() {
  const titleRef = useRef<HTMLDivElement>(null)
  const inView = useInView(titleRef, { once:true })

  return (
    <section id="timeline" className="relative py-32 md:py-40 overflow-hidden">
      <div className="absolute inset-0" style={{ background:'radial-gradient(ellipse at left, rgba(201,168,76,0.04) 0%, transparent 55%)' }} />

      <div className="max-w-4xl mx-auto px-4 md:px-8">
        {/* Header */}
        <div ref={titleRef} className="mb-6 md:mb-8">
          <motion.div initial={{opacity:0,x:-30}} animate={inView?{opacity:1,x:0}:{}} transition={{duration:0.6}}
            className="flex items-center gap-4 mb-6">
            <span className="font-mono text-[10px] tracking-[0.45em] uppercase" style={{ color:'var(--accent-1)', opacity:0.7 }}>CHAPTER 04</span>
            <div className="h-px flex-1 max-w-[80px]" style={{ background:'linear-gradient(to right, var(--accent-1), transparent)' }} />
          </motion.div>
          <div className="overflow-hidden">
            <motion.h2 className="font-bebas leading-none mb-1" style={{ fontSize:'clamp(3.5rem,9vw,7rem)', color:'var(--text-0)' }}
              initial={{y:'105%'}} animate={inView?{y:'0%'}:{}} transition={{duration:0.8,delay:0.1,ease:[0.16,1,0.3,1]}}>
              The Journey
            </motion.h2>
          </div>
          <div className="overflow-hidden mb-4">
            <motion.h2 className="font-bebas leading-none gradient-text" style={{ fontSize:'clamp(3.5rem,9vw,7rem)' }}
              initial={{y:'105%'}} animate={inView?{y:'0%'}:{}} transition={{duration:0.8,delay:0.18,ease:[0.16,1,0.3,1]}}>
              Timeline
            </motion.h2>
          </div>
          <motion.p initial={{opacity:0}} animate={inView?{opacity:1}:{}} transition={{delay:0.4}}
            className="font-cormorant italic text-lg" style={{ color:'var(--text-1)' }}>
            Every scar tells the story. Every year sharpens the blade.
          </motion.p>
        </div>

        {/* ── KATANA DIVIDER ── */}
        <KatanaDivider />

        {/* Timeline entries */}
        <div className="relative mt-4">
          {/* Vertical line */}
          <div className="absolute left-3.5 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-px"
            style={{ background:'linear-gradient(to bottom, transparent, var(--accent-1), var(--accent-2), var(--accent-1), transparent)', opacity:0.35 }} />

          <div className="space-y-0">
            {EVENTS.map((ev,i) => <Event key={i} ev={ev} index={i} left={i%2===1} />)}
          </div>
        </div>

        {/* Outro */}
        <motion.div initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.8}}
          className="mt-12 p-8 relative overflow-hidden text-center"
          style={{ border:'1px solid var(--border)', background:'var(--bg-card)' }}>
          <div className="font-cormorant text-5xl font-bold mb-4 select-none" style={{ color:'rgba(201,168,76,0.15)' }}>未</div>
          <h3 className="font-cormorant font-bold text-2xl mb-2" style={{ color:'var(--text-0)' }}>What Comes Next</h3>
          <p className="font-dm text-sm max-w-xs mx-auto" style={{ color:'var(--text-1)' }}>
            Building autonomous AI systems, leading engineering teams, architecting the intelligent products of tomorrow.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
