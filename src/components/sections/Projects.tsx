'use client'
import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

const PROJECTS = [
  {
    id:'maxel', title:'Maxel Tracker', subtitle:'AI-Powered Intelligence Platform', category:'AI × Full Stack', year:'2024', status:'Production',
    color:'var(--accent-1)', accent:'var(--accent-1b)', kanji:'追',
    stack:['React','NestJS','PostgreSQL','OpenAI API','Python','TypeScript'],
    impact:[{label:'AI Integration',value:'OpenAI API + Python',icon:'◈'},{label:'Architecture',value:'Microservices',icon:'◎'},{label:'Scale',value:'Production Ready',icon:'◇'}],
    desc:'A full-stack AI-powered tracking and analytics platform. React frontend with real-time data visualization, NestJS backend with scalable API architecture, integrated OpenAI API with custom Python scripts for advanced AI features, secure authentication, optimized PostgreSQL queries.',
    achievements:['Integrated OpenAI API for intelligent data analysis','Custom Python scripts for advanced AI processing','React frontend with real-time data updates','NestJS backend with scalable API architecture','PostgreSQL with optimized query performance'],
  },
  {
    id:'ridez', title:'RidezNow', subtitle:'Startup Bike Rental Platform', category:'Mobile × Web × Startup', year:'2020–2021', status:'Funded · ₹30L',
    color:'var(--accent-2)', accent:'var(--accent-2b)', kanji:'走',
    stack:['React Native','React','Node.js','MongoDB','Payment Gateway'],
    impact:[{label:'Funding Raised',value:'₹30 Lakhs',icon:'★'},{label:'Platforms',value:'Android + Web',icon:'◑'},{label:'Solo Build',value:'Complete Dev',icon:'◉'}],
    desc:'Built RidezNow as sole developer — a bike rental application for Chandigarh available on the Play Store. Intuitive interface for browsing, booking management, and secure payment processing. The startup raised ₹30 Lakhs in funding.',
    achievements:['Sole developer — mobile and web platforms built independently','Published on Google Play Store','Secure payment processing integration','Startup raised ₹30 Lakhs in funding','Seamless cross-platform user experience'],
  },
  {
    id:'vess', title:'VESS', subtitle:'Virtual Education System Services', category:'EdTech × Full Stack', year:'2021', status:'Completed',
    color:'var(--accent-3)', accent:'var(--accent-3)', kanji:'学',
    stack:['Angular','Go (Golang)','PostgreSQL','REST API','TypeScript'],
    impact:[{label:'Problem Solved',value:'Education Access',icon:'◎'},{label:'Backend',value:'Go + PostgreSQL',icon:'◇'},{label:'Frontend',value:'Angular SPA',icon:'◈'}],
    desc:'Developed VESS to address critical challenges in online education access. Angular SPA for dynamic responsive UI, high-performance Go backend for efficient server-side operations, PostgreSQL for robust data management. Focused on user-centric solutions for online learning.',
    achievements:['Angular frontend with responsive, dynamic UI','High-performance Go backend for efficient operations','PostgreSQL for robust data management','Addressed real-world online education challenges','User-centric design and architecture'],
  },
]

