'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useHeaderNavigation } from '@/hooks/useHeaderNavigation'
import ImageWithFallback from './ImageWithFallback'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { scrolled } = useHeaderNavigation()

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const closeMenu = () => setIsMenuOpen(false)

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

  const handleNavClick = () => {
    closeMenu()
  }

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`} id="header" role="banner">
      <div className="header__container">
        <div className="header__wrapper">
          <Link href="/" className="header__logo" aria-label="CyberAssassin Home">
            <ImageWithFallback 
              src="/assets/images/logo.png" 
              alt="CyberAssassin Logo" 
              className="header__logo-img"
              loading="eager"
            />
            <span className="header__brand"></span>
          </Link>

          <nav className={`header__nav ${isMenuOpen ? 'active' : ''}`} id="mainNav" role="navigation" aria-label="Main navigation">
            <div className="header__menu-container">
              <ul className="header__menu">
                <li>
                  <Link href="/" className="header__link" onClick={handleNavClick}>Home</Link>
                </li>
                <li>
                  <Link href="/about" className="header__link" onClick={handleNavClick}>About</Link>
                </li>
                <li>
                  <Link href="/services" className="header__link" onClick={handleNavClick}>Services</Link>
                </li>
                <li>
                  <Link href="/blog" className="header__link" onClick={handleNavClick}>Blog</Link>
                </li>
              </ul>
              <div className="header__mobile-cta">
                <Link href="/contact" className="header__cta" onClick={closeMenu}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="header__cta-icon">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                    <line x1="8" y1="10" x2="16" y2="10"></line>
                    <line x1="8" y1="14" x2="12" y2="14"></line>
                  </svg>
                  Contact Us
                </Link>
              </div>
            </div>
          </nav>

          <div className="header__actions">
            <Link href="/contact" className="header__cta">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="header__cta-icon">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                <line x1="8" y1="10" x2="16" y2="10"></line>
                <line x1="8" y1="14" x2="12" y2="14"></line>
              </svg>
              Contact Us
            </Link>
          </div>

          <button 
            className={`header__hamburger ${isMenuOpen ? 'active' : ''}`}
            id="hamburger"
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
            aria-controls="mainNav"
            onClick={toggleMenu}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      <div 
        className={`header__mobile-overlay ${isMenuOpen ? 'active' : ''}`}
        id="mobileOverlay"
        onClick={closeMenu}
      ></div>
    </header>
  )
}

