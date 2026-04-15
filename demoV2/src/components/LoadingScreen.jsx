import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

export default function LoadingScreen({ onComplete }) {
  const [phase, setPhase] = useState('logo') // logo -> reveal -> done

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('reveal'), 1200)
    const t2 = setTimeout(() => {
      setPhase('done')
      if (onComplete) onComplete()
    }, 1800)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [onComplete])

  return (
    <AnimatePresence>
      {phase !== 'done' && (
        <motion.div
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-near-black"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
        >
          {/* Gold line accent */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-px bg-gold"
            initial={{ width: 0 }}
            animate={{ width: phase === 'reveal' ? '100vw' : 120 }}
            transition={{ duration: phase === 'reveal' ? 0.5 : 0.6, ease: 'easeInOut', delay: phase === 'reveal' ? 0 : 0.3 }}
          />

          {/* Logo */}
          <motion.div
            className="relative z-10 flex flex-col items-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{
              opacity: phase === 'reveal' ? 0 : 1,
              scale: phase === 'reveal' ? 1.1 : 1,
              y: phase === 'reveal' ? -20 : 0,
            }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <h1 className="font-playfair text-6xl md:text-8xl font-bold text-gold tracking-wider">
              BOAZ
            </h1>
            <motion.p
              className="text-white/50 text-sm tracking-[0.3em] mt-4 font-inter uppercase"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.4 }}
            >
              Fitness Studios
            </motion.p>
          </motion.div>

          {/* Curtain panels */}
          {phase === 'reveal' && (
            <>
              <motion.div
                className="absolute inset-y-0 left-0 bg-near-black z-20"
                initial={{ width: '50%' }}
                animate={{ width: 0 }}
                transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
              />
              <motion.div
                className="absolute inset-y-0 right-0 bg-near-black z-20"
                initial={{ width: '50%' }}
                animate={{ width: 0 }}
                transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
              />
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
