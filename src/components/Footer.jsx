import { Link } from 'react-router-dom'
import { MapPin, Phone, Mail, Clock, Camera, ThumbsUp, Bird, Play, ShoppingBag } from 'lucide-react'

export default function Footer() {
  return (
    <footer style={{ background: 'var(--dark)', color: 'rgba(255,255,255,0.65)', fontFamily: "'Raleway',sans-serif" }}>

      {/* ── Order Online strip ── */}
      <div style={{ textAlign: 'center', padding: '2.5rem 2rem', borderBottom: '1px solid rgba(255,255,255,0.08)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
        <p style={{ fontFamily: "'Bona Nova SC',serif", fontSize: '1.3rem', color: 'rgba(255,255,255,0.8)' }}>
          Ready to experience Authentic Indian flavors?
        </p>
        <Link to="/menu" className="btn-saffron" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
          <ShoppingBag size={15} /><span>Order Online Now</span>
        </Link>
      </div>

      {/* ── Grid ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1.3fr', gap: '3rem', padding: '4rem 3rem 3.5rem', borderBottom: '1px solid rgba(255,255,255,0.08)', maxWidth: 1300, margin: '0 auto' }}
        className="footer-grid">

        {/* Brand */}
        <div>
          <div style={{ fontFamily: "'Bona Nova SC',serif", fontSize: '2rem', color: '#fff', letterSpacing: '0.15em', fontWeight: 700 }}>Indiana</div>
          <div style={{ fontSize: '0.6rem', letterSpacing: '0.4em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '1.25rem' }}>Fine Indian Cuisine</div>
          <p style={{ fontSize: '0.875rem', lineHeight: 1.9, maxWidth: 250 }}>
            Bringing the royal flavors of India to the heart of America since 2010. Every dish tells a story of heritage and passion.
          </p>
          {/* Social */}
          <div style={{ display: 'flex', gap: '0.65rem', marginTop: '1.5rem' }}>
            {[
              { Icon: Camera,    label: 'Instagram',  href: 'https://instagram.com' },
              { Icon: ThumbsUp,  label: 'Facebook',   href: 'https://facebook.com' },
              { Icon: Bird,      label: 'X / Twitter', href: 'https://twitter.com' },
              { Icon: Play,      label: 'YouTube',    href: 'https://youtube.com' },
            ].map(({ Icon, label, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  width: 40, height: 40,
                  border: '1px solid rgba(255,255,255,0.2)',
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  color: 'rgba(255,255,255,0.6)',
                  transition: 'all 0.2s ease',
                  borderRadius: 6,
                  backdropFilter: 'blur(4px)',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'var(--saffron)'
                  e.currentTarget.style.color = 'var(--saffron)'
                  e.currentTarget.style.transform = 'translateY(-2px)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'
                  e.currentTarget.style.color = 'rgba(255,255,255,0.6)'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 style={{ fontFamily: "'Bona Nova SC',serif", fontSize: '1rem', color: '#fff', letterSpacing: '0.1em', marginBottom: '1.25rem' }}>Quick Links</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            {[['/', 'Home'], ['/about', 'About Us'], ['/menu', 'Menu'], ['/blog', 'Blog'], ['/contact', 'Contact Us'], ['/menu', 'Order Online']].map(([to, label]) => (
              <li key={label}>
                <Link to={to} style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.5)', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--saffron)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Hours */}
        <div>
          <h4 style={{ fontFamily: "'Bona Nova SC',serif", fontSize: '1rem', color: '#fff', letterSpacing: '0.1em', marginBottom: '1.25rem' }}>
            <Clock size={14} color="var(--saffron)" style={{ display: 'inline', marginRight: '0.4rem', verticalAlign: 'middle' }} />
            Opening Hours
          </h4>
          <div style={{ fontSize: '0.875rem', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            {[
              ['Mon – Thu', '11:30 AM – 10:00 PM'],
              ['Fri – Sat', '11:30 AM – 11:00 PM'],
              ['Sunday', '12:00 PM – 10:00 PM'],
              ['Lunch Buffet', '11:30 AM – 2:30 PM'],
            ].map(([day, time]) => (
              <div key={day}>
                <div style={{ color: 'var(--gold)', fontWeight: 600, fontSize: '0.78rem' }}>{day}</div>
                <div style={{ color: 'rgba(255,255,255,0.5)' }}>{time}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact + Map */}
        <div>
          <h4 style={{ fontFamily: "'Bona Nova SC',serif", fontSize: '1rem', color: '#fff', letterSpacing: '0.1em', marginBottom: '1.25rem' }}>Find Us</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', fontSize: '0.875rem', marginBottom: '1.25rem' }}>
            {[
              { Icon: MapPin, text: '2847 Curry Lane, Edison, NJ 08817' },
              { Icon: Phone, text: '+1 (732) 555-0101' },
              { Icon: Mail, text: 'hello@saffronusa.com' },
            ].map(({ Icon, text }) => (
              <div key={text} style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                <Icon size={14} color="var(--saffron)" style={{ flexShrink: 0, marginTop: 2 }} />
                <span style={{ color: 'rgba(255,255,255,0.55)', lineHeight: 1.5 }}>{text}</span>
              </div>
            ))}
          </div>
          {/* Map */}
          <div style={{ overflow: 'hidden', filter: 'grayscale(0.3)', border: '1px solid rgba(255,255,255,0.06)' }}>
            <iframe
              title="Saffron Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3039.9!2d-74.3769!3d40.5187!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDMxJzA3LjMiTiA3NMKwMjInMzYuOCJX!5e0!3m2!1sen!2sus!4v1"
              width="100%" height="130" style={{ border: 0, display: 'block' }} allowFullScreen loading="lazy"
            />
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', padding: '1.25rem 3rem', fontSize: '0.75rem', color: 'rgba(255,255,255,0.28)', gap: '0.5rem' }}>
        <span>© 2026 Saffron Fine Indian Cuisine. All rights reserved.</span>
        <div style={{ display: 'flex', gap: '2rem' }}>
          {['Privacy Policy', 'Terms of Service', 'Accessibility'].map(t => (
            <a key={t} href="#" style={{ color: 'rgba(255,255,255,0.28)', transition: 'color 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--saffron)'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.28)'}>
              {t}
            </a>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) { .footer-grid { grid-template-columns: 1fr 1fr !important; gap: 2.5rem !important; } }
        @media (max-width: 640px)  { .footer-grid { grid-template-columns: 1fr !important; padding: 3rem 1.5rem !important; } }
      `}</style>
    </footer>
  )
}
