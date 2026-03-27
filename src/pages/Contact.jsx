import { useState } from 'react'
import { MapPin, Phone, Mail, Clock, PartyPopper } from 'lucide-react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import PageBanner from '../components/PageBanner'

const eventTypes = ['Birthday Party','Wedding Reception','Corporate Event','Anniversary Dinner','Graduation Party','Cultural Celebration','Private Dining','Other']

export default function Contact() {
  const [form, setForm] = useState({ name:'', email:'', phone:'', eventType:'', date:'', time:'', guests:'', message:'' })
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState({})

  const formRef = useScrollReveal()
  const infoRef = useScrollReveal()

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = 'Valid email required'
    if (!form.phone.trim()) e.phone = 'Phone is required'
    if (!form.eventType) e.eventType = 'Please select an event type'
    if (!form.date) e.date = 'Date is required'
    return e
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setSubmitted(true)
  }

  const Field = ({ label, name, type='text', as, children, placeholder, required }) => (
    <div>
      <label style={{ display:'block', fontFamily:"'Raleway',sans-serif", fontWeight:700, fontSize:'0.78rem', letterSpacing:'0.08em', textTransform:'uppercase', color:'var(--dark)', marginBottom:'0.4rem' }}>
        {label} {required && <span style={{ color:'var(--saffron)' }}>*</span>}
      </label>
      {as === 'select' ? (
        <select className="form-input" value={form[name]} onChange={e => setForm(p => ({...p,[name]:e.target.value}))}>
          <option value="">Select event type</option>
          {children}
        </select>
      ) : as === 'textarea' ? (
        <textarea
          className="form-input"
          rows={4}
          placeholder={placeholder}
          value={form[name]}
          onChange={e => setForm(p => ({...p,[name]:e.target.value}))}
          style={{ resize:'vertical' }}
        />
      ) : (
        <input
          type={type}
          className="form-input"
          placeholder={placeholder}
          value={form[name]}
          onChange={e => setForm(p => ({...p,[name]:e.target.value}))}
        />
      )}
      {errors[name] && <p style={{ color:'#ef4444', fontSize:'0.75rem', marginTop:'0.3rem', fontFamily:"'Raleway',sans-serif" }}>{errors[name]}</p>}
    </div>
  )

  return (
    <>
      <PageBanner
        height="50vh"
        minHeight={340}
        label="Let's Celebrate Together"
        title="Contact & Events"
        description="Book a table, plan an event, or simply say hello."
        image="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1600&q=80&auto=format&fit=crop"
        tint="rgba(0,0,0,0.55)"
        breadcrumbs={[
          { label: 'Home', to: '/' },
          { label: 'Contact' },
        ]}
      />

      {/* â”€â”€ Main content â”€â”€ */}
      <section style={{ padding:'6rem 2rem', background:'var(--cream)' }}>
        <div style={{ maxWidth:1100, margin:'0 auto', display:'grid', gridTemplateColumns:'1.2fr 1fr', gap:'4rem', alignItems:'start' }} className="two-col">

          {/* â”€â”€ Form â”€â”€ */}
          <div ref={formRef} className="reveal">
            <div className="section-label">Reserve Your Moment</div>
            <h2 style={{ marginBottom:'0.5rem' }}>Book an Event</h2>
            <div className="gold-bar" style={{ marginBottom:'2rem' }} />

            {submitted ? (
              <div style={{
                padding:'3rem 2rem', background:'#fff', border:'1px solid var(--border-color)', textAlign:'center',
              }}>
                <PartyPopper size={44} color="var(--saffron)" style={{ margin:'0 auto 1rem', display:'block' }} />
                <h3 style={{ color:'var(--saffron)', marginBottom:'0.75rem' }}>Booking Request Received!</h3>
                <p style={{ color:'var(--muted)', lineHeight:1.8 }}>
                  Thank you, <strong>{form.name}</strong>! We'll reach out to <strong>{form.email}</strong> within 24 hours to confirm your reservation details.
                </p>
                <button className="btn-saffron" style={{ marginTop:'1.5rem' }} onClick={() => { setSubmitted(false); setForm({ name:'', email:'', phone:'', eventType:'', date:'', time:'', guests:'', message:'' }) }}>
                  <span>Submit Another Request</span>
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display:'flex', flexDirection:'column', gap:'1.25rem', background:'#fff', padding:'2.5rem', border:'1px solid var(--border-color)' }}>
                {/* Row: Name + Email */}
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1.25rem' }} className="form-row">
                  <Field label="Full Name" name="name" placeholder="John Smith" required />
                  <Field label="Email Address" name="email" type="email" placeholder="john@email.com" required />
                </div>

                {/* Row: Phone + Event Type */}
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1.25rem' }} className="form-row">
                  <Field label="Phone Number" name="phone" type="tel" placeholder="+1 (555) 000-0000" required />
                  <Field label="Event Type" name="eventType" as="select" required>
                    {eventTypes.map(t => <option key={t} value={t}>{t}</option>)}
                  </Field>
                </div>

                {/* Row: Date + Time + Guests */}
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:'1.25rem' }} className="form-row">
                  <Field label="Event Date" name="date" type="date" required />
                  <Field label="Preferred Time" name="time" type="time" />
                  <div>
                    <label style={{ display:'block', fontFamily:"'Raleway',sans-serif", fontWeight:700, fontSize:'0.78rem', letterSpacing:'0.08em', textTransform:'uppercase', color:'var(--dark)', marginBottom:'0.4rem' }}>
                      Guests
                    </label>
                    <select className="form-input" value={form.guests} onChange={e => setForm(p => ({...p, guests:e.target.value}))}>
                      <option value="">Select</option>
                      {['2â€“10','11â€“25','26â€“50','51â€“100','100+'].map(n => <option key={n} value={n}>{n}</option>)}
                    </select>
                  </div>
                </div>

                <Field label="Your Message" name="message" as="textarea" placeholder="Tell us about your event â€” theme, special requirements, dietary needs..." />

                <button type="submit" className="btn-saffron" style={{ alignSelf:'flex-start', marginTop:'0.5rem' }}>
                  <span>Send Booking Request â†’</span>
                </button>
              </form>
            )}
          </div>

          {/* â”€â”€ Info Panel â”€â”€ */}
          <div ref={infoRef} className="reveal" style={{ transitionDelay:'0.15s', display:'flex', flexDirection:'column', gap:'1.5rem' }}>
            {/* Contact info cards */}
            {[
              { Icon:MapPin, title:'Visit Us', content:'2847 Curry Lane, Edison, NJ 08817\nGramercy, New York, NY 10016\nWest Loop, Chicago, IL 60607' },
              { Icon:Phone, title:'Call Us', content:'+1 (732) 555-0101 â€” Edison\n+1 (212) 555-0202 â€” New York\n+1 (312) 555-0303 â€” Chicago' },
              { Icon:Mail, title:'Email Us', content:'reservations@saffronusa.com\nevents@saffronusa.com' },
              { Icon:Clock, title:'Hours', content:'Monâ€“Thu: 11:30 AM â€“ 10:00 PM\nFriâ€“Sat: 11:30 AM â€“ 11:00 PM\nSunday: 12:00 PM â€“ 10:00 PM' },
            ].map(({ Icon, title, content }) => (
              <div key={title} style={{
                display:'flex', gap:'1rem', background:'#fff',
                padding:'1.5rem', border:'1px solid var(--border-color)',
              }}>
                <div style={{ flexShrink:0, marginTop:2, width:36, height:36, borderRadius:'50%', background:'rgba(255,153,51,0.08)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                  <Icon size={16} color="var(--saffron)" />
                </div>
                <div>
                  <h4 style={{ fontFamily:"'Bona Nova SC',serif", fontSize:'1rem', marginBottom:'0.4rem' }}>{title}</h4>
                  <p style={{ fontFamily:"'Raleway',sans-serif", fontSize:'0.875rem', color:'var(--muted)', lineHeight:1.8, whiteSpace:'pre-line' }}>{content}</p>
                </div>
              </div>
            ))}

            {/* Map */}
            <div style={{ overflow:'hidden', border:'1px solid var(--border-color)' }}>
              <iframe
                title="Saffron Restaurant Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3039.9!2d-74.3769!3d40.5187!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDMxJzA3LjMiTiA3NMKwMjInMzYuOCJX!5e0!3m2!1sen!2sus!4v1"
                width="100%"
                height="240"
                style={{ border:0, display:'block', filter:'grayscale(0.2)' }}
                allowFullScreen=""
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* â”€â”€ FAQ â”€â”€ */}
      <section style={{ padding:'5rem 2rem', background:'#fff' }}>
        <div style={{ maxWidth:800, margin:'0 auto' }}>
          <div style={{ textAlign:'center', marginBottom:'3rem' }}>
            <div className="section-label">Got Questions?</div>
            <h2>Frequently Asked Questions</h2>
            <div className="gold-bar" style={{ margin:'1rem auto' }} />
          </div>
          {[
            ['Do you accommodate dietary restrictions?', 'Absolutely. We have an extensive vegetarian and vegan menu, and our kitchen is well-versed in managing allergies. Please inform your server or note it in your booking.'],
            ['How far in advance should I book an event?', 'For intimate dining (up to 10 guests), 1â€“2 weeks is usually sufficient. For larger events like weddings or corporate functions, we recommend booking 3â€“6 months ahead.'],
            ['Do you offer catering?', 'Yes! Saffron Catering provides full-service catering for events from 20 to 500 guests. Contact us at events@saffronusa.com for a custom quote.'],
            ['Is there parking at your locations?', 'Our Edison and Chicago locations have dedicated free parking. In New York, street parking is available and we are close to multiple subway lines.'],
            ['Can I order online for delivery?', 'Yes â€” use our online ordering system (linked in the menu section) or order via DoorDash, Uber Eats, and Grubhub.'],
          ].map(([q, a], i) => <FAQItem key={i} question={q} answer={a} />)}
        </div>
      </section>

      <style>{`
        @media (max-width:900px) {
          .two-col { grid-template-columns:1fr !important; }
          .form-row { grid-template-columns:1fr !important; }
        }
      `}</style>
    </>
  )
}

function FAQItem({ question, answer }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ borderBottom:'1px solid var(--border-color)', paddingBottom:'0.1rem', marginBottom:'0.1rem' }}>
      <button
        onClick={() => setOpen(v => !v)}
        style={{
          width:'100%', display:'flex', justifyContent:'space-between', alignItems:'center',
          padding:'1.25rem 0', background:'none', border:'none', cursor:'pointer',
          fontFamily:"'Bona Nova SC',serif", fontSize:'1rem', color:'var(--dark)', textAlign:'left', gap:'1rem',
        }}
      >
        {question}
        <span style={{ fontSize:'1.2rem', color:'var(--saffron)', flexShrink:0, transition:'transform 0.3s', transform: open ? 'rotate(45deg)' : 'none' }}>+</span>
      </button>
      {open && (
        <p style={{ paddingBottom:'1.25rem', fontFamily:"'Raleway',sans-serif", color:'var(--muted)', lineHeight:1.8, fontSize:'0.9rem' }}>
          {answer}
        </p>
      )}
    </div>
  )
}
