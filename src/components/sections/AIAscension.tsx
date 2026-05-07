'use client'
import { useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'

function NeuralCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animRef = useRef(0)
  const mouseRef = useRef({ x:0, y:0 })

  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return
    const ctx = canvas.getContext('2d'); if (!ctx) return
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight }
    resize(); window.addEventListener('resize', resize)
    canvas.addEventListener('mousemove', (e) => {
      const r = canvas.getBoundingClientRect()
      mouseRef.current = { x: e.clientX-r.left, y: e.clientY-r.top }
    })
    const nodes = Array.from({length:26},(_,i) => ({
      x: 50+Math.random()*(canvas.width-100), y: 50+Math.random()*(canvas.height-100),
      vx:(Math.random()-0.5)*0.45, vy:(Math.random()-0.5)*0.45,
      r: 3+Math.random()*5, pulse: Math.random()*Math.PI*2,
      color:['#c9a84c','#c41e3a','#5c7fa8','#e8c97e','#8b1a2f'][Math.floor(Math.random()*5)],
      label:['AI','ML','API','DB','LLM','RAG','VEC','EMB','AGT','ORC','NLP','SYS'][i%12],
    }))
    const packets: {from:number,to:number,t:number,color:string}[] = []
    let frame = 0
    const render = () => {
      frame++
      const W = canvas.width, H = canvas.height
      ctx.clearRect(0,0,W,H)
      if (frame%45===0) {
        const a=Math.floor(Math.random()*nodes.length), b=Math.floor(Math.random()*nodes.length)
        if (a!==b) packets.push({from:a,to:b,t:0,color:['#c9a84c','#c41e3a','#5c7fa8'][Math.floor(Math.random()*3)]})
      }
      nodes.forEach(n => {
        n.x+=n.vx; n.y+=n.vy; n.pulse+=0.018
        if (n.x<40||n.x>W-40) n.vx*=-1
        if (n.y<40||n.y>H-40) n.vy*=-1
        const dx=n.x-mouseRef.current.x, dy=n.y-mouseRef.current.y
        const d=Math.sqrt(dx*dx+dy*dy)
        if (d<80&&d>0) { n.vx+=dx/d*0.18; n.vy+=dy/d*0.18 }
        n.vx*=0.99; n.vy*=0.99
      })
      nodes.forEach((a,i) => nodes.forEach((b,j) => {
        if (j<=i) return
        const dx=a.x-b.x, dy=a.y-b.y, dist=Math.sqrt(dx*dx+dy*dy)
        if (dist>200) return
        const alpha=(1-dist/200)*0.2
        ctx.beginPath(); ctx.strokeStyle=`rgba(201,168,76,${alpha})`; ctx.lineWidth=0.5
        ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y); ctx.stroke()
      }))
      for (let i=packets.length-1;i>=0;i--) {
        const p=packets[i]; p.t+=0.013
        if (p.t>1){packets.splice(i,1);continue}
        const f=nodes[p.from],t=nodes[p.to]
        const x=f.x+(t.x-f.x)*p.t, y=f.y+(t.y-f.y)*p.t
        ctx.beginPath()
        const g=ctx.createRadialGradient(x,y,0,x,y,8)
        g.addColorStop(0,p.color+'ff'); g.addColorStop(1,p.color+'00')
        ctx.fillStyle=g; ctx.arc(x,y,8,0,Math.PI*2); ctx.fill()
      }
      nodes.forEach(n => {
        const pulse=Math.sin(n.pulse)*0.5+0.5
        const g=ctx.createRadialGradient(n.x,n.y,0,n.x,n.y,n.r*3+pulse*4)
        g.addColorStop(0,n.color+'55'); g.addColorStop(1,n.color+'00')
        ctx.beginPath(); ctx.fillStyle=g; ctx.arc(n.x,n.y,n.r*3+pulse*4,0,Math.PI*2); ctx.fill()
        ctx.beginPath(); ctx.fillStyle=n.color; ctx.shadowColor=n.color; ctx.shadowBlur=8
        ctx.arc(n.x,n.y,n.r,0,Math.PI*2); ctx.fill(); ctx.shadowBlur=0
        ctx.fillStyle='rgba(240,237,230,0.55)'; ctx.font='9px monospace'; ctx.textAlign='center'
        ctx.fillText(n.label,n.x,n.y-n.r-4)
      })
      animRef.current=requestAnimationFrame(render)
    }
    animRef.current=requestAnimationFrame(render)
    return () => { cancelAnimationFrame(animRef.current); window.removeEventListener('resize',resize) }
  }, [])

  return <canvas ref={canvasRef} className="w-full h-full" style={{ opacity:0.88 }} />
}

const AI_CAPS = [
  { title:'LLM Integration',        desc:'OpenAI API, prompt engineering, context management, streaming responses', icon:'◈', color:'var(--accent-1)' },
  { title:'AI-Powered Products',    desc:'Maxel Tracker with OpenAI integration, intelligent workflow automation', icon:'⬡', color:'var(--accent-3)' },
  { title:'System Design for AI',   desc:'Scalable backends for AI workloads, async processing, result caching', icon:'◎', color:'var(--accent-1b)' },
  { title:'Full-Stack AI Apps',     desc:'React frontends consuming AI APIs, real-time streaming, rich UX layers', icon:'◇', color:'var(--accent-2)' },
  { title:'Agentic Workflows',      desc:'Claude Code, Codex-powered development cycles, AI-assisted architecture', icon:'◉', color:'var(--accent-2b)' },
  { title:'Production AI Systems',  desc:'Deployed AI features at scale, performance optimization, error handling', icon:'▣', color:'var(--accent-1)' },
]

