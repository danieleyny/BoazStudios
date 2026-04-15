import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { RESULTS } from '../content'
import SectionLabel from './SectionLabel'
import TextReveal from './TextReveal'

function ResultCard({ item, index }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.div
      ref={ref}
      className="group relative overflow-hidden cursor-pointer"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.2, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

        {/* Content overlay */}
        <div className="absolute inset-0 flex flex-col justify-end p-8">
          <motion.div
            className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500"
          >
            <p className="font-playfair text-2xl font-bold text-white mb-2">{item.name}</p>
            <p className="font-inter text-gold text-sm tracking-wide mb-3">{item.result}</p>
            <div className="flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
              <span className="font-inter text-xs text-white/50">{item.program}</span>
              <span className="w-1 h-1 rounded-full bg-gold/50" />
              <span className="font-inter text-xs text-white/50">{item.duration}</span>
            </div>
          </motion.div>
        </div>

        {/* Gold border on hover */}
        <div className="absolute inset-3 border border-gold/0 group-hover:border-gold/30 transition-all duration-500" />
      </div>
    </motion.div>
  )
}

export default function Results() {
  return (
    <section id="results" className="relative py-32 px-6 lg:px-12 bg-near-black">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <div className="flex justify-center">
            <SectionLabel>{RESULTS.label}</SectionLabel>
          </div>
          <TextReveal
            as="h2"
            className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-4"
          >
            {RESULTS.headline}
          </TextReveal>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {RESULTS.items.map((item, i) => (
            <ResultCard key={i} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
