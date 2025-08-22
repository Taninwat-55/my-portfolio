import { useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere } from '@react-three/drei';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { FaArrowDown } from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger);

const Orb = () => {
  const orbRef = useRef<THREE.Mesh>(null);

  useFrame(({ mouse }) => {
    if (orbRef.current) {
      orbRef.current.rotation.x = mouse.y * 0.5;
      orbRef.current.rotation.y = mouse.x * 0.5;
    }
  });

  useEffect(() => {
    if (orbRef.current) {
      gsap.to(orbRef.current.rotation, {
        y: Math.PI * 2,
        scrollTrigger: {
          trigger: '#hero',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }
  }, []);

  return (
    <Sphere ref={orbRef} args={[1, 32, 32]} scale={2}>
      <meshStandardMaterial color='#4CAF50' wireframe />
    </Sphere>
  );
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
        <Canvas>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <Orb />
          <OrbitControls enableZoom={false} />
        </Canvas>
      </div>
    </section>
  );
};

export default Hero;
