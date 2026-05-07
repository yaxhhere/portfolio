'use client'
import { useRef, useMemo, useEffect, Suspense } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { motion } from 'framer-motion'
import * as THREE from 'three'

/* ─── Rain (golden) ─── */
function RainSystem() {
  const ref = useRef<THREE.Points>(null)
  const count = 5000
  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const vel = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      pos[i*3]   = (Math.random()-0.5)*60
      pos[i*3+1] = (Math.random()-0.5)*40+10
      pos[i*3+2] = (Math.random()-0.5)*40-5
      vel[i] = 8 + Math.random()*14
    }
    return [pos, vel] as [Float32Array, Float32Array]
  }, [])
  useFrame((_,dt) => {
    if (!ref.current) return
    const arr = ref.current.geometry.attributes.position.array as Float32Array
    for (let i = 0; i < count; i++) {
      arr[i*3+1] -= dt * velocities[i]
      if (arr[i*3+1] < -20) { arr[i*3+1] = 20; arr[i*3] = (Math.random()-0.5)*60 }
    }
    ref.current.geometry.attributes.position.needsUpdate = true
  })
  return (
    <points ref={ref}>
      <bufferGeometry><bufferAttribute attach="attributes-position" args={[positions, 3]} /></bufferGeometry>
      <pointsMaterial size={0.035} color="#c9a84c" transparent opacity={0.2} sizeAttenuation />
    </points>
  )
}

/* ─── Orbs (gold + crimson) ─── */
function EnergyOrbs() {
  const group = useRef<THREE.Group>(null)
  const orbs = useMemo(() => Array.from({length:16},(_,i) => ({
    pos: [(Math.random()-0.5)*20,(Math.random()-0.5)*12,(Math.random()-0.5)*15-3] as [number,number,number],
    r: 0.06 + Math.random()*0.16, speed: 0.3+Math.random()*0.6, phase: Math.random()*Math.PI*2,
    color: [0xc9a84c,0x8b1a2f,0xc41e3a,0xe8c97e,0x5c7fa8][Math.floor(Math.random()*5)],
  })), [])
  useFrame(({clock}) => {
    if (!group.current) return
    group.current.children.forEach((c,i) => {
      const o = orbs[i]
      c.position.y = o.pos[1] + Math.sin(clock.elapsedTime*o.speed+o.phase)*1.4
      c.position.x = o.pos[0] + Math.cos(clock.elapsedTime*o.speed*0.7+o.phase)*0.7
    })
  })
  return (
    <group ref={group}>
      {orbs.map((o,i) => (
        <mesh key={i} position={o.pos}>
          <sphereGeometry args={[o.r,8,8]} />
          <meshStandardMaterial color={o.color} emissive={o.color} emissiveIntensity={3} transparent opacity={0.8} />
        </mesh>
      ))}
    </group>
  )
}

/* ─── Portal (gold rings) ─── */
function PortalRings() {
  const a = useRef<THREE.Mesh>(null), b = useRef<THREE.Mesh>(null), c = useRef<THREE.Mesh>(null)
  useFrame(({clock}) => {
    const t = clock.elapsedTime
    if (a.current) { a.current.rotation.z = t*0.12; a.current.rotation.x = Math.sin(t*0.07)*0.18 }
    if (b.current) { b.current.rotation.z = -t*0.2; b.current.rotation.y = Math.cos(t*0.09)*0.12 }
    if (c.current)   c.current.rotation.z = t*0.08
  })
  return (
    <group position={[0,0,-8]}>
      <mesh ref={a}><torusGeometry args={[5.5,0.025,8,120]}/><meshStandardMaterial color="#c9a84c" emissive="#c9a84c" emissiveIntensity={5} transparent opacity={0.65}/></mesh>
      <mesh ref={b}><torusGeometry args={[4.0,0.04,8,100]}/><meshStandardMaterial color="#c41e3a" emissive="#c41e3a" emissiveIntensity={4} transparent opacity={0.55}/></mesh>
      <mesh ref={c}><torusGeometry args={[2.8,0.03,8,80]}/><meshStandardMaterial color="#e8c97e" emissive="#e8c97e" emissiveIntensity={3} transparent opacity={0.45}/></mesh>
      <mesh position={[0,0,0.5]}><circleGeometry args={[2.7,64]}/><meshStandardMaterial color="#080608" transparent opacity={0.95}/></mesh>
      <pointLight position={[0,0,0]} color="#c9a84c" intensity={10} distance={14}/>
      <pointLight position={[0,0,2]} color="#c41e3a" intensity={6} distance={9}/>
    </group>
  )
}

