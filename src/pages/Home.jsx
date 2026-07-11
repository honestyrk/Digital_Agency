import SEO from '../components/SEO'
import Hero from '../sections/Hero'
import Intro from '../sections/Intro'
import PortfolioShowcase from '../sections/PortfolioShowcase'
import Services from '../sections/Services'
import WhyPrimeCut from '../sections/WhyPrimeCut'
import ProcessTimeline from '../sections/ProcessTimeline'
import Stats from '../sections/Stats'
import TrustedBy from '../sections/TrustedBy'
import Testimonials from '../sections/Testimonials'
import ContactCTA from '../sections/ContactCTA'

export default function Home() {
  return (
    <>
      <SEO />
      <Hero />
      <Intro />
      <PortfolioShowcase />
      <Services />
      <WhyPrimeCut />
      <ProcessTimeline />
      <Stats />
      <TrustedBy />
      <Testimonials />
      <ContactCTA />
    </>
  )
}
