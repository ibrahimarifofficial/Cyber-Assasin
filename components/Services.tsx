'use client'

import ImageWithFallback from './ImageWithFallback'

const services = [
  {
    icon: encodeURI('/assets/images/cyber-security (1).png'),
    title: 'AI-Powered Penetration Testing',
    description: 'Leverage advanced AI algorithms to simulate sophisticated cyberattacks, automatically identify vulnerabilities, and assess your security posture with machine learning-driven threat modeling and real-time risk analysis.',
  },
  {
    icon: encodeURI('/assets/images/security (1).png'),
    title: 'Intelligent Web Application Security',
    description: 'Protect your web applications with AI-driven threat detection, automated vulnerability scanning, and intelligent security protocols that adapt to emerging threats in real-time.',
  },
  {
    icon: '/assets/images/cyber-security.png',
    title: 'AI-Enhanced Network Security',
    description: 'Safeguard your network infrastructure with AI-powered intrusion detection, behavioral analytics, and automated threat response systems that learn and adapt to protect against evolving cyber threats.',
  },
  {
    icon: encodeURI('/assets/images/cyber-security (2).png'),
    title: 'AI-Driven Data Privacy & Compliance',
    description: 'Ensure data confidentiality and regulatory compliance with intelligent data classification, automated privacy controls, and AI-powered compliance monitoring that adapts to changing regulations.',
  },
  {
    icon: '/assets/images/time-keeping.png',
    title: 'AI-Powered Incident Response & Threat Hunting',
    description: 'Deploy intelligent threat hunting capabilities with AI-driven anomaly detection, automated incident response, and predictive analytics to identify and neutralize threats before they impact your business.',
  },
  {
    icon: '/assets/images/secure-data.png',
    title: 'Intelligent Cloud Security',
    description: 'Secure your cloud infrastructure with AI-enhanced monitoring, automated security orchestration, and intelligent access controls that continuously learn and adapt to protect your cloud assets.',
  },
]

export default function Services() {
  return (
    <section className="services" id="services" role="region" aria-labelledby="services-heading">
      <div className="container">
        <div className="services__header">
          <span className="services__eyebrow shimmer-text">Our Services</span>
          <h2 className="services__title" id="services-heading">
            <span className="services__gradient">What We Do?</span>
          </h2>
        </div>

        <div className="services__grid">
          {services.map((service, index) => (
            <article key={index} className="service-card">
              <div className="service-card__icon">
                <ImageWithFallback 
                  src={service.icon} 
                  alt={`${service.title} Icon`}
                  loading="lazy"
                />
              </div>
              <h3 className="service-card__title">{service.title}</h3>
              <p className="service-card__description">{service.description}</p>
              <a href="#" className="service-card__btn" aria-label={`Learn more about ${service.title}`}>
                <span>Learn More</span>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 9H15M15 9L9 3M15 9L9 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

