import type { Metadata } from 'next'
import { Urbanist, Poppins } from 'next/font/google'
import '../styles/globals.css'

const urbanist = Urbanist({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-heading',
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial'],
})

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-body',
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial'],
})

export const metadata: Metadata = {
  title: 'CyberAssassin | Enterprise Cybersecurity & AI Solutions',
  description: 'Enterprise-grade Cybersecurity and AI solutions to protect your digital assets and empower your business.',
  keywords: ['cybersecurity', 'enterprise security', 'AI solutions', 'network security', 'cyber protection'],
  authors: [{ name: 'CyberAssassin' }],
  creator: 'CyberAssassin',
  publisher: 'CyberAssassin',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://cyberassassin.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'CyberAssassin',
    title: 'CyberAssassin | Enterprise Cybersecurity & AI Solutions',
    description: 'Enterprise-grade Cybersecurity and AI solutions to protect your digital assets and empower your business.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CyberAssassin | Enterprise Cybersecurity & AI Solutions',
    description: 'Enterprise-grade Cybersecurity and AI solutions to protect your digital assets and empower your business.',
  },
  icons: {
    icon: '/assets/images/favicon.jpg',
    shortcut: '/assets/images/favicon.jpg',
    apple: '/assets/images/favicon.jpg',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${urbanist.variable} ${poppins.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${urbanist.variable} ${poppins.variable}`}>{children}</body>
    </html>
  )
}

