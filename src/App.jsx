import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';
import { motion } from 'framer-motion';
import { Cloud, Shield, Database, Cpu, ArrowRight, ChevronRight, Globe2, Building2 } from 'lucide-react';
import './index.css';

// 3D Tech Globe Background for Hero
function TechGlobe(props) {
  const ref = useRef();
  
  const sphere = useMemo(() => {
    // Generate points on a sphere for a data-globe look
    return random.inSphere(new Float32Array(4000 * 3), { radius: 2 });
  }, []);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta * 0.05;
      ref.current.rotation.y -= delta * 0.1;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 6]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
        <PointMaterial
          transparent
          color="#0f172a" // Slate 900
          size={0.015}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.4}
        />
      </Points>
    </group>
  );
}

function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-left">
          <div className="nav-logo">
            <img src="/company_template1/logo.png" alt="HMSOFT" onError={(e) => e.target.style.display='none'} />
            <span>HMSOFT</span>
          </div>
          <div className="nav-links">
            <a href="#home">Platform</a>
            <a href="#solutions">Solutions</a>
            <a href="#company">Company</a>
            <a href="#pricing">Pricing</a>
          </div>
        </div>
        <div className="nav-actions">
          <button className="btn-secondary">Log In</button>
          <button className="btn-primary">Contact Sales</button>
        </div>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-grid">
        <motion.div 
          className="hero-content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="badge">
            HMSOFT Enterprise Infrastructure <ArrowRight size={14} />
          </div>
          <h1 className="hero-title">
            Build and scale your<br />
            <span>digital infrastructure.</span>
          </h1>
          <p className="hero-description">
            HMSOFT provides the enterprise-grade platform, APIs, and data solutions you need to operate at global scale with maximum reliability and security.
          </p>
          <div className="hero-buttons">
            <button className="btn-primary lg">Start Building <ChevronRight size={18} /></button>
            <button className="btn-secondary lg">Talk to an Expert</button>
          </div>
        </motion.div>
        
        <motion.div 
          className="hero-3d-container"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.3 }}
        >
          <Canvas camera={{ position: [0, 0, 4.5] }}>
            <ambientLight intensity={1} />
            <TechGlobe />
          </Canvas>
        </motion.div>
      </div>
    </section>
  );
}

function Services() {
  const services = [
    {
      icon: <Cloud size={24} strokeWidth={1.5} />,
      title: "Cloud Architecture",
      desc: "Deploy applications globally with our highly available edge network and dynamic scaling capabilities."
    },
    {
      icon: <Shield size={24} strokeWidth={1.5} />,
      title: "Enterprise Security",
      desc: "Bank-grade encryption, automated compliance, and real-time threat detection built into every layer."
    },
    {
      icon: <Database size={24} strokeWidth={1.5} />,
      title: "Data Intelligence",
      desc: "Process millions of events per second with our real-time analytics and data warehousing solutions."
    },
    {
      icon: <Cpu size={24} strokeWidth={1.5} />,
      title: "AI Integration",
      desc: "Embed advanced machine learning models directly into your workflows via our specialized APIs."
    }
  ];

  return (
    <section className="services" id="solutions">
      <div className="section-header">
        <h2>A complete platform for modern teams</h2>
        <p>Everything you need to build, deploy, and manage complex applications at scale, without the operational overhead.</p>
      </div>
      
      <div className="services-grid">
        {services.map((service, index) => (
          <motion.div 
            key={index}
            className="service-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="service-icon">{service.icon}</div>
            <h3>{service.title}</h3>
            <p>{service.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Stats() {
  return (
    <section className="stats" id="company">
      <div className="stats-grid">
        <div className="stat-item">
          <h3>99.99%</h3>
          <p>Guaranteed Uptime</p>
        </div>
        <div className="stat-item">
          <h3>500+</h3>
          <p>Enterprise Clients</p>
        </div>
        <div className="stat-item">
          <h3>50ms</h3>
          <p>Global Latency</p>
        </div>
        <div className="stat-item">
          <h3>$0</h3>
          <p>Hidden Fees</p>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div>
          <div className="footer-logo">HMSOFT</div>
          <p>© 2026 HMSOFT Enterprise Inc. All rights reserved.</p>
        </div>
        <div className="footer-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Security</a>
          <a href="#">System Status</a>
        </div>
      </div>
    </footer>
  );
}

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Stats />
      </main>
      <Footer />
    </>
  );
}

export default App;
