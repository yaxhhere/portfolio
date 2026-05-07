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

/* ─── Wireframe geometric shards ─── */
function GeometricShards() {
  const meshRefs = useRef<(THREE.Mesh | null)[]>([])
  const shards = useMemo(() => Array.from({length: 14}, (_, i) => ({
    pos: [
      (Math.random() - 0.5) * 22,
      (Math.random() - 0.5) * 13,
      (Math.random() - 0.5) * 12 - 2,
    ] as [number, number, number],
    size:      0.18 + Math.random() * 0.52,
    rotSpeed:  [(Math.random()-0.5)*0.7, (Math.random()-0.5)*0.7, (Math.random()-0.5)*0.5] as [number,number,number],
    floatAmp:  0.6 + Math.random() * 1.0,
    floatFreq: 0.25 + Math.random() * 0.45,
    phase:     Math.random() * Math.PI * 2,
    color:     ['#c9a84c','#c41e3a','#e8c97e','#8b6914','#5c7fa8','#c9a84c'][Math.floor(Math.random()*6)],
    type:      Math.floor(Math.random() * 3), // 0=ico, 1=oct, 2=tetra
    opacity:   0.25 + Math.random() * 0.35,
  })), [])

  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    shards.forEach((s, i) => {
      const mesh = meshRefs.current[i]
      if (!mesh) return
      // Gentle float
      mesh.position.y = s.pos[1] + Math.sin(t * s.floatFreq + s.phase) * s.floatAmp
      mesh.position.x = s.pos[0] + Math.cos(t * s.floatFreq * 0.6 + s.phase) * 0.4
      // Continuous rotation
      mesh.rotation.x += s.rotSpeed[0] * 0.016
      mesh.rotation.y += s.rotSpeed[1] * 0.016
      mesh.rotation.z += s.rotSpeed[2] * 0.016
    })
  })

  return (
    <>
      {shards.map((s, i) => (
        <mesh
          key={i}
          position={s.pos}
          ref={el => { meshRefs.current[i] = el }}
        >
          {s.type === 0
            ? <icosahedronGeometry args={[s.size, 0]} />
            : s.type === 1
            ? <octahedronGeometry args={[s.size, 0]} />
            : <tetrahedronGeometry args={[s.size, 0]} />}
          <meshStandardMaterial
            color={s.color}
            emissive={s.color}
            emissiveIntensity={1.8}
            wireframe
            transparent
            opacity={s.opacity}
          />
        </mesh>
      ))}
    </>
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
    <GeometricShards/>
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
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8 font-anta text-xs tracking-widest uppercase"
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
        <span className="font-anta text-[10px] tracking-[0.35em] uppercase" style={{ color:'var(--text-2)' }}>Scroll</span>
        <motion.div animate={{y:[0,10,0]}} transition={{duration:1.6,repeat:Infinity}}
          className="w-px h-10" style={{ background:'linear-gradient(to bottom,var(--accent-1),transparent)' }} />
      </motion.div>

      {/* HUD corner */}
      <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:4.8}}
        className="absolute top-24 right-8 md:right-14 font-anta text-[10px] space-y-1 text-right hidden md:block"
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
    /* data-theme="dark" forces all CSS vars inside to always resolve
       to dark-mode values — the Three.js canvas is always #080608 */
    <section id="hero" data-theme="dark" className="relative w-full h-screen overflow-hidden"
      style={{ background: '#080608' }}>
      <div className="absolute inset-0">
        <Canvas dpr={[1,1.5]} gl={{antialias:false,alpha:false}}>
          <Suspense fallback={null}><Scene /></Suspense>
        </Canvas>
      </div>
      <div className="absolute inset-0 pointer-events-none"
        style={{ background:'radial-gradient(ellipse at center,transparent 25%,rgba(8,6,8,0.7) 100%)' }} />
      <HeroUI />
    </section>
  )
}
