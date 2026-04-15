import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { useRef } from 'react'
import { TESTIMONIALS } from '../content'
import SectionLabel from './SectionLabel'
import TextReveal from './TextReveal'

export default function Testimonials() {
  const [current, setCurrent] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(c => (c + 1) % TESTIMONIALS.items.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  const item = TESTIMONIALS.items[current]

  return (
    <section id="testimonials" className="relative py-32 px-6 lg:px-12 bg-near-black overflow-hidden">
      {/* Background parallax quote mark */}
      <motion.div
        className="absolute top-20 left-1/2 -translate-x-1/2 font-playfair text-[20rem] md:text-[30rem] text-gold/[0.03] leading-none select-none pointer-events-none"
        initial={{ y: 50 }}
        whileInView={{ y: -30 }}
        viewport={{ once: false }}
        transition={{ duration: 1 }}
      >
        &ldquo;
      </motion.div>

      <div ref={ref} className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="flex justify-center">
            <SectionLabel>{TESTIMONIALS.label}</SectionLabel>
          </div>
          <TextReveal
            as="h2"
            className="font-playfair text-4xl md:text-5xl font-bold text-white mt-4"
          >
            {TESTIMONIALS.headline}
          </TextReveal>
        </div>

        {/* Testimonial card */}
        <div className="min-h-[300px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              className="text-center"
              initial={{ opacity: 0, y: 30, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -30, scale: 0.98 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Stars */}
              <div className="flex justify-center gap-1 mb-8">
                {Array.from({ length: item.stars }).map((_, i) => (
                  <span key={i} className="text-gold text-xl">&#9733;</span>
                ))}
              </div>

              {/* Quote */}
              <p className="font-playfair text-xl md:text-2xl lg:text-3xl text-white/90 italic leading-relaxed mb-8">
                &ldquo;{item.quote}&rdquo;
              </p>

              {/* Author */}
              <div className="w-12 h-px bg-gold mx-auto mb-6" />
              <p className="font-inter text-white font-semibold tracking-wide">{item.name}</p>
              <p className="font-inter text-gold/60 text-sm mt-1">{item.title}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-3 mt-12">
          {TESTIMONIALS.items.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-2 h-2 rounded-full transition-all duration-500 ${
                i === current ? 'bg-gold w-8' : 'bg-white/20 hover:bg-white/40'
              }`}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