/* ─── Ambient particles ─── */
function AmbientParticles() {
  const ref = useRef<THREE.Points>(null)
  const count = 2500
  const positions = useMemo(() => {
    const pos = new Float32Array(count*3)
    for (let i=0;i<count;i++) { pos[i*3]=(Math.random()-0.5)*50; pos[i*3+1]=(Math.random()-0.5)*35; pos[i*3+2]=(Math.random()-0.5)*30-5 }
    return pos
  }, [])
  useFrame(({clock}) => {
    if (!ref.current) return
    ref.current.rotation.y = clock.elapsedTime*0.012
    ref.current.rotation.x = Math.sin(clock.elapsedTime*0.008)*0.04
  })
  return (
    <points ref={ref}>
      <bufferGeometry><bufferAttribute attach="attributes-position" args={[positions,3]} /></bufferGeometry>
      <pointsMaterial size={0.022} color="#e8c97e" transparent opacity={0.35} sizeAttenuation />
    </points>
  )
}

/* ─── Data streams ─── */
function DataStreams() {
  const refs = useRef<THREE.Points[]>([])
  const streams = useMemo(() => Array.from({length:8},(_,i) => {
    const x = -7+i*2; const cnt=40; const pos = new Float32Array(cnt*3)
    for (let j=0;j<cnt;j++) { pos[j*3]=x+(Math.random()-0.5)*0.2; pos[j*3+1]=-15+(j/cnt)*30; pos[j*3+2]=-12+Math.random()*2 }
    return { pos, offset:Math.random()*10, speed:3+Math.random()*5 }
  }), [])
  useFrame(({clock}) => {
    streams.forEach((s,i) => {
      const r = refs.current[i]; if (!r) return
      const arr = r.geometry.attributes.position.array as Float32Array
      const cnt = arr.length/3
      for (let j=0;j<cnt;j++) arr[j*3+1]=-15+((j/cnt*30+clock.elapsedTime*s.speed+s.offset*5)%30)
      r.geometry.attributes.position.needsUpdate = true
    })
  })
  return <>
    {streams.map((s,i) => (
      <points key={i} ref={el => { if (el) refs.current[i]=el }}>
        <bufferGeometry><bufferAttribute attach="attributes-position" args={[s.pos,3]} /></bufferGeometry>
        <pointsMaterial size={0.05} color={i%2===0?'#c9a84c':'#c41e3a'} transparent opacity={0.25} sizeAttenuation />
      </points>
    ))}
  </>
}

/* ─── Camera ─── */
function CameraController() {
  const {camera} = useThree()
  useEffect(() => {
    camera.position.set(0,0.5,7)
    ;(camera as THREE.PerspectiveCamera).fov = 75
    ;(camera as THREE.PerspectiveCamera).updateProjectionMatrix()
  }, [camera])
  useFrame(({clock}) => {
    camera.position.y = 0.5 + Math.sin(clock.elapsedTime*0.28)*0.14
    camera.position.x = Math.sin(clock.elapsedTime*0.18)*0.08
  })
  return null
}

function Scene() {
  return <>
    <color attach="background" args={['#080608']} />
    <fog attach="fog" args={['#080608',22,52]} />
    <ambientLight intensity={0.08} />
    <pointLight position={[0,6,5]} color="#c9a84c" intensity={1.5}/>
    <pointLight position={[-5,-3,3]} color="#c41e3a" intensity={1}/>
    <CameraController/>
    <AmbientParticles/>
    <RainSystem/>
    <EnergyOrbs/>
    <PortalRings/>
    <DataStreams/>
  </>
}

