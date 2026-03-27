import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useStaggerReveal } from '../hooks/useScrollReveal'
import { blogs } from '../data/blogData'
import FoodImage from '../components/FoodImage'
import PageBanner from '../components/PageBanner'

const categoryColors = {
  'Food Guide':       '#FF9933',
  'History & Culture':'#C8A96A',
  'Health & Wellness':'#22c55e',
  'Entertaining':     '#8b5cf6',
  "Chef's Corner":    '#ef4444',
  'Festivals':        '#f59e0b',
}

export default function Blog() {
  const [activeTag, setActiveTag] = useState('All')
  const tags = ['All', ...new Set(blogs.map(b => b.category))]

  const filtered = activeTag === 'All' ? blogs : blogs.filter(b => b.category === activeTag)
  const cardsRef = useStaggerReveal(100)

  return (
    <>
      <PageBanner
        height="50vh"
        minHeight={340}
        label="Stories & Recipes"
        title="The Saffron Journal"
        description="Culinary inspiration, cultural stories, and behind-the-scenes moments."
        image="https://images.unsplash.com/photo-1601050375147-4f97f2ef3e91?w=1600&q=80&auto=format&fit=crop"
        tint="rgba(0,0,0,0.55)"
        breadcrumbs={[
          { label: 'Home', to: '/' },
          { label: 'Blog' },
        ]}
      />

      {/* â”€â”€ Filter Tags â”€â”€ */}
      <div style={{ background:'var(--cream)', padding:'1.5rem 2rem', borderBottom:'1px solid var(--border-color)' }}>
        <div style={{ maxWidth:1100, margin:'0 auto', display:'flex', flexWrap:'wrap', gap:'0.6rem', alignItems:'center' }}>
          <span style={{ fontFamily:"'Raleway',sans-serif", fontWeight:700, fontSize:'0.72rem', letterSpacing:'0.15em', textTransform:'uppercase', color:'var(--muted)', marginRight:'0.5rem' }}>Filter:</span>
          {tags.map(tag => (
            <button key={tag} onClick={() => setActiveTag(tag)} style={{
              padding:'0.45rem 1rem',
              fontFamily:"'Raleway',sans-serif", fontWeight:600, fontSize:'0.75rem',
              letterSpacing:'0.05em', border:'1.5px solid',
              borderColor: activeTag === tag ? 'var(--saffron)' : 'var(--border-color)',
              background: activeTag === tag ? 'var(--saffron)' : '#fff',
              color: activeTag === tag ? '#fff' : 'var(--muted)',
              cursor:'pointer', transition:'all 0.2s',
            }}>{tag}</button>
          ))}
        </div>
      </div>

      {/* â”€â”€ Blog Grid â”€â”€ */}
      <section style={{ padding:'5rem 2rem', background:'#fff' }}>
        <div style={{ maxWidth:1100, margin:'0 auto' }}>

          {/* Featured post (first) */}
          {activeTag === 'All' && (
            <div style={{
              display:'grid', gridTemplateColumns:'1.2fr 1fr', gap:'0',
              border:'1px solid var(--border-color)', marginBottom:'3rem', overflow:'hidden',
            }} className="two-col">
              <div className="card-img-wrap" style={{ height:400 }}>
                <FoodImage src={filtered[0].image} alt={filtered[0].title} gradient="blog" style={{ height:'100%' }} />
              </div>
              <div style={{ padding:'3rem', display:'flex', flexDirection:'column', justifyContent:'center', background:'var(--cream)' }}>
                <span style={{
                  display:'inline-block', background:categoryColors[filtered[0].category] || 'var(--saffron)',
                  color:'#fff', fontFamily:"'Raleway',sans-serif", fontWeight:700,
                  fontSize:'0.65rem', letterSpacing:'0.12em', textTransform:'uppercase',
                  padding:'0.3rem 0.75rem', marginBottom:'1rem',
                }}>{filtered[0].category}</span>
                <h2 style={{ fontSize:'1.6rem', marginBottom:'1rem', lineHeight:1.2 }}>{filtered[0].title}</h2>
                <p style={{ color:'var(--muted)', lineHeight:1.8, marginBottom:'1.5rem' }}>{filtered[0].excerpt}</p>
                <div style={{ display:'flex', alignItems:'center', gap:'0.75rem', marginBottom:'1.5rem' }}>
                  <img src={filtered[0].authorImg} alt={filtered[0].author} style={{ width:38, height:38, borderRadius:'50%', objectFit:'cover' }} />
                  <div>
                    <div style={{ fontFamily:"'Raleway',sans-serif", fontWeight:700, fontSize:'0.82rem' }}>{filtered[0].author}</div>
                    <div style={{ fontFamily:"'Raleway',sans-serif", fontSize:'0.75rem', color:'var(--muted)' }}>{filtered[0].date} Â· {filtered[0].readTime}</div>
                  </div>
                </div>
                <button className="btn-saffron" style={{ alignSelf:'flex-start' }}><span>Read Full Article</span></button>
              </div>
            </div>
          )}

          {/* Grid of posts */}
          <div
            ref={cardsRef}
            style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(300px, 1fr))', gap:'2rem' }}
          >
            {(activeTag === 'All' ? filtered.slice(1) : filtered).map(post => (
              <article key={post.id} className="reveal" style={{
                border:'1px solid var(--border-color)',
                overflow:'hidden',
                transition:'box-shadow 0.3s, transform 0.3s',
              }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow='0 12px 40px rgba(0,0,0,0.08)'; e.currentTarget.style.transform='translateY(-4px)' }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow='none'; e.currentTarget.style.transform='none' }}>

                <div className="card-img-wrap" style={{ height:220 }}>
                  <FoodImage src={post.image} alt={post.title} gradient="blog" style={{ height:'100%' }} />
                </div>

                <div style={{ padding:'1.5rem' }}>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'0.75rem' }}>
                    <span style={{
                      background:categoryColors[post.category] || 'var(--saffron)',
                      color:'#fff', fontFamily:"'Raleway',sans-serif", fontWeight:700,
                      fontSize:'0.62rem', letterSpacing:'0.1em', textTransform:'uppercase',
                      padding:'0.2rem 0.6rem',
                    }}>{post.category}</span>
                    <span style={{ fontFamily:"'Raleway',sans-serif", fontSize:'0.72rem', color:'var(--muted)' }}>{post.readTime}</span>
                  </div>

                  <h3 style={{ fontSize:'1.05rem', marginBottom:'0.75rem', lineHeight:1.35 }}>{post.title}</h3>
                  <p style={{ color:'var(--muted)', fontSize:'0.85rem', lineHeight:1.75, marginBottom:'1.25rem' }}>{post.excerpt}</p>

                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                    <div style={{ display:'flex', alignItems:'center', gap:'0.5rem' }}>
                      <img src={post.authorImg} alt={post.author} style={{ width:30, height:30, borderRadius:'50%', objectFit:'cover' }} />
                      <div>
                        <div style={{ fontFamily:"'Raleway',sans-serif", fontWeight:700, fontSize:'0.75rem' }}>{post.author}</div>
                        <div style={{ fontFamily:"'Raleway',sans-serif", fontSize:'0.7rem', color:'var(--muted)' }}>{post.date}</div>
                      </div>
                    </div>
                    <button style={{
                      background:'none', border:'none', cursor:'pointer',
                      fontFamily:"'Raleway',sans-serif", fontWeight:700, fontSize:'0.75rem',
                      letterSpacing:'0.08em', textTransform:'uppercase',
                      color:'var(--dark)', borderBottom:'1.5px solid var(--saffron)',
                      paddingBottom:'1px',
                    }}>Read More â†’</button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Newsletter signup */}
          <div style={{
            marginTop:'4rem',
            background:'var(--cream)',
            border:'1px solid var(--border-color)',
            padding:'3rem 2rem',
            textAlign:'center',
          }}>
            <div className="section-label" style={{ justifyContent:'center' }}>Stay Inspired</div>
            <h2 style={{ fontSize:'1.8rem', marginBottom:'0.75rem' }}>Get Recipes & Stories in Your Inbox</h2>
            <p style={{ color:'var(--muted)', maxWidth:480, margin:'0 auto 2rem', lineHeight:1.8 }}>
              Subscribe to the Saffron Journal for monthly recipes, chef notes, and exclusive event invitations.
            </p>
            <div style={{ display:'flex', gap:'0', maxWidth:440, margin:'0 auto' }}>
              <input type="email" placeholder="your@email.com" className="form-input" style={{ flex:1 }} />
              <button className="btn-saffron" style={{ flexShrink:0 }}><span>Subscribe</span></button>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width:900px) {
          .two-col { grid-template-columns:1fr !important; }
          .two-col .card-img-wrap { height:260px !important; }
        }
      `}</style>
    </>
  )
}
