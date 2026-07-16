'use client'

import { useEffect, useRef, ReactNode } from 'react'

type Props = {
  children: ReactNode
  className?: string
  delay?: number
  as?: string
}

export default function ScrollReveal({ children, className = '', delay = 0, as: Tag = 'div' }: Props) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible')
          observer.unobserve(el)
        }
      },
      { threshold: 0.06, rootMargin: '0px 0px -32px 0px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    // @ts-expect-error — dynamic tag with ref is fine here
    <Tag
      ref={ref}
      className={`reveal ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  )
}
