import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ShoppingBag, Menu, X } from 'lucide-react'

const links = [
  { to: '/',        label: 'Home' },
  { to: '/about',   label: 'About Us' },
  { to: '/menu',    label: 'Menu' },
  { to: '/blog',    label: 'Blog' },
  { to: '/contact', label: 'Contact Us' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { pathname } = useLocation()

  const isLight = !scrolled

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => setMobileOpen(false), [pathname])

  const textCol = isLight ? 'rgba(255,255,255,0.92)' : 'var(--dark)'
  const logoCol = isLight ? '#ffffff'                 : 'var(--dark)'
  const metaCol = isLight ? 'rgba(255,255,255,0.5)'  : 'var(--saffron)'
  const tagCol  = isLight ? 'rgba(255,255,255,0.4)'  : 'var(--gold)'
  const lineCol = isLight ? 'rgba(255,255,255,0.3)'  : 'var(--gold)'

  return (
    <>
      {/* ──────────────────────────────────────────────
          NAVBAR — logo absolutely centered,
          left/right halves flex independently so they
          can NEVER collide with the center logo.
      ────────────────────────────────────────────── */}
      <nav className="nav-shell" style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        padding: scrolled ? '1rem 2.3rem' : '1.6rem 2.6rem',
        background: scrolled ? 'rgba(255,255,255,0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border-color)' : 'none',
        boxShadow: scrolled ? '0 1px 0 rgba(0,0,0,0.05)' : 'none',
        transition: 'all 0.4s cubic-bezier(0.4,0,0.2,1)',
        minHeight: scrolled ? 76 : 94,
      }}>

        {/* ── LEFT half (nav links) ── */}
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '1.4rem' }}
             className="nav-links-left">
          {links.map(({ to, label }) => (
            <Link key={to} to={to}
              className={`nav-link ${pathname === to ? 'active' : ''}`}
              style={{ color: textCol, transition: 'color 0.3s', whiteSpace: 'nowrap', fontSize: '0.76rem' }}>
              {label}
            </Link>
          ))}
        </div>

        {/* ── CENTER: logo — spans full nav width, flex-centered,
            so it is always exactly in the middle of the viewport
            regardless of padding or left/right content widths. ── */}
        <Link to="/"
          className="nav-logo"
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: '50%',
            transform: 'translateY(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textDecoration: 'none',
            pointerEvents: 'none',
            zIndex: 1,
            padding: '0.6rem 0.4rem',
          }}>
          <span style={{ pointerEvents: 'auto', textAlign: 'center', display:'inline-flex', flexDirection:'column', gap:'0.26rem' }}>
            <span style={{
              display: 'block',
              fontFamily: "'Raleway',sans-serif",
              fontSize: '0.56rem', letterSpacing: '0.28em', textTransform: 'uppercase',
              color: metaCol, transition: 'color 0.4s',
              paddingTop: '2px',
            }}>Est. 2010</span>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.45rem' }}>
              <span style={{ width: 14, height: 1, background: lineCol, display: 'block', flexShrink: 0, transition: 'background 0.4s' }} />
              <span style={{
                fontFamily: "'Bona Nova SC',serif",
                fontSize: '1.72rem', fontWeight: 700, letterSpacing: '0.22em',
                color: logoCol, transition: 'color 0.4s', whiteSpace: 'nowrap',
              }}>Indiana</span>
              <span style={{ width: 14, height: 1, background: lineCol, display: 'block', flexShrink: 0, transition: 'background 0.4s' }} />
            </div>

            <span style={{
              display: 'block',
              fontFamily: "'Raleway',sans-serif",
              fontSize: '0.52rem', letterSpacing: '0.38em', textTransform: 'uppercase',
              color: tagCol, transition: 'color 0.4s',
            }}>Fine Indian Cuisine</span>
          </span>
        </Link>

        {/* ── RIGHT half (Order Online + mobile toggle) ── */}
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.75rem' }}>
          <Link to="/menu"
            className="nav-order-btn"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
              background: isLight ? 'rgba(255,255,255,0.12)' : 'var(--saffron)',
              color: '#fff',
              border: `1.5px solid ${isLight ? 'rgba(255,255,255,0.4)' : 'var(--saffron)'}`,
              fontFamily: "'Raleway',sans-serif", fontWeight: 700,
              fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase',
              padding: '0.5rem 1.1rem', transition: 'all 0.3s', whiteSpace: 'nowrap',
            }}
            onMouseEnter={e => { e.currentTarget.style.background='#fff'; e.currentTarget.style.color='var(--saffron)'; e.currentTarget.style.borderColor='#fff' }}
            onMouseLeave={e => { e.currentTarget.style.background=isLight?'rgba(255,255,255,0.12)':'var(--saffron)'; e.currentTarget.style.color='#fff'; e.currentTarget.style.borderColor=isLight?'rgba(255,255,255,0.4)':'var(--saffron)' }}
          >
            <ShoppingBag size={13} /> Order Online
          </Link>

          {/* Hamburger — mobile only */}
          <button onClick={() => setMobileOpen(v => !v)} aria-label="Menu"
            className="nav-hamburger"
            style={{ background:'none', border:'none', cursor:'pointer', color:textCol, display:'none', padding:'2px' }}>
            {mobileOpen ? <X size={24}/> : <Menu size={24}/>}
          </button>
        </div>
      </nav>

      {/* ── Mobile slide-in ── */}
      <div className={`mobile-menu ${mobileOpen ? 'open' : ''}`}>
        <button onClick={() => setMobileOpen(false)}
          style={{ position:'absolute', top:'1.5rem', right:'1.5rem', background:'none', border:'none', cursor:'pointer', color:'var(--dark)' }}>
          <X size={26}/>
        </button>
        <span style={{ fontFamily:"'Bona Nova SC',serif", fontSize:'2rem', fontWeight:700, letterSpacing:'0.18em' }}>SAFFRON</span>
        <span style={{ fontSize:'0.58rem', letterSpacing:'0.4em', textTransform:'uppercase', color:'var(--gold)' }}>Fine Indian Cuisine</span>
        <div style={{ width:36, height:1, background:'var(--gold)' }}/>
        {links.map(({ to, label }) => (
          <Link key={to} to={to} style={{ fontFamily:"'Bona Nova SC',serif", fontSize:'1.6rem', color:pathname===to?'var(--saffron)':'var(--dark)' }}>
            {label}
          </Link>
        ))}
        <Link to="/menu" className="btn-saffron"><ShoppingBag size={14}/><span>Order Online</span></Link>
      </div>

      <style>{`
        @media (max-width: 1180px) {
          .nav-links-left { gap: 1rem; }
        }
        @media (max-width: 1100px) {
          .nav-links-left { display: none !important; }
          .nav-order-btn  { display: none !important; }
          .nav-hamburger  { display: inline-flex !important; }
          .nav-shell { padding: ${scrolled ? '0.7rem 1.5rem' : '1.1rem 1.5rem'} !important; }
        }
      `}</style>
    </>
  )
}
