'use client'
import { useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'

function ArchDiagram() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animRef = useRef(0)
  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return
    const ctx = canvas.getContext('2d'); if (!ctx) return
    const resize = () => { canvas.width=canvas.offsetWidth; canvas.height=canvas.offsetHeight }
    resize(); window.addEventListener('resize', resize)

    const nodes = [
      {x:0.2,y:0.15,label:'Next.js',sub:'SSR/SSG',color:'#5c7fa8'},{x:0.5,y:0.15,label:'React',sub:'SPA/CSR',color:'#5c7fa8'},{x:0.8,y:0.15,label:'React Native',sub:'Mobile',color:'#5c7fa8'},
      {x:0.35,y:0.4,label:'Node.js',sub:'REST/WS',color:'#c9a84c'},{x:0.65,y:0.4,label:'NestJS',sub:'Modular',color:'#c9a84c'},
      {x:0.5,y:0.6,label:'OpenAI API',sub:'LLM/AI',color:'#c41e3a'},
      {x:0.15,y:0.8,label:'MongoDB',sub:'NoSQL',color:'#e8c97e'},{x:0.4,y:0.8,label:'PostgreSQL',sub:'Relational',color:'#e8c97e'},{x:0.65,y:0.8,label:'Redis',sub:'Cache',color:'#e8c97e'},
      {x:0.87,y:0.8,label:'AWS/Azure',sub:'Cloud',color:'#c9a84c'},
    ]
    const edges=[[0,3],[1,3],[1,4],[2,4],[3,5],[4,5],[3,6],[3,7],[4,7],[4,8],[3,9],[4,9]]
    const packets:{from:number,to:number,t:number}[]=[]
    let frame=0

    const render = () => {
      frame++
      const W=canvas.width,H=canvas.height
      ctx.clearRect(0,0,W,H)
      const px=(x:number)=>x*W, py=(y:number)=>y*H
      if (frame%60===0&&edges.length) {
        const e=edges[Math.floor(Math.random()*edges.length)]
        packets.push({from:e[0],to:e[1],t:0})
      }
      edges.forEach(([a,b])=>{
        const na=nodes[a],nb=nodes[b]
        ctx.beginPath(); ctx.setLineDash([3,6])
        ctx.strokeStyle=`rgba(201,168,76,0.18)`; ctx.lineWidth=0.8
        ctx.moveTo(px(na.x),py(na.y)); ctx.lineTo(px(nb.x),py(nb.y)); ctx.stroke()
        ctx.setLineDash([])
      })
      for (let i=packets.length-1;i>=0;i--){
        const p=packets[i]; p.t+=0.014
        if(p.t>1){packets.splice(i,1);continue}
        const f=nodes[p.from],t=nodes[p.to]
        const x=px(f.x)+(px(t.x)-px(f.x))*p.t, y=py(f.y)+(py(t.y)-py(f.y))*p.t
        const g=ctx.createRadialGradient(x,y,0,x,y,8)
        g.addColorStop(0,'#c9a84cff'); g.addColorStop(1,'#c9a84c00')
        ctx.beginPath(); ctx.fillStyle=g; ctx.arc(x,y,8,0,Math.PI*2); ctx.fill()
      }
      const tiers: Record<string,{y:number,color:string}>={
        Frontend:{y:0.05,color:'#5c7fa8'}, API:{y:0.3,color:'#c9a84c'},
        AI:{y:0.5,color:'#c41e3a'}, Data:{y:0.7,color:'#e8c97e'},
      }
      Object.entries(tiers).forEach(([name,t])=>{
        ctx.fillStyle=t.color+'40'; ctx.font='10px monospace'; ctx.textAlign='left'
        ctx.fillText(`// ${name.toUpperCase()} LAYER`,8,py(t.y)+14)
        ctx.beginPath(); ctx.strokeStyle=t.color+'18'; ctx.lineWidth=0.5
        ctx.setLineDash([2,5]); ctx.moveTo(0,py(t.y)+20); ctx.lineTo(W,py(t.y)+20); ctx.stroke(); ctx.setLineDash([])
      })
      nodes.forEach(n=>{
        const x=px(n.x),y=py(n.y)
        const g=ctx.createRadialGradient(x,y,0,x,y,36)
        g.addColorStop(0,n.color+'28'); g.addColorStop(1,n.color+'00')
        ctx.fillStyle=g; ctx.beginPath(); ctx.arc(x,y,36,0,Math.PI*2); ctx.fill()
        const bw=82,bh=38
        ctx.fillStyle=n.color+'16'; ctx.strokeStyle=n.color+'55'; ctx.lineWidth=1
        ctx.beginPath(); ctx.rect(x-bw/2,y-bh/2,bw,bh); ctx.fill(); ctx.stroke()
        ctx.fillStyle='rgba(240,237,230,0.88)'; ctx.font='bold 10.5px monospace'; ctx.textAlign='center'
        ctx.fillText(n.label,x,y+2); ctx.fillStyle=n.color+'99'; ctx.font='8px monospace'
        ctx.fillText(n.sub,x,y+14)
      })
      animRef.current=requestAnimationFrame(render)
    }
    animRef.current=requestAnimationFrame(render)
    return ()=>{ cancelAnimationFrame(animRef.current); window.removeEventListener('resize',resize) }
  },[])
  return <canvas ref={canvasRef} className="w-full h-full" />
}

