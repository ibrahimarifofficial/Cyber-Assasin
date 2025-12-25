'use client'

import { useState } from 'react'
import { useSmoothScroll } from '@/hooks/useSmoothScroll'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import LegalModal from '@/components/LegalModal'
import BackToTop from '@/components/BackToTop'
import BlogHero from '@/components/blog/BlogHero'
import Link from 'next/link'
import ImageWithFallback from '@/components/ImageWithFallback'

// Blog Data
const blogPosts = [
  {
    id: 1,
    title: 'The Future of AI-Powered Cybersecurity: What to Expect in 2024',
    excerpt: 'Explore how artificial intelligence is revolutionizing cybersecurity, from predictive threat detection to automated response systems that adapt in real-time.',
    image: 'https://madebydesignesia.com/php/cyberguard/images/misc/s1.webp',
    category: 'AI & Technology',
    date: 'January 15, 2024',
    readTime: '5 min read',
    slug: 'future-ai-cybersecurity-2024',
    featured: true
  },
  {
    id: 2,
    title: 'Zero Trust Architecture: Why "Never Trust, Always Verify" is the New Standard',
    excerpt: 'Learn how Zero Trust security models are replacing traditional perimeter-based defenses, providing comprehensive protection in today\'s distributed work environments.',
    image: 'https://madebydesignesia.com/php/cyberguard/images/misc/l1.webp',
    category: 'Security Strategy',
    date: 'January 10, 2024',
    readTime: '7 min read',
    slug: 'zero-trust-architecture-new-standard',
    featured: true
  },
  {
    id: 3,
    title: 'Ransomware Attacks: Prevention, Detection, and Recovery Strategies',
    excerpt: 'Comprehensive guide to protecting your organization from ransomware attacks, including best practices for prevention, early detection, and effective recovery.',
    image: 'https://madebydesignesia.com/php/cyberguard/images/misc/s1.webp',
    category: 'Threat Protection',
    date: 'January 5, 2024',
    readTime: '6 min read',
    slug: 'ransomware-attacks-prevention-recovery',
    featured: false
  },
  {
    id: 4,
    title: 'Cloud Security Best Practices for AWS, Azure, and GCP',
    excerpt: 'Essential security configurations and best practices for securing your cloud infrastructure across major cloud providers.',
    image: 'https://madebydesignesia.com/php/cyberguard/images/misc/l1.webp',
    category: 'Cloud Security',
    date: 'December 28, 2023',
    readTime: '8 min read',
    slug: 'cloud-security-best-practices',
    featured: false
  },
  {
    id: 5,
    title: 'Social Engineering: The Human Element of Cybersecurity',
    excerpt: 'Understanding how attackers exploit human psychology and implementing effective training programs to build a security-aware workforce.',
    image: 'https://madebydesignesia.com/php/cyberguard/images/misc/s1.webp',
    category: 'Human Security',
    date: 'December 20, 2023',
    readTime: '5 min read',
    slug: 'social-engineering-human-element',
    featured: false
  },
  {
    id: 6,
    title: 'Penetration Testing: How Ethical Hacking Strengthens Your Defenses',
    excerpt: 'Discover how professional penetration testing identifies vulnerabilities before attackers do, helping you build stronger security postures.',
    image: 'https://madebydesignesia.com/php/cyberguard/images/misc/l1.webp',
    category: 'Offensive Security',
    date: 'December 15, 2023',
    readTime: '6 min read',
    slug: 'penetration-testing-ethical-hacking',
    featured: false
  },
  {
    id: 7,
    title: 'Endpoint Security in the Age of Remote Work',
    excerpt: 'Strategies for securing endpoints across distributed workforces, ensuring protection regardless of device location or network connection.',
    image: 'https://madebydesignesia.com/php/cyberguard/images/misc/s1.webp',
    category: 'Endpoint Security',
    date: 'December 10, 2023',
    readTime: '7 min read',
    slug: 'endpoint-security-remote-work',
    featured: false
  },
  {
    id: 8,
    title: 'GDPR, HIPAA, and PCI-DSS: Navigating Compliance Requirements',
    excerpt: 'A comprehensive guide to understanding and implementing compliance frameworks that protect data and meet regulatory requirements.',
    image: 'https://madebydesignesia.com/php/cyberguard/images/misc/l1.webp',
    category: 'Compliance',
    date: 'December 5, 2023',
    readTime: '9 min read',
    slug: 'gdpr-hipaa-pci-dss-compliance',
    featured: false
  },
  {
    id: 9,
    title: 'Incident Response: Building an Effective Security Operations Center',
    excerpt: 'Learn how to establish and operate a SOC that provides 24/7 threat monitoring, rapid incident response, and continuous security improvement.',
    image: 'https://madebydesignesia.com/php/cyberguard/images/misc/s1.webp',
    category: 'SOC & Response',
    date: 'November 28, 2023',
    readTime: '8 min read',
    slug: 'incident-response-effective-soc',
    featured: false
  },
  {
    id: 10,
    title: 'IoT Security: Protecting the Expanding Attack Surface',
    excerpt: 'As IoT devices proliferate, learn how to secure smart devices, sensors, and connected systems from emerging cyber threats.',
    image: 'https://madebydesignesia.com/php/cyberguard/images/misc/l1.webp',
    category: 'IoT Security',
    date: 'November 20, 2023',
    readTime: '6 min read',
    slug: 'iot-security-expanding-attack-surface',
    featured: false
  },
  {
    id: 11,
    title: 'Behavioral Analytics: Detecting Insider Threats Before They Strike',
    excerpt: 'Advanced analytics techniques that identify anomalous user behavior patterns, helping detect insider threats and compromised accounts early.',
    image: 'https://madebydesignesia.com/php/cyberguard/images/misc/s1.webp',
    category: 'AI & Technology',
    date: 'November 15, 2023',
    readTime: '7 min read',
    slug: 'behavioral-analytics-insider-threats',
    featured: false
  },
  {
    id: 12,
    title: 'DevSecOps: Integrating Security into Your Development Pipeline',
    excerpt: 'How to embed security practices directly into your CI/CD pipeline, ensuring secure code from development to deployment.',
    image: 'https://madebydesignesia.com/php/cyberguard/images/misc/l1.webp',
    category: 'Cloud Security',
    date: 'November 10, 2023',
    readTime: '6 min read',
    slug: 'devsecops-integrating-security',
    featured: false
  }
]

