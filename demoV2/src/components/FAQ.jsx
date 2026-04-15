import { useState } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { useRef } from 'react'
import { FAQ as FAQ_DATA } from '../content'
import SectionLabel from './SectionLabel'
import TextReveal from './TextReveal'

function FAQItem({ item, index, isOpen, toggle }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-30px' })

  return (
    <motion.div
      ref={ref}
      className="border-b border-white/10"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      <button
        onClick={toggle}
        className="w-full flex items-center justify-between py-6 text-left group"
      >
        <span className={`font-inter text-lg pr-8 transition-colors duration-300 ${
          isOpen ? 'text-gold' : 'text-white group-hover:text-gold/80'
        }`}>
          {item.question}
        </span>
        <motion.span
          className="flex-shrink-0 w-8 h-8 flex items-center justify-center text-gold text-xl"
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3 }}
        >
          +
        </motion.span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="font-inter text-white/50 leading-relaxed pb-6 pr-12">
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null)

  return (
    <section id="faq" className="relative py-32 px-6 lg:px-12 bg-near-black">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-20">
          <div className="flex justify-center">
            <SectionLabel>{FAQ_DATA.label}</SectionLabel>
          </div>
          <TextReveal
            as="h2"
            className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-4"
          >
            {FAQ_DATA.headline}
          </TextReveal>
        </div>

        <div>
          {FAQ_DATA.items.map((item, i) => (
            <FAQItem
              key={i}
              item={item}
              index={i}
              isOpen={openIndex === i}
              toggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