function ProjectCard({ p, i }: { p: typeof PROJECTS[0]; i: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once:true, margin:'-80px' })
  const [open, setOpen] = useState(false)
  return (
    <motion.div ref={ref}
      initial={{ opacity:0, y:60, filter:'blur(8px)' }}
      animate={inView ? { opacity:1, y:0, filter:'blur(0px)' } : {}}
      transition={{ duration:0.9, delay:i*0.12, ease:[0.16,1,0.3,1] }}
      className="relative group overflow-hidden border"
      style={{ borderColor:'var(--border)' }}>

      {/* Header stripe */}
      <motion.div className="h-[3px] relative overflow-hidden"
        animate={{ backgroundPosition:['0% 50%','100% 50%','0% 50%'] }}
        transition={{ duration:4, repeat:Infinity }}
        style={{ background:`linear-gradient(90deg, ${p.color}, ${p.accent}, ${p.color})`, backgroundSize:'200% 100%' }} />

      <div className="p-7 md:p-9" style={{ background:'var(--bg-card)' }}>
        {/* Meta */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <div className="flex items-center gap-3 mb-2 flex-wrap">
              <span className="font-mono text-[10px] tracking-widest uppercase px-2.5 py-1"
                style={{ background:`color-mix(in srgb,${p.color} 12%,transparent)`, color:p.color }}>
                {p.category}
              </span>
              <span className="font-mono text-[10px]" style={{ color:'var(--text-2)' }}>{p.year}</span>
              <span className="font-mono text-[10px] px-2 py-0.5"
                style={{ background:'rgba(16,185,129,0.1)', color:'#10b981', border:'1px solid rgba(16,185,129,0.25)' }}>
                ● {p.status}
              </span>
            </div>
            <h3 className="font-bebas text-3xl md:text-4xl leading-none mb-1" style={{ color:'var(--text-0)' }}>{p.title}</h3>
            <p className="font-cormorant italic text-base" style={{ color:p.color }}>{p.subtitle}</p>
          </div>
          <div className="font-cormorant text-6xl md:text-7xl font-bold select-none flex-shrink-0 ml-4 leading-none"
            style={{ color:p.color, opacity:0.12 }}>{p.kanji}</div>
        </div>

        <p className="font-dm text-sm leading-relaxed mb-6" style={{ color:'var(--text-1)' }}>{p.desc}</p>

        {/* Metrics */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {p.impact.map((m,i) => (
            <div key={i} className="p-3 text-center"
              style={{ background:`color-mix(in srgb,${p.color} 6%,transparent)`, border:`1px solid color-mix(in srgb,${p.color} 18%,transparent)` }}>
              <div className="text-lg mb-1" style={{ color:p.color }}>{m.icon}</div>
              <div className="font-cormorant font-bold text-sm" style={{ color:'var(--text-0)' }}>{m.value}</div>
              <div className="font-mono text-[9px] mt-0.5" style={{ color:'var(--text-2)' }}>{m.label}</div>
            </div>
          ))}
        </div>

        {/* Stack */}
        <div className="flex flex-wrap gap-2 mb-6">
          {p.stack.map((t,i) => (
            <span key={i} className="px-2.5 py-1 font-mono text-[10px]"
              style={{ background:`color-mix(in srgb,${p.color} 8%,transparent)`, border:`1px solid color-mix(in srgb,${p.color} 22%,transparent)`, color:p.color, opacity:0.85 }}>
              {t}
            </span>
          ))}
        </div>

        {/* Expand */}
        <button onClick={() => setOpen(!open)}
          className="flex items-center gap-2 font-mono text-[10px] tracking-widest uppercase transition-colors duration-300"
          style={{ color: open ? p.color : 'var(--text-2)' }}>
          <motion.span animate={{ rotate: open ? 90 : 0 }} transition={{ duration:0.3 }}>▶</motion.span>
          {open ? 'Hide' : 'View'} Engineering Details
        </button>

        <AnimatePresence>
          {open && (
            <motion.div initial={{height:0,opacity:0}} animate={{height:'auto',opacity:1}} exit={{height:0,opacity:0}}
              transition={{duration:0.4,ease:[0.16,1,0.3,1]}} className="overflow-hidden">
              <div className="mt-4 pt-4 space-y-2" style={{ borderTop:`1px solid color-mix(in srgb,${p.color} 18%,transparent)` }}>
                {p.achievements.map((a,i) => (
                  <motion.div key={i} initial={{opacity:0,x:-8}} animate={{opacity:1,x:0}} transition={{delay:i*0.06}}
                    className="flex items-start gap-3 font-dm text-sm" style={{ color:'var(--text-1)' }}>
                    <span className="flex-shrink-0 mt-0.5" style={{ color:p.color }}>◆</span>{a}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background:`radial-gradient(circle at 50% 0%, color-mix(in srgb,${p.color} 4%,transparent) 0%,transparent 55%)` }} />
    </motion.div>
  )
}

export default function Projects() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once:true })
  return (
    <section id="projects" className="relative py-32 md:py-40 overflow-hidden">
      <div className="absolute inset-0" style={{ background:'radial-gradient(ellipse at right,rgba(196,30,58,0.04) 0%,transparent 50%)' }} />
      <div className="absolute inset-0 grid-bg opacity-15" />
      <div className="absolute left-2 top-1/2 -translate-y-1/2 hidden xl:block select-none pointer-events-none font-cormorant font-bold"
        style={{ fontSize:'8rem', color:'rgba(196,30,58,0.03)', writingMode:'vertical-rl' }}>領域展開</div>

      <div className="max-w-5xl mx-auto px-4 md:px-8">
        <div ref={ref} className="mb-16">
          <motion.div initial={{opacity:0,x:-30}} animate={inView?{opacity:1,x:0}:{}} transition={{duration:0.6}} className="flex items-center gap-4 mb-6">
            <span className="font-mono text-[10px] tracking-[0.45em] uppercase" style={{ color:'var(--accent-2)', opacity:0.8 }}>CHAPTER 05</span>
            <div className="h-px flex-1 max-w-[80px]" style={{ background:'linear-gradient(to right,var(--accent-2),transparent)' }} />
          </motion.div>
          <div className="overflow-hidden"><motion.h2 className="font-bebas leading-none" style={{ fontSize:'clamp(3.5rem,9vw,7rem)', color:'var(--text-0)' }}
            initial={{y:'105%'}} animate={inView?{y:'0%'}:{}} transition={{duration:0.8,delay:0.1,ease:[0.16,1,0.3,1]}}>Domain</motion.h2></div>
          <div className="overflow-hidden mb-4"><motion.h2 className="font-bebas leading-none neon-crimson" style={{ fontSize:'clamp(3.5rem,9vw,7rem)' }}
            initial={{y:'105%'}} animate={inView?{y:'0%'}:{}} transition={{duration:0.8,delay:0.18,ease:[0.16,1,0.3,1]}}>Expansions</motion.h2></div>
          <motion.p initial={{opacity:0}} animate={inView?{opacity:1}:{}} transition={{delay:0.4}}
            className="font-cormorant italic text-lg max-w-xl" style={{ color:'var(--text-1)' }}>
            Every project is a domain expansion — a new reality manifested from imagination and code.
          </motion.p>
        </div>
        <div className="space-y-7">{PROJECTS.map((p,i) => <ProjectCard key={p.id} p={p} i={i} />)}</div>
        <motion.div initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.8}}
          className="mt-10 p-7" style={{ background:'rgba(92,127,168,0.04)', border:'1px solid rgba(92,127,168,0.15)' }}>
          <div className="flex items-start gap-4">
            <div className="w-9 h-9 flex-shrink-0 flex items-center justify-center text-lg" style={{ background:'rgba(92,127,168,0.12)', color:'var(--accent-3)' }}>◈</div>
            <div>
              <h4 className="font-cormorant font-bold text-lg mb-1" style={{ color:'var(--text-0)' }}>Enterprise Client Work</h4>
              <p className="font-dm text-sm leading-relaxed" style={{ color:'var(--text-1)' }}>
                Large-scale MERN and React Native projects for <span style={{ color:'var(--text-0)' }}>ABB</span>, <span style={{ color:'var(--text-0)' }}>MPL</span>, and <span style={{ color:'var(--text-0)' }}>JIO</span> at GeekyAnts — full project lifecycles from requirements through deployment.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
