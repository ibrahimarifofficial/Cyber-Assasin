export default function TestImages() {
  const images = [
    '/assets/images/logo.png',
    '/assets/images/hero-globe.svg',
    '/assets/images/about.webp',
    '/assets/images/robot.png',
    '/assets/images/cyber-security (1).png',
    '/assets/images/security (1).png',
    '/assets/images/cyber-security.png',
    '/assets/images/cyber-security (2).png',
    '/assets/images/time-keeping.png',
    '/assets/images/secure-data.png',
  ]

  return (
    <div style={{ padding: '20px', background: '#000', color: '#fff', minHeight: '100vh' }}>
      <h1>Image Test Page</h1>
      <p>Checking if images load correctly...</p>
      {images.map((src, i) => (
        <div key={i} style={{ margin: '20px 0', padding: '10px', border: '1px solid #333' }}>
          <p>Path: {src}</p>
          <img 
            src={src} 
            alt={`Test ${i}`}
            style={{ maxWidth: '200px', border: '2px solid red' }}
            onError={(e) => {
              console.error('Failed to load:', src)
              e.currentTarget.style.border = '2px solid red'
            }}
            onLoad={(e) => {
              console.log('Loaded successfully:', src)
              e.currentTarget.style.border = '2px solid green'
            }}
          />
        </div>
      ))}
    </div>
  )
}


