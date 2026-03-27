import { useEffect, useRef, useState } from 'react'

/**
 * Observe the ref element. When it enters viewport, adds `visible`
 * to the element itself AND to all `.reveal` children inside it.
 */
export function useScrollReveal(threshold = 0.12) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible')
          el.querySelectorAll('.reveal').forEach(c => c.classList.add('visible'))
          observer.unobserve(el)
        }
      },
      { threshold }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])
  return ref
}

/**
 * Observe a container; stagger-reveal all `.reveal` children.
 */
export function useStaggerReveal(staggerMs = 110, threshold = 0.08) {
  const ref = useRef(null)
  useEffect(() => {
    const container = ref.current
    if (!container) return
    const children = Array.from(container.querySelectorAll('.reveal'))
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          children.forEach((child, i) => {
            setTimeout(() => child.classList.add('visible'), i * staggerMs)
          })
          observer.unobserve(container)
        }
      },
      { threshold }
    )
    observer.observe(container)
    return () => observer.disconnect()
  }, [staggerMs, threshold])
  return ref
}

/**
 * Self-observing hook for individual elements (use inside mapped lists).
 * Returns [ref, isVisible].
 */
export function useSelfReveal(threshold = 0.25) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.unobserve(el)
        }
      },
      { threshold }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])
  return [ref, visible]
}
