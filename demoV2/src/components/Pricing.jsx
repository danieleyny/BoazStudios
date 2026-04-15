import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { PRICING } from '../content'
import SectionLabel from './SectionLabel'
import TextReveal from './TextReveal'
import MagneticButton from './MagneticButton'

function PricingCard({ tier, index }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.div
      ref={ref}
      className={`glass rounded-sm p-8 lg:p-10 relative ${
        tier.highlighted ? 'lg:scale-105 border-gold/30 lg:-my-4' : ''
      }`}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Badge */}
      {tier.badge && (
        <div className="absolute -top-px left-1/2 -translate-x-1/2">
          <div className="bg-gold text-black text-xs font-inter font-bold tracking-wider px-4 py-1.5">
            {tier.badge}
          </div>
        </div>
      )}

      <div className="text-center mb-8">
        <h3 className="font-playfair text-2xl font-bold text-white mb-4">{tier.name}</h3>
        <div className="flex items-baseline justify-center gap-1">
          <span className="font-playfair text-5xl font-bold text-gold">{tier.price}</span>
          <span className="font-inter text-white/40 text-sm">{tier.period}</span>
        </div>
      </div>

      <div className="space-y-4 mb-10">
        {tier.features.map((feature, i) => (
          <div key={i} className="flex items-start gap-3">
            <svg className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span className="font-inter text-sm text-white/60">{feature}</span>
          </div>
        ))}
      </div>

      <MagneticButton
        href="#contact"
        className={`w-full py-4 text-sm font-inter font-semibold tracking-wide transition-all duration-300 ${
          tier.highlighted
            ? 'bg-gold text-black hover:bg-gold-light hover:shadow-lg hover:shadow-gold/20'
            : 'border border-gold/30 text-gold hover:bg-gold/10 hover:border-gold'
        }`}
      >
        {tier.cta}
      </MagneticButton>
    </motion.div>
  )
}

export default function Pricing() {
  return (
    <section id="pricing" className="relative py-32 px-6 lg:px-12 bg-dark">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <div className="flex justify-center">
            <SectionLabel>{PRICING.label}</SectionLabel>
          </div>
          <TextReveal
            as="h2"
            className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-4"
          >
            {PRICING.headline}
          </TextReveal>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 items-start">
          {PRICING.tiers.map((tier, i) => (
            <PricingCard key={i} tier={tier} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
