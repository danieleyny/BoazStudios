import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { TEAM } from '../content'
import SectionLabel from './SectionLabel'
import TextReveal from './TextReveal'

function TeamCard({ member, index }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.div
      ref={ref}
      className="group relative"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Image container */}
      <div className="relative overflow-hidden aspect-[3/4] mb-6">
        <img
          src={member.image}
          alt={member.name}
          className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
        />
        {/* Gold overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end p-6">
          <p className="font-inter text-sm text-white/80 leading-relaxed transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-100">
            {member.bio}
          </p>
        </div>
        {/* Gold corner accent */}
        <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-gold/0 group-hover:border-gold/60 transition-all duration-500" />
        <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-gold/0 group-hover:border-gold/60 transition-all duration-500" />
      </div>

      {/* Info */}
      <h3 className="font-playfair text-xl font-bold text-white group-hover:text-gold transition-colors duration-300">
        {member.name}
      </h3>
      <p className="font-inter text-sm text-gold/70 tracking-wide mt-1">{member.role}</p>
    </motion.div>
  )
}

export default function Team() {
  return (
    <section id="team" className="relative py-32 px-6 lg:px-12 bg-dark">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <div className="flex justify-center">
            <SectionLabel>{TEAM.label}</SectionLabel>
          </div>
          <TextReveal
            as="h2"
            className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-4"
          >
            {TEAM.headline}
          </TextReveal>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {TEAM.members.map((member, i) => (
            <TeamCard key={i} member={member} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
