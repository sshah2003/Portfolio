import { motion } from 'framer-motion';
import { buildRoutePath } from './geometry.js';

export function LinePath({ line, index, reducedMotion }) {
  const d = buildRoutePath(line.waypoints);
  return (
    <motion.path
      d={d}
      fill="none"
      stroke={line.hex}
      strokeWidth={14}
      strokeLinecap="round"
      strokeLinejoin="round"
      initial={reducedMotion ? false : { pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 1.4, delay: 0.25 + index * 0.22, ease: [0.6, 0, 0.2, 1] }}
    />
  );
}