const categories = ['All', 'AI & Technology', 'Security Strategy', 'Threat Protection', 'Cloud Security', 'Human Security', 'Offensive Security', 'Endpoint Security', 'Compliance', 'SOC & Response', 'IoT Security']

export default function BlogArchivePage() {
  useSmoothScroll()
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory
    const matchesSearch = searchQuery === '' || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const featuredPosts = filteredPosts.filter(post => post.featured)
  const regularPosts = filteredPosts.filter(post => !post.featured)

  return (
    <>
      <Header />
      <main>
        <BlogHero />

        {/* Search and Filter Section */}
        <section style={{
          padding: 'var(--spacing-3xl) 0',
          background: 'rgba(5, 5, 10, 0.5)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <div className="container" style={{
            maxWidth: '1400px',
            margin: '0 auto',
            padding: '0 24px',
            width: '100%'
          }}>
            {/* Search Bar */}
            <div style={{
              maxWidth: '600px',
              margin: '0 auto var(--spacing-xl)',
              position: 'relative'
            }}>
              <div style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center'
              }}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{
                  position: 'absolute',
                  left: 'var(--spacing-lg)',
                  color: 'rgba(255, 255, 255, 0.5)',
                  zIndex: 1
                }}>
                  <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="2"/>
                  <path d="M13 13L17 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    width: '100%',
                    padding: 'var(--spacing-md) var(--spacing-md) var(--spacing-md) 3.5rem',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    borderRadius: '12px',
                    color: '#ffffff',
                    fontFamily: 'var(--font-body)',
                    fontSize: '1rem',
                    outline: 'none',
                    transition: 'all 0.3s ease'
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)'
                    e.currentTarget.style.borderColor = 'rgba(249, 0, 77, 0.4)'
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)'
                  }}
                />
              </div>
            </div>

            {/* Category Filter */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 'var(--spacing-sm)',
              justifyContent: 'center',
              maxWidth: '1000px',
              margin: '0 auto'
            }}>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  style={{
                    padding: 'var(--spacing-sm) var(--spacing-lg)',
                    background: selectedCategory === category 
                      ? 'linear-gradient(135deg, #f9004d 0%, #d6003f 100%)'
                      : 'rgba(255, 255, 255, 0.05)',
                    border: selectedCategory === category
                      ? '1px solid rgba(249, 0, 77, 0.5)'
                      : '1px solid rgba(255, 255, 255, 0.15)',
                    borderRadius: '50px',
                    color: '#ffffff',
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.875rem',
                    fontWeight: selectedCategory === category ? '600' : '400',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    whiteSpace: 'nowrap'
                  }}
                  onMouseEnter={(e) => {
                    if (selectedCategory !== category) {
                      e.currentTarget.style.background = 'rgba(249, 0, 77, 0.15)'
                      e.currentTarget.style.borderColor = 'rgba(249, 0, 77, 0.3)'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedCategory !== category) {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)'
                    }
                  }}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Blog Posts Section */}
        <section style={{
          padding: 'var(--spacing-5xl) 0',
          background: 'linear-gradient(135deg, rgba(200, 200, 200, 0.02) 0%, rgba(255, 255, 255, 0.01) 50%, rgba(180, 180, 180, 0.02) 100%)'
        }}>
          <div className="container" style={{
            maxWidth: '1400px',
            margin: '0 auto',
            padding: '0 24px',
            width: '100%'
          }}>
            {/* Featured Posts */}
            {featuredPosts.length > 0 && (
              <div style={{ marginBottom: 'var(--spacing-5xl)' }}>
                <h2 style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
                  fontWeight: 'var(--font-weight-heading-medium)',
                  color: '#ffffff',
                  marginBottom: 'var(--spacing-2xl)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--spacing-md)'
                }}>
                  <span style={{
                    width: '4px',
                    height: '32px',
                    background: 'linear-gradient(180deg, #f9004d 0%, transparent 100%)',
                    borderRadius: '2px'
                  }}></span>
                  Featured Articles
                </h2>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
                  gap: 'var(--spacing-2xl)'
                }}>
                  {featuredPosts.map((post) => (
                    <Link
                      key={post.id}
                      href={`/blog/${post.slug}`}
                      style={{
                        textDecoration: 'none',
                        display: 'block'
                      }}
                    >
                      <article className="blog-card-featured" style={{
                        background: 'rgba(5, 5, 10, 0.95)',
                        backdropFilter: 'blur(20px)',
                        WebkitBackdropFilter: 'blur(20px)',
                        border: '1px solid rgba(255, 255, 255, 0.12)',
                        borderRadius: '24px',
                        overflow: 'hidden',
                        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column'
                      }}>
                        <div style={{
                          width: '100%',
                          height: '280px',
                          position: 'relative',
                          overflow: 'hidden'
                        }}>
                          <ImageWithFallback
                            src={post.image}
                            alt={post.title}
                            width={600}
                            height={280}
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                              objectPosition: 'center center',
                              transition: 'transform 0.4s ease'
                            }}
                          />
                          <div style={{
                            position: 'absolute',
                            top: 'var(--spacing-md)',
                            left: 'var(--spacing-md)',
                            padding: 'var(--spacing-xs) var(--spacing-md)',
                            background: 'rgba(249, 0, 77, 0.9)',
                            borderRadius: '50px',
                            fontFamily: 'var(--font-body)',
                            fontSize: '0.75rem',
                            fontWeight: '600',
                            color: '#ffffff',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em'
                          }}>
                            Featured
                          </div>
                        </div>

                        <div style={{
                          padding: 'var(--spacing-xl)',
                          display: 'flex',
                          flexDirection: 'column',
                          flexGrow: 1,
                          gap: 'var(--spacing-md)'
                        }}>
                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 'var(--spacing-md)',
                            flexWrap: 'wrap'
                          }}>
                            <span style={{
                              padding: 'var(--spacing-xs) var(--spacing-sm)',
                              background: 'rgba(249, 0, 77, 0.15)',
                              border: '1px solid rgba(249, 0, 77, 0.3)',
                              borderRadius: '6px',
                              fontFamily: 'var(--font-body)',
                              fontSize: '0.75rem',
                              fontWeight: '600',
                              color: '#f9004d'
                            }}>
                              {post.category}
                            </span>
                            <span style={{
                              fontFamily: 'var(--font-body)',
                              fontSize: '0.75rem',
                              color: 'rgba(255, 255, 255, 0.5)'
                            }}>
                              {post.date}
                            </span>
                            <span style={{
                              fontFamily: 'var(--font-body)',
                              fontSize: '0.75rem',
                              color: 'rgba(255, 255, 255, 0.5)'
                            }}>
                              {post.readTime}
                            </span>
                          </div>

                          <h3 style={{
                            fontFamily: 'var(--font-heading)',
                            fontSize: 'clamp(1.25rem, 2vw, 1.5rem)',
                            fontWeight: 'var(--font-weight-heading-medium)',
                            color: '#ffffff',
                            margin: 0,
                            lineHeight: '1.3',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden'
                          }}>
                            {post.title}
                          </h3>

                          <p style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: '0.9rem',
                            color: 'rgba(255, 255, 255, 0.7)',
                            lineHeight: '1.6',
                            margin: 0,
                            display: '-webkit-box',
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            flexGrow: 1
                          }}>
                            {post.excerpt}
                          </p>

                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 'var(--spacing-xs)',
                            color: '#f9004d',
                            fontFamily: 'var(--font-body)',
                            fontSize: '0.875rem',
                            fontWeight: '600',
                            marginTop: 'auto'
                          }}>
                            Read More
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                              <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </div>
                        </div>
                      </article>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Regular Posts Grid */}
            {regularPosts.length > 0 && (
              <div>
                <h2 style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
                  fontWeight: 'var(--font-weight-heading-medium)',
                  color: '#ffffff',
                  marginBottom: 'var(--spacing-2xl)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--spacing-md)'
                }}>
                  <span style={{
                    width: '4px',
                    height: '32px',
                    background: 'linear-gradient(180deg, #f9004d 0%, transparent 100%)',
                    borderRadius: '2px'
                  }}></span>
                  All Articles
                </h2>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                  gap: 'var(--spacing-xl)'
                }}>
                  {regularPosts.map((post) => (
                    <Link
                      key={post.id}
                      href={`/blog/${post.slug}`}
                      style={{
                        textDecoration: 'none',
                        display: 'block'
                      }}
                    >
                      <article className="blog-card" style={{
                        background: 'rgba(5, 5, 10, 0.95)',
                        backdropFilter: 'blur(20px)',
                        WebkitBackdropFilter: 'blur(20px)',
                        border: '1px solid rgba(255, 255, 255, 0.12)',
                        borderRadius: '20px',
                        overflow: 'hidden',
                        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column'
                      }}>
                        <div style={{
                          width: '100%',
                          height: '200px',
                          position: 'relative',
                          overflow: 'hidden'
                        }}>
                          <ImageWithFallback
                            src={post.image}
                            alt={post.title}
                            width={400}
                            height={200}
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                              objectPosition: 'center center',
                              transition: 'transform 0.4s ease'
                            }}
                          />
                        </div>

                        <div style={{
                          padding: 'var(--spacing-lg)',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: 'var(--spacing-sm)',
                          flexGrow: 1
                        }}>
                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 'var(--spacing-sm)',
                            flexWrap: 'wrap'
                          }}>
                            <span style={{
                              padding: '4px var(--spacing-xs)',
                              background: 'rgba(249, 0, 77, 0.15)',
                              border: '1px solid rgba(249, 0, 77, 0.3)',
                              borderRadius: '6px',
                              fontFamily: 'var(--font-body)',
                              fontSize: '0.7rem',
                              fontWeight: '600',
                              color: '#f9004d'
                            }}>
                              {post.category}
                            </span>
                            <span style={{
                              fontFamily: 'var(--font-body)',
                              fontSize: '0.7rem',
                              color: 'rgba(255, 255, 255, 0.5)'
                            }}>
                              {post.readTime}
                            </span>
                          </div>

                          <h3 style={{
                            fontFamily: 'var(--font-heading)',
                            fontSize: 'clamp(1.1rem, 1.8vw, 1.25rem)',
                            fontWeight: 'var(--font-weight-heading-medium)',
                            color: '#ffffff',
                            margin: 0,
                            lineHeight: '1.3',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden'
                          }}>
                            {post.title}
                          </h3>

                          <p style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: '0.85rem',
                            color: 'rgba(255, 255, 255, 0.7)',
                            lineHeight: '1.6',
                            margin: 0,
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            flexGrow: 1
                          }}>
                            {post.excerpt}
                          </p>

                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginTop: 'var(--spacing-sm)',
                            paddingTop: 'var(--spacing-sm)',
                            borderTop: '1px solid rgba(255, 255, 255, 0.1)'
                          }}>
                            <span style={{
                              fontFamily: 'var(--font-body)',
                              fontSize: '0.75rem',
                              color: 'rgba(255, 255, 255, 0.5)'
                            }}>
                              {post.date}
                            </span>
                            <div style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '4px',
                              color: '#f9004d',
                              fontFamily: 'var(--font-body)',
                              fontSize: '0.75rem',
                              fontWeight: '600'
                            }}>
                              Read
                              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                                <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </div>
                          </div>
                        </div>
                      </article>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* No Results Message */}
            {filteredPosts.length === 0 && (
              <div style={{
                textAlign: 'center',
                padding: 'var(--spacing-5xl) 0',
                color: 'rgba(255, 255, 255, 0.6)'
              }}>
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '1.125rem',
                  margin: 0
                }}>
                  No articles found matching your criteria.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
      <LegalModal />
      <BackToTop />
      <a href="#blog-hero" className="skip-to-content">Skip to main content</a>

      <style jsx>{`
        .blog-card-featured:hover,
        .blog-card:hover {
          transform: translateY(-8px);
          border-color: rgba(249, 0, 77, 0.3);
          box-shadow: 0 16px 48px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(249, 0, 77, 0.2);
        }

        .blog-card-featured:hover img,
        .blog-card:hover img {
          transform: scale(1.05);
        }

        @media (max-width: 1024px) {
          .blog-card-featured {
            grid-template-columns: 1fr !important;
          }
        }

        @media (max-width: 768px) {
          section:first-child {
            padding: var(--spacing-3xl) 0 !important;
            min-height: 50vh !important;
          }

          .blog-card-featured,
          .blog-card {
            border-radius: 16px !important;
          }
        }
      `}</style>
    </>
  )
}

