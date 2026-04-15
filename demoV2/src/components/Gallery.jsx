import { useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { GALLERY } from '../content'

export default function Gallery() {
  const containerRef = useRef(null)
  const titleRef = useRef(null)
  const titleInView = useInView(titleRef, { once: true })

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const x = useTransform(scrollYProgress, [0, 1], ['10%', '-60%'])

  return (
    <section id="gallery" className="relative py-32 overflow-hidden bg-near-black">
      {/* Section title */}
      <div ref={titleRef} className="px-6 lg:px-12 mb-16">
        <motion.h2
          className="font-playfair text-7xl md:text-9xl lg:text-[12rem] font-bold text-white/[0.03] leading-none select-none"
          initial={{ x: -100, opacity: 0 }}
          animate={titleInView ? { x: 0, opacity: 1 } : {}}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          {GALLERY.label}
        </motion.h2>
      </div>

      {/* Horizontal scroll gallery */}
      <div ref={containerRef} className="relative h-[500px] md:h-[600px]">
        <motion.div
          className="absolute top-0 flex gap-6 h-full items-center pl-12"
          style={{ x }}
        >
          {GALLERY.images.map((img, i) => (
            <motion.div
              key={i}
              className="relative flex-shrink-0 w-[350px] md:w-[450px] h-[350px] md:h-[450px] overflow-hidden group cursor-pointer"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <img
                src={img.url}
                alt={img.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              {/* Gold frame on hover */}
              <div className="absolute inset-3 border border-gold/0 group-hover:border-gold/40 transition-all duration-500 pointer-events-none" />
              {/* Dark overlay on hover */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-500" />
              {/* Label */}
              <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                <p className="font-inter text-sm text-white tracking-wide">{img.alt}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll hint */}
      <div className="text-center mt-8">
        <p className="font-inter text-xs text-white/30 tracking-[0.2em] uppercase">
          Scroll to explore
        </p>
      </div>
    </section>
  )
}
