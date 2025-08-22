import { useEffect, useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, Line } from '@react-three/drei';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as THREE from 'three';
import { FaArrowDown } from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger);

const ConnectingNodes = () => {
  const groupRef = useRef<THREE.Group>(null);
  const [lines, setLines] = useState<[THREE.Vector3, THREE.Vector3][]>([]);

  // Use useMemo to generate particles once
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < 200; i++) {
      const x = (Math.random() - 0.5) * 10;
      const y = (Math.random() - 0.5) * 10;
      const z = (Math.random() - 0.5) * 10;
      temp.push(new THREE.Vector3(x, y, z));
    }
    return temp;
  }, []);

  useFrame(({ mouse }: { mouse: THREE.Vector2 }) => {
    if (groupRef.current) {
      // Rotate the whole group based on mouse position
      groupRef.current.rotation.y +=
        (mouse.x * 0.2 - groupRef.current.rotation.y) * 0.1;
      groupRef.current.rotation.x +=
        (-mouse.y * 0.2 - groupRef.current.rotation.x) * 0.1;
    }

    // Move particles and draw lines between them
    const newLines: [THREE.Vector3, THREE.Vector3][] = [];
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const p1 = particles[i];
        const p2 = particles[j];
        const dist = p1.distanceTo(p2);
        if (dist < 1.5) {
          newLines.push([p1, p2]);
        }
      }
    }
    setLines(newLines);
  });

  return (
    <group ref={groupRef}>
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach='attributes-position'
            count={particles.length}
            args={[new Float32Array(particles.flatMap((p) => p.toArray())), 3]}
          />
        </bufferGeometry>
        <pointsMaterial attach='material' size={0.03} color='#00DDEB' />
      </points>
      {lines.map((line, i) => (
        <Line key={i} points={line} color='#FF007A' lineWidth={1} />
      ))}
    </group>
  );

  // const Orb = () => {
  //   const orbRef = useRef<THREE.Mesh>(null);

  //   useFrame(({ mouse }) => {
  //     if (orbRef.current) {
  //       orbRef.current.rotation.x = mouse.y * 0.5;
  //       orbRef.current.rotation.y = mouse.x * 0.5;
  //     }
  //   });

  //   useEffect(() => {
  //     if (orbRef.current) {
  //       gsap.to(orbRef.current.rotation, {
  //         y: Math.PI * 2,
  //         scrollTrigger: {
  //           trigger: '#hero',
  //           start: 'top top',
  //           end: 'bottom top',
  //           scrub: true,
  //         },
  //       });
  //     }
  //   }, []);

  // return (
  //   <Sphere ref={orbRef} args={[1, 32, 32]} scale={2}>
  //     <meshStandardMaterial color='#4CAF50' wireframe />
  //   </Sphere>
  // );
};

const Hero = () => {
  const textRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  const titles = [
    'Web Developer',
    'Frontend Developer',
    'Full-Stack Developer',
  ];
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);

  useEffect(() => {
    // GSAP animation for text fade-in on load
    const ctx = gsap.context(() => {
      if (textRef.current) {
        const children = Array.from(textRef.current.children);
        gsap.fromTo(
          children,
          { opacity: 0, scale: 0.9 },
          {
            opacity: 1,
            scale: 1,
            stagger: 0.2,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: { trigger: '#hero', start: 'top 80%' },
          }
        );
      }

      // GSAP timeline for the cycling tagline animation
      const tl = gsap.timeline({ repeat: -1, yoyo: true });
      tl.to(titleRef.current, {
        opacity: 0,
        duration: 0.5,
        delay: 1,
        onComplete: () => {
          setCurrentTitleIndex((prevIndex) => (prevIndex + 1) % titles.length);
        },
      }).to(titleRef.current, {
        opacity: 1,
        duration: 0.5,
      });

      // GSAP tween for the pulsating CTA button
      gsap.to('.cta-button', {
        scale: 1.05,
        duration: 1,
        yoyo: true,
        repeat: -1,
        ease: 'power1.inOut',
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      id='hero'
      className='min-h-screen flex items-center justify-center bg-gradient-to-br from-primary to-secondary text-dark-text'
    >
      <div className='text-center relative z-10' ref={textRef}>
        <h1 className='text-5xl md:text-7xl font-family-heading font-bold mb-4'>
          Taninwat Kaewpankan
        </h1>
        <div className='text-xl md:text-2xl font-body mb-6' ref={titleRef}>
          {titles[currentTitleIndex]}
        </div>
        <a
          href='#projects'
          className='cta-button inline-block px-6 py-3 bg-highlight text-dark-text rounded-full font-body hover:bg-secondary transition-colors'
        >
          Explore My Work
          <FaArrowDown className='ml-2 inline-block animate-bounce' />
        </a>
      </div>
      <div className='absolute inset-0 z-0'>
        {/* <Canvas>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <Orb />
          <OrbitControls enableZoom={false} />
        </Canvas> */}
        <Canvas camera={{ position: [0, 0, 5] }}>
          <ambientLight intensity={0.5} />
          <ConnectingNodes />
          <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
        </Canvas>
      </div>
    </section>
  );
};

export default Hero;
