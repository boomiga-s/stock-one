import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Award, BookOpen, Tv2, ChefHat, MapPin, Phone } from 'lucide-react'
import { useStaggerReveal, useSelfReveal } from '../hooks/useScrollReveal'
import FoodImage from '../components/FoodImage'
import PageBanner from '../components/PageBanner'

/* ─── Data ──────────────────────────────────────────────── */
const timeline = [
  { year: '2010', title: 'The Beginning',          desc: 'Chef Vikram Nair opens Saffron\'s first location in Edison, NJ — 30 seats, 40 dishes, and limitless ambition.' },
  { year: '2013', title: 'Michelin Recognition',   desc: 'Awarded a Michelin Bib Gourmand — the first Indian restaurant in New Jersey to receive this honor.' },
  { year: '2016', title: 'Manhattan Expansion',    desc: 'Saffron opens in Gramercy, New York, bringing fine Indian cuisine to the heart of NYC.' },
  { year: '2019', title: 'Saffron Events Launch',  desc: 'Full-service Indian catering debuts — weddings, corporate events, and intimate private dining.' },
  { year: '2022', title: 'Chicago Arrives',        desc: 'Our third location opens in the West Loop, bringing Saffron\'s flavors to the Midwest for the first time.' },
  { year: '2026', title: '15 Years of Excellence', desc: 'Celebrating 15 years — 3 locations, 200+ team members, and millions of unforgettable meals served.' },
]