export default function AIAscension() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once:true })
  return (
    <section id="ai" className="relative py-32 md:py-40 overflow-hidden">
      <div className="absolute inset-0" style={{ background:'radial-gradient(ellipse at center,rgba(201,168,76,0.05) 0%,transparent 55%)' }} />
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div ref={ref} className="mb-16">
          <motion.div initial={{opacity:0,x:-30}} animate={inView?{opacity:1,x:0}:{}} transition={{duration:0.6}}
            className="flex items-center gap-4 mb-6">
            <span className="font-anta text-[11px] tracking-[0.3em] uppercase" style={{ color:'var(--accent-2)', opacity:0.8 }}>CHAPTER 03</span>
            <div className="h-px flex-1 max-w-[80px]" style={{ background:'linear-gradient(to right,var(--accent-2),transparent)' }} />
          </motion.div>
          <div className="overflow-hidden"><motion.h2 className="font-bebas leading-none" style={{ fontSize:'clamp(3.5rem,9vw,7rem)', color:'var(--text-0)' }}
            initial={{y:'105%'}} animate={inView?{y:'0%'}:{}} transition={{duration:0.8,delay:0.1,ease:[0.16,1,0.3,1]}}>The AI</motion.h2></div>
          <div className="overflow-hidden mb-4"><motion.h2 className="font-bebas leading-none gradient-text" style={{ fontSize:'clamp(3.5rem,9vw,7rem)' }}
            initial={{y:'105%'}} animate={inView?{y:'0%'}:{}} transition={{duration:0.8,delay:0.18,ease:[0.16,1,0.3,1]}}>Ascension Arc</motion.h2></div>
          <motion.p initial={{opacity:0}} animate={inView?{opacity:1}:{}} transition={{delay:0.4}}
            className="font-cormorant italic text-lg max-w-xl" style={{ color:'var(--text-1)' }}>
            Where code stops being instructions and starts being cognition.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-start">
          <motion.div initial={{opacity:0,scale:0.95}} whileInView={{opacity:1,scale:1}} viewport={{once:true}} transition={{duration:1,ease:[0.16,1,0.3,1]}}
            data-theme="dark" className="relative h-[400px] md:h-[480px] overflow-hidden"
            style={{ border:'1px solid rgba(201,168,76,0.2)', background:'#0a0810' }}>
            <NeuralCanvas />
            <div className="absolute inset-0 pointer-events-none"
              style={{ background:'radial-gradient(ellipse at center,transparent 50%,var(--bg-0) 100%)' }} />
            <div className="absolute top-4 left-4 font-anta text-[10px] space-y-1" style={{ color:'rgba(201,168,76,0.6)' }}>
              <div>NEURAL_NETWORK // ACTIVE</div>
              <div style={{ color:'rgba(92,127,168,0.6)' }}>NODES: 26 // EDGES: DYNAMIC</div>
            </div>
            <div className="absolute bottom-4 right-4 font-anta text-[10px]" style={{ color:'rgba(240,237,230,0.3)' }}>Hover to interact</div>
          </motion.div>

          <div className="space-y-3">
            {AI_CAPS.map((c,i) => (
              <motion.div key={i}
                initial={{opacity:0,x:30}} whileInView={{opacity:1,x:0}} viewport={{once:true}}
                transition={{duration:0.6,delay:i*0.07,ease:[0.16,1,0.3,1]}}
                className="group flex gap-4 p-4 border card-hover"
                style={{ borderColor:'var(--border)', background:'var(--bg-card)' }}>
                <div className="w-9 h-9 flex-shrink-0 flex items-center justify-center"
                  style={{ background:`color-mix(in srgb, ${c.color} 12%, transparent)`, border:`1px solid color-mix(in srgb, ${c.color} 25%, transparent)`, color:c.color }}>
                  {c.icon}
                </div>
                <div>
                  <h4 className="font-cormorant font-bold text-base mb-0.5" style={{ color:'var(--text-0)' }}>{c.title}</h4>
                  <p className="font-dm text-xs leading-relaxed" style={{ color:'var(--text-1)' }}>{c.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.8}}
          className="mt-10 p-7 relative overflow-hidden"
          style={{ background:'rgba(201,168,76,0.04)', border:'1px solid var(--border-accent)' }}>
          <div className="flex items-center gap-2 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"/>
            <span className="font-anta text-[10px] tracking-widest uppercase" style={{ color:'var(--accent-1)', opacity:0.8 }}>AI Tools in Active Use</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {['Claude Code','OpenAI API','ChatGPT / Codex','GPT-4o','LLM Chains','Prompt Engineering'].map((t,i) => (
              <span key={i} className="px-3 py-1.5 font-anta text-[10px]"
                style={{ background:'rgba(201,168,76,0.1)', border:'1px solid var(--border-accent)', color:'var(--accent-1b)' }}>
                {t}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
