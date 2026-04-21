import { Link } from "react-router-dom";
import "../Styles/About.css";

function About() {
  return (
    <div className="about-page">

      {/* NAV */}
      <nav className="about-nav">
        <div className="about-nav-logo">
          <span className="logo-icon">🏥</span>
          <span className="logo-text">MediClear</span>
        </div>
        <div className="about-nav-links">
          <Link to="/register" className="nav-btn-outline">Register</Link>
          <Link to="/login" className="nav-btn-solid">Login</Link>
        </div>
      </nav>

      {/* HERO */}
      <section className="about-hero">
        <div className="hero-img-overlay"></div>
        <div className="about-hero-content">
          <div className="hero-badge">
            <span className="badge-pulse"></span>
            Trusted Medical Verification Platform
          </div>
          <h1 className="hero-title">
            Verify Medical Licenses <br />
            <span className="hero-title-accent">Instantly & Securely</span>
          </h1>
          <p className="hero-desc">
            MediClear bridges the gap between doctors and administrators — making license verification fast, transparent, and completely paperless.
          </p>
          <div className="hero-cta-group">
            <Link to="/register" className="cta-primary">Get Started Free →</Link>
            <Link to="/login" className="cta-secondary">Login</Link>
          </div>
        </div>

        <div className="hero-stats-card">
          <div className="hero-stat">
            <div className="hero-stat-num">500+</div>
            <div className="hero-stat-lbl">Verified Doctors</div>
          </div>
          <div className="hero-stat-divider"></div>
          <div className="hero-stat">
            <div className="hero-stat-num">99%</div>
            <div className="hero-stat-lbl">Accuracy Rate</div>
          </div>
          <div className="hero-stat-divider"></div>
          <div className="hero-stat">
            <div className="hero-stat-num">24h</div>
            <div className="hero-stat-lbl">Avg. Review Time</div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="about-section">
        <div className="section-inner">
          <div className="section-label">How It Works</div>
          <h2 className="section-title">Simple 3-Step Process</h2>
          <p className="section-subtitle">From submission to approval in no time</p>
          <div className="steps-grid">
            <div className="step-card">
              <div className="step-circle">01</div>
              <div className="step-icon">📝</div>
              <h3>Submit Request</h3>
              <p>Fill in your license details and upload your verification documents securely.</p>
            </div>
            <div className="step-arrow">→</div>
            <div className="step-card">
              <div className="step-circle">02</div>
              <div className="step-icon">🔍</div>
              <h3>Admin Review</h3>
              <p>Our admin team carefully reviews and verifies the authenticity of your documents.</p>
            </div>
            <div className="step-arrow">→</div>
            <div className="step-card">
              <div className="step-circle">03</div>
              <div className="step-icon">✅</div>
              <h3>Get Approved</h3>
              <p>Receive instant notification once your license is verified and approved.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="about-section features-bg">
        <div className="section-inner">
          <div className="section-label">Features</div>
          <h2 className="section-title">Everything You Need</h2>
          <p className="section-subtitle">Built for doctors, hospitals, and administrators</p>
          <div className="features-grid">
            {[
              { icon: "🔐", title: "Secure & Private", desc: "All documents are encrypted and stored securely. Your privacy is our top priority.", color: "#3b82f6" },
              { icon: "⚡", title: "Fast Processing", desc: "Most requests are reviewed within 24 hours with real-time status updates.", color: "#10b981" },
              { icon: "📊", title: "Live Dashboard", desc: "Track all your submissions in one place with detailed status and history.", color: "#8b5cf6" },
              { icon: "🏥", title: "Admin Control", desc: "Powerful admin panel to approve, reject, or manage all incoming requests.", color: "#f97316" },
              { icon: "📎", title: "Document Upload", desc: "Attach supporting documents directly to your verification request.", color: "#ec4899" },
              { icon: "🔔", title: "Status Tracking", desc: "Always know where your request stands — pending, approved, or rejected.", color: "#06b6d4" },
            ].map((f, i) => (
              <div className="feature-card" key={i} style={{ borderTopColor: f.color }}>
                <div className="feature-icon">{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="about-cta-banner">
        <div className="cta-inner">
          <h2>Ready to get verified?</h2>
          <p>Join hundreds of medical professionals using MediClear today.</p>
          <div className="cta-banner-btns">
            <Link to="/register" className="cta-primary">Create Free Account</Link>
            <Link to="/login" className="cta-ghost">Login →</Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="about-footer">
        <div className="footer-logo">🏥 MediClear</div>
        <p>© 2026 MediClear. All rights reserved.</p>
      </footer>

    </div>
  );
}

export default About;