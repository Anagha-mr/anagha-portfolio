import { useEffect, useRef } from 'react';

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Gentle floating orbs
    interface Orb {
      x: number;
      y: number;
      baseX: number;
      baseY: number;
      radius: number;
      opacity: number;
      color: string;
      speed: number;
      angle: number;
    }

    const orbs: Orb[] = [];
    const orbCount = 8;

    // Create orbs
    for (let i = 0; i < orbCount; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      orbs.push({
        x,
        y,
        baseX: x,
        baseY: y,
        radius: Math.random() * 80 + 40,
        opacity: Math.random() * 0.15 + 0.05,
        color: i % 2 === 0 ? '#720C6B' : '#E01A9E',
        speed: Math.random() * 0.3 + 0.1,
        angle: Math.random() * Math.PI * 2,
      });
    }

    let animationFrameId: number;
    let time = 0;

    const animate = () => {
      // Clear canvas
      ctx.fillStyle = '#111111';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      time += 0.001;

      // Draw and update orbs
      orbs.forEach((orb) => {
        // Gentle circular motion
        orb.angle += orb.speed * 0.001;
        orb.x = orb.baseX + Math.cos(orb.angle) * 100;
        orb.y = orb.baseY + Math.sin(orb.angle) * 100;

        // Draw soft glow
        const gradient = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.radius);
        const colorWithAlpha = orb.color === '#720C6B' 
          ? `rgba(114, 12, 107, ${orb.opacity})`
          : `rgba(224, 26, 158, ${orb.opacity})`;
        gradient.addColorStop(0, colorWithAlpha);
        gradient.addColorStop(1, orb.color === '#720C6B' 
          ? 'rgba(114, 12, 107, 0)'
          : 'rgba(224, 26, 158, 0)');

        ctx.fillStyle = gradient;
        ctx.fillRect(
          orb.x - orb.radius,
          orb.y - orb.radius,
          orb.radius * 2,
          orb.radius * 2
        );
      });

      // Draw subtle gradient overlay
      const gradientOverlay = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradientOverlay.addColorStop(0, 'rgba(114, 12, 107, 0.02)');
      gradientOverlay.addColorStop(0.5, 'rgba(17, 17, 17, 0)');
      gradientOverlay.addColorStop(1, 'rgba(58, 12, 12, 0.02)');
      ctx.fillStyle = gradientOverlay;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
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
