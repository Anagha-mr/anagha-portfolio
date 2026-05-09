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

    // Colour palette: deep purple → hot pink → dark maroon variants
    const palette = [
      { r: 114, g: 12,  b: 107 }, // #720C6B
      { r: 224, g: 26,  b: 158 }, // #E01A9E
      { r: 160, g: 16,  b: 128 }, // #A01080
      { r: 58,  g: 12,  b: 12  }, // #3A0C0C
      { r: 200, g: 20,  b: 143 }, // #C8148F
      { r: 90,  g: 8,   b: 85  }, // mid purple
    ];

    const orbs: Orb[] = [];
    for (let i = 0; i < 14; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const col = palette[i % palette.length];
      orbs.push({
        x, y, baseX: x, baseY: y,
        radius: Math.random() * 120 + 50,
        opacity: Math.random() * 0.12 + 0.04,
        r: col.r, g: col.g, b: col.b,
        speed: Math.random() * 0.25 + 0.08,
        angle: Math.random() * Math.PI * 2,
        drift: Math.random() * 80 + 40,
      });
    }

    let raf: number;

    const drawGrid = () => {
      const spacing = 48;
      const dotR = 0.8;
      ctx.fillStyle = 'rgba(114, 12, 107, 0.18)';
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
      ctx.fillStyle = '#111111';
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
      style={{ background: '#111111' }}
    />
  );
}