const INFRA = [
  { title:'Cloud Platforms', items:['AWS EC2','AWS S3','AWS Lightsail','Azure DevOps'], color:'var(--accent-1)' },
  { title:'DevOps & CI/CD',  items:['Docker','Git','GitHub Actions','Azure Pipelines'], color:'var(--accent-2)' },
  { title:'Databases',       items:['MongoDB','PostgreSQL','MySQL','Redis Cache'],      color:'var(--accent-1b)' },
  { title:'Backend Stack',   items:['Node.js','NestJS','Express.js','REST APIs'],       color:'var(--accent-3)' },
]

export default function Architecture() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once:true })
  return (
    <section id="architecture" className="relative py-32 md:py-40 overflow-hidden">
      <div className="absolute inset-0" style={{ background:'radial-gradient(ellipse at center,rgba(201,168,76,0.04) 0%,transparent 55%)' }} />
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div ref={ref} className="mb-16">
          <motion.div initial={{opacity:0,x:-30}} animate={inView?{opacity:1,x:0}:{}} transition={{duration:0.6}} className="flex items-center gap-4 mb-6">
            <span className="font-mono text-[10px] tracking-[0.45em] uppercase" style={{ color:'var(--accent-1b)', opacity:0.8 }}>CHAPTER 06</span>
            <div className="h-px flex-1 max-w-[80px]" style={{ background:'linear-gradient(to right,var(--accent-1b),transparent)' }} />
          </motion.div>
          <div className="overflow-hidden"><motion.h2 className="font-bebas leading-none" style={{ fontSize:'clamp(3.5rem,9vw,7rem)', color:'var(--text-0)' }}
            initial={{y:'105%'}} animate={inView?{y:'0%'}:{}} transition={{duration:0.8,delay:0.1,ease:[0.16,1,0.3,1]}}>System</motion.h2></div>
          <div className="overflow-hidden mb-4"><motion.h2 className="font-bebas leading-none neon-gold" style={{ fontSize:'clamp(3.5rem,9vw,7rem)' }}
            initial={{y:'105%'}} animate={inView?{y:'0%'}:{}} transition={{duration:0.8,delay:0.18,ease:[0.16,1,0.3,1]}}>Architecture</motion.h2></div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          <motion.div initial={{opacity:0,scale:0.95}} whileInView={{opacity:1,scale:1}} viewport={{once:true}} transition={{duration:1,ease:[0.16,1,0.3,1]}}
            className="relative h-[440px] overflow-hidden" style={{ border:'1px solid var(--border)', background:'var(--bg-card)' }}>
            <ArchDiagram />
            <div className="absolute top-4 left-4 font-mono text-[10px]" style={{ color:'rgba(201,168,76,0.55)' }}>SYSTEM_MAP // LIVE</div>
            <div className="absolute inset-0 pointer-events-none" style={{ background:'radial-gradient(ellipse at center,transparent 50%,var(--bg-0) 100%)' }} />
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 content-start">
            {INFRA.map((cat,i) => (
              <motion.div key={i} initial={{opacity:0,y:28}} whileInView={{opacity:1,y:0}} viewport={{once:true}}
                transition={{duration:0.6,delay:i*0.1,ease:[0.16,1,0.3,1]}}
                className="p-5 border card-hover" style={{ borderColor:'var(--border)', background:'var(--bg-card)' }}>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background:cat.color, boxShadow:`0 0 5px ${cat.color}` }} />
                  <h4 className="font-mono text-[10px] tracking-widest uppercase" style={{ color:cat.color }}>{cat.title}</h4>
                </div>
                <div className="space-y-1.5">
                  {cat.items.map((item,j)=>(
                    <div key={j} className="flex items-center gap-2 font-dm text-sm" style={{ color:'var(--text-1)' }}>
                      <span className="text-xs" style={{ color:cat.color, opacity:0.5 }}>▶</span>{item}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
