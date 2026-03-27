import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home    from './pages/Home'
import About   from './pages/About'
import Menu    from './pages/Menu'
import Blog    from './pages/Blog'
import Contact from './pages/Contact'

/* Scroll to top on route change */
function ScrollReset() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo({ top:0, behavior:'instant' }) }, [pathname])
  return null
}

/* Back-to-top floating button */
function BackToTop() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 320)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <button
      className={`back-to-top ${show ? 'show' : ''}`}
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      <ArrowUp size={18} />
    </button>
  )
}

/* Page-level fade for each route */
function AppRoutes() {
  const location = useLocation()
  return (
    <div key={location.pathname} className="page-transition">
      <Routes location={location}>
        <Route path="/"        element={<Home />}    />
        <Route path="/about"   element={<About />}   />
        <Route path="/menu"    element={<Menu />}    />
        <Route path="/blog"    element={<Blog />}    />
        <Route path="/contact" element={<Contact />} />
        {/* Fallback */}
        <Route path="*" element={<Home />} />
      </Routes>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollReset />
      <Navbar />
      <main className="page-shell">
        <AppRoutes />
      </main>
      <Footer />
      <BackToTop />
    </BrowserRouter>
  )
}
