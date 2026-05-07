'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const PANELS = [
  { num:'001', year:'2017', title:'The Awakening',        kanji:'覚醒', desc:'First lines of code at Chitkara University. A spark of curiosity ignited — the seed of an architect planted in digital soil.', color:'var(--accent-1)',  detail:'B.E. Computer Science · Chitkara University' },
  { num:'002', year:'2019', title:'The First Trial',      kanji:'試練', desc:'Smart India Hackathon 2019. Competed nationally, collaborated under pressure — forging instincts in competitive fire.', color:'var(--accent-2)',  detail:'Smart India Hackathon · National Competition' },
  { num:'003', year:'2020', title:'Domain Expansion Begins', kanji:'領域', desc:'Internship at Smallcase Technologies, Bangalore. First exposure to production-grade financial systems at scale.', color:'var(--accent-3)',  detail:'Software Dev Intern · Smallcase Technologies' },
  { num:'004', year:'2021', title:'The Startup Arc',      kanji:'起業', desc:'Built RidezNow solo — complete bike rental platform, mobile + web. The startup raised ₹30 Lakhs in funding.', color:'var(--accent-1b)', detail:'Sole Developer · Swastik Ridez Now · ₹30L Funded' },
  { num:'005', year:'2021', title:'Elite Training Arc',   kanji:'修行', desc:'GeekyAnts, Bangalore. Enterprise clients ABB, MPL, JIO. Large-scale MERN and React Native at industry level.', color:'var(--accent-2b)', detail:'Software Developer · GeekyAnts · ABB · MPL · JIO' },
  { num:'006', year:'2022', title:'Senior Ascension',     kanji:'昇格', desc:'Joined Tru India as Senior Developer. Architecting systems, HLD/LLD, client partnerships. MTech at BITS Pilani begun.', color:'var(--accent-1)',  detail:'Senior Developer · Tru India · MTech BITS Pilani' },
]

function Panel({ p, i }: { p: typeof PANELS[0]; i: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once:true, margin:'-80px' })
  return (
    <motion.div ref={ref}
      initial={{ opacity:0, y:50, rotateX:10 }}
      animate={inView ? { opacity:1, y:0, rotateX:0 } : {}}
      transition={{ duration:0.8, delay:(i%3)*0.1, ease:[0.16,1,0.3,1] }}
      style={{ perspective:800 }}>
      <div className="group relative p-6 md:p-7 border card-hover overflow-hidden h-full"
        style={{ borderColor:'var(--border)', background:'var(--bg-card)' }}>

        <div className="flex items-start justify-between mb-5">
          <div>
            <span className="font-mono text-[10px] tracking-[0.35em] uppercase" style={{ color:p.color, opacity:0.7 }}>PANEL {p.num}</span>
            <div className="font-bebas text-4xl leading-none mt-1" style={{ color:'var(--text-2)', opacity:0.6 }}>{p.year}</div>
          </div>
          <div className="font-cormorant text-4xl font-bold select-none" style={{ color:p.color, opacity:0.15 }}>{p.kanji}</div>
        </div>

        <div className="flex items-center gap-3 mb-3">
          <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background:p.color, boxShadow:`0 0 8px ${p.color}` }} />
          <h3 className="font-cormorant font-bold text-xl" style={{ color:'var(--text-0)' }}>{p.title}</h3>
        </div>
        <p className="font-dm text-sm leading-relaxed mb-4" style={{ color:'var(--text-1)' }}>{p.desc}</p>
        <div className="inline-flex items-center gap-2 px-2.5 py-1.5 font-mono text-[10px]"
          style={{ background:`color-mix(in srgb, ${p.color} 10%, transparent)`, border:`1px solid color-mix(in srgb, ${p.color} 25%, transparent)`, color:p.color, opacity:0.85 }}>
          {p.detail}
        </div>

        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{ background:`radial-gradient(circle at 50% 0%, color-mix(in srgb, ${p.color} 6%, transparent) 0%, transparent 60%)` }} />
        <div className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background:`linear-gradient(90deg,transparent,${p.color},transparent)`, opacity:0.5 }} />
      </div>
    </motion.div>
  )
}

export default function OriginArc() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once:true })
  return (
    <section id="origin" className="relative py-32 md:py-40 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="absolute inset-0" style={{ background:'radial-gradient(ellipse at top,rgba(201,168,76,0.05) 0%,transparent 55%)' }} />
      <div className="absolute left-3 top-1/2 -translate-y-1/2 hidden xl:block select-none pointer-events-none font-cormorant font-bold"
        style={{ fontSize:'9rem', color:'rgba(201,168,76,0.03)', writingMode:'vertical-rl' }}>起源覚醒</div>

      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div ref={ref} className="mb-16">
          <motion.div initial={{opacity:0,x:-30}} animate={inView?{opacity:1,x:0}:{}} transition={{duration:0.6}}
            className="flex items-center gap-4 mb-6">
            <span className="font-mono text-[10px] tracking-[0.45em] uppercase" style={{ color:'var(--accent-1)', opacity:0.7 }}>CHAPTER 01</span>
            <div className="h-px flex-1 max-w-[80px]" style={{ background:'linear-gradient(to right,var(--accent-1),transparent)' }} />
          </motion.div>
          <div className="overflow-hidden">
            <motion.h2 className="font-bebas leading-none" style={{ fontSize:'clamp(3.5rem,9vw,7rem)', color:'var(--text-0)' }}
              initial={{y:'105%'}} animate={inView?{y:'0%'}:{}} transition={{duration:0.8,delay:0.1,ease:[0.16,1,0.3,1]}}>
              The Origin
            </motion.h2>
          </div>
          <div className="overflow-hidden mb-4">
            <motion.h2 className="font-bebas leading-none gradient-text" style={{ fontSize:'clamp(3.5rem,9vw,7rem)' }}
              initial={{y:'105%'}} animate={inView?{y:'0%'}:{}} transition={{duration:0.8,delay:0.18,ease:[0.16,1,0.3,1]}}>
              Arc
            </motion.h2>
          </div>
          <motion.p initial={{opacity:0}} animate={inView?{opacity:1}:{}} transition={{delay:0.4}}
            className="font-cormorant italic text-lg max-w-lg" style={{ color:'var(--text-1)' }}>
            Every master was once a beginner. Every legend began with a single line of code.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {PANELS.map((p,i) => <Panel key={i} p={p} i={i} />)}
        </div>

        <motion.div initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.8}}
          className="mt-14 p-8 md:p-10 relative overflow-hidden"
          style={{ border:'1px solid var(--border)', background:'var(--bg-card)' }}>
          <div className="relative z-10">
            <p className="font-cormorant font-bold text-2xl md:text-3xl mb-2" style={{ color:'var(--text-0)' }}>4+ Years of Production Experience</p>
            <p className="font-dm text-sm leading-relaxed" style={{ color:'var(--text-1)' }}>
              From intern to senior engineer — building scalable systems, leading architecture decisions, and integrating intelligent AI capabilities across every layer of the stack.
            </p>
          </div>
          <div className="absolute top-4 right-8 font-cormorant text-7xl font-bold select-none" style={{ color:'rgba(201,168,76,0.06)' }}>道</div>
          <div className="absolute inset-0" style={{ background:'radial-gradient(circle at 0% 50%,rgba(201,168,76,0.05) 0%,transparent 55%)' }} />
        </motion.div>
      </div>
    </section>
  )
}
