import { Link } from 'react-router-dom'
import fallbackImg from '../assets/hero.png'

/**
 * Reusable top-of-page banner for secondary pages.
 * Provides a cover image, overlay tint, optional breadcrumbs and label.
 */
export default function PageBanner({
  title,
  label,
  description,
  image,
  height = '50vh',
  minHeight = 340,
  tint = 'linear-gradient(135deg, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.35) 55%, rgba(0,0,0,0.62) 100%)',
  align = 'center',
  breadcrumbs,
}) {
  const justify = align === 'left' ? 'flex-start' : align === 'right' ? 'flex-end' : 'center'
  const textAlign = align === 'left' || align === 'right' ? align : 'center'

  const handleImageError = (e) => {
    if (e.currentTarget.dataset.fallback) return
    e.currentTarget.dataset.fallback = 'true'
    e.currentTarget.src = fallbackImg
  }

  return (
    <section className="page-banner" style={{
      height,
      minHeight,
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: justify,
      overflow: 'hidden',
      padding: '0 1.5rem',
    }}>
      {/* Background image */}
      <div className="banner-media" style={{ position: 'absolute', inset: '-18% 0', background: '#000' }}>
        <img
          className="banner-kenburns"
          src={image || fallbackImg}
          alt=""
          onError={handleImageError}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
      </div>

      {/* Overlay tint */}
      <div className="banner-overlay" style={{ position: 'absolute', inset: 0, background: tint }} />

      {/* Content */}
      <div className="banner-content" style={{
        position: 'relative',
        zIndex: 1,
        color: '#fff',
        textAlign,
        maxWidth: 900,
        width: '100%',
      }}>
        {label && (
          <div
            className="section-label"
            style={{
              color: 'var(--gold)',
              justifyContent: textAlign === 'center' ? 'center' : 'flex-start',
            }}
          >
            {label}
          </div>
        )}

        {title && (
          <h1 style={{
            color: '#fff',
            marginBottom: description || (breadcrumbs && breadcrumbs.length) ? '0.75rem' : 0,
          }}>
            {title}
          </h1>
        )}

        {description && (
          <p style={{
            color: 'rgba(255,255,255,0.72)',
            fontFamily: "'Raleway',sans-serif",
            lineHeight: 1.8,
            maxWidth: textAlign === 'center' ? 680 : 520,
          }}>
            {description}
          </p>
        )}

        {breadcrumbs?.length ? (
          <p style={{
            color: 'rgba(255,255,255,0.65)',
            fontSize: '0.8rem',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            marginTop: description ? '0.8rem' : '0.3rem',
          }}>
            {breadcrumbs.map((item, idx) => (
              <span key={`${item.label}-${idx}`}>
                {item.to
                  ? <Link to={item.to} style={{ color: 'var(--saffron)' }}>{item.label}</Link>
                  : item.label}
                {idx < breadcrumbs.length - 1 && <span style={{ opacity: 0.6 }}> &nbsp;/&nbsp; </span>}
              </span>
            ))}
          </p>
        ) : null}
      </div>
    </section>
  )
}
