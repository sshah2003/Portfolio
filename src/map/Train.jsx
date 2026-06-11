import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import './Train.css';

// Symmetric railcar (front/back identical) so the 180° heading flip at the
// turnaround is invisible. Positioned by x/y motion values; rotation is
// written to the SVG transform attribute, which pivots on the local origin
// (the car's center) — CSS transform-origin on SVG is unreliable here.
export function Train({ x, y, angle, isMoving, reducedMotion }) {
  const rotateRef = useRef(null);

  useEffect(() => {
    const apply = (a) => rotateRef.current?.setAttribute('transform', `rotate(${a})`);
    apply(angle.get());
    return angle.on('change', apply);
  }, [angle]);

  return (
    <motion.g style={{ x, y }} initial={reducedMotion ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6, duration: 0.6 }}>
      <g ref={rotateRef}>
        <g className={`train ${isMoving ? 'is-moving' : ''}`}>
          <rect className="train-glow" x={-30} y={-14} width={60} height={28} rx={9} />
          <rect className="train-body" x={-26} y={-11} width={52} height={22} rx={7} />
          <rect className="train-stripe" x={-26} y={-3.5} width={52} height={7} />
          {/* windows */}
          <rect className="train-window" x={-18} y={-8} width={7} height={4} rx={1.5} />
          <rect className="train-window" x={-8} y={-8} width={7} height={4} rx={1.5} />
          <rect className="train-window" x={2} y={-8} width={7} height={4} rx={1.5} />
          <rect className="train-window" x={11} y={-8} width={7} height={4} rx={1.5} />
          {/* end marker lights, both ends — keeps the car symmetric */}
          <circle className="train-light" cx={-22} cy={7} r={1.8} />
          <circle className="train-light" cx={22} cy={7} r={1.8} />
        </g>
      </g>
    </motion.g>
  );
}
