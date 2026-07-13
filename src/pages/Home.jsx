import SEO from '../components/SEO'
import Hero from '../sections/Hero'
import CategoryReel from '../sections/CategoryReel'
import Intro from '../sections/Intro'
import PortfolioShowcase from '../sections/PortfolioShowcase'
import Services from '../sections/Services'
import Packages from '../sections/Packages'
import WhyEditTheory from '../sections/WhyEditTheory'
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
      <CategoryReel />
      <Intro />
      <PortfolioShowcase />
      <Services />
      <Packages />
      <WhyEditTheory />
      <ProcessTimeline />
      <Stats />
      <TrustedBy />
      <Testimonials />
      <ContactCTA />
    </>
  )
}
