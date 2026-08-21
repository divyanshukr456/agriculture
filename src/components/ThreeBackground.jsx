import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars, Sparkles } from '@react-three/drei';
import { ErrorBoundary } from './ErrorBoundary';

function FloatingCrops() {
  const group = useRef();
  
  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = state.clock.elapsedTime * 0.04;
      group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.03) * 0.05;
    }
  });

  return (
    <group ref={group}>
      {[...Array(24)].map((_, i) => {
        const x = (Math.random() - 0.5) * 26;
        const y = (Math.random() - 0.5) * 20;
        const z = (Math.random() - 0.5) * 12 - 4;
        const scale = 0.4 + Math.random() * 0.6;
        
        return (
          <Float
            key={i}
            speed={1.2 + Math.random()}
            rotationIntensity={1.5}
            floatIntensity={2}
            position={[x, y, z]}
          >
            <mesh rotation={[Math.random() * Math.PI, Math.random() * Math.PI, 0]} scale={scale}>
              <octahedronGeometry args={[0.3, 0]} />
              <meshStandardMaterial 
                color={i % 2 === 0 ? "#2ecc71" : "#10b981"} 
                emissive="#064e3b"
                roughness={0.3}
                metalness={0.2}
                opacity={0.65} 
                transparent 
              />
            </mesh>
          </Float>
        );
      })}

      {[...Array(12)].map((_, i) => {
        const x = (Math.random() - 0.5) * 22;
        const y = (Math.random() - 0.5) * 16;
        const z = (Math.random() - 0.5) * 10 - 2;
        
        return (
          <Float key={`spike-${i}`} speed={1.8} rotationIntensity={2} position={[x, y, z]}>
            <mesh rotation={[0, 0, Math.PI / 4]}>
              <cylinderGeometry args={[0.02, 0.08, 1.2, 5]} />
              <meshStandardMaterial color="#f1c40f" opacity={0.5} transparent />
            </mesh>
          </Float>
        );
      })}
    </group>
  );
}

function FallbackCSSBackground() {
  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'radial-gradient(circle at 50% 20%, #0d2818 0%, #050b06 75%)',
      zIndex: 0,
      pointerEvents: 'none',
      overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute',
        width: '600px',
        height: '600px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(16,185,129,0.15) 0%, transparent 70%)',
        top: '-100px',
        left: '20%',
        filter: 'blur(60px)',
      }} />
    </div>
  );
}

export default function ThreeBackground() {
  const [webglSupported, setWebglSupported] = useState(true);

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) setWebglSupported(false);
    } catch (e) {
      setWebglSupported(false);
    }
  }, []);

  if (!webglSupported) {
    return <FallbackCSSBackground />;
  }

  return (
    <div className="canvas-container">
      <ErrorBoundary fallback={<FallbackCSSBackground />}>
        <Canvas camera={{ position: [0, 0, 9], fov: 55 }} gl={{ antialias: true, alpha: true }}>
          <color attach="background" args={['#050c07']} />
          <fog attach="fog" args={['#050c07', 8, 25]} />
          
          <ambientLight intensity={0.6} />
          <pointLight position={[10, 15, 10]} intensity={1.5} color="#34d399" />
          <pointLight position={[-10, -10, -5]} intensity={0.8} color="#f59e0b" />
          
          <Stars radius={60} depth={40} count={1800} factor={4} saturation={0} fade speed={1.2} />
          <Sparkles count={80} scale={18} size={2.5} speed={0.4} opacity={0.6} color="#a8e6cf" />
          
          <FloatingCrops />
        </Canvas>
      </ErrorBoundary>
    </div>
  );
}
