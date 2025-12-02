import { useEffect, useRef } from 'react';

export default function HashRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Customized: Use Bitcoin-related hex (e.g., genesis block hash snippets)
    const hashes = '000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f'.split('').concat('0123456789ABCDEF'.split(''));
    const fontSize = 16;
    const columns = canvas.width / fontSize;
    const drops: number[] = Array(Math.floor(columns)).fill(1);

    function draw() {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'; // Fade trail
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#F7931A'; // Bitcoin orange
      ctx.font = `${fontSize}px monospace`; // Techy font

      drops.forEach((y, i) => {
        const text = hashes[Math.floor(Math.random() * hashes.length)];
        ctx.fillText(text, i * fontSize, y * fontSize);
        if (y * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i] += 0.5; // Slower speed for faint, matrix-like rain
      });
    }

    const interval = setInterval(draw, 50); // Slower interval for subtlety
    return () => clearInterval(interval);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className='absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none' // Lower opacity for faintness
    />
  );
}