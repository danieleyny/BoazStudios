import { motion } from 'framer-motion'
import { HERO } from '../content'
import MagneticButton from './MagneticButton'
import ParticleEffect from './ParticleEffect'

export default function Hero() {
  const words = HERO.headline.split(' ')

  return (
    <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient animation */}
      <div className="absolute inset-0 bg-near-black">
        <motion.div
          className="absolute inset-0 opacity-30"
          style={{
            background: 'radial-gradient(ellipse at 50% 50%, rgba(219,177,77,0.15) 0%, transparent 70%)',
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.15, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* Dark overlay vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />
      </div>

      <ParticleEffect />

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        {/* Headline with word reveal */}
        <h1 className="font-playfair text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold leading-none mb-8">
          {words.map((word, i) => (
            <span key={i} className="inline-block overflow-hidden mr-[0.25em] last:mr-0">
              <motion.span
                className="inline-block text-gold-gradient"
                initial={{ opacity: 0, y: '100%', rotateX: -90 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 3 + i * 0.15,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {word}
              </motion.span>
            </span>
          ))}
        </h1>

        {/* Subtitle */}
        <motion.p
          className="font-inter text-lg md:text-xl text-white/60 tracking-wide max-w-2xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.8, duration: 0.8, ease: 'easeOut' }}
        >
          {HERO.subtitle}
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 4.2, duration: 0.8, ease: 'easeOut' }}
        >
          <MagneticButton
            href="#contact"
            className="px-10 py-4 bg-gold text-black font-inter font-semibold tracking-wide text-sm hover:bg-gold-light hover:shadow-xl hover:shadow-gold/20 transition-all duration-300"
          >
            {HERO.cta1}
          </MagneticButton>
          <MagneticButton
            href="#gallery"
            className="px-10 py-4 border border-gold/50 text-gold font-inter font-semibold tracking-wide text-sm hover:bg-gold/10 hover:border-gold transition-all duration-300"
          >
            {HERO.cta2}
          </MagneticButton>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4.5, duration: 0.8 }}
      >
        <span className="text-gold/50 text-xs tracking-[0.2em] font-inter uppercase">Scroll</span>
        <motion.div
          className="w-px h-8 bg-gradient-to-b from-gold/50 to-transparent"
          animate={{ scaleY: [1, 0.5, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  )
}
