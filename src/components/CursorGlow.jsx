import { useEffect, useRef } from "react";

/**
 * A soft radial glow that follows the mouse cursor.
 * Renders a fixed div with pointer-events: none so it never interferes.
 * Uses requestAnimationFrame for buttery smooth tracking.
 */
export default function CursorGlow() {
  const glowRef = useRef(null);
  const pos = useRef({ x: -200, y: -200 });
  const target = useRef({ x: -200, y: -200 });
  const raf = useRef(null);

  useEffect(() => {
    // Skip on touch-only devices
    const mq = window.matchMedia("(pointer: fine)");
    if (!mq.matches) return;

    const glow = glowRef.current;
    if (!glow) return;

    const onMove = (e) => {
      target.current = { x: e.clientX, y: e.clientY };
    };

    const onLeave = () => {
      target.current = { x: -200, y: -200 };
    };

    // Lerp loop for smooth trailing
    const loop = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.15;
      pos.current.y += (target.current.y - pos.current.y) * 0.15;
      glow.style.transform = `translate(${pos.current.x - 200}px, ${pos.current.y - 200}px)`;
      raf.current = requestAnimationFrame(loop);
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    raf.current = requestAnimationFrame(loop);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      className="pointer-events-none fixed top-0 left-0 z-[9999] w-[400px] h-[400px] rounded-full opacity-20 mix-blend-screen"
      style={{
        background: "radial-gradient(circle, rgba(249,115,22,0.5) 0%, rgba(249,115,22,0) 70%)",
        willChange: "transform",
      }}
    />
  );
}
