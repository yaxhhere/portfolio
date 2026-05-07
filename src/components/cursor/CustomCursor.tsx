'use client'
import { useEffect, useRef, useState } from 'react'

export default function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null)
  const dotRef  = useRef<HTMLDivElement>(null)
  const mouse   = useRef({ x: -100, y: -100 })
  const pos     = useRef({ x: -100, y: -100 })
  const raf     = useRef(0)
  const [hover, setHover]  = useState(false)
  const [click, setClick]  = useState(false)

  useEffect(() => {
    const mv = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY }
      if (dotRef.current) dotRef.current.style.transform = `translate(${e.clientX - 3}px,${e.clientY - 3}px)`
    }
    const md = () => setClick(true)
    const mu = () => setClick(false)
    const ov = (e: MouseEvent) => { if ((e.target as HTMLElement).closest('a,button,[data-cursor]')) setHover(true) }
    const ou = (e: MouseEvent) => { if ((e.target as HTMLElement).closest('a,button,[data-cursor]')) setHover(false) }

    const loop = () => {
      pos.current.x += (mouse.current.x - pos.current.x) * 0.1
      pos.current.y += (mouse.current.y - pos.current.y) * 0.1
      if (ringRef.current) {
        const s = hover ? 44 : click ? 14 : 26
        ringRef.current.style.transform = `translate(${pos.current.x - s/2}px,${pos.current.y - s/2}px)`
        ringRef.current.style.width  = `${s}px`
        ringRef.current.style.height = `${s}px`
        ringRef.current.style.borderColor = hover ? 'var(--accent-2b)' : 'var(--accent-1)'
        ringRef.current.style.boxShadow   = hover ? '0 0 12px var(--glow-2)' : '0 0 10px var(--glow-1)'
      }
      raf.current = requestAnimationFrame(loop)
    }
    raf.current = requestAnimationFrame(loop)

    window.addEventListener('mousemove', mv)
    window.addEventListener('mousedown', md)
    window.addEventListener('mouseup', mu)
    document.addEventListener('mouseover', ov)
    document.addEventListener('mouseout', ou)
    return () => {
      cancelAnimationFrame(raf.current)
      window.removeEventListener('mousemove', mv)
      window.removeEventListener('mousedown', md)
      window.removeEventListener('mouseup', mu)
      document.removeEventListener('mouseover', ov)
      document.removeEventListener('mouseout', ou)
    }
  }, [hover, click])

  return (
    <>
      <div ref={ringRef} className="fixed top-0 left-0 rounded-full pointer-events-none z-[99998]"
        style={{ border: '1.5px solid var(--accent-1)', transition: 'width 0.2s, height 0.2s, border-color 0.3s', mixBlendMode: 'screen' }} />
      <div ref={dotRef} className="fixed top-0 left-0 w-[6px] h-[6px] rounded-full pointer-events-none z-[99999]"
        style={{ background: hover ? 'var(--accent-2b)' : 'var(--accent-1b)', boxShadow: hover ? '0 0 8px var(--glow-2)' : '0 0 6px var(--glow-1)' }} />
    </>
  )
}
