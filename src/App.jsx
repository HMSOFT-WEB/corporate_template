import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, ScrollControls, Scroll, useScroll, Float, ContactShadows, PresentationControls } from '@react-three/drei';
import { motion } from 'framer-motion';
import './index.css';

// Professional Abstract Geometry representing Enterprise
function AbstractCorporateShape() {
  const groupRef = useRef();
  const innerMesh = useRef();
  const outerMesh = useRef();
  
  const scroll = useScroll();

  useFrame((state, delta) => {
    const offset = scroll.offset;

    if (innerMesh.current && outerMesh.current) {
      innerMesh.current.rotation.x += delta * 0.1;
      innerMesh.current.rotation.y += delta * 0.2;
      
      outerMesh.current.rotation.x -= delta * 0.15;
      outerMesh.current.rotation.y -= delta * 0.1;
    }

    if (groupRef.current) {
      // Morph position and rotation based on scroll to accompany sections
      groupRef.current.position.y = -offset * 12;
      groupRef.current.rotation.y = offset * Math.PI * 2;
      
      // Scale down slightly as we scroll
      const scale = 1 - offset * 0.3;
      groupRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <group ref={groupRef} position={[2, 0, 0]}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <mesh ref={outerMesh}>
          <octahedronGeometry args={[2, 0]} />
          <meshPhysicalMaterial 
            color="#ffffff" 
            metalness={0.9} 
            roughness={0.1} 
            transparent 
            opacity={0.3} 
            wireframe 
          />
        </mesh>
        <mesh ref={innerMesh}>
          <icosahedronGeometry args={[1.2, 0]} />
          <meshPhysicalMaterial 
            color="#2563eb" // Trustworthy Corporate Blue
            metalness={0.8} 
            roughness={0.2} 
            transmission={0.5}
            thickness={0.5}
          />
        </mesh>
      </Float>
    </group>
  );
}

// Background environment with soft lights
function CorporateScene() {
  return (
    <>
      {/* Fixed Navigation Bar with Auto-Generated Logo */}
      <nav style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        padding: '1.5rem 3rem',
        background: 'rgba(250, 250, 250, 0.8)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(0,0,0,0.05)'
      }}>
        <img src="/company_template1/logo.png" alt="HMSOFT Logo" style={{ height: '40px' }} />
      </nav>

      <div className="canvas-container">
        <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
          <color attach="background" args={['#fafafa']} />
          <ambientLight intensity={0.6} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
          <Environment preset="city" />
          
          <PresentationControls global config={{ mass: 2, tension: 500 }} snap={{ mass: 4, tension: 1500 }} rotation={[0, 0.3, 0]} polar={[-Math.PI / 3, Math.PI / 3]} azimuth={[-Math.PI / 1.4, Math.PI / 2]}>
            <ScrollControls pages={3} damping={0.2}>
              
              <AbstractCorporateShape />
              
              <ContactShadows position={[0, -2.5, 0]} opacity={0.4} scale={10} blur={2} far={4} />

              <Scroll html style={{ width: '100%' }}>
                <div className="sections-container" style={{ paddingTop: '80px' }}>
                  
                  {/* Section 1: Hero */}
                  <section className="section">
                    <div className="section-content">
                      <motion.div 
                        className="glass-card"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                        viewport={{ once: false }}
                      >
                        <h1 className="title-corporate">Elevating<br/>Enterprise Solutions</h1>
                        <p className="subtitle-corporate">
                          We deliver sophisticated, high-performance digital infrastructure designed for scale, security, and global impact.
                        </p>
                        <button className="cta-button-corporate">Explore Services</button>
                      </motion.div>
                    </div>
                  </section>

                  {/* Section 2: About Us */}
                  <section className="section">
                    <div className="section-content right-align">
                      <motion.div 
                        className="glass-card right"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: false, amount: 0.5 }}
                      >
                        <h2 className="title-secondary-corporate">Innovation Driven<br/>by Technology</h2>
                        <p className="description-corporate">
                          Our corporate heritage is built on a foundation of trust and relentless technological advancement. We partner with industry leaders to transform complex challenges into elegant solutions.
                        </p>
                      </motion.div>
                    </div>
                  </section>

                  {/* Section 3: Our Services */}
                  <section className="section">
                    <div className="section-content center-align">
                      <motion.div 
                        className="glass-card center"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: false, amount: 0.5 }}
                      >
                        <h2 className="title-secondary-corporate text-center">Scalable. Secure.<br/>Future-Ready.</h2>
                        <p className="description-corporate text-center">
                          Empowering your business with enterprise-grade platforms tailored for tomorrow's digital economy.
                        </p>
                        <button className="cta-button-corporate outline">Contact Our Team</button>
                      </motion.div>
                    </div>
                  </section>

                </div>
              </Scroll>
            </ScrollControls>
          </PresentationControls>
        </Canvas>
      </div>
    </>
  );
}

export default CorporateScene;
