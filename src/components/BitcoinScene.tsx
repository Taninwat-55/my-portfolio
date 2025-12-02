// import { Suspense, useEffect, useLayoutEffect, useRef } from 'react';
// import { Canvas, useFrame } from '@react-three/fiber';
// import { useGLTF, Environment } from '@react-three/drei';
// import * as THREE from 'three';
// import gsap from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

// gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// // This component loads and animates the 3D model
// function Model({ exploded, isScanning }: { exploded: boolean; isScanning: boolean }) { // Added isScanning
//   const { scene } = useGLTF('low_poly_bitcoin.glb');
//   const scanRef = useRef<THREE.Mesh>(null!); // New: For scanning overlay

//   useEffect(() => {
//     const coinMaterial = new THREE.MeshStandardMaterial({
//       color: '#F7931A',
//       metalness: 0.8,
//       roughness: 0.3,
//     });

//     const symbolMaterial = new THREE.MeshStandardMaterial({
//       color: '#FFFFFF',
//       metalness: 0.2,
//       roughness: 0.2,
//     });

//     scene.traverse((child) => {
//       if (child instanceof THREE.Mesh) {
//         if (child.name === 'BitCoin_LowPoly_FFC107_0') {
//           child.material = coinMaterial;
//         } else if (child.name === 'BitCoin_LowPoly_FFFFFF_0') {
//           child.material = symbolMaterial;
//         }
//       }
//     });

//     // New: Add scanning grid mesh (QR-like)
//     const scanGeometry = new THREE.PlaneGeometry(1, 1);
//     const scanMaterial = new THREE.MeshBasicMaterial({
//       color: '#F7931A',
//       transparent: true,
//       opacity: 0,
//       wireframe: true,
//     });
//     const scanMesh = new THREE.Mesh(scanGeometry, scanMaterial);
//     scanMesh.position.z = 0.1; // Slightly in front
//     scanMesh.scale.set(1.5, 1.5, 1.5);
//     scene.add(scanMesh);
//     scanRef.current = scanMesh;
//   }, [scene]);

//   useFrame((state) => {
//     const elapsedTime = state.clock.getElapsedTime();
//     const constantRotationY = elapsedTime * 0.2;

//     const mouseInfluenceX = state.pointer.y * -0.25;
//     const mouseInfluenceY = state.pointer.x * 0.5;

//     scene.rotation.x = THREE.MathUtils.lerp(scene.rotation.x, mouseInfluenceX, 0.05);
//     scene.rotation.y = THREE.MathUtils.lerp(scene.rotation.y, constantRotationY + mouseInfluenceY, 0.05);

//     const pulse = 0.02 + Math.sin(elapsedTime * 2) * 0.001;
//     scene.scale.set(pulse, pulse, pulse);

//     // New: Scanning animation
//     if (isScanning && scanRef.current) {
//       scanRef.current.material.opacity = THREE.MathUtils.lerp(scanRef.current.material.opacity, 0.5, 0.1);
//       scanRef.current.rotation.z += 0.01; // Sweep rotation
//       // Add sweeping line: Could extend with a child line mesh if needed
//     } else if (scanRef.current) {
//       scanRef.current.material.opacity = THREE.MathUtils.lerp(scanRef.current.material.opacity, 0, 0.1);
//     }
//   });

//   return !exploded ? <primitive object={scene} scale={0.02} /> : null;
// }

// // Particle system for explosion (enhanced for coin-like particles)
// function ExplosionParticles() {
//   const pointsRef = useRef<THREE.Points<THREE.BufferGeometry, THREE.PointsMaterial>>(null!);
//   const particleCount = 1000;
//   const positions = new Float32Array(particleCount * 3);
//   const velocities = new Float32Array(particleCount * 3);
//   const rotations = new Float32Array(particleCount); // New: For coin spin

//   for (let i = 0; i < particleCount; i++) {
//     positions[i * 3] = (Math.random() - 0.5) * 0.5;
//     positions[i * 3 + 1] = (Math.random() - 0.5) * 0.5;
//     positions[i * 3 + 2] = (Math.random() - 0.5) * 0.5;
//     velocities[i * 3] = (Math.random() - 0.5) * 0.05;
//     velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.05;
//     velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.05;
//     rotations[i] = Math.random() * 0.1; // Random spin speed
//   }

//   useFrame(() => {
//     if (pointsRef.current) {
//       const positions = pointsRef.current.geometry.attributes.position.array;
//       for (let i = 0; i < particleCount; i++) {
//         positions[i * 3] += velocities[i * 3];
//         positions[i * 3 + 1] += velocities[i * 3 + 1];
//         positions[i * 3 + 2] += velocities[i * 3 + 2];
//         // New: Simulate coin rotation (simple z-spin)
//         pointsRef.current.rotation.z += rotations[i];
//       }
//       pointsRef.current.material.opacity *= 0.99;
//     }
//     pointsRef.current.geometry.attributes.position.needsUpdate = true;
//   });

//   return (
//     <points ref={pointsRef}>
//       <bufferGeometry>
//         <bufferAttribute attach="attributes-position" args={[positions, 3]} />
//       </bufferGeometry>
//       <pointsMaterial color='#F7931A' size={0.02} transparent opacity={1} /> {/* Size for coin feel */}
//     </points>
//   );
// }

// export default function BitcoinScene({
//   eventTarget,
//   exploded,
//   isScanning,
// }: {
//   // FIX: Allow HTMLDivElement and null
//   eventTarget: React.RefObject<HTMLElement | null>; 
//   exploded?: boolean;
//   isScanning: boolean;
// }) {
//   const sceneRef = useRef<THREE.Group>(null!);

//   useLayoutEffect(() => {
//     // FIX: Add safety check for current being null
//     if (!eventTarget.current) return; 

//     const tl = gsap.timeline({
//       scrollTrigger: {
//         trigger: eventTarget.current,
//         start: 'top top',
//         end: '+=1500',
//         scrub: 1,
//       },
//     });

//     tl.to(sceneRef.current.scale, { x: 0.01, y: 0.01, z: 0.01 });
//     tl.to(sceneRef.current.position, { x: 1.5, y: 1.2 }, '<');
//   }, [eventTarget]);

//   return (
//     <div className='fixed top-0 left-0 w-full h-full -z-10'>
//       <Canvas eventSource={eventTarget} camera={{ position: [0, 0, 5], fov: 75 }}>
//         <ambientLight intensity={1} />
//         <directionalLight position={[10, 10, 5]} intensity={2.5} />
//         <pointLight position={[-10, -5, -10]} intensity={1.2} color='#F7931A' />

//         <Suspense fallback={null}>
//           <group ref={sceneRef}>
//             <Model exploded={exploded || false} isScanning={isScanning} />
//             {exploded && <ExplosionParticles />}
//           </group>
//           <Environment preset='sunset' />
//         </Suspense>
//       </Canvas>
//     </div>
//   );
// }