/**
 * FoodImage — always renders a beautiful gradient background.
 * The real image overlays on top when it loads.
 * If the image fails, the gradient shows instead.
 */

// Gradient palettes keyed by dish/scene type
export const foodGradients = {
  biryani:       'linear-gradient(145deg, #7B3F00 0%, #C76B1A 40%, #E8A838 70%, #F0C060 100%)',
  butter_chicken:'linear-gradient(145deg, #B83A20 0%, #D96030 40%, #F08040 70%, #F5B060 100%)',
  curry:         'linear-gradient(145deg, #8B1A1A 0%, #C03020 40%, #D85030 70%, #E87850 100%)',
  paneer:        'linear-gradient(145deg, #704214 0%, #A06228 40%, #C88040 70%, #E0A060 100%)',
  dal:           'linear-gradient(145deg, #5C3A00 0%, #8B5A10 40%, #B07820 70%, #D09840 100%)',
  tandoori:      'linear-gradient(145deg, #7A1520 0%, #B03020 40%, #C84030 70%, #D86040 100%)',
  seafood:       'linear-gradient(145deg, #00505A 0%, #00788A 40%, #10A0A8 70%, #30C0C0 100%)',
  dessert:       'linear-gradient(145deg, #8B3060 0%, #B85080 40%, #D07090 70%, #E898A8 100%)',
  beverage:      'linear-gradient(145deg, #2A5F2A 0%, #4A8A3A 40%, #70A850 70%, #98C870 100%)',
  naan:          'linear-gradient(145deg, #7A5C20 0%, #A87830 40%, #C89840 70%, #E0B860 100%)',
  restaurant:    'linear-gradient(145deg, #2C1A0E 0%, #5C3820 40%, #8B5A35 70%, #B07848 100%)',
  exterior:      'linear-gradient(145deg, #1A2840 0%, #2A4060 40%, #3A5878 70%, #5078A0 100%)',
  chef:          'linear-gradient(145deg, #1C1C1C 0%, #3A2A1C 40%, #5A3C28 70%, #7A5040 100%)',
  event:         'linear-gradient(145deg, #1A0A30 0%, #3A2050 40%, #5A3870 70%, #7A5090 100%)',
  hero:          'linear-gradient(145deg, #1A0800 0%, #3D1500 40%, #6B2800 70%, #A04010 100%)',
  interior:      'linear-gradient(145deg, #2A1500 0%, #4A2800 40%, #6B3C10 70%, #8B5020 100%)',
  spices:        'linear-gradient(145deg, #6B1800 0%, #A03010 40%, #C85020 70%, #E07840 100%)',
  blog:          'linear-gradient(145deg, #0A2A0A 0%, #1E4A1E 40%, #346834 70%, #4A8A4A 100%)',
}

export default function FoodImage({ src, alt, gradient = 'curry', style = {}, imgStyle = {} }) {
  return (
    <div style={{
      background: foodGradients[gradient] || foodGradients.curry,
      overflow: 'hidden',
      position: 'relative',
      ...style,
    }}>
      {src && (
        <img
          src={src}
          alt={alt || ''}
          loading="lazy"
          onError={e => { e.currentTarget.style.display = 'none' }}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            ...imgStyle,
          }}
        />
      )}
    </div>
  )
}