const locations = [
  { city: 'Edison, NJ',   address: '2847 Curry Lane, Edison, NJ 08817',       img: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&q=75&auto=format&fit=crop', badge: 'Flagship', phone: '+1 (732) 555-0101' },
  { city: 'New York, NY', address: '142 Lexington Avenue, New York, NY 10016', img: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=75&auto=format&fit=crop', badge: 'Manhattan', phone: '+1 (212) 555-0202' },
  { city: 'Chicago, IL',  address: '840 W Randolph Street, Chicago, IL 60607', img: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=75&auto=format&fit=crop', badge: 'Midwest',  phone: '+1 (312) 555-0303' },
]

const achievements = [
  { number: '15+', label: 'Years of Excellence' },
  { number: '3',   label: 'Locations Nationwide' },
  { number: '250+', label: 'Dishes on Menu' },
  { number: '50K+', label: 'Happy Guests / Year' },
]

const chefAccolades = [
  { Icon: Award,   title: 'Michelin Bib Gourmand', sub: '2013' },
  { Icon: Award,   title: 'James Beard Nominated', sub: '2019 & 2022' },
  { Icon: Tv2,     title: 'Food Network Featured', sub: 'Iron Chef Finalist' },
  { Icon: BookOpen, title: '2 Cookbooks Published', sub: 'National Best Seller' },
]

/* ─── Animated Timeline Item ────────────────────────────── */
function TimelineItem({ item, index, isLast }) {
  const [ref, visible] = useSelfReveal(0.3)
  const isLeft = index % 2 === 0
  const delay = index * 80

  return (
    <div ref={ref} style={{
      display: 'grid',
      gridTemplateColumns: '1fr 56px 1fr',
      gap: 0,
      position: 'relative',
      paddingBottom: isLast ? 0 : '3rem',
    }}>
      {/* ── LEFT column ── */}
      <div style={{
        paddingRight: '2.5rem',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateX(0)' : 'translateX(-50px)',
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s cubic-bezier(0.4,0,0.2,1) ${delay}ms`,
      }}>
        {isLeft ? (
          <TimelineCard item={item} />
        ) : (
          <div style={{ height: '100%' }} />
        )}
      </div>

      {/* ── CENTER: dot + line ── */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {/* Dot */}
        <div style={{
          width: 18, height: 18,
          borderRadius: '50%',
          background: visible ? 'var(--saffron)' : 'var(--border-color)',
          border: '3px solid #fff',
          boxShadow: visible ? '0 0 0 5px rgba(255,153,51,0.18)' : '0 0 0 0px rgba(255,153,51,0)',
          flexShrink: 0,
          marginTop: '1.6rem',
          zIndex: 1,
          transition: `background 0.4s ease ${delay + 300}ms, box-shadow 0.4s ease ${delay + 300}ms`,
        }} />
        {/* Line segment — grows when visible */}
        {!isLast && (
          <div style={{
            width: 2,
            flex: 1,
            background: 'var(--border-color)',
            position: 'relative',
            overflow: 'hidden',
            marginTop: '0.5rem',
          }}>
            <div style={{
              position: 'absolute',
              top: 0, left: 0, right: 0,
              height: visible ? '100%' : '0%',
              background: 'linear-gradient(to bottom, var(--saffron), var(--gold))',
              transition: `height 0.9s cubic-bezier(0.4,0,0.2,1) ${delay + 400}ms`,
            }} />
          </div>
        )}
      </div>

      {/* ── RIGHT column ── */}
      <div style={{
        paddingLeft: '2.5rem',
        display: 'flex',
        alignItems: 'flex-start',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateX(0)' : 'translateX(50px)',
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s cubic-bezier(0.4,0,0.2,1) ${delay}ms`,
      }}>
        {!isLeft ? (
          <TimelineCard item={item} />
        ) : (
          <div style={{ height: '100%' }} />
        )}
      </div>
    </div>
  )
}

function TimelineCard({ item }) {
  return (
    <div style={{
      background: '#fff',
      border: '1px solid var(--border-color)',
      padding: '1.5rem',
      maxWidth: 340,
      boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
    }}>
      <div style={{ fontFamily: "'Bona Nova SC',serif", fontSize: '2rem', color: 'var(--saffron)', lineHeight: 1, marginBottom: '0.25rem' }}>{item.year}</div>
      <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>{item.title}</h3>
      <div style={{ width: 28, height: 2, background: 'var(--gold)', marginBottom: '0.75rem' }} />
      <p style={{ color: 'var(--muted)', fontSize: '0.875rem', lineHeight: 1.75 }}>{item.desc}</p>
    </div>
  )
}

/* ─── Page ───────────────────────────────────────────────── */
export default function About() {
  const storyRef = useStaggerReveal(140)
  const statsRef = useStaggerReveal(100)
  const chefRef  = useStaggerReveal(120)
  const locRef   = useStaggerReveal(100)

  return (
    <>
      <PageBanner
        height="55vh"
        minHeight={380}
        label="Who We Are"
        title="About Saffron"
        description="15 years of fine Indian dining in the US — three locations, one family of flavors."
        image="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1600&q=80&auto=format&fit=crop"
        tint="linear-gradient(to bottom, rgba(0,0,0,0.6), rgba(0,0,0,0.45))"
        breadcrumbs={[
          { label: 'Home', to: '/' },
          { label: 'About Us' },
        ]}
      />

      {/* ── Our Story ── */}
      <section style={{ padding: '6rem 2rem', background: '#fff' }}>
        <div ref={storyRef} style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center' }} className="two-col">

          {/* Images */}
          <div className="reveal" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', position: 'relative' }}>
            <div style={{ position: 'absolute', top: -16, left: -16, right: 16, bottom: 16, border: '1px solid rgba(200,169,106,0.3)', zIndex: 0 }} />
            <FoodImage
              src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=700&q=80&auto=format&fit=crop"
              alt="Saffron Restaurant interior"
              gradient="interior"
              style={{ width: '100%', height: 340, position: 'relative', zIndex: 1 }}
            />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', position: 'relative', zIndex: 1 }}>
              <FoodImage src="https://images.unsplash.com/photo-1585937421982-eb0becd7b9f5?w=400&q=75&auto=format&fit=crop" alt="Biryani" gradient="biryani" style={{ height: 160 }} />
              <FoodImage src="https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400&q=75&auto=format&fit=crop" alt="Curry" gradient="curry" style={{ height: 160 }} />
            </div>
          </div>

          {/* Text */}
          <div className="reveal" style={{ transitionDelay: '0.15s' }}>
            <div className="section-label">The Origin</div>
            <h2 style={{ marginBottom: '0.75rem' }}>Our Story</h2>
            <div className="gold-bar" style={{ marginBottom: '1.75rem' }} />
            <p style={{ color: 'var(--muted)', lineHeight: 1.95, marginBottom: '1.25rem' }}>
              It begins in a small coastal town in Kerala — where Chef Vikram Nair grew up watching his grandmother grind fresh spices on a stone mortar before sunrise. The aromas of cardamom, cinnamon, and coconut were the soundtrack of his childhood.
            </p>
            <p style={{ color: 'var(--muted)', lineHeight: 1.95, marginBottom: '1.75rem' }}>
              After training at the Oberoi Centre of Learning in Delhi and staging at celebrated kitchens in Mumbai and Chennai, Vikram moved to the United States with one ambition: to share the true depth of Indian cuisine — not a watered-down version, but the real thing.
            </p>
            <blockquote style={{
              borderLeft: '3px solid var(--saffron)',
              paddingLeft: '1.25rem',
              fontFamily: "'Bona Nova SC',serif",
              fontSize: '1.05rem',
              fontStyle: 'italic',
              color: 'var(--dark)',
              lineHeight: 1.7,
              marginBottom: '2rem',
            }}>
              "Every dish carries the soul of India — the warmth of its people, the richness of its history, and the love in every grandmother's kitchen."
              <footer style={{ fontFamily: "'Raleway',sans-serif", fontStyle: 'normal', fontWeight: 600, fontSize: '0.78rem', color: 'var(--saffron)', marginTop: '0.6rem' }}>
                — Chef Vikram Nair, Founder
              </footer>
            </blockquote>
            <Link to="/menu" className="btn-saffron"><span>Explore the Menu</span></Link>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section style={{ background: 'var(--dark)', padding: '4rem 2rem' }}>
        <div ref={statsRef} style={{ maxWidth: 900, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '1.5rem', textAlign: 'center' }} className="stats-grid">
          {achievements.map(({ number, label }) => (
            <div key={label} className="reveal" style={{ padding: '1.5rem 0.5rem' }}>
              <div style={{ fontFamily: "'Bona Nova SC',serif", fontSize: 'clamp(2.2rem,4vw,3.5rem)', color: 'var(--saffron)', lineHeight: 1 }}>{number}</div>
              <div style={{ fontFamily: "'Raleway',sans-serif", fontWeight: 600, fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', marginTop: '0.5rem' }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Chef Profile ── */}
      <section style={{ padding: '6rem 2rem', background: 'var(--cream)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <div className="section-label">Culinary Mastery</div>
            <h2>Meet Our Head Chef</h2>
            <div className="gold-bar" style={{ margin: '1rem auto' }} />
          </div>

          <div ref={chefRef} style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '5rem', alignItems: 'center' }} className="two-col">
            {/* Photo */}
            <div className="reveal" style={{ position: 'relative' }}>
              <FoodImage
                src="https://images.unsplash.com/photo-1583394293214-c4c2b2f2f35e?w=600&q=80&auto=format&fit=crop"
                alt="Chef Vikram Nair"
                gradient="chef"
                style={{ height: 500 }}
                imgStyle={{ objectPosition: 'top' }}
              />
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                background: 'linear-gradient(to top, rgba(0,0,0,0.88), transparent)',
                padding: '2.5rem 1.5rem 1.5rem',
              }}>
                <div style={{ fontFamily: "'Bona Nova SC',serif", fontSize: '1.4rem', color: '#fff' }}>Chef Vikram Nair</div>
                <div style={{ fontFamily: "'Raleway',sans-serif", fontSize: '0.72rem', color: 'var(--gold)', letterSpacing: '0.15em', textTransform: 'uppercase', marginTop: '0.25rem' }}>Founder & Executive Chef</div>
              </div>
            </div>

            {/* Bio */}
            <div className="reveal" style={{ transitionDelay: '0.15s' }}>
              <div className="section-label">The Maestro</div>
              <h3 style={{ fontSize: '1.6rem', marginBottom: '0.75rem' }}>40 Years of Culinary Passion</h3>
              <div className="gold-bar" style={{ marginBottom: '1.5rem' }} />
              <p style={{ color: 'var(--muted)', lineHeight: 1.95, marginBottom: '1.25rem' }}>
                Chef Vikram Nair has spent four decades exploring, learning, and perfecting the art of Indian cuisine. Trained at the Oberoi Centre of Learning in Delhi, he honed his craft in luxury hotels across Mumbai, Chennai, and Dubai before making America his culinary canvas.
              </p>
              <p style={{ color: 'var(--muted)', lineHeight: 1.95, marginBottom: '2rem' }}>
                A James Beard Award nominee, Vikram has appeared on the Food Network, cooked at the James Beard House in New York, and authored two acclaimed cookbooks. His philosophy is simple: respect the ingredients, honor the tradition, cook with love.
              </p>

              {/* Accolade cards */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                {chefAccolades.map(({ Icon, title, sub }) => (
                  <div key={title} className="reveal" style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', padding: '1rem', background: '#fff', border: '1px solid var(--border-color)' }}>
                    <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,153,51,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Icon size={16} color="var(--saffron)" />
                    </div>
                    <div>
                      <div style={{ fontFamily: "'Raleway',sans-serif", fontWeight: 700, fontSize: '0.82rem', marginBottom: '0.15rem' }}>{title}</div>
                      <div style={{ fontFamily: "'Raleway',sans-serif", fontSize: '0.72rem', color: 'var(--saffron)', fontWeight: 600 }}>{sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          ANIMATED TIMELINE
      ══════════════════════════════════ */}
      <section style={{ padding: '6rem 2rem', background: '#fff' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <div className="section-label">Our Journey</div>
            <h2>Milestones & Moments</h2>
            <div className="gold-bar" style={{ margin: '1rem auto' }} />
            <p style={{ color: 'var(--muted)', maxWidth: 440, margin: '0 auto', lineHeight: 1.8 }}>
              From a 30-seat dining room in New Jersey to three acclaimed locations — here's how Saffron became a legacy.
            </p>
          </div>

          {/* Timeline */}
          <div style={{ position: 'relative' }}>
            {timeline.map((item, i) => (
              <TimelineItem key={item.year} item={item} index={i} isLast={i === timeline.length - 1} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Locations ── */}
      <section style={{ padding: '6rem 2rem', background: 'var(--cream)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <div className="section-label">Find Us</div>
            <h2>Our Locations</h2>
            <div className="gold-bar" style={{ margin: '1rem auto' }} />
          </div>

          <div ref={locRef} style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '2rem' }} className="loc-grid">
            {locations.map((loc) => (
              <div key={loc.city} className="reveal" style={{ border: '1px solid var(--border-color)', overflow: 'hidden', background: '#fff' }}>
                <div className="card-img-wrap" style={{ height: 220 }}>
                  <FoodImage src={loc.img} alt={loc.city} gradient="restaurant" style={{ height: '100%' }} />
                </div>
                <div style={{ padding: '1.5rem' }}>
                  <span style={{ display: 'inline-block', background: 'var(--saffron)', color: '#fff', fontFamily: "'Raleway',sans-serif", fontWeight: 700, fontSize: '0.62rem', letterSpacing: '0.1em', textTransform: 'uppercase', padding: '0.2rem 0.6rem', marginBottom: '0.75rem' }}>{loc.badge}</span>
                  <h3 style={{ fontSize: '1.15rem', marginBottom: '0.75rem' }}>{loc.city}</h3>
                  <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'flex-start', color: 'var(--muted)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                    <MapPin size={13} color="var(--saffron)" style={{ flexShrink: 0, marginTop: 2 }} />
                    <span>{loc.address}</span>
                  </div>
                  <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center', color: 'var(--muted)', fontSize: '0.875rem', marginBottom: '1.25rem' }}>
                    <Phone size={13} color="var(--saffron)" />
                    <span>{loc.phone}</span>
                  </div>
                  <Link to="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', fontFamily: "'Raleway',sans-serif", fontWeight: 700, fontSize: '0.72rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--dark)', borderBottom: '1.5px solid var(--saffron)', paddingBottom: '1px' }}>
                    Get Directions →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ background: 'var(--dark)', padding: '5rem 2rem', textAlign: 'center' }}>
        <div style={{ maxWidth: 580, margin: '0 auto' }}>
          <div className="section-label" style={{ color: 'var(--gold)', justifyContent: 'center' }}>Experience It</div>
          <h2 style={{ color: '#fff', marginBottom: '1rem' }}>Come Dine With Us</h2>
          <p style={{ color: 'rgba(255,255,255,0.55)', lineHeight: 1.85, marginBottom: '2rem' }}>
            Whether it's a weeknight dinner or a grand celebration — Saffron is ready to make it unforgettable.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/contact" className="btn-saffron"><span>Reserve a Table</span></Link>
            <Link to="/menu" className="btn-outline-white">View the Menu</Link>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          .two-col { grid-template-columns: 1fr !important; gap: 3rem !important; }
          .stats-grid { grid-template-columns: repeat(2,1fr) !important; }
          .loc-grid   { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 640px) {
          /* Collapse timeline to single column on mobile */
          .timeline-row { grid-template-columns: 0 40px 1fr !important; }
          .timeline-left { display: none !important; }
        }
      `}</style>
    </>
  )
}
