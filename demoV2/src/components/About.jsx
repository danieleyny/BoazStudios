import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { ABOUT } from '../content'
import SectionLabel from './SectionLabel'
import TextReveal from './TextReveal'

function Counter({ target, suffix, label }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isInView) return
    let start = 0
    const duration = 2000
    const startTime = Date.now()
    const step = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [isInView, target])

  return (
    <motion.div
      ref={ref}
      className="text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
    >
      <div className="font-playfair text-4xl md:text-5xl font-bold text-gold mb-2">
        {count}{suffix}
      </div>
      <div className="font-inter text-sm text-white/50 tracking-wide">{label}</div>
    </motion.div>
  )
}

export default function About() {
  const imageRef = useRef(null)
  const imageInView = useInView(imageRef, { once: true, margin: '-100px' })

  return (
    <section id="about" className="relative py-32 px-6 lg:px-12 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Image with reveal */}
          <div ref={imageRef} className="relative overflow-hidden aspect-[3/4] lg:aspect-[4/5]">
            <motion.div
              className="absolute inset-0 bg-gold z-10"
              initial={{ scaleX: 1 }}
              animate={imageInView ? { scaleX: 0 } : {}}
              transition={{ duration: 1, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
              style={{ transformOrigin: 'right' }}
            />
            <motion.img
              src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80"
              alt="Luxury gym interior"
              className="w-full h-full object-cover"
              initial={{ scale: 1.3 }}
              animate={imageInView ? { scale: 1 } : {}}
              transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            />
            {/* Gold frame accent */}
            <div className="absolute bottom-4 right-4 w-32 h-32 border-r-2 border-b-2 border-gold/30" />
          </div>

          {/* Content */}
          <div>
            <SectionLabel>{ABOUT.label}</SectionLabel>

            <TextReveal
              as="h2"
              className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-8"
            >
              {ABOUT.headline}
            </TextReveal>

            <motion.p
              className="font-inter text-white/60 leading-relaxed mb-6 text-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {ABOUT.description}
            </motion.p>

            <motion.p
              className="font-inter text-white/60 leading-relaxed text-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {ABOUT.description2}
            </motion.p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-24 pt-16 border-t border-white/10">
          {ABOUT.stats.map((stat, i) => (
            <Counter key={i} target={stat.number} suffix={stat.suffix} label={stat.label} />
          ))}
        </div>
      </div>
    </section>
  )
}
