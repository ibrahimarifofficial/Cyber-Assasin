'use client'

import ImageWithFallback from '../ImageWithFallback'
import Link from 'next/link'

export default function AboutContent() {
  const features = [
    'Expert Cybersecurity Consulting',
    'Advanced Threat Detection',
    'Data Privacy and Compliance',
    'Vulnerability Assessment',
    'Incident Response and Recovery',
    'Customized Security Solutions',
  ]

  return (
    <section className="about" id="about-content" role="region" aria-labelledby="about-content-heading" style={{ position: 'relative', paddingTop: 'var(--spacing-5xl)' }}>
      <div className="about__gradient"></div>
      <div className="about__corner-glow"></div>
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="about__content">
          <div className="about__image-wrapper">
            <div className="about__image-container">
              <ImageWithFallback 
                src="/assets/images/about.webp" 
                alt="Cybersecurity Innovation" 
                className="about__image"
                loading="lazy"
              />
              <div className="about__badge">
                <ImageWithFallback 
                  src="/assets/images/achievement-award-badge-svgrepo-com.svg" 
                  alt="Badge" 
                  className="about__badge-icon"
                />
                <div className="about__badge-content">
                  <strong>Trusted By 5k</strong>
                  <span>Clients</span>
                </div>
              </div>
            </div>
          </div>

          <div className="about__text">
            <span className="about__eyebrow shimmer-text">About us</span>
            <h2 className="about__title" id="about-content-heading">Elite Cybersecurity Firm</h2>
            <p className="about__description">
              Cyber Assassin is an elite cybersecurity firm built to defend, detect, and dominate digital threats.
              Backed by a highly skilled security task force and next-generation technology, we deliver precision-driven 
              cybersecurity solutions designed to protect critical systems, secure sensitive data, and stay ahead of 
              evolving cyber attacks.
            </p>
            <p className="about__description">
              <b><i>We don't just meet expectations</i></b>, we eliminate risk before it becomes a threat.
            </p>
            
            <div className="about__features">
              <div className="about__features-col">
                {features.slice(0, 3).map((feature, i) => (
                  <div key={i} className="about__feature-item">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="10" cy="10" r="9" fill="currentColor"/>
                      <path d="M6 10L9 13L14 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
              <div className="about__features-col">
                {features.slice(3).map((feature, i) => (
                  <div key={i} className="about__feature-item">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="10" cy="10" r="9" fill="currentColor"/>
                      <path d="M6 10L9 13L14 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="about__bottom">
              <Link href="/services" className="btn btn--primary about__btn">
                What We Provide
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 9H14M14 9L10 5M14 9L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
              <div className="about__author">
                <ImageWithFallback 
                  src="https://i.pravatar.cc/80?img=12" 
                  alt="Andy Dufren" 
                  className="about__author-img"
                />
                <div className="about__author-info">
                  <strong>Andy Dufren</strong>
                  <span>CEO, Founder</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

