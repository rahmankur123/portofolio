import React, { useEffect, useRef } from 'react';
import {
  Code,
  Database,
  Cpu,
  Layers,
  CheckCircle,
  Lightbulb,
  Compass,
  Sparkles
} from './Icons';

export default function AboutSection({ profile }) {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    const section = sectionRef.current;
    if (section) {
      const revealElements = section.querySelectorAll(
        '.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right'
      );
      revealElements.forEach((el) => observer.observe(el));
    }

    return () => observer.disconnect();
  }, []);

  const pillars = [
    {
      icon: Code,
      title: 'Clean & Maintainable Code',
      desc: 'Menulis struktur komponen React yang modular, penamaan variabel yang deklaratif, serta pemisahan logika bisnis yang rapi.'
    },
    {
      icon: Database,
      title: 'Integritas Relasi Database',
      desc: 'Mendesain skema MySQL yang ternormalisasi dengan foreign keys, indeks terukur, dan perlindungan SQL injection via parameterized queries.'
    },
    {
      icon: Compass,
      title: 'Empati Pengalaman Pengguna',
      desc: 'Memastikan antarmuka tidak sekadar indah, tetapi juga intuitif, cepat dimuat, mudah dinavigasi, dan konsisten di setiap perangkat.'
    }
  ];

  return (
    <section id="about" className="section about-section" ref={sectionRef}>
      <div className="container">
        {/* Header */}
        <div className="section-header scroll-reveal">
          <div className="section-tag">
            <Sparkles size={14} />
            <span>Tentang Saya</span>
          </div>
          <h2 className="section-title">Dedikasi pada Rekayasa Web Berkualitas</h2>
          <p className="section-subtitle">
            Kombinasi fondasi akademik teknologi informasi dengan ketelitian implementasi sistem nyata.
          </p>
        </div>

        {/* Content Layout */}
        <div className="about-grid">
          {/* Left: Biography Paragraphs */}
          <div className="about-bio-column">
            <div className="bio-card card scroll-reveal-left">
              <h3 className="bio-card-title">Biografi Profesional</h3>
              <div className="bio-content">
                {profile?.about_content ? (
                  profile.about_content.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="bio-paragraph">
                      {paragraph}
                    </p>
                  ))
                ) : (
                  <p className="bio-paragraph">
                    Saya adalah seorang calon software engineer yang berdedikasi membangun aplikasi web modern dan efisien.
                  </p>
                )}
              </div>

              {/* Quick Checklist */}
              <div className="work-approach-box">
                <h4 className="approach-title">Prinsip Pengembangan:</h4>
                <div className="approach-list">
                  <div className="approach-item">
                    <CheckCircle size={16} className="approach-icon" />
                    <span>Orientasi solusi terhadap kebutuhan nyata pengguna</span>
                  </div>
                  <div className="approach-item">
                    <CheckCircle size={16} className="approach-icon" />
                    <span>Struktur kode yang siap diuji dan mudah dirawat</span>
                  </div>
                  <div className="approach-item">
                    <CheckCircle size={16} className="approach-icon" />
                    <span>Dokumentasi proyek yang terbuka dan transparan</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Work Pillars */}
          <div className="about-pillars-column">
            <div className="pillars-list">
              {pillars.map((pillar, i) => {
                const IconComponent = pillar.icon;
                return (
                  <div
                    key={i}
                    className="pillar-card card scroll-reveal-right"
                    style={{ transitionDelay: `${i * 120}ms` }}
                  >
                    <div className="pillar-icon-box">
                      <IconComponent size={24} />
                    </div>
                    <div className="pillar-text">
                      <h4 className="pillar-title">{pillar.title}</h4>
                      <p className="pillar-desc">{pillar.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quick Quote / Note Card */}
            <div className="quote-card scroll-reveal" style={{ transitionDelay: '360ms' }}>
              <Lightbulb size={20} className="quote-icon" />
              <p className="quote-text">
                "Perangkat lunak yang baik bukan hanya yang berhasil dikompilasi, tetapi yang dapat dipahami oleh developer lain dan memberikan nilai nyata bagi penggunanya."
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .about-section {
          background-color: var(--bg-main);
        }

        .about-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
        }

        @media (min-width: 992px) {
          .about-grid {
            grid-template-columns: 1.15fr 0.85fr;
            gap: 2.5rem;
          }
        }

        .bio-card {
          padding: 2.25rem;
          height: 100%;
        }

        .bio-card-title {
          font-size: 1.35rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 1.25rem;
          padding-bottom: 0.75rem;
          border-bottom: 1px solid var(--border-subtle);
        }

        .bio-content {
          display: flex;
          flex-direction: column;
          gap: 1.1rem;
        }

        .bio-paragraph {
          font-size: 1rem;
          line-height: 1.75;
          color: var(--text-secondary);
        }

        .work-approach-box {
          margin-top: 1.75rem;
          padding: 1.25rem;
          background-color: var(--primary-green-light);
          border: 1px solid var(--primary-green-border);
          border-radius: var(--radius-md);
        }

        .approach-title {
          font-size: 0.875rem;
          font-weight: 700;
          color: var(--primary-green);
          margin-bottom: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }

        .approach-list {
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
        }

        .approach-item {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          font-size: 0.9rem;
          font-weight: 500;
          color: var(--text-primary);
        }

        .approach-icon {
          color: var(--primary-green);
          flex-shrink: 0;
        }

        /* Pillars */
        .pillars-list {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .pillar-card {
          padding: 1.5rem;
          display: flex;
          gap: 1.25rem;
          align-items: flex-start;
        }

        .pillar-icon-box {
          width: 48px;
          height: 48px;
          border-radius: var(--radius-md);
          background-color: var(--primary-green-pale);
          color: var(--primary-green);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .pillar-title {
          font-size: 1.05rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 0.35rem;
        }

        .pillar-desc {
          font-size: 0.875rem;
          line-height: 1.6;
          color: var(--text-secondary);
        }

        .quote-card {
          margin-top: 1.25rem;
          padding: 1.5rem;
          border-radius: var(--radius-lg);
          background-color: var(--primary-green-pale);
          border: 1px dashed var(--primary-green-border);
          display: flex;
          gap: 1rem;
          align-items: flex-start;
        }

        .quote-icon {
          color: var(--primary-green);
          flex-shrink: 0;
          margin-top: 0.15rem;
        }

        .quote-text {
          font-size: 0.9rem;
          font-style: italic;
          color: var(--primary-green);
          font-weight: 500;
          line-height: 1.6;
        }
      `}</style>
    </section>
  );
}
