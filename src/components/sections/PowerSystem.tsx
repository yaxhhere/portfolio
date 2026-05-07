'use client'
import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const POWERS = [
  { name:'Full Stack Domain Control',        tech:'MERN Stack',              level:95, color:'var(--accent-1)',  kanji:'全', desc:'MongoDB · Express.js · React · Node.js — complete mastery of the modern web stack.' },
  { name:'Reactive Interface Manipulation',  tech:'React / Next.js',         level:93, color:'var(--accent-3)',  kanji:'反', desc:'SSR, SSG, ISR, component architecture — crafting interfaces that respond to reality.' },
  { name:'Backend Core Engine',              tech:'Node.js / NestJS',        level:90, color:'var(--accent-1b)', kanji:'核', desc:'REST APIs, WebSockets, event-driven arch — the invisible engine powering every experience.' },
  { name:'Infinite Data Archive',            tech:'MongoDB / PostgreSQL',    level:88, color:'var(--accent-2)',  kanji:'蔵', desc:'Schema design, query optimization, indexing — commanding the archive of structured knowledge.' },
  { name:'Dimensional Rendering',            tech:'Three.js / WebGL',        level:78, color:'var(--accent-1)',  kanji:'次', desc:'Procedural geometry, shaders, particle systems — rendering new dimensions of digital space.' },
  { name:'Cognitive Engine Synthesis',       tech:'OpenAI API / AI Systems', level:82, color:'var(--accent-2b)', kanji:'知', desc:'LLM integration, prompt engineering — synthesizing machine cognition into products.' },
  { name:'Cloud Infrastructure Matrix',      tech:'AWS / Azure / Docker',    level:84, color:'var(--accent-3)',  kanji:'雲', desc:'EC2, S3, Lightsail, Azure DevOps, Docker — deploying realities across the cloud matrix.' },
  { name:'Mobile Reality Extension',         tech:'React Native',            level:76, color:'var(--accent-2)',  kanji:'拡', desc:'Cross-platform mobile development — extending digital domains to every pocket.' },
  { name:'Structured Backend Architecture',  tech:'NestJS / System Design',  level:87, color:'var(--accent-1b)', kanji:'構', desc:'HLD/LLD design, modular architecture — structuring systems that endure at scale.' },
  { name:'Version Control Mastery',          tech:'Git / CI/CD',             level:92, color:'var(--accent-1)',  kanji:'制', desc:'Branching strategies, deployment pipelines — mastering the flow of collaborative creation.' },
]

function PowerCard({ p, i }: { p: typeof POWERS[0]; i: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once:true, margin:'-60px' })
  const [hov, setHov] = useState(false)
  return (
    <motion.div ref={ref}
      initial={{ opacity:0, scale:0.92, y:24 }}
      animate={inView ? { opacity:1, scale:1, y:0 } : {}}
      transition={{ duration:0.65, delay:(i%5)*0.07, ease:[0.16,1,0.3,1] }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      className="relative group p-5 border overflow-hidden cursor-pointer"
      style={{
        borderColor: hov ? `color-mix(in srgb, ${p.color} 50%, transparent)` : 'var(--border)',
        background: hov ? `color-mix(in srgb, ${p.color} 6%, var(--bg-card))` : 'var(--bg-card)',
        transform: hov ? 'translateY(-4px)' : 'none',
        boxShadow: hov ? `0 0 30px color-mix(in srgb, ${p.color} 20%, transparent)` : 'none',
        transition:'all 0.35s ease',
      }}>

      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="font-anta text-[10px] tracking-widest uppercase mb-1" style={{ color:p.color, opacity:0.75 }}>{p.tech}</div>
          <h3 className="font-cormorant font-bold text-base leading-tight" style={{ color:'var(--text-0)' }}>{p.name}</h3>
        </div>
        <div className="font-cormorant text-3xl font-bold select-none ml-2 flex-shrink-0"
          style={{ color:p.color, opacity: hov ? 0.6 : 0.12, transition:'opacity 0.3s' }}>{p.kanji}</div>
      </div>

      <p className="font-dm text-xs leading-relaxed mb-4" style={{ color:'var(--text-1)' }}>{p.desc}</p>

      <div className="space-y-1.5">
        <div className="flex justify-between">
          <span className="font-anta text-[10px]" style={{ color:'var(--text-2)' }}>POWER LEVEL</span>
          <span className="font-anta text-[10px] font-bold" style={{ color:p.color }}>{p.level}%</span>
        </div>
        <div className="h-[2px] rounded-full overflow-hidden" style={{ background:'var(--border)' }}>
          <motion.div className="h-full rounded-full"
            initial={{ width:0 }}
            animate={inView ? { width:`${p.level}%` } : { width:0 }}
            transition={{ duration:1.2, delay:(i%5)*0.07+0.3, ease:[0.16,1,0.3,1] }}
            style={{ background:`linear-gradient(90deg, color-mix(in srgb, ${p.color} 60%, transparent), ${p.color})`,
              boxShadow: hov ? `0 0 6px ${p.color}` : 'none' }} />
        </div>
      </div>

      <div className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-400"
        style={{ background:`linear-gradient(90deg,transparent,${p.color},transparent)` }} />
    </motion.div>
  )
}

