import { useState, useMemo, useRef } from 'react'
import { Search, ShoppingCart, Check, Flame, Plus, Salad, UtensilsCrossed, CookingPot, CakeSlice, GlassWater } from 'lucide-react'
import { menuData, categories } from '../data/menuData'
import PageBanner from '../components/PageBanner'

const CATEGORY_ICONS = { Salad, UtensilsCrossed, CookingPot, Flame, CakeSlice, GlassWater }

/* â”€â”€ Spice dots component â”€â”€ */
function SpiceDots({ level }) {
  return (
    <div style={{ display:'flex', gap:3, alignItems:'center' }}>
      {[1,2,3].map(n => (
        <div key={n} className={`spice-dot ${n <= level ? 'on' : ''}`} />
      ))}
    </div>
  )
}

/* â”€â”€ Menu Item Card â”€â”€ */
function MenuCard({ item, onAddToCart }) {
  const [added, setAdded] = useState(false)

  const handleAdd = () => {
    onAddToCart(item)
    setAdded(true)
    setTimeout(() => setAdded(false), 1400)
  }

  return (
    <div className="menu-card" style={{ borderRadius:0, overflow:'hidden' }}>
      {/* Image */}
      <div className="card-img-wrap" style={{ height:180, background:'#f3f4f6' }}>
        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          style={{ width:'100%', height:'100%', objectFit:'cover' }}
          onError={e => { e.currentTarget.style.display='none' }}
        />
      </div>

      {/* Body */}
      <div style={{ padding:'1.1rem' }}>
        {/* Veg badge + name */}
        <div style={{ display:'flex', alignItems:'flex-start', gap:'0.5rem', marginBottom:'0.4rem' }}>
          <div className="veg-badge" style={{ color: item.veg ? '#22c55e' : '#ef4444', marginTop:3, flexShrink:0 }} title={item.veg ? 'Vegetarian' : 'Non-Vegetarian'} />
          <h3 style={{ fontSize:'0.95rem', lineHeight:1.3 }}>{item.name}</h3>
        </div>

        <p style={{ color:'var(--muted)', fontSize:'0.8rem', lineHeight:1.6, marginBottom:'0.75rem' }}>{item.description}</p>

        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
          <div>
            <span style={{ fontFamily:"'Bona Nova SC',serif", fontSize:'1.1rem', color:'var(--saffron)' }}>${item.price.toFixed(2)}</span>
            <div style={{ marginTop:3 }}><SpiceDots level={item.spice} /></div>
          </div>
          <button
            onClick={handleAdd}
            style={{
              background: added ? '#22c55e' : 'var(--saffron)',
              color:'#fff',
              border:'none',
              padding:'0.5rem 1rem',
              fontFamily:"'Raleway',sans-serif",
              fontWeight:700,
              fontSize:'0.72rem',
              letterSpacing:'0.08em',
              textTransform:'uppercase',
              cursor:'pointer',
              transition:'background 0.3s, transform 0.2s',
              transform: added ? 'scale(0.96)' : 'scale(1)',
            }}
          >
            {added ? <><Check size={13} /> Added</> : <><Plus size={13} /> Add</>}
          </button>
        </div>
      </div>
    </div>
  )
}

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState('starters')
  const [search, setSearch] = useState('')
  const [filterVeg, setFilterVeg] = useState('all')   // 'all' | 'veg' | 'nonveg'
  const [cart, setCart] = useState([])
  const [toast, setToast] = useState('')
  const [showToast, setShowToast] = useState(false)
  const toastTimer = useRef(null)

  const allItems = useMemo(() => Object.values(menuData).flat(), [])

  /* â”€â”€ Filtered items â”€â”€ */
  const filtered = useMemo(() => {
    const pool = search.trim()
      ? allItems
      : menuData[activeCategory] || []

    return pool.filter(item => {
      const matchSearch = item.name.toLowerCase().includes(search.toLowerCase()) ||
                          item.description.toLowerCase().includes(search.toLowerCase())
      const matchVeg = filterVeg === 'all' || (filterVeg === 'veg' ? item.veg : !item.veg)
      return matchSearch && matchVeg
    })
  }, [activeCategory, search, filterVeg, allItems])

  /* â”€â”€ Cart handler â”€â”€ */
  const addToCart = (item) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id)
      return existing
        ? prev.map(i => i.id === item.id ? { ...i, qty: i.qty+1 } : i)
        : [...prev, { ...item, qty:1 }]
    })
    // Show toast
    clearTimeout(toastTimer.current)
    setToast(`${item.name} added to cart`)
    setShowToast(true)
    toastTimer.current = setTimeout(() => setShowToast(false), 2500)
  }

  const cartCount = cart.reduce((s, i) => s+i.qty, 0)
  const cartTotal = cart.reduce((s, i) => s + i.price*i.qty, 0)

  return (
    <>
      <PageBanner
        height="50vh"
        minHeight={340}
        label="250+ Authentic Dishes"
        title="Our Menu"
        description="From tandoor to curry house — every dish a celebration of India's culinary heritage."
        image="https://images.unsplash.com/photo-1547592180-85f173990554?w=1600&q=80&auto=format&fit=crop"
        tint="rgba(0,0,0,0.58)"
        breadcrumbs={[
          { label: 'Home', to: '/' },
          { label: 'Menu' },
        ]}
      />

      {/* â”€â”€ Filters Bar â”€â”€ */}
      <div className="menu-filters">
        <div className="menu-filters-inner">
          {/* Search */}
          <div className="menu-filters-search">
            <input
              type="text"
              className="form-input"
              placeholder="Search dishes..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ paddingLeft:'2.4rem' }}
            />
            <Search size={15} color="var(--muted)" style={{ position:'absolute', left:'0.85rem', top:'50%', transform:'translateY(-50%)' }} />
          </div>

          {/* Veg filter */}
          <div className="menu-filter-buttons">
            {[['all','All'],['veg','Veg'],['nonveg','Non-Veg']].map(([val, lbl]) => (
              <button key={val} onClick={() => setFilterVeg(val)} style={{
                padding:'0.5rem 0.85rem',
                fontFamily:"'Raleway',sans-serif", fontWeight:600, fontSize:'0.75rem',
                letterSpacing:'0.05em', textTransform:'uppercase',
                border:'1.5px solid',
                borderColor: filterVeg === val ? 'var(--saffron)' : 'var(--border-color)',
                background: filterVeg === val ? 'var(--saffron)' : '#fff',
                color: filterVeg === val ? '#fff' : 'var(--muted)',
                cursor:'pointer', transition:'all 0.2s',
              }}>{lbl}</button>
            ))}
          </div>

        </div>
      </div>

      <div className="menu-layout">
        {/* â”€â”€ Category Sidebar â”€â”€ */}
        <aside className="menu-sidebar">
          <p style={{ fontFamily:"'Raleway',sans-serif", fontWeight:700, fontSize:'0.7rem', letterSpacing:'0.15em', textTransform:'uppercase', color:'var(--muted)', marginBottom:'1rem' }}>Categories</p>
          <div className="menu-category-list">
            {categories.map(({ key, label, icon }) => {
              const count = menuData[key]?.length || 0
              const active = activeCategory === key && !search
              const Icon = CATEGORY_ICONS[icon]
              return (
                <button
                  key={key}
                  onClick={() => { setActiveCategory(key); setSearch('') }}
                  className={`menu-category-btn ${active ? 'active' : ''}`}
                >
                  <span style={{ display:'flex', alignItems:'center', gap:'0.5rem' }}>
                    {Icon && <Icon size={15} />} {label}
                  </span>
                  <span className="menu-category-count">{count}</span>
                </button>
              )
            })}
          </div>
        </aside>

        {/* â”€â”€ Items Grid â”€â”€ */}
        <main className="menu-main">
          {!search && (
            <h2 style={{ fontSize:'1.5rem', marginBottom:'0.25rem' }}>
              {categories.find(c => c.key === activeCategory)?.label || 'Menu'}
            </h2>
          )}
          {search && (
            <p style={{ fontFamily:"'Raleway',sans-serif", color:'var(--muted)', marginBottom:'1.5rem' }}>
              Search results for "<strong style={{ color:'var(--dark)' }}>{search}</strong>" â€” {filtered.length} items found
            </p>
          )}

          {filtered.length === 0 ? (
            <div style={{ textAlign:'center', padding:'4rem 2rem', color:'var(--muted)' }}>
              <Flame size={40} color="var(--border-color)" style={{ margin:'0 auto 1rem', display:'block' }} />
              <p style={{ fontFamily:"'Bona Nova SC',serif", fontSize:'1.2rem' }}>No dishes found</p>
              <p style={{ marginTop:'0.5rem', fontSize:'0.9rem' }}>Try adjusting your filters</p>
            </div>
          ) : (
            <div className="menu-grid">
              {filtered.map(item => (
                <MenuCard key={item.id} item={item} onAddToCart={addToCart} />
              ))}
            </div>
          )}
        </main>
      </div>

      {/* â”€â”€ Cart FAB â”€â”€ */}
      {cartCount > 0 && (
        <div style={{
          position:'fixed', bottom:'1.5rem', right:'1.5rem',
          background:'var(--dark)', color:'#fff',
          padding:'1rem 1.5rem',
          display:'flex', alignItems:'center', gap:'1rem',
          boxShadow:'0 8px 32px rgba(0,0,0,0.25)',
          zIndex:100,
          fontFamily:"'Raleway',sans-serif",
        }}>
          <div>
            <div style={{ fontWeight:700, fontSize:'0.85rem', display:'flex', alignItems:'center', gap:'0.4rem' }}><ShoppingCart size={16} /> {cartCount} item{cartCount>1?'s':''}</div>
            <div style={{ color:'var(--saffron)', fontWeight:700 }}>${cartTotal.toFixed(2)}</div>
          </div>
          <button style={{
            background:'var(--saffron)', color:'#fff', border:'none',
            padding:'0.6rem 1.2rem',
            fontFamily:"'Raleway',sans-serif", fontWeight:700, fontSize:'0.78rem',
            letterSpacing:'0.08em', textTransform:'uppercase', cursor:'pointer',
          }}>
            Checkout â†’
          </button>
        </div>
      )}

      {/* â”€â”€ Toast â”€â”€ */}
      <div className={`toast ${showToast ? 'show' : ''}`}>{toast}</div>
    </>
  )
}
