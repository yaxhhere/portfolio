'use client'
import { useEffect } from 'react'
import dynamic from 'next/dynamic'
import { ThemeProvider } from '@/components/theme/ThemeProvider'
import LoadingScreen from '@/components/loading/LoadingScreen'
import CustomCursor from '@/components/cursor/CustomCursor'
import Navigation from '@/components/navigation/Navigation'
import OriginArc from '@/components/sections/OriginArc'
import PowerSystem from '@/components/sections/PowerSystem'
import AIAscension from '@/components/sections/AIAscension'
import Timeline from '@/components/sections/Timeline'
import Projects from '@/components/sections/Projects'
import Architecture from '@/components/sections/Architecture'
import Contact from '@/components/sections/Contact'

const Hero = dynamic(() => import('@/components/sections/Hero'), { ssr: false })

function Portfolio() {
  useEffect(() => {
    const initLenis = async () => {
      const Lenis = (await import('lenis')).default
      const lenis = new Lenis({ duration: 1.2, easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) })
      const raf = (time: number) => { lenis.raf(time); requestAnimationFrame(raf) }
      requestAnimationFrame(raf)
      return () => lenis.destroy()
    }
    initLenis()
  }, [])

  return (
    <main style={{ background: 'var(--bg-0)' }}>
      <LoadingScreen />
      <CustomCursor />
      <Navigation />
      <Hero />
      <OriginArc />
      <PowerSystem />
      <AIAscension />
      <Timeline />
      <Projects />
      <Architecture />
      <Contact />
    </main>
  )
}

export default function Home() {
  return (
    <ThemeProvider>
      <Portfolio />
    </ThemeProvider>
  )
}
