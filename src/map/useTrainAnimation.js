import { useEffect, useRef } from 'react';
import { animate, useMotionValue } from 'framer-motion';

// Drives the train as an arclength motion value along the master track,
// sampling getPointAtLength each frame for position plus a lookahead point
// for heading. Selecting a new station mid-transit stops the old tween and
// retargets smoothly from the live position.
export function useTrainAnimation({ track, currentStationId, selectionNonce, onArrive, reducedMotion }) {
  const progress = useMotionValue(0);
  const x = useMotionValue(-1000);
  const y = useMotionValue(-1000);
  const angle = useMotionValue(0);
  const initializedRef = useRef(false);
  const onArriveRef = useRef(onArrive);
  onArriveRef.current = onArrive;

  useEffect(() => {
    if (!track) return undefined;

    const update = (len) => {
      const p = track.pointAt(len);
      const q = track.pointAt(Math.min(len + 4, track.total));
      x.set(p.x);
      y.set(p.y);
      if (q.x !== p.x || q.y !== p.y) {
        angle.set((Math.atan2(q.y - p.y, q.x - p.x) * 180) / Math.PI);
      }
    };
    const unsubscribe = progress.on('change', update);

    const target = track.lengths.get(currentStationId) ?? 0;

    // First run: place the train at its starting station without fanfare.
    if (!initializedRef.current) {
      initializedRef.current = true;
      progress.jump(target);
      update(target);
      return unsubscribe;
    }

    const dist = Math.abs(target - progress.get());
    if (reducedMotion || dist < 1) {
      progress.jump(target);
      update(target);
      onArriveRef.current?.();
      return unsubscribe;
    }

    const controls = animate(progress, target, {
      // Speed proportional to distance: accelerate, cruise, brake.
      duration: Math.min(3.2, Math.max(0.9, dist / 320)),
      ease: [0.45, 0.05, 0.25, 1],
      onComplete: () => onArriveRef.current?.(),
    });
    return () => {
      unsubscribe();
      controls.stop();
    };
  }, [track, currentStationId, selectionNonce, reducedMotion]); // eslint-disable-line react-hooks/exhaustive-deps

  return { x, y, angle, moving: progress };
}
