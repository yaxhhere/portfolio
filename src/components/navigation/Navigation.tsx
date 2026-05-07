'use client'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '@/components/theme/ThemeProvider'

const SECTIONS = [
  { id: 'hero',         label: '01 ORIGIN',  kanji: '始' },
  { id: 'origin',       label: '02 ARC',     kanji: '弧' },
  { id: 'power',        label: '03 POWER',   kanji: '力' },
  { id: 'ai',           label: '04 AI',      kanji: '知' },
  { id: 'timeline',     label: '05 JOURNEY', kanji: '旅' },
  { id: 'projects',     label: '06 DOMAINS', kanji: '界' },
  { id: 'contact',      label: '07 CONTACT', kanji: '連' },
]

export default function Navigation() {
  const [active, setActive]   = useState('hero')
  const [visible, setVisible] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { theme, toggle } = useTheme()

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 80)
      let current = 'hero'
      SECTIONS.forEach(s => {
        const el = document.getElementById(s.id)
        if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.45) current = s.id
      })
      setActive(current)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id: string) => { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); setMenuOpen(false) }

  return (
    <>
      {/* Desktop sidebar dots */}
      <AnimatePresence>
        {visible && (
          <motion.nav initial={{opacity:0,x:-20}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-20}}
            className="fixed left-6 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-4">
            {SECTIONS.map(s => (
              <button key={s.id} onClick={() => scrollTo(s.id)} className="group flex items-center gap-3">
                <motion.div className="rounded-full" animate={{
                  width: active === s.id ? 24 : 5,
                  height: 5,
                  backgroundColor: active === s.id
                    ? (theme === 'light' ? '#8b6914' : '#c9a84c')
                    : (theme === 'light' ? 'rgba(14,12,9,0.22)' : 'rgba(255,255,255,0.2)'),
                  boxShadow: active === s.id
                    ? (theme === 'light' ? '0 0 8px rgba(139,105,20,0.6)' : '0 0 8px rgba(201,168,76,0.7)')
                    : 'none',
                }} transition={{ duration: 0.3 }} />
                <span className="text-[10px] font-anta tracking-[0.3em] uppercase opacity-0 group-hover:opacity-100 whitespace-nowrap transition-opacity duration-200"
                  style={{ color: active === s.id ? 'var(--accent-1)' : 'var(--text-2)' }}>
                  {s.label}
                </span>
              </button>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Top bar */}
      <AnimatePresence>
        {visible && (
          <motion.header initial={{opacity:0,y:-20}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-20}}
            className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-4 flex items-center justify-between"
            style={{ background: 'linear-gradient(to bottom, var(--bg-0) 0%, transparent 100%)', backdropFilter: 'blur(12px)' }}>

            <button onClick={() => scrollTo('hero')} className="font-bebas text-xl tracking-[0.3em] transition-colors duration-200"
              style={{ color: 'var(--accent-1)' }}>YK</button>

            <div className="flex items-center gap-4">
              {/* Theme toggle */}
              <motion.button onClick={toggle} whileTap={{ scale: 0.9 }} whileHover={{ scale: 1.1 }}
                className="w-8 h-8 flex items-center justify-center rounded-full border transition-all duration-300"
                style={{ borderColor: 'var(--border-accent)', background: 'var(--bg-card)', color: 'var(--accent-1)', fontSize: '14px' }}
                title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}>
                <motion.span key={theme} initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} transition={{ duration: 0.3 }}>
                  {theme === 'dark' ? '○' : '●'}
                </motion.span>
              </motion.button>

              {/* Hamburger mobile */}
              <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden flex flex-col gap-1.5 p-1">
                {[0,1,2].map(i => (
                  <motion.span key={i} className="block h-px" style={{ background: 'var(--text-0)' }}
                    animate={{ width: i===1 ? (menuOpen?'55%':'75%') : '100%', rotate: menuOpen&&i===0?45:menuOpen&&i===2?-45:0, y: menuOpen&&i===0?5:menuOpen&&i===2?-5:0, opacity: menuOpen&&i===1?0:1 }}
                    style={{ originX: 0, display:'block', height:'1px', background:'var(--text-0)' }} />
                ))}
              </button>

              {/* Desktop links */}
              <div className="hidden lg:flex items-center gap-7">
                {SECTIONS.slice(1).map(s => (
                  <button key={s.id} onClick={() => scrollTo(s.id)}
                    className="text-[10px] font-anta tracking-[0.25em] uppercase transition-colors duration-200"
                    style={{ color: active === s.id ? 'var(--accent-1)' : 'var(--text-2)' }}>
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
          </motion.header>
        )}
      </AnimatePresence>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{opacity:0,y:-10}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-10}}
            className="fixed top-16 left-0 right-0 z-40 p-6 lg:hidden"
            style={{ background: 'var(--bg-0)', backdropFilter: 'blur(20px)', borderBottom: '1px solid var(--border)' }}>
            {SECTIONS.map((s,i) => (
              <motion.button key={s.id} initial={{opacity:0,x:-20}} animate={{opacity:1,x:0}} transition={{delay:i*0.05}}
                onClick={() => scrollTo(s.id)}
                className="block w-full text-left py-3 border-b text-sm font-anta tracking-widest uppercase"
                style={{ borderColor: 'var(--border)', color: active === s.id ? 'var(--accent-1)' : 'var(--text-1)' }}>
                <span className="mr-4 opacity-30">{s.kanji}</span>{s.label}
              </motion.button>
            ))}
            <div className="pt-4 flex items-center justify-between">
              <span className="text-xs font-anta" style={{ color: 'var(--text-2)' }}>THEME</span>
              <button onClick={toggle} className="text-sm font-mono px-3 py-1.5 border" style={{ borderColor: 'var(--border-accent)', color: 'var(--accent-1)' }}>
                {theme === 'dark' ? '○ LIGHT MODE' : '● DARK MODE'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
