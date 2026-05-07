'use client'
import { useRef, useState, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

function ContactRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animRef = useRef(0)
  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return
    const ctx = canvas.getContext('2d'); if (!ctx) return
    const resize = () => { canvas.width=canvas.offsetWidth; canvas.height=canvas.offsetHeight }
    resize(); window.addEventListener('resize', resize)
    const drops = Array.from({length:120},()=>({
      x:Math.random()*canvas.width, y:Math.random()*canvas.height,
      l:12+Math.random()*28, s:1.5+Math.random()*5, o:0.04+Math.random()*0.18,
    }))
    const render = () => {
      ctx.clearRect(0,0,canvas.width,canvas.height)
      drops.forEach(d => {
        ctx.beginPath(); ctx.strokeStyle=`rgba(201,168,76,${d.o})`; ctx.lineWidth=0.5
        ctx.moveTo(d.x,d.y); ctx.lineTo(d.x-0.5,d.y+d.l); ctx.stroke()
        d.y+=d.s
        if (d.y-d.l>canvas.height) { d.y=-d.l; d.x=Math.random()*canvas.width }
      })
      animRef.current=requestAnimationFrame(render)
    }
    animRef.current=requestAnimationFrame(render)
    return () => { cancelAnimationFrame(animRef.current); window.removeEventListener('resize',resize) }
  }, [])
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity:0.35 }} />
}

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once:true })
  const [form, setForm] = useState({name:'',email:'',subject:'',message:''})
  const [status, setStatus] = useState<'idle'|'sending'|'sent'>('idle')
  const [pulse, setPulse] = useState(false)

  const onChange = (e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) =>
    setForm(f => ({...f,[e.target.name]:e.target.value}))

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setStatus('sending')
    await new Promise(r => setTimeout(r,1800))
    setPulse(true); setStatus('sent')
    setTimeout(()=>setPulse(false),2000)
  }

  return (
    <section id="contact" className="relative py-32 md:py-40 overflow-hidden min-h-screen flex flex-col justify-center">
      <ContactRain />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0" style={{ background:'radial-gradient(ellipse at center bottom, rgba(201,168,76,0.07) 0%,transparent 55%)' }} />
      </div>
      <AnimatePresence>
        {pulse && (
          <motion.div initial={{scale:0,opacity:0.7}} animate={{scale:9,opacity:0}} exit={{opacity:0}}
            transition={{duration:1.5,ease:[0.16,1,0.3,1]}}
            className="absolute inset-0 pointer-events-none"
            style={{ background:'radial-gradient(circle,rgba(201,168,76,0.3) 0%,transparent 65%)', transformOrigin:'center' }} />
        )}
      </AnimatePresence>

      <div className="relative z-10 max-w-5xl mx-auto px-4 md:px-8 w-full">
        <div ref={ref} className="mb-16 text-center">
          <motion.div initial={{opacity:0}} animate={inView?{opacity:1}:{}} transition={{duration:0.6}}
            className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px flex-1 max-w-[80px]" style={{ background:'linear-gradient(to right,transparent,var(--accent-1))' }} />
            <span className="font-anta text-[11px] tracking-[0.3em] uppercase" style={{ color:'var(--accent-1)', opacity:0.7 }}>FINAL CHAPTER</span>
            <div className="h-px flex-1 max-w-[80px]" style={{ background:'linear-gradient(to left,transparent,var(--accent-1))' }} />
          </motion.div>
          <div className="overflow-hidden">
            <motion.h2 className="font-bebas leading-tight" style={{ fontSize:'clamp(2.8rem,8vw,6rem)', color:'var(--text-0)' }}
              initial={{y:'105%'}} animate={inView?{y:'0%'}:{}} transition={{duration:0.9,delay:0.1,ease:[0.16,1,0.3,1]}}>
              Let's Build The
            </motion.h2>
          </div>
          <div className="overflow-hidden mb-6">
            <motion.h2 className="font-bebas leading-tight gradient-text" style={{ fontSize:'clamp(2.8rem,8vw,6rem)' }}
              initial={{y:'105%'}} animate={inView?{y:'0%'}:{}} transition={{duration:0.9,delay:0.18,ease:[0.16,1,0.3,1]}}>
              Future Together.
            </motion.h2>
          </div>
          <motion.p initial={{opacity:0}} animate={inView?{opacity:1}:{}} transition={{delay:0.45}}
            className="font-cormorant italic text-xl max-w-md mx-auto" style={{ color:'var(--text-1)' }}>
            Have a project that needs intelligent systems, scalable architecture, or creative engineering? The domain is open.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 md:gap-12">
          {/* Info */}
          <motion.div initial={{opacity:0,x:-30}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{duration:0.8,ease:[0.16,1,0.3,1]}}
            className="lg:col-span-2 space-y-5">
            <div>
              <h3 className="font-bebas text-2xl tracking-wider" style={{ color:'var(--text-0)' }}>Yashodhan Kalia</h3>
              <p className="font-anta text-xs" style={{ color:'var(--accent-1)' }}>Senior Software Developer</p>
            </div>
            {[
              { icon:'✉', label:'Email', value:'yashodhankalia0@gmail.com', href:'mailto:yashodhankalia0@gmail.com', color:'var(--accent-1)' },
              { icon:'☎', label:'Phone', value:'+91 858 085 6978', href:'tel:+918580856978', color:'var(--accent-3)' },
              { icon:'◎', label:'Location', value:'India', href:'#', color:'var(--accent-1b)' },
            ].map((item,i) => (
              <a key={i} href={item.href}
                className="group flex items-center gap-4 p-4 border card-hover block"
                style={{ borderColor:'var(--border)', background:'var(--bg-card)' }}>
                <div className="w-9 h-9 flex-shrink-0 flex items-center justify-center"
                  style={{ background:`color-mix(in srgb,${item.color} 12%,transparent)`, border:`1px solid color-mix(in srgb,${item.color} 25%,transparent)`, color:item.color }}>
                  {item.icon}
                </div>
                <div>
                  <div className="font-anta text-[10px] mb-0.5" style={{ color:'var(--text-2)' }}>{item.label}</div>
                  <div className="font-dm text-sm" style={{ color:'var(--text-0)' }}>{item.value}</div>
                </div>
              </a>
            ))}
            <div className="p-4 border" style={{ borderColor:'rgba(16,185,129,0.2)', background:'rgba(16,185,129,0.04)' }}>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"/>
                <span className="font-anta text-[10px] tracking-widest text-green-400">AVAILABLE FOR WORK</span>
              </div>
              <p className="font-dm text-xs" style={{ color:'var(--text-1)' }}>Open to senior engineering roles, consulting, and impactful AI projects.</p>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div initial={{opacity:0,x:30}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{duration:0.8,ease:[0.16,1,0.3,1]}}
            className="lg:col-span-3">
            <AnimatePresence mode="wait">
              {status==='sent' ? (
                <motion.div key="sent" initial={{opacity:0,scale:0.92}} animate={{opacity:1,scale:1}}
                  className="h-full flex flex-col items-center justify-center py-16 text-center"
                  style={{ border:'1px solid var(--border-accent)', background:'rgba(201,168,76,0.04)' }}>
                  <div className="w-14 h-14 rounded-full flex items-center justify-center text-2xl mb-5"
                    style={{ background:'rgba(201,168,76,0.15)', border:'1px solid var(--border-accent)', boxShadow:'0 0 25px var(--glow-1)' }}>✓</div>
                  <h3 className="font-cormorant font-bold text-2xl mb-2" style={{ color:'var(--text-0)' }}>Message Sent</h3>
                  <p className="font-dm text-sm" style={{ color:'var(--text-1)' }}>Domain connection established. I'll reach out soon.</p>
                </motion.div>
              ) : (
                <motion.form key="form" onSubmit={onSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-mono text-[10px] tracking-widest uppercase mb-1.5" style={{ color:'var(--text-2)' }}>Name</label>
                      <input name="name" value={form.name} onChange={onChange} placeholder="Your name" required className="cyber-input" />
                    </div>
                    <div>
                      <label className="block font-mono text-[10px] tracking-widest uppercase mb-1.5" style={{ color:'var(--text-2)' }}>Email</label>
                      <input type="email" name="email" value={form.email} onChange={onChange} placeholder="your@email.com" required className="cyber-input" />
                    </div>
                  </div>
                  <div>
                    <label className="block font-mono text-[10px] tracking-widest uppercase mb-1.5" style={{ color:'var(--text-2)' }}>Subject</label>
                    <input name="subject" value={form.subject} onChange={onChange} placeholder="Project / Opportunity / Collaboration" required className="cyber-input" />
                  </div>
                  <div>
                    <label className="block font-mono text-[10px] tracking-widest uppercase mb-1.5" style={{ color:'var(--text-2)' }}>Message</label>
                    <textarea name="message" value={form.message} onChange={onChange} placeholder="Describe your vision, project, or idea..." required rows={5} className="cyber-input resize-none" />
                  </div>
                  <button type="submit" disabled={status==='sending'}
                    className="group relative w-full py-4 font-bebas text-lg tracking-[0.25em] uppercase overflow-hidden transition-all duration-300"
                    style={{ background:status==='sending'?'rgba(201,168,76,0.2)':'rgba(201,168,76,0.1)', border:'1px solid var(--border-accent)', color:'var(--text-0)' }}>
                    <span className="relative z-10">{status==='sending'?'Transmitting...':'Send Message →'}</span>
                    <motion.div className="absolute inset-0 opacity-0 group-hover:opacity-100"
                      style={{ background:'linear-gradient(90deg,transparent,rgba(201,168,76,0.2),transparent)' }}
                      animate={{ x:['-100%','100%'] }} transition={{ duration:1.5, repeat:Infinity, ease:'linear' }} />
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div initial={{opacity:0}} whileInView={{opacity:1}} viewport={{once:true}} transition={{duration:1,delay:0.4}}
          className="mt-20 pt-8 flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderTop:'1px solid var(--border)' }}>
          <p className="font-mono text-[10px]" style={{ color:'var(--text-2)' }}>© 2026 Yashodhan Kalia. All Rights Reserved.</p>
          <p className="font-cormorant italic text-sm" style={{ color:'var(--accent-1)', opacity:0.6 }}>Engineering Intelligent Realities.</p>
        </motion.div>
      </div>
    </section>
  )
}
