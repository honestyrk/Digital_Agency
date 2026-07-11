import { lazy, Suspense, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, MotionConfig } from 'framer-motion'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Loader from './components/Loader'
import ScrollProgress from './components/ScrollProgress'
import PageTransition from './components/PageTransition'
import Home from './pages/Home'

// Code-split every non-home route
const Work = lazy(() => import('./pages/Work'))
const Project = lazy(() => import('./pages/Project'))
const CaseStudy = lazy(() => import('./pages/CaseStudy'))
const About = lazy(() => import('./pages/About'))
const Contact = lazy(() => import('./pages/Contact'))
const NotFound = lazy(() => import('./pages/NotFound'))

export default function App() {
  const location = useLocation()
  // Show the intro loader only on the first visit of the session
  const [loading, setLoading] = useState(() => !sessionStorage.getItem('pc-visited'))
  const finishLoading = () => {
    sessionStorage.setItem('pc-visited', '1')
    setLoading(false)
  }

  return (
    <MotionConfig reducedMotion="user">
      {loading && <Loader onDone={finishLoading} />}
      <ScrollProgress />
      <Navbar />
      <Suspense fallback={<div className="min-h-svh" />}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<PageTransition><Home /></PageTransition>} />
            <Route path="/work" element={<PageTransition><Work /></PageTransition>} />
            <Route path="/work/:slug" element={<PageTransition><Project /></PageTransition>} />
            <Route path="/case-studies/:slug" element={<PageTransition><CaseStudy /></PageTransition>} />
            <Route path="/about" element={<PageTransition><About /></PageTransition>} />
            <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
            <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
          </Routes>
        </AnimatePresence>
      </Suspense>
      <Footer />
    </MotionConfig>
  )
}
