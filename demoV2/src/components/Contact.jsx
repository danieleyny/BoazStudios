import { useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { CONTACT, SITE } from '../content'
import SectionLabel from './SectionLabel'
import TextReveal from './TextReveal'
import MagneticButton from './MagneticButton'

export default function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', goals: '', time: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submission:', formData)
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const inputClasses = 'w-full bg-white/5 border border-white/10 px-5 py-4 font-inter text-white text-sm focus:outline-none focus:border-gold/50 transition-colors duration-300 placeholder:text-white/30'

  return (
    <section id="contact" className="relative py-32 px-6 lg:px-12 bg-dark">
      <div ref={ref} className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <div className="flex justify-center">
            <SectionLabel>{CONTACT.label}</SectionLabel>
          </div>
          <TextReveal
            as="h2"
            className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-4"
          >
            {CONTACT.headline}
          </TextReveal>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            className="space-y-5"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <input
              type="text"
              name="name"
              placeholder={CONTACT.fields.name}
              value={formData.name}
              onChange={handleChange}
              required
              className={inputClasses}
            />
            <div className="grid sm:grid-cols-2 gap-5">
              <input
                type="email"
                name="email"
                placeholder={CONTACT.fields.email}
                value={formData.email}
                onChange={handleChange}
                required
                className={inputClasses}
              />
              <input
                type="tel"
                name="phone"
                placeholder={CONTACT.fields.phone}
                value={formData.phone}
                onChange={handleChange}
                className={inputClasses}
              />
            </div>
            <textarea
              name="goals"
              placeholder={CONTACT.fields.goals}
              value={formData.goals}
              onChange={handleChange}
              rows={4}
              className={`${inputClasses} resize-none`}
            />
            <select
              name="time"
              value={formData.time}
              onChange={handleChange}
              className={`${inputClasses} ${!formData.time ? 'text-white/30' : ''}`}
            >
              <option value="" disabled>{CONTACT.fields.time}</option>
              {CONTACT.timeOptions.map((opt) => (
                <option key={opt} value={opt} className="bg-dark text-white">{opt}</option>
              ))}
            </select>
            <MagneticButton
              className={`w-full py-4 text-sm font-inter font-semibold tracking-wide transition-all duration-300 ${
                submitted
                  ? 'bg-green-500 text-white'
                  : 'bg-gold text-black hover:bg-gold-light hover:shadow-lg hover:shadow-gold/20'
              }`}
              onClick={submitted ? undefined : undefined}
            >
              {submitted ? 'Message Sent!' : CONTACT.submitText}
            </MagneticButton>
          </motion.form>

          {/* Info */}
          <motion.div
            className="space-y-10"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div>
              <h3 className="font-playfair text-2xl font-bold text-white mb-4">Visit Us</h3>
              <p className="font-inter text-white/50 leading-relaxed">{SITE.address}</p>
            </div>
            <div>
              <h3 className="font-playfair text-2xl font-bold text-white mb-4">Contact</h3>
              <p className="font-inter text-white/50 mb-2">{SITE.email}</p>
              <p className="font-inter text-white/50">{SITE.phone}</p>
            </div>
            <div>
              <h3 className="font-playfair text-2xl font-bold text-white mb-4">Follow Us</h3>
              <div className="flex gap-4">
                {CONTACT.socials.map((social) => (
                  <a
                    key={social.platform}
                    href={social.url}
                    className="w-12 h-12 border border-white/10 flex items-center justify-center text-white/50 hover:border-gold hover:text-gold transition-all duration-300"
                    aria-label={social.platform}
                  >
                    <span className="text-xs font-inter font-semibold tracking-wider">
                      {social.platform.slice(0, 2).toUpperCase()}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* Map placeholder */}
            <div className="aspect-video bg-dark-gray border border-white/5 flex items-center justify-center">
              <div className="text-center">
                <div className="text-gold/30 text-4xl mb-2">&#9672;</div>
                <p className="font-inter text-white/20 text-sm">Upper East Side, Manhattan</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
