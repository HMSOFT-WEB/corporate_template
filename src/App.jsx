import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';
import { motion } from 'framer-motion';
import { ArrowRight, MessageSquare, Building2, ShieldCheck, Globe2, BarChart3, Users2 } from 'lucide-react';
import './index.css';

// Calm, human-centric 3D particle wave (Corporate Blue on Cloud Dancer BG)
function CorporateParticleWave() {
  const ref = useRef();
  
  const count = 6000;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 25;     
      pos[i * 3 + 1] = 0;                          
      pos[i * 3 + 2] = (Math.random() - 0.5) * 25; 
    }
    return pos;
  }, [count]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const positionsArray = ref.current.geometry.attributes.position.array;

    for (let i = 0; i < count; i++) {
      const x = positionsArray[i * 3];
      const z = positionsArray[i * 3 + 2];
      
      // Gentle sine wave motion
      const y = Math.sin(x * 0.4 + time * 0.3) * 0.6 + Math.cos(z * 0.4 + time * 0.2) * 0.6;
      positionsArray[i * 3 + 1] = y - 3; 
    }
    
    ref.current.geometry.attributes.position.needsUpdate = true;
    ref.current.rotation.y = time * 0.015; 
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#0f2c59" // Deep Corporate Blue particles
        size={0.035}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.15} // Very subtle
      />
    </Points>
  );
}

function Header() {
  return (
    <header className="header">
      <div className="container header-inner container">
        <div className="logo">HMSOFT GROUP</div>
        <nav className="nav-links">
          <a href="#about">Our Story</a>
          <a href="#businesses">Capabilities</a>
          <a href="#news">Newsroom</a>
          <a href="#careers">Careers</a>
        </nav>
        <a href="#contact" className="btn-primary" style={{ padding: '0.6rem 1.2rem', fontSize: '0.9rem' }}>Partner With Us</a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero">
      <div className="hero-3d-bg">
        <Canvas camera={{ position: [0, 2, 10], fov: 50 }}>
          <ambientLight intensity={1} />
          <CorporateParticleWave />
        </Canvas>
      </div>
      <div className="container hero-content">
        <motion.h1 
          className="hero-headline"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Architecting global ecosystems for a connected tomorrow.
        </motion.h1>
        <motion.p 
          className="hero-subheadline"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          As a premier global enterprise, HMSOFT delivers comprehensive structural, digital, and strategic capabilities to the world's most complex organizations.
        </motion.p>
        <motion.div 
          className="hero-actions"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <a href="#businesses" className="btn-primary">Explore Our Capabilities</a>
          <a href="#about" className="btn-secondary">Discover Our Story</a>
        </motion.div>
      </div>
    </section>
  );
}

function TrustSignals() {
  return (
    <section className="partners">
      <div className="container">
        <div className="partners-text">Trusted by industry leaders worldwide</div>
        <div className="partners-logo-track">
          <span>SAMSUNG</span>
          <span>HYUNDAI</span>
          <span>LG ELECTRONICS</span>
          <span>SK TELECOM</span>
          <span>POSCO</span>
        </div>
      </div>
    </section>
  );
}

function AboutNarrative() {
  return (
    <section className="section-padding about" id="about">
      <div className="container about-grid">
        <div className="about-image-placeholder">
          <Globe2 size={120} opacity={0.5} />
        </div>
        <div className="about-content">
          <h2>Our Heritage & Vision</h2>
          <h3>Rooted in integrity. Driven by human-centric innovation.</h3>
          <p>
            For over two decades, HMSOFT has stood as a pillar of reliability in the global market. We believe that true corporate value is created not just through technological advancement, but through deep, enduring partnerships and a steadfast commitment to societal progress.
          </p>
          <p>
            Our multidisciplinary teams across 40 nations work cohesively to solve intricate challenges—from supply chain logistics to next-generation infrastructure—ensuring sustainable growth for our clients and communities.
          </p>
          <a href="#about" className="btn-secondary" style={{ marginTop: '1rem' }}>Read Our Full Story <ArrowRight size={16} /></a>
        </div>
      </div>
    </section>
  );
}

