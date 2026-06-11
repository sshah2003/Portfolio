import { useCallback, useEffect, useMemo, useRef } from 'react';
import { animate, useMotionValue } from 'framer-motion';

const MIN_SCALE = 0.7;
const MAX_SCALE = 5;
const SPRING = { type: 'spring', stiffness: 90, damping: 22, mass: 1 };

const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));

function clientToViewBox(svg, clientX, clientY) {
  const ctm = svg.getScreenCTM();
  if (!ctm) return { x: 0, y: 0 };
  return new DOMPoint(clientX, clientY).matrixTransform(ctm.inverse());
}

// Camera = scale/tx/ty motion values applied to the inner <g>.
// A world point p renders at (scale * p + t), so to put station p at
// viewBox point v: t = v - scale * p. Programmatic flyTo() springs and
// live gesture set()s write to the same motion values, so they compose.
export function useCamera({ svgRef, reducedMotion, onUserGesture }) {
  const scale = useMotionValue(1);
  const tx = useMotionValue(0);
  const ty = useMotionValue(0);

  const animsRef = useRef([]);
  const reducedRef = useRef(reducedMotion);
  reducedRef.current = reducedMotion;
  const gestureRef = useRef(null);
  const pointersRef = useRef(new Map());
  const onUserGestureRef = useRef(onUserGesture);
  onUserGestureRef.current = onUserGesture;

  const stopAnims = useCallback(() => {
    animsRef.current.forEach((a) => a.stop());
    animsRef.current = [];
  }, []);

  const flyTo = useCallback(
    (target, instant = false) => {
      stopAnims();
      if (instant || reducedRef.current) {
        scale.jump(target.scale);
        tx.jump(target.tx);
        ty.jump(target.ty);
        return;
      }
      animsRef.current = [
        animate(scale, target.scale, SPRING),
        animate(tx, target.tx, SPRING),
        animate(ty, target.ty, SPRING),
      ];
    },
    [stopAnims, scale, tx, ty]
  );

  const focusStation = useCallback(
    (station, instant = false) => {
      const svg = svgRef.current;
      if (!svg) return;
      const mobile = window.matchMedia('(max-width: 760px)').matches;
      const s = mobile ? 3 : 2.4;
      // Bias the station left of center on desktop (panel sits right) and
      // toward the top on mobile (panel becomes a bottom sheet). Convert the
      // desired *screen* position into viewBox coords so letterboxing on
      // tall/narrow viewports doesn't skew the target.
      const sx = mobile ? window.innerWidth * 0.5 : window.innerWidth * 0.34;
      const sy = mobile ? window.innerHeight * 0.24 : window.innerHeight * 0.48;
      const v = clientToViewBox(svg, sx, sy);
      flyTo({ scale: s, tx: v.x - s * station.x, ty: v.y - s * station.y }, instant);
    },
    [flyTo, svgRef]
  );

  const resetView = useCallback(
    (instant = false) => flyTo({ scale: 1, tx: 0, ty: 0 }, instant),
    [flyTo]
  );

  const beginGesture = useCallback(() => {
    stopAnims();
    onUserGestureRef.current?.();
  }, [stopAnims]);

  // Wheel zoom toward the cursor (non-passive so we can preventDefault).
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return undefined;
    const onWheel = (e) => {
      e.preventDefault();
      beginGesture();
      const c = clientToViewBox(svg, e.clientX, e.clientY);
      const s = scale.get();
      const ns = clamp(s * Math.exp(-e.deltaY * 0.0016), MIN_SCALE, MAX_SCALE);
      tx.jump(c.x - ((c.x - tx.get()) * ns) / s);
      ty.jump(c.y - ((c.y - ty.get()) * ns) / s);
      scale.jump(ns);
    };
    svg.addEventListener('wheel', onWheel, { passive: false });
    return () => svg.removeEventListener('wheel', onWheel);
  }, [svgRef, scale, tx, ty, beginGesture]);

  // Pointer gestures: 1 pointer drags/pans, 2 pointers pinch-zoom.
  const handlers = useMemo(() => {
    const startPan = (svg, pointer) => {
      gestureRef.current = {
        mode: 'pan',
        start: clientToViewBox(svg, pointer.x, pointer.y),
        startTx: tx.get(),
        startTy: ty.get(),
        moved: false,
      };
    };

    const startPinch = (svg) => {
      const [a, b] = [...pointersRef.current.values()];
      const va = clientToViewBox(svg, a.x, a.y);
      const vb = clientToViewBox(svg, b.x, b.y);
      const s = scale.get();
      const mid = { x: (va.x + vb.x) / 2, y: (va.y + vb.y) / 2 };
      gestureRef.current = {
        mode: 'pinch',
        startDist: Math.hypot(va.x - vb.x, va.y - vb.y),
        startScale: s,
        // World point under the initial midpoint — kept pinned.
        world: { x: (mid.x - tx.get()) / s, y: (mid.y - ty.get()) / s },
        moved: true,
      };
      beginGesture();
    };

    return {
      onPointerDown: (e) => {
        const svg = e.currentTarget;
        svg.setPointerCapture?.(e.pointerId);
        pointersRef.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
        if (pointersRef.current.size === 1) {
          startPan(svg, { x: e.clientX, y: e.clientY });
        } else if (pointersRef.current.size === 2) {
          startPinch(svg);
        }
      },
      onPointerMove: (e) => {
        if (!pointersRef.current.has(e.pointerId)) return;
        pointersRef.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
        const g = gestureRef.current;
        if (!g) return;
        const svg = e.currentTarget;

        if (g.mode === 'pan' && pointersRef.current.size === 1) {
          const now = clientToViewBox(svg, e.clientX, e.clientY);
          const dx = now.x - g.start.x;
          const dy = now.y - g.start.y;
          if (!g.moved && Math.hypot(dx, dy) > 4) {
            g.moved = true;
            beginGesture();
          }
          if (g.moved) {
            tx.jump(g.startTx + dx);
            ty.jump(g.startTy + dy);
          }
        } else if (g.mode === 'pinch' && pointersRef.current.size === 2) {
          const [a, b] = [...pointersRef.current.values()];
          const va = clientToViewBox(svg, a.x, a.y);
          const vb = clientToViewBox(svg, b.x, b.y);
          const dist = Math.hypot(va.x - vb.x, va.y - vb.y);
          const mid = { x: (va.x + vb.x) / 2, y: (va.y + vb.y) / 2 };
          const ns = clamp((g.startScale * dist) / (g.startDist || 1), MIN_SCALE, MAX_SCALE);
          scale.jump(ns);
          tx.jump(mid.x - ns * g.world.x);
          ty.jump(mid.y - ns * g.world.y);
        }
      },
      onPointerUp: (e) => {
        pointersRef.current.delete(e.pointerId);
        if (pointersRef.current.size === 1) {
          const [p] = [...pointersRef.current.values()];
          startPan(e.currentTarget, p);
          gestureRef.current.moved = true; // continuing a pinch as a pan
        } else if (pointersRef.current.size === 0) {
          gestureRef.current = null;
        }
      },
      onPointerCancel: (e) => {
        pointersRef.current.delete(e.pointerId);
        if (pointersRef.current.size === 0) gestureRef.current = null;
      },
    };
  }, [scale, tx, ty, beginGesture]);

  return { scale, tx, ty, focusStation, resetView, handlers };
}
