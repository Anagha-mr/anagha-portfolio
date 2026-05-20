import { useEffect, useRef } from 'react';

interface Orb {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  radius: number;
  opacity: number;
  r: number; g: number; b: number;
  speed: number;
  angle: number;
  drift: number;
}

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Colour palette: moon palette — deep violet → periwinkle → mauve
    const palette = [
      { r: 123, g: 51,  b: 126 }, // #7B337E  primary accent
      { r: 102, g: 103, b: 171 }, // #6667AB  secondary accent
      { r: 66,  g: 13,  b: 75  }, // #420D4B  deep mauve
      { r: 155, g: 110, b: 171 }, // #9B6EAB  mid lavender
      { r: 88,  g: 40,  b: 100 }, // mid violet
      { r: 80,  g: 80,  b: 150 }, // blue-violet
    ];

    const orbs: Orb[] = [];
    for (let i = 0; i < 10; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const col = palette[i % palette.length];
      orbs.push({
        x, y, baseX: x, baseY: y,
        radius: Math.random() * 200 + 80,
        opacity: Math.random() * 0.07 + 0.03,
        r: col.r, g: col.g, b: col.b,
        speed: Math.random() * 0.18 + 0.05,
        angle: Math.random() * Math.PI * 2,
        drift: Math.random() * 70 + 30,
      });
    }

    let raf: number;

    const drawGrid = () => {
      const spacing = 72;
      const dotR = 0.65;
      ctx.fillStyle = 'rgba(102, 103, 171, 0.07)';
      for (let x = 0; x < canvas.width; x += spacing) {
        for (let y = 0; y < canvas.height; y += spacing) {
          ctx.beginPath();
          ctx.arc(x, y, dotR, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#210635';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      drawGrid();

      orbs.forEach(orb => {
        orb.angle += orb.speed * 0.001;
        orb.x = orb.baseX + Math.cos(orb.angle) * orb.drift;
        orb.y = orb.baseY + Math.sin(orb.angle * 0.7) * orb.drift * 0.6;

        const grad = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.radius);
        grad.addColorStop(0, `rgba(${orb.r}, ${orb.g}, ${orb.b}, ${orb.opacity})`);
        grad.addColorStop(0.5, `rgba(${orb.r}, ${orb.g}, ${orb.b}, ${orb.opacity * 0.4})`);
        grad.addColorStop(1, `rgba(${orb.r}, ${orb.g}, ${orb.b}, 0)`);

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, orb.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      raf = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: '#210635' }}
    />
  );
}