function BentoBusinessAreas() {
  return (
    <section className="section-padding bento-section" id="businesses">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Core Capabilities</h2>
          <p className="section-desc">A synergistic portfolio designed to manage complexity and drive enterprise-scale transformation.</p>
        </div>
        
        <div className="bento-grid">
          {/* Large Hero Card */}
          <div className="bento-card bento-large dark">
            <div className="bento-icon"><Building2 size={32} /></div>
            <div>
              <h3>Enterprise Infrastructure & Construction</h3>
              <p>We build the physical and digital backbones of modern cities. From hyper-scale data centers to smart logistics hubs, our engineering division delivers projects with uncompromising safety and precision.</p>
            </div>
          </div>

          {/* Side Cards */}
          <div className="bento-card bento-side">
            <div className="bento-icon"><Globe2 size={28} /></div>
            <div>
              <h3>Global Supply Chain</h3>
              <p>End-to-end logistics and procurement networks spanning five continents.</p>
            </div>
          </div>

          <div className="bento-card bento-side">
            <div className="bento-icon"><BarChart3 size={28} /></div>
            <div>
              <h3>Strategic Consulting</h3>
              <p>C-suite advisory for corporate restructuring and digital transformation.</p>
            </div>
          </div>

          {/* Bottom Thirds */}
          <div className="bento-card bento-third">
            <div className="bento-icon"><ShieldCheck size={28} /></div>
            <div>
              <h3>Security & Compliance</h3>
              <p>Rigorous regulatory adherence frameworks.</p>
            </div>
          </div>
          
          <div className="bento-card bento-third">
            <div className="bento-icon"><Users2 size={28} /></div>
            <div>
              <h3>Human Capital Solutions</h3>
              <p>Enterprise workforce management and training.</p>
            </div>
          </div>

          <div className="bento-card bento-third">
            <div className="bento-icon"><MessageSquare size={28} /></div>
            <div>
              <h3>ESG Initiatives</h3>
              <p>Commitment to carbon neutrality and ethical governance.</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

function Chatbot() {
  return (
    <div className="chatbot-widget" title="HMSOFT Assistant">
      <MessageSquare size={28} />
    </div>
  );
}

function CorporateFooter() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col" style={{ gridColumn: 'span 2' }}>
            <div className="logo" style={{ color: 'white', marginBottom: '1.5rem' }}>HMSOFT GROUP</div>
            <p style={{ maxWidth: '300px' }}>Global Headquarters<br/>123 Enterprise Blvd, Executive Tower<br/>Seoul, Republic of Korea 06123</p>
            <p style={{ marginTop: '1rem' }}>Tel: +82-2-1234-5678<br/>Email: contact@hmsoft.com</p>
          </div>
          <div className="footer-col">
            <h4>About</h4>
            <ul>
              <li><a href="#">Corporate Profile</a></li>
              <li><a href="#">Leadership Team</a></li>
              <li><a href="#">Global Network</a></li>
              <li><a href="#">Investor Relations</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Capabilities</h4>
            <ul>
              <li><a href="#">Infrastructure</a></li>
              <li><a href="#">Supply Chain</a></li>
              <li><a href="#">Consulting</a></li>
              <li><a href="#">ESG</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Resources</h4>
            <ul>
              <li><a href="#">Press Center</a></li>
              <li><a href="#">Ethics Hotline</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Contact Us</a></li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>© 2026 HMSOFT Enterprise Group. All rights reserved.</p>
          <div className="legal-links">
            <a href="#" style={{ color: 'white', textDecoration: 'none' }}>Privacy Policy</a>
            <a href="#" style={{ color: 'white', textDecoration: 'none' }}>Terms of Use</a>
            <a href="#" style={{ color: 'white', textDecoration: 'none' }}>Cookie Policy</a>
          </div>
        </div>
        
        <p className="disclaimer">
          HMSOFT Group and its subsidiaries operate independently and are separate legal entities. The information provided on this website is for general informational purposes only and does not constitute professional advice. Forward-looking statements are subject to risks and uncertainties.
        </p>
      </div>
    </footer>
  );
}

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <TrustSignals />
        <AboutNarrative />
        <BentoBusinessAreas />
      </main>
      <CorporateFooter />
      <Chatbot />
    </>
  );
}

export default App;
