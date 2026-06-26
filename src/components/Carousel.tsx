'use client'

import { useRef, useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { VILLAS } from '@/lib/villas'

const CARDS = VILLAS.map((villa) => ({
  tag: 'VILLA',
  title: villa.name,
  desc: villa.description.slice(0, 100) + '...',
  href: `/villas/${villa.slug}`,
  img: `https://images.unsplash.com/photo-${villa.slug === 'mawar' ? '1582268611958-ebfd161ef9cf' : villa.slug === 'jepun' ? '1613490493576-7fde63acd811' : villa.slug === 'anggrek' ? '1564013799919-ab600027ffc6' : '1600585154340-be6161a56a0c'}?w=800&q=80`,
}))

export default function Carousel() {
  const trackRef = useRef<HTMLDivElement>(null)
  const [isPaused, setIsPaused] = useState(false)
  const positionRef = useRef(0)
  const animFrameRef = useRef<number | undefined>(undefined)
  const CARD_WIDTH = 420 + 16
  const TOTAL_WIDTH = CARD_WIDTH * CARDS.length

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    const speed = 0.5

    const animate = () => {
      if (!isPaused) {
        positionRef.current += speed
        if (positionRef.current >= TOTAL_WIDTH) {
          positionRef.current = 0
        }
        if (track) {
          track.style.transform = `translateX(-${positionRef.current}px)`
        }
      }
      animFrameRef.current = requestAnimationFrame(animate)
    }

    animFrameRef.current = requestAnimationFrame(animate)
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
    }
  }, [isPaused, TOTAL_WIDTH])

  const scroll = (direction: 'left' | 'right') => {
    positionRef.current += direction === 'right' ? CARD_WIDTH : -CARD_WIDTH
    if (positionRef.current < 0) positionRef.current = 0
  }

  const doubled = [...CARDS, ...CARDS]

  return (
    <section id="villas" className="overflow-hidden px-6 py-12 md:py-20" style={{ background: 'var(--beige)' }}>
      <div className="mb-10 text-center md:mb-12">
        <p style={{ fontSize: '10px', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--brand-green)', marginBottom: '12px' }}>Our Villas</p>
        <h2 style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(36px, 4vw, 52px)', fontWeight: 300, color: '#1A1A1A', letterSpacing: '0.02em' }}>Find Your Perfect Stay</h2>
      </div>

      <div className="relative">
        <button
          onClick={() => scroll('left')}
          className="absolute left-2 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-[var(--brand-green)] bg-transparent text-[var(--brand-green)] md:left-6 md:h-11 md:w-11"
          style={{ fontSize: '18px', cursor: 'pointer' }}
          aria-label="Previous slide"
        >←</button>

        <div
          className="overflow-hidden px-12 md:px-20"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div
            ref={trackRef}
            style={{ display: 'flex', gap: '16px', willChange: 'transform' }}
          >
            {doubled.map((card, i) => (
              <div
                key={i}
                className="relative h-[480px] flex-[0_0_85vw] overflow-hidden rounded-[2px] md:h-[540px] md:flex-[0_0_420px]"
                style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.3)' }}
              >
                <Image src={card.img} alt={card.title} fill style={{ objectFit: 'cover' }} sizes="420px" />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 55%)', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '32px' }}>
                  <p style={{ fontSize: '9px', letterSpacing: '0.25em', color: 'var(--brand-green-light)', marginBottom: '8px', border: '1px solid var(--brand-green-light)', display: 'inline-block', padding: '3px 8px', width: 'fit-content' }}>{card.tag}</p>
                  <h3 style={{ fontFamily: 'var(--font-cormorant)', fontSize: '28px', fontWeight: 300, color: 'white', marginBottom: '8px' }}>{card.title}</h3>
                  <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.65)', lineHeight: 1.6, marginBottom: '16px', fontWeight: 300 }}>{card.desc}</p>
                  <Link href={card.href} style={{ fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--brand-green-light)', textDecoration: 'none' }}>Explore →</Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={() => scroll('right')}
          className="absolute right-2 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-[var(--brand-green)] bg-transparent text-[var(--brand-green)] md:right-6 md:h-11 md:w-11"
          style={{ fontSize: '18px', cursor: 'pointer' }}
          aria-label="Next slide"
        >→</button>
      </div>
    </section>
  )
}
