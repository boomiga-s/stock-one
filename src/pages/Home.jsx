import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Flame, Leaf, ChefHat, Truck, Star,
  Quote, Phone, MapPin, Clock, ArrowRight,
  ZoomIn, Award, Users, UtensilsCrossed, Heart,
} from 'lucide-react'
import { useStaggerReveal } from '../hooks/useScrollReveal'
import FoodImage, { foodGradients } from '../components/FoodImage'

/* ─── Featured dishes ─────────────────────────────────────── */
const featured = [
  { name: 'Hyderabadi Biryani',  desc: 'Aromatic dum biryani with saffron & caramelized onion',     price: '$21.99', gradient: 'biryani',       badge: 'Bestseller' },
  { name: 'Butter Chicken',      desc: 'Velvety tomato-cream sauce with tender tandoor chicken',      price: '$18.99', gradient: 'butter_chicken', badge: "Chef's Pick" },
  { name: 'Lamb Rogan Josh',     desc: 'Slow-braised lamb in deep Kashmiri spiced gravy',            price: '$22.99', gradient: 'curry',          badge: 'Signature' },
  { name: 'Paneer Tikka',        desc: 'Cottage cheese marinated & grilled in the clay oven',        price: '$13.99', gradient: 'paneer',         badge: 'Veg Favorite' },
  { name: 'Dal Makhani',         desc: 'Black lentils slow-cooked overnight with butter and cream',  price: '$15.99', gradient: 'dal',            badge: 'Comfort Classic' },
  { name: 'Prawn Biryani',       desc: 'Tiger prawns on dum with fragrant saffron basmati rice',     price: '$24.99', gradient: 'seafood',        badge: 'Coastal Special' },
]

