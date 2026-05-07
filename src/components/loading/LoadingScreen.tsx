'use client'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const KANJI = ['力','界','神','無','限','制','御','知','能','構']

export default function LoadingScreen() {
  const [done, setDone] = useState(false)
  const [phase, setPhase] = useState<'count'|'reveal'>('count')
  const [kanjiIdx, setKanjiIdx] = useState(0)

  useEffect(() => {
    const ki = setInterval(() => setKanjiIdx(i => (i + 1) % KANJI.length), 180)
    const t1 = setTimeout(() => { clearInterval(ki); setPhase('reveal') }, 2800)
    const t2 = setTimeout(() => setDone(true), 4200)
    return () => { clearInterval(ki); clearTimeout(t1); clearTimeout(t2) }
  }, [])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div exit={{ opacity: 0, scale: 1.04 }} transition={{ duration: 0.9, ease: [0.76,0,0.24,1] }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center"
          style={{ background: 'var(--bg-0)' }}>

          {/* Radial glow */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <motion.div className="w-[500px] h-[500px] rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(201,168,76,0.1) 0%, transparent 70%)' }}
              animate={{ scale: [1,1.2,1], opacity:[0.3,0.7,0.3] }} transition={{ duration: 2.5, repeat: Infinity }} />
          </div>

          {/* Kanji */}
          <motion.div className="font-cormorant text-9xl font-bold mb-10 select-none"
            style={{ color: 'rgba(201,168,76,0.12)' }}
            animate={{ opacity: [0.06,0.2,0.06] }} transition={{ duration: 0.9, repeat: Infinity }}>
            {KANJI[kanjiIdx]}
          </motion.div>

          {/* Name */}
          <div className="text-center mb-12">
            <AnimatePresence mode="wait">
              {phase === 'reveal' ? (
                <motion.div key="rev" initial={{ opacity:0, y:16, filter:'blur(12px)' }} animate={{ opacity:1, y:0, filter:'blur(0px)' }} transition={{ duration: 0.7 }}>
                  <h1 className="font-bebas text-5xl md:text-6xl tracking-[0.35em] mb-2" style={{ color: 'var(--text-0)' }}>
                    Yashodhan Kalia
                  </h1>
                  <p className="font-anta text-xs tracking-[0.55em] uppercase" style={{ color: 'var(--accent-1)' }}>
                    Senior Software Developer
                  </p>
                </motion.div>
              ) : (
                <motion.div key="load">
                  <h1 className="font-bebas text-5xl md:text-6xl tracking-[0.35em] mb-2" style={{ color: 'var(--text-2)' }}>
                    Yashodhan Kalia
                  </h1>
                  <p className="font-anta text-xs tracking-[0.55em] uppercase" style={{ color: 'var(--text-2)' }}>
                    Initializing Domain...
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Bar */}
          <div className="w-64 md:w-80">
            <div className="h-px relative overflow-hidden" style={{ background: 'var(--border)' }}>
              <div className="loading-bar-fill absolute top-0 left-0 h-full"
                style={{ background: 'linear-gradient(90deg, var(--accent-1d), var(--accent-1), var(--accent-1b))' }} />
            </div>
            <div className="flex justify-between mt-2 font-anta text-xs" style={{ color: 'var(--text-2)' }}>
              <span>SYSTEM BOOT</span><span>v2.6.0</span>
            </div>
          </div>

          {/* Corner brackets */}
          {['top-5 left-5','top-5 right-5','bottom-5 left-5','bottom-5 right-5'].map((pos,i) => (
            <div key={i} className={`absolute ${pos} w-5 h-5`} style={{ borderColor: 'rgba(201,168,76,0.3)' }}>
              <div className="absolute top-0 left-0 w-full h-px" style={{ background: 'var(--accent-1)', opacity: 0.4 }} />
              <div className="absolute top-0 left-0 h-full w-px" style={{ background: 'var(--accent-1)', opacity: 0.4 }} />
            </div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
