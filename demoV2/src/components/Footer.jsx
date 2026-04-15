import { useState } from 'react'
import { motion } from 'framer-motion'
import { SITE, NAV_LINKS, CONTACT, FOOTER } from '../content'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e) => {
    e.preventDefault()
    console.log('Newsletter signup:', email)
    setSubscribed(true)
    setEmail('')
    setTimeout(() => setSubscribed(false), 3000)
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative bg-black pt-20 pb-8 px-6 lg:px-12">
      {/* Top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-16 mb-16">
          {/* Brand */}
          <div>
            <h2 className="font-playfair text-3xl font-bold text-gold mb-4">BOAZ</h2>
            <p className="font-inter text-white/40 text-sm leading-relaxed mb-6">
              Elite personal training in Manhattan's Upper East Side. Where luxury meets performance.
            </p>
            <div className="flex gap-4">
              {CONTACT.socials.map((social) => (
                <a
                  key={social.platform}
                  href={social.url}
                  className="text-white/30 hover:text-gold transition-colors duration-300 text-sm font-inter"
                  aria-label={social.platform}
                >
                  {social.platform}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-inter text-sm font-semibold text-white tracking-wider uppercase mb-6">Navigation</h3>
            <div className="grid grid-cols-2 gap-3">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="font-inter text-sm text-white/40 hover:text-gold transition-colors duration-300"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-inter text-sm font-semibold text-white tracking-wider uppercase mb-6">
              {FOOTER.newsletter.headline}
            </h3>
            <form onSubmit={handleSubscribe} className="flex">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={FOOTER.newsletter.placeholder}
                required
                className="flex-1 bg-white/5 border border-white/10 px-4 py-3 font-inter text-white text-sm focus:outline-none focus:border-gold/50 transition-colors placeholder:text-white/30"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-gold text-black font-inter font-semibold text-sm tracking-wide hover:bg-gold-light transition-colors duration-300"
              >
                {subscribed ? '&#10003;' : FOOTER.newsletter.cta}
              </button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-inter text-xs text-white/30">{SITE.copyright}</p>
          <motion.button
            onClick={scrollToTop}
            className="group flex items-center gap-2 text-white/30 hover:text-gold transition-colors duration-300"
            whileHover={{ y: -2 }}
          >
            <span className="font-inter text-xs tracking-wider">Back to Top</span>
            <svg className="w-4 h-4 transition-transform group-hover:-translate-y-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          </motion.button>
        </div>
      </div>
    </footer>
  )
}