/* ─── Events ─────────────────────────────────────────────── */
const events = [
  { title: 'Diwali Gala Dinner',   date: 'Nov 1, 2026',    tag: 'Seasonal Event',
    desc: 'A grand five-course feast celebrating the Festival of Lights with live classical music.',
    gradient: 'event',
    src: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=400&q=75&auto=format&fit=crop' },
  { title: 'Sunday Brunch Buffet', date: 'Every Sunday',   tag: 'Weekly',
    desc: 'Unlimited Indian brunch — 40+ dishes, live chaat station, and complimentary chai.',
    gradient: 'restaurant',
    src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&q=75&auto=format&fit=crop' },
  { title: "Chef's Table Evening", date: 'Last Sat/Month', tag: 'Exclusive',
    desc: 'Intimate 8-seat chef\'s table — a curated 7-course tasting menu by Chef Vikram Nair.',
    gradient: 'chef',
    src: 'https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=400&q=75&auto=format&fit=crop' },
  { title: 'Holi Color & Cuisine', date: 'Mar 14, 2027',  tag: 'Festival',
    desc: 'Celebrate Holi with our vibrant special menu, thandai bar, and live dhol performance.',
    gradient: 'spices',
    src: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=400&q=75&auto=format&fit=crop' },
]

/* ─── Services ────────────────────────────────────────────── */
const services = [
  { Icon: Flame,         title: 'Authentic Taste',   desc: 'Recipes passed down through generations with spices imported from Kerala.' },
  { Icon: Leaf,          title: 'Fresh Ingredients', desc: 'Seasonal, locally-sourced produce and select spices from across India.' },
  { Icon: ChefHat,       title: 'Expert Chefs',      desc: '40+ years of combined expertise from India\'s finest hotel kitchens.' },
  { Icon: Truck,         title: 'Fast Delivery',     desc: 'Hot, fresh food at your door within 30–45 minutes across our service area.' },
  { Icon: Star,          title: 'Elegant Dining',    desc: 'A curated atmosphere blending Indian artistry with modern hospitality.' },
]

/* ─── Stats ───────────────────────────────────────────────── */
const stats = [
  { Icon: Award,           number: '15+',  label: 'Years of Excellence' },
  { Icon: UtensilsCrossed, number: '250+', label: 'Dishes on Menu' },
  { Icon: Users,           number: '50K+', label: 'Happy Guests / Year' },
  { Icon: Heart,           number: '3',    label: 'Locations Nationwide' },
]

/* ─── Testimonials ────────────────────────────────────────── */
const testimonials = [
  { name: 'Sarah M.', loc: 'Edison, NJ',     rating: 5, text: 'The best Indian food I\'ve had in the US. The Hyderabadi Biryani is transcendent — I dream about it. Warm, attentive service without being intrusive.' },
  { name: 'James R.', loc: 'New York, NY',   rating: 5, text: 'We booked Saffron for our wedding reception and it was perfect. The food had all 200 guests talking for weeks afterward.' },
  { name: 'Priti K.', loc: 'Chicago, IL',    rating: 5, text: 'As someone from Mumbai, finding food this authentic outside India felt impossible. Saffron proved me wrong. The Dal Makhani tastes just like home.' },
]

/* ─── Gallery ─────────────────────────────────────────────── */
const gallery = [
  { gradient: 'biryani',       col: 'span 1', row: 'span 2', src: 'https://images.unsplash.com/photo-1585937421982-eb0becd7b9f5?w=600&q=75&auto=format&fit=crop' },
  { gradient: 'butter_chicken',col: 'span 1', row: 'span 1', src: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=600&q=75&auto=format&fit=crop' },
  { gradient: 'paneer',        col: 'span 1', row: 'span 1', src: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600&q=75&auto=format&fit=crop' },
  { gradient: 'restaurant',    col: 'span 2', row: 'span 1', src: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=700&q=75&auto=format&fit=crop' },
  { gradient: 'dal',           col: 'span 1', row: 'span 1', src: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=600&q=75&auto=format&fit=crop' },
]

/* ─── Lightbox ────────────────────────────────────────────── */
function Lightbox({ item, onClose }) {
  useEffect(() => {
    const fn = e => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, [onClose])
  return (
    <div className="lightbox" onClick={onClose}>
      <button onClick={onClose} style={{ position:'absolute',top:'1.5rem',right:'1.5rem',background:'none',border:'none',color:'#fff',fontSize:'1.8rem',cursor:'pointer',lineHeight:1 }}>✕</button>
      <div style={{ width: '90vw', maxWidth: 900, maxHeight: '85vh', background: foodGradients[item.gradient], position: 'relative', overflow: 'hidden' }} onClick={e => e.stopPropagation()}>
        {item.src && <img src={item.src} alt="" onError={e=>e.currentTarget.style.display='none'} style={{ width:'100%',maxHeight:'85vh',objectFit:'contain' }} />}
      </div>
    </div>
  )
}

export default function Home() {
  const heroParallaxRef = useRef(null)
  const [lightbox, setLightbox] = useState(null)
  const [activeTestimonial, setActiveTestimonial] = useState(0)

  useEffect(() => {
    const el = heroParallaxRef.current
    if (!el) return
    const fn = () => { el.style.transform = `translateY(${window.scrollY * 0.35}px)` }
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => {
    const t = setInterval(() => setActiveTestimonial(i => (i + 1) % testimonials.length), 5000)
    return () => clearInterval(t)
  }, [])

  const statsRef   = useStaggerReveal(100)
  const aboutRef   = useStaggerReveal(140)
  const menuRef    = useStaggerReveal(80)
  const eventsRef  = useStaggerReveal(100)
  const servRef    = useStaggerReveal(90)
  const galleryRef = useStaggerReveal(70)

  return (
    <>
      {lightbox && <Lightbox item={lightbox} onClose={() => setLightbox(null)} />}

      {/* ══════════════ HERO ══════════════ */}
      <section style={{ height:'100vh', minHeight:620, position:'relative', display:'flex', alignItems:'center', justifyContent:'center', overflow:'hidden' }}>
        {/* Background — gradient always visible, image on top */}
        <div ref={heroParallaxRef} style={{
          position:'absolute', inset:'-25% 0 -25%',
          background: foodGradients.hero,
          willChange:'transform',
        }}>
          <img
            src="https://images.unsplash.com/photo-1585937421982-eb0becd7b9f5?w=1920&q=80&auto=format&fit=crop"
            alt=""
            onError={e => e.currentTarget.style.display='none'}
            style={{ width:'100%', height:'100%', objectFit:'cover' }}
          />
        </div>

        {/* Overlay */}
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(135deg, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.35) 50%, rgba(0,0,0,0.6) 100%)' }} />

        {/* Decorative rings */}
        {[520,400].map((s,i) => (
          <div key={i} style={{ position:'absolute', width:s, height:s, borderRadius:'50%', border:`1px solid rgba(200,169,106,${0.12-i*0.04})`, pointerEvents:'none' }} />
        ))}

        {/* Content */}
        <div style={{ position:'relative', zIndex:1, textAlign:'center', padding:'0 1.5rem', maxWidth:820, animation:'heroUp 1.1s cubic-bezier(0.4,0,0.2,1) both', marginTop:'5rem' }}>
          <div className="section-label" style={{ color:'var(--gold)', justifyContent:'center' }}>Fine Indian Cuisine · Est. 2010</div>
          <h1 style={{ color:'#fff', marginBottom:'1.5rem', lineHeight:1.08, fontSize:'clamp(2.4rem,6vw,5rem)', textShadow:'0 2px 20px rgba(0,0,0,0.3)' }}>
            Experience Authentic<br />
            <span style={{ color:'var(--saffron)' }}>Indian Flavors</span><br />
            in the USA
          </h1>
          <p style={{ color:'rgba(255,255,255,0.82)', fontSize:'1.05rem', maxWidth:520, margin:'0 auto 2.5rem', lineHeight:1.85 }}>
            A culinary journey through India's royal kitchens — where every dish is a celebration of heritage, spice, and soul.
          </p>
          <div style={{ display:'flex', gap:'1rem', justifyContent:'center', flexWrap:'wrap' }}>
            <Link to="/menu" className="btn-saffron"><span>Book Your Events</span></Link>
            <Link to="/menu" className="btn-outline-white">View Full Menu</Link>
          </div>

          {/* Quick info strip */}
          <div style={{ display:'flex', justifyContent:'center', gap:'2rem', flexWrap:'wrap', marginTop:'3rem', paddingTop:'2rem', borderTop:'1px solid rgba(255,255,255,0.15)' }}>
            {[
              { Icon: MapPin, text: 'Edison, NJ · New York · Chicago' },
              { Icon: Phone,  text: '+1 (732) 555-0101' },
              { Icon: Clock,  text: 'Open Daily 11:30 AM – 10 PM' },
            ].map(({ Icon, text }) => (
              <div key={text} style={{ display:'flex', alignItems:'center', gap:'0.4rem', color:'rgba(255,255,255,0.7)', fontSize:'0.82rem' }}>
                <Icon size={13} color="var(--saffron)" />{text}
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{ position:'absolute', bottom:'2rem', left:'50%', transform:'translateX(-50%)', display:'flex', flexDirection:'column', alignItems:'center', gap:'0.35rem', color:'rgba(255,255,255,0.5)', fontSize:'0.58rem', letterSpacing:'0.2em', textTransform:'uppercase', zIndex:2 }}>
          <span>Scroll</span>
          <div className="scroll-chevron" />
        </div>
      </section>

      {/* ══════════════ STATS STRIP ══════════════ */}
      <section style={{ background:'var(--dark)', padding:'2.5rem 2rem' }}>
        <div ref={statsRef} style={{ maxWidth:900, margin:'0 auto', display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'1rem' }} className="stats-grid">
          {stats.map(({ Icon, number, label }) => (
            <div key={label} className="reveal" style={{ textAlign:'center', padding:'1rem' }}>
              <Icon size={22} color="var(--saffron)" style={{ margin:'0 auto 0.6rem' }} />
              <div style={{ fontFamily:"'Bona Nova SC',serif", fontSize:'2.2rem', color:'#fff', lineHeight:1 }}>{number}</div>
              <div style={{ fontFamily:"'Raleway',sans-serif", fontSize:'0.68rem', color:'rgba(255,255,255,0.45)', letterSpacing:'0.1em', textTransform:'uppercase', marginTop:'0.3rem' }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════ ABOUT PREVIEW ══════════════ */}
      <section style={{ background:'var(--cream)', padding:'6rem 2rem' }}>
        <div ref={aboutRef} style={{ maxWidth:1100, margin:'0 auto', display:'grid', gridTemplateColumns:'1fr 1fr', gap:'5rem', alignItems:'center' }} className="two-col">

          {/* Image panel */}
          <div className="reveal" style={{ position:'relative' }}>
            <div style={{ position:'absolute', top:-18, left:-18, right:18, bottom:18, border:'1px solid rgba(200,169,106,0.3)', zIndex:0 }} />
            <FoodImage
              gradient="interior"
              src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80&auto=format&fit=crop"
              alt="Saffron Restaurant interior"
              style={{ height:480, position:'relative', zIndex:1 }}
            />
            <div style={{ position:'absolute', bottom:'-1.5rem', right:'-1.5rem', zIndex:2, background:'var(--saffron)', color:'#fff', padding:'1.5rem', textAlign:'center', fontFamily:"'Bona Nova SC',serif", boxShadow:'0 8px 32px rgba(255,153,51,0.3)' }}>
              <div style={{ fontSize:'2.8rem', fontWeight:700, lineHeight:1 }}>15+</div>
              <div style={{ fontSize:'0.65rem', letterSpacing:'0.15em', textTransform:'uppercase', marginTop:4 }}>Years of Excellence</div>
            </div>
          </div>

          {/* Text */}
          <div className="reveal" style={{ transitionDelay:'0.15s' }}>
            <div className="section-label">Our Story</div>
            <h2 style={{ marginBottom:'0.75rem' }}>Born in India,<br />Beloved in America</h2>
            <div className="gold-bar" style={{ marginBottom:'1.75rem' }} />
            <p style={{ color:'var(--muted)', lineHeight:1.95, marginBottom:'1.25rem' }}>
              Saffron began as a dream in Chef Vikram Nair's kitchen — to bring the authentic tastes of his ancestral home in Kerala to the American dining table. What started as a 30-seat dining room in Edison, NJ in 2010 has grown into a beloved institution with three locations.
            </p>
            <p style={{ color:'var(--muted)', lineHeight:1.95, marginBottom:'2rem' }}>
              Every recipe honors tradition while embracing the finest local ingredients. Our spice blends are ground fresh daily. Our bread baked to order. Our service — always with heart.
            </p>

            {/* Mini chef card */}
            <div style={{ display:'flex', alignItems:'center', gap:'1rem', padding:'1rem', background:'#fff', border:'1px solid var(--border-color)', marginBottom:'2rem' }}>
              <FoodImage
                gradient="chef"
                src="https://images.unsplash.com/photo-1583394293214-c4c2b2f2f35e?w=120&q=80&auto=format&fit=crop&face"
                alt="Chef Vikram"
                style={{ width:56, height:56, borderRadius:'50%', flexShrink:0 }}
              />
              <div>
                <div style={{ fontFamily:"'Bona Nova SC',serif", fontSize:'1rem' }}>Chef Vikram Nair</div>
                <div style={{ fontFamily:"'Raleway',sans-serif", fontSize:'0.72rem', color:'var(--saffron)', fontWeight:600 }}>Founder & Executive Chef</div>
              </div>
            </div>
            <Link to="/about" className="btn-outline-dark">Discover Our Story</Link>
          </div>
        </div>
      </section>

      {/* ══════════════ MENU HIGHLIGHTS ══════════════ */}
      <section style={{ padding:'6rem 2rem', background:'#fff' }}>
        <div style={{ maxWidth:1200, margin:'0 auto' }}>
          <div style={{ textAlign:'center', marginBottom:'3.5rem' }}>
            <div className="section-label">From Our Kitchen</div>
            <h2>Menu Highlights</h2>
            <div className="gold-bar" style={{ margin:'1rem auto 1.25rem' }} />
            <p style={{ color:'var(--muted)', maxWidth:500, margin:'0 auto', lineHeight:1.8 }}>
              A curated selection of our most beloved dishes — from smoky tandoori classics to slow-braised curries.
            </p>
          </div>

          <div ref={menuRef} style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'1.75rem' }} className="menu-grid">
            {featured.map(dish => (
              <div key={dish.name} className="reveal menu-card" style={{ overflow:'hidden' }}>
                <div className="card-img-wrap">
                  <FoodImage
                    gradient={dish.gradient}
                    alt={dish.name}
                    style={{ height:210 }}
                  />
                </div>
                <div style={{ padding:'1.25rem' }}>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'0.4rem', gap:'0.5rem' }}>
                    <h3 style={{ fontSize:'1rem' }}>{dish.name}</h3>
                    <span style={{ background:'var(--cream)', color:'var(--saffron)', fontFamily:"'Raleway',sans-serif", fontWeight:700, fontSize:'0.6rem', letterSpacing:'0.08em', textTransform:'uppercase', padding:'0.2rem 0.5rem', whiteSpace:'nowrap', flexShrink:0 }}>{dish.badge}</span>
                  </div>
                  <p style={{ color:'var(--muted)', fontSize:'0.82rem', lineHeight:1.7, marginBottom:'0.9rem' }}>{dish.desc}</p>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                    <span style={{ fontFamily:"'Bona Nova SC',serif", fontSize:'1.15rem', color:'var(--saffron)' }}>{dish.price}</span>
                    <Link to="/menu" style={{ display:'flex', alignItems:'center', gap:'0.25rem', fontFamily:"'Raleway',sans-serif", fontWeight:700, fontSize:'0.72rem', letterSpacing:'0.08em', textTransform:'uppercase', color:'var(--dark)', borderBottom:'1.5px solid var(--saffron)', paddingBottom:'1px' }}>
                      Order <ArrowRight size={12} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign:'center', marginTop:'3rem' }}>
            <Link to="/menu" className="btn-saffron"><span>View Full Menu</span></Link>
          </div>
        </div>
      </section>

      {/* ══════════════ EVENTS ══════════════ */}
      <section style={{ padding:'6rem 2rem', background:'var(--cream)' }}>
        <div style={{ maxWidth:1200, margin:'0 auto' }}>
          <div style={{ textAlign:'center', marginBottom:'3.5rem' }}>
            <div className="section-label">Mark Your Calendar</div>
            <h2>Events & Celebrations</h2>
            <div className="gold-bar" style={{ margin:'1rem auto' }} />
          </div>

          <div ref={eventsRef} style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:'1.75rem' }} className="events-grid">
            {events.map(ev => (
              <div key={ev.title} className="reveal" style={{ overflow:'hidden', border:'1px solid var(--border-color)', background:'#fff', display:'flex', transition:'box-shadow 0.3s, transform 0.3s' }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow='0 16px 48px rgba(0,0,0,0.1)'; e.currentTarget.style.transform='translateY(-4px)' }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow='none'; e.currentTarget.style.transform='none' }}>
                <div className="card-img-wrap" style={{ width:170, flexShrink:0 }}>
                  <FoodImage gradient={ev.gradient} src={ev.src} alt={ev.title} style={{ width:'100%', height:'100%' }} />
                </div>
                <div style={{ padding:'1.5rem', display:'flex', flexDirection:'column', justifyContent:'center' }}>
                  <span style={{ display:'inline-block', background:'var(--saffron)', color:'#fff', fontFamily:"'Raleway',sans-serif", fontWeight:700, fontSize:'0.6rem', letterSpacing:'0.12em', textTransform:'uppercase', padding:'0.2rem 0.6rem', marginBottom:'0.6rem', alignSelf:'flex-start' }}>{ev.tag}</span>
                  <div style={{ fontFamily:"'Raleway',sans-serif", fontWeight:700, fontSize:'0.7rem', color:'var(--gold)', letterSpacing:'0.1em', textTransform:'uppercase', marginBottom:'0.3rem' }}>{ev.date}</div>
                  <h3 style={{ fontSize:'1.05rem', marginBottom:'0.5rem' }}>{ev.title}</h3>
                  <p style={{ color:'var(--muted)', fontSize:'0.82rem', lineHeight:1.7, marginBottom:'0.9rem' }}>{ev.desc}</p>
                  <Link to="/contact" style={{ display:'inline-flex', alignItems:'center', gap:'0.3rem', fontFamily:"'Raleway',sans-serif", fontWeight:700, fontSize:'0.72rem', letterSpacing:'0.08em', textTransform:'uppercase', color:'var(--dark)', borderBottom:'1.5px solid var(--saffron)', paddingBottom:'1px', alignSelf:'flex-start' }}>
                    Reserve a Spot <ArrowRight size={12} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ WHY CHOOSE US ══════════════ */}
      <section style={{ padding:'6rem 2rem', background:'var(--dark)', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', right:'-8%', top:'-20%', width:500, height:500, borderRadius:'50%', border:'1px solid rgba(200,169,106,0.08)', pointerEvents:'none' }} />
        <div style={{ maxWidth:1100, margin:'0 auto' }}>
          <div style={{ textAlign:'center', marginBottom:'3.5rem' }}>
            <div className="section-label" style={{ color:'var(--gold)' }}>Why Saffron</div>
            <h2 style={{ color:'#fff' }}>The Saffron Difference</h2>
            <div className="gold-bar" style={{ margin:'1rem auto' }} />
          </div>
          <div ref={servRef} style={{ display:'grid', gridTemplateColumns:'repeat(5,1fr)', gap:'1.5rem' }} className="services-grid">
            {services.map(({ Icon, title, desc }) => (
              <div key={title} className="reveal" style={{ textAlign:'center', padding:'2rem 1rem', border:'1px solid rgba(255,255,255,0.06)', transition:'border-color 0.3s, background 0.3s' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor='rgba(255,153,51,0.3)'; e.currentTarget.style.background='rgba(255,153,51,0.04)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor='rgba(255,255,255,0.06)'; e.currentTarget.style.background='transparent' }}>
                <div style={{ width:52, height:52, borderRadius:'50%', background:'rgba(255,153,51,0.1)', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 1.25rem' }}>
                  <Icon size={22} color="var(--saffron)" />
                </div>
                <h3 style={{ color:'#fff', fontSize:'0.95rem', marginBottom:'0.75rem' }}>{title}</h3>
                <div style={{ width:24, height:1.5, background:'var(--saffron)', margin:'0 auto 0.75rem' }} />
                <p style={{ color:'rgba(255,255,255,0.45)', fontSize:'0.8rem', lineHeight:1.8 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ GALLERY ══════════════ */}
      <section style={{ padding:'6rem 2rem', background:'#fff' }}>
        <div style={{ maxWidth:1200, margin:'0 auto' }}>
          <div style={{ textAlign:'center', marginBottom:'3rem' }}>
            <div className="section-label">A Feast for the Eyes</div>
            <h2>Gallery</h2>
            <div className="gold-bar" style={{ margin:'1rem auto' }} />
          </div>
          <div ref={galleryRef} style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gridAutoRows:'220px', gap:'0.6rem' }}>
            {gallery.map((item, i) => (
              <div key={i} className="reveal gallery-item"
                style={{ gridColumn:item.col, gridRow:item.row, background:foodGradients[item.gradient], position:'relative', overflow:'hidden', cursor:'zoom-in' }}
                onClick={() => setLightbox(item)}>
                <img src={item.src} alt={`Gallery ${i+1}`} loading="lazy" onError={e => e.currentTarget.style.display='none'}
                  style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover' }} />
                <div className="gallery-overlay">
                  <ZoomIn size={28} color="#fff" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ TESTIMONIALS ══════════════ */}
      <section style={{ padding:'6rem 2rem', background:'var(--cream)' }}>
        <div style={{ maxWidth:820, margin:'0 auto', textAlign:'center' }}>
          <div className="section-label" style={{ justifyContent:'center' }}>Guest Reviews</div>
          <h2 style={{ marginBottom:'3rem' }}>What Our Guests Say</h2>
          <div style={{ position:'relative', padding:'3rem 2rem', background:'#fff', border:'1px solid var(--border-color)', marginBottom:'2rem' }}>
            <Quote size={32} color="var(--saffron)" style={{ opacity:0.2, position:'absolute', top:'1.5rem', left:'1.5rem' }} />
            <div style={{ display:'flex', justifyContent:'center', gap:4, marginBottom:'1.25rem' }}>
              {Array(testimonials[activeTestimonial].rating).fill(0).map((_,i) => (
                <Star key={i} size={16} color="var(--saffron)" fill="var(--saffron)" />
              ))}
            </div>
            <p style={{ fontFamily:"'Bona Nova SC',serif", fontSize:'1.1rem', lineHeight:1.75, fontStyle:'italic', marginBottom:'1.5rem' }}>
              "{testimonials[activeTestimonial].text}"
            </p>
            <div style={{ fontFamily:"'Raleway',sans-serif", fontWeight:700 }}>{testimonials[activeTestimonial].name}</div>
            <div style={{ fontFamily:"'Raleway',sans-serif", fontSize:'0.8rem', color:'var(--muted)', marginTop:'0.2rem' }}>{testimonials[activeTestimonial].loc}</div>
          </div>
          <div style={{ display:'flex', justifyContent:'center', gap:'0.5rem' }}>
            {testimonials.map((_,i) => (
              <button key={i} onClick={() => setActiveTestimonial(i)} style={{ width:i===activeTestimonial?24:8, height:8, borderRadius:4, border:'none', cursor:'pointer', background:i===activeTestimonial?'var(--saffron)':'var(--border-color)', transition:'all 0.3s' }} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ RESERVATION CTA ══════════════ */}
      <section style={{ padding:'6rem 2rem', textAlign:'center', background:'var(--dark)', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', inset:0, background:foodGradients.hero, opacity:0.15 }} />
        <div style={{ position:'relative', zIndex:1, maxWidth:620, margin:'0 auto' }}>
          <div className="section-label" style={{ color:'var(--gold)', justifyContent:'center' }}>Reservations</div>
          <h2 style={{ color:'#fff', marginBottom:'1rem' }}>Ready for an Unforgettable Meal?</h2>
          <p style={{ color:'rgba(255,255,255,0.6)', lineHeight:1.85, marginBottom:'2.5rem' }}>
            Book a table for a special occasion, or walk in for our famous lunch buffet. Edison, NJ · New York · Chicago.
          </p>
          <div style={{ display:'flex', gap:'1rem', justifyContent:'center', flexWrap:'wrap' }}>
            <Link to="/contact" className="btn-saffron"><span>Book a Table</span></Link>
            <Link to="/menu" className="btn-outline-white">Explore the Menu</Link>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes heroUp {
          from { opacity:0; transform:translateY(28px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @media (max-width:1024px) {
          .services-grid { grid-template-columns:repeat(3,1fr) !important; }
          .menu-grid     { grid-template-columns:repeat(2,1fr) !important; }
        }
        @media (max-width:768px) {
          .two-col       { grid-template-columns:1fr !important; gap:3rem !important; }
          .stats-grid    { grid-template-columns:repeat(2,1fr) !important; }
          .events-grid   { grid-template-columns:1fr !important; }
          .menu-grid     { grid-template-columns:1fr !important; }
          .services-grid { grid-template-columns:repeat(2,1fr) !important; }
        }
      `}</style>
    </>
  )
}