export default function PowerSystem() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once:true })
  return (
    <section id="power" className="relative py-32 md:py-40 overflow-hidden">
      <div className="absolute inset-0" style={{ background:'radial-gradient(ellipse at center,rgba(92,127,168,0.05) 0%,transparent 55%)' }} />
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="absolute right-3 top-1/2 -translate-y-1/2 hidden xl:block select-none pointer-events-none font-cormorant font-bold"
        style={{ fontSize:'9rem', color:'rgba(201,168,76,0.03)', writingMode:'vertical-rl' }}>能力開放</div>

      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div ref={ref} className="mb-16">
          <motion.div initial={{opacity:0,x:-30}} animate={inView?{opacity:1,x:0}:{}} transition={{duration:0.6}}
            className="flex items-center gap-4 mb-6">
            <span className="font-anta text-[11px] tracking-[0.3em] uppercase" style={{ color:'var(--accent-3)', opacity:0.8 }}>CHAPTER 02</span>
            <div className="h-px flex-1 max-w-[80px]" style={{ background:'linear-gradient(to right,var(--accent-3),transparent)' }} />
          </motion.div>
          <div className="overflow-hidden"><motion.h2 className="font-bebas leading-none" style={{ fontSize:'clamp(3.5rem,9vw,7rem)', color:'var(--text-0)' }}
            initial={{y:'105%'}} animate={inView?{y:'0%'}:{}} transition={{duration:0.8,delay:0.1,ease:[0.16,1,0.3,1]}}>Power</motion.h2></div>
          <div className="overflow-hidden mb-4"><motion.h2 className="font-bebas leading-none neon-steel" style={{ fontSize:'clamp(3.5rem,9vw,7rem)' }}
            initial={{y:'105%'}} animate={inView?{y:'0%'}:{}} transition={{duration:0.8,delay:0.18,ease:[0.16,1,0.3,1]}}>System</motion.h2></div>
          <motion.p initial={{opacity:0}} animate={inView?{opacity:1}:{}} transition={{delay:0.4}}
            className="font-cormorant italic text-lg max-w-xl" style={{ color:'var(--text-1)' }}>
            Technical abilities manifested as domain-specific powers. Each skill forged through years of production battle.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 md:gap-4">
          {POWERS.map((p,i) => <PowerCard key={i} p={p} i={i} />)}
        </div>

        <motion.div initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.8}}
          className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { num:'4+', label:'Years Production', color:'var(--accent-1)' },
            { num:'10+', label:'Core Technologies', color:'var(--accent-3)' },
            { num:'₹30L', label:'Startup Funded', color:'var(--accent-1b)' },
            { num:'3', label:'Fortune 500 Clients', color:'var(--accent-2)' },
          ].map((s,i) => (
            <div key={i} className="p-6 text-center" style={{ border:'1px solid var(--border)', background:'var(--bg-card)' }}>
              <div className="font-bebas text-4xl md:text-5xl mb-1" style={{ color:s.color }}>{s.num}</div>
              <div className="font-anta text-[10px] tracking-widest uppercase" style={{ color:'var(--text-2)' }}>{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
