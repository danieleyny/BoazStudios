import { useState, useCallback } from 'react'
import LoadingScreen from './components/LoadingScreen'
import Navigation from './components/Navigation'
import Hero from './components/Hero'
import About from './components/About'
import Services from './components/Services'
import Gallery from './components/Gallery'
import Team from './components/Team'
import Testimonials from './components/Testimonials'
import Results from './components/Results'
import Pricing from './components/Pricing'
import FAQ from './components/FAQ'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  const [loading, setLoading] = useState(true)

  const handleLoadingComplete = useCallback(() => {
    setLoading(false)
  }, [])

  return (
    <>
      <LoadingScreen onComplete={handleLoadingComplete} />
      {!loading && (
        <>
          <div className="grain-overlay" />
          <Navigation />
          <main>
            <Hero />
            <About />
            <Services />
            <Gallery />
            <Team />
            <Testimonials />
            <Results />
            <Pricing />
            <FAQ />
            <Contact />
          </main>
          <Footer />
        </>
      )}
    </>
  )
}
