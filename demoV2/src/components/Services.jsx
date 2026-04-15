import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { SERVICES } from '../content'
import SectionLabel from './SectionLabel'
import TextReveal from './TextReveal'

function ServiceCard({ item, index }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.div
      ref={ref}
      className="glass rounded-sm p-8 lg:p-10 group cursor-pointer relative overflow-hidden"
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{
        rotateX: -2,
        rotateY: 3,
        transition: { duration: 0.3 },
      }}
      style={{ transformStyle: 'preserve-3d', perspective: 1000 }}
    >
      {/* Hover gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative z-10">
        <div className="text-4xl mb-6">{item.icon}</div>
        <h3 className="font-playfair text-2xl font-bold text-white mb-4 group-hover:text-gold transition-colors duration-300">
          {item.title}
        </h3>
        <p className="font-inter text-white/50 leading-relaxed mb-6 text-sm">
          {item.description}
        </p>
        <span className="inline-flex items-center gap-2 text-gold text-sm font-inter font-semibold tracking-wide group-hover:gap-3 transition-all duration-300">
          {item.link}
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </span>
      </div>
    </motion.div>
  )
}

export default function Services() {
  return (
    <section id="services" className="relative py-32 px-6 lg:px-12 bg-dark">
      {/* Subtle top gradient */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-near-black to-transparent" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <div className="flex justify-center">
            <SectionLabel>{SERVICES.label}</SectionLabel>
          </div>
          <TextReveal
            as="h2"
            className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-4"
          >
            {SERVICES.headline}
          </TextReveal>
        </div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {SERVICES.items.map((item, i) => (
            <ServiceCard key={i} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
