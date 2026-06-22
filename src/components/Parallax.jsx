import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';

// Translates its children vertically as the element scrolls through the
// viewport. `speed` > 0 drifts slower than scroll (background), giving depth.
// No-op under reduced motion. Pointer-events pass through so it can sit behind
// content as a decorative layer.
export function Parallax({ children, speed = 0.3, className = '', style }) {
  const reduced = useReducedMotion();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [`${speed * -120}px`, `${speed * 120}px`]);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ ...style, y: reduced ? 0 : y }}
    >
      {children}
    </motion.div>
  );
}