/* ─── Word-by-word reveal ─── */
function RevealText({ text, delay=0, className='', style={} }: { text:string; delay?:number; className?:string; style?:React.CSSProperties }) {
  const words = text.split(' ')
  return (
    <span className={className} style={style}>
      {words.map((w,i) => (
        <span key={i} className="inline-block overflow-hidden" style={{ marginRight:'0.25em' }}>
          <motion.span className="inline-block"
            initial={{ y:'110%', opacity:0, skewY:4 }}
            animate={{ y:'0%', opacity:1, skewY:0 }}
            transition={{ delay: delay + i*0.1, duration:0.75, ease:[0.16,1,0.3,1] }}>
            {w}
          </motion.span>
        </span>
      ))}
    </span>
  )
}

/* ─── Hero UI ─── */
function HeroUI() {
  const scrollTo = (id:string) => document.getElementById(id)?.scrollIntoView({behavior:'smooth'})

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-4">
      {/* Vertical kanji deco */}
      <div className="absolute top-1/4 left-6 md:left-14 opacity-[0.04] font-cormorant select-none pointer-events-none"
        style={{ fontSize:'clamp(5rem,10vw,10rem)', color:'var(--accent-1)', writingMode:'vertical-rl', fontWeight:700, lineHeight:1 }}>
        力界
      </div>
      <div className="absolute top-1/4 right-6 md:right-14 opacity-[0.04] font-cormorant select-none pointer-events-none"
        style={{ fontSize:'clamp(5rem,10vw,10rem)', color:'var(--accent-2)', writingMode:'vertical-rl', fontWeight:700, lineHeight:1 }}>
        知能
      </div>

      <div className="text-center max-w-5xl">
        {/* Status badge */}
        <motion.div initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{delay:3.4, duration:0.6}}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8 font-mono text-xs tracking-widest uppercase"
          style={{ background:'rgba(201,168,76,0.08)', border:'1px solid var(--border-accent)' }}>
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"/>
          <span style={{ color:'var(--text-1)' }}>System Online · Domain Active</span>
        </motion.div>

        {/* MAIN TITLE — Bebas Neue, cinematic */}
        <div className="overflow-hidden mb-1" style={{ lineHeight:0.9 }}>
          <motion.h1 className="font-bebas gradient-text"
            initial={{ y:'105%', opacity:0 }} animate={{ y:'0%', opacity:1 }}
            transition={{ delay:3.6, duration:0.9, ease:[0.16,1,0.3,1] }}
            style={{ fontSize:'clamp(4rem,13vw,10rem)', letterSpacing:'0.04em' }}>
            Engineering
          </motion.h1>
        </div>
        <div className="overflow-hidden mb-1" style={{ lineHeight:0.9 }}>
          <motion.h1 className="font-bebas"
            initial={{ y:'105%', opacity:0 }} animate={{ y:'0%', opacity:1 }}
            transition={{ delay:3.72, duration:0.9, ease:[0.16,1,0.3,1] }}
            style={{ fontSize:'clamp(4rem,13vw,10rem)', letterSpacing:'0.04em', color:'var(--text-0)' }}>
            Intelligent
          </motion.h1>
        </div>
        <div className="overflow-hidden mb-8" style={{ lineHeight:0.9 }}>
          <motion.h1 className="font-bebas gradient-text-crimson"
            initial={{ y:'105%', opacity:0 }} animate={{ y:'0%', opacity:1 }}
            transition={{ delay:3.84, duration:0.9, ease:[0.16,1,0.3,1] }}
            style={{ fontSize:'clamp(4rem,13vw,10rem)', letterSpacing:'0.04em' }}>
            Realities.
          </motion.h1>
        </div>

        {/* Divider line */}
        <motion.div initial={{scaleX:0}} animate={{scaleX:1}} transition={{delay:4.1, duration:0.8, ease:[0.16,1,0.3,1]}}
          className="h-px mb-7 max-w-sm mx-auto" style={{ background:'linear-gradient(90deg,transparent,var(--accent-1),transparent)', transformOrigin:'left' }} />

        {/* Subtext — Cormorant */}
        <motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{delay:4.2, duration:0.8}}
          className="font-cormorant text-base md:text-xl italic tracking-wide mb-10"
          style={{ color:'var(--text-1)' }}>
          Senior Developer&nbsp;
          <span style={{ color:'var(--accent-1)', opacity:0.7 }}>·</span>&nbsp;
          MERN Architect&nbsp;
          <span style={{ color:'var(--accent-2)', opacity:0.7 }}>·</span>&nbsp;
          AI Systems Engineer&nbsp;
          <span style={{ color:'var(--accent-1)', opacity:0.7 }}>·</span>&nbsp;
          Creative Technologist
        </motion.p>

        {/* CTAs */}
        <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:4.4, duration:0.7}}
          className="flex flex-wrap items-center justify-center gap-4">
          <button onClick={() => scrollTo('projects')}
            className="group relative px-8 py-3 font-mono text-xs tracking-[0.2em] uppercase font-bold overflow-hidden transition-all duration-300"
            style={{ background:'rgba(201,168,76,0.1)', border:'1px solid var(--border-accent)', color:'var(--text-0)' }}
            onMouseEnter={e=>(e.currentTarget as HTMLElement).style.background='rgba(201,168,76,0.2)'}
            onMouseLeave={e=>(e.currentTarget as HTMLElement).style.background='rgba(201,168,76,0.1)'}>
            Explore Domains
            <motion.div className="absolute inset-0 opacity-0 group-hover:opacity-100" transition={{duration:0.3}}
              style={{ background:'radial-gradient(circle at center,rgba(201,168,76,0.15) 0%,transparent 70%)' }} />
          </button>
          <button onClick={() => scrollTo('ai')}
            className="px-8 py-3 font-mono text-xs tracking-[0.2em] uppercase font-bold transition-all duration-300"
            style={{ background:'rgba(196,30,58,0.08)', border:'1px solid rgba(196,30,58,0.35)', color:'var(--text-0)' }}
            onMouseEnter={e=>(e.currentTarget as HTMLElement).style.background='rgba(196,30,58,0.18)'}
            onMouseLeave={e=>(e.currentTarget as HTMLElement).style.background='rgba(196,30,58,0.08)'}>
            Activate AI Realm
          </button>
          <button onClick={() => scrollTo('contact')}
            className="px-6 py-3 font-mono text-xs tracking-[0.2em] uppercase transition-colors duration-300"
            style={{ color:'var(--text-2)', border:'1px solid var(--border)' }}
            onMouseEnter={e=>(e.currentTarget as HTMLElement).style.color='var(--accent-1)'}
            onMouseLeave={e=>(e.currentTarget as HTMLElement).style.color='var(--text-2)'}>
            Connect
          </button>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:5.2}}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="font-mono text-[10px] tracking-[0.35em] uppercase" style={{ color:'var(--text-2)' }}>Scroll</span>
        <motion.div animate={{y:[0,10,0]}} transition={{duration:1.6,repeat:Infinity}}
          className="w-px h-10" style={{ background:'linear-gradient(to bottom,var(--accent-1),transparent)' }} />
      </motion.div>

      {/* HUD corner */}
      <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:4.8}}
        className="absolute top-24 right-8 md:right-14 font-mono text-[10px] space-y-1 text-right hidden md:block"
        style={{ color:'rgba(201,168,76,0.45)' }}>
        <div>SYS // DOMAIN_ACTIVE</div>
        <div>VER // 2.6.0_ASCENSION</div>
        <div className="neon-gold text-xs">● ONLINE</div>
      </motion.div>
    </div>
  )
}

export default function Hero() {
  return (
    <section id="hero" className="relative w-full h-screen overflow-hidden">
      <div className="absolute inset-0">
        <Canvas dpr={[1,1.5]} gl={{antialias:false,alpha:false}}>
          <Suspense fallback={null}><Scene /></Suspense>
        </Canvas>
      </div>
      <div className="absolute inset-0 pointer-events-none"
        style={{ background:'radial-gradient(ellipse at center,transparent 25%,rgba(8,6,8,0.65) 100%)' }} />
      <div className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none"
        style={{ background:'linear-gradient(to top,var(--bg-0),transparent)' }} />
      <HeroUI />
    </section>
  )
}
