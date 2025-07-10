// import { useRef, useEffect } from 'react';

// export default function StarfallBackground() {
//   const canvasRef = useRef();

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext('2d');
//     let width = (canvas.width = window.innerWidth);
//     let height = (canvas.height = window.innerHeight);

//     const stars = Array.from({ length: 200 }, () => ({
//       x: Math.random() * width,
//       y: Math.random() * height,
//       radius: Math.random() * 1.5,
//       speed: Math.random() * 0.5 + 0.2,
//     }));

//     const draw = () => {
//       ctx.clearRect(0, 0, width, height);
//       ctx.fillStyle = 'black';
//       ctx.fillRect(0, 0, width, height);

//       ctx.fillStyle = 'white';
//       stars.forEach((star) => {
//         ctx.beginPath();
//         ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
//         ctx.fill();

//         star.y += star.speed;
//         if (star.y > height) {
//           star.y = 0;
//           star.x = Math.random() * width;
//         }
//       });

//       requestAnimationFrame(draw);
//     };

//     draw();

//     const handleResize = () => {
//       width = canvas.width = window.innerWidth;
//       height = canvas.height = window.innerHeight;
//     };

//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   return (
//     <canvas
//       ref={canvasRef}
//       className="fixed top-0 left-0 w-full h-full -z-10"
//     />
//   );
// }
