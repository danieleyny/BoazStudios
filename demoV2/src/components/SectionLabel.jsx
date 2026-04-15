import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export default function SectionLabel({ children }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.div
      ref={ref}
      className="flex items-center gap-4 mb-6"
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="gold-line" />
      <span className="text-gold text-xs tracking-[0.3em] font-inter font-semibold uppercase">
        {children}
      </span>
    </motion.div>
  )
}
