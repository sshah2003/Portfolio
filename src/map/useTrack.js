import { useLayoutEffect, useRef, useState } from 'react';

// Measures the hidden master-track path and maps each station (in tour
// order) to its arclength along it. The track overlaps itself at the
// turnaround, so we scan in order — each station is matched to the first
// close pass, which is unambiguous because the track visits stations in
// tour order.
export function useTrack(stations, tourOrder) {
  const trackRef = useRef(null);
  const [track, setTrack] = useState(null);

  useLayoutEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const total = el.getTotalLength();
    const targets = tourOrder.map((id) => stations.find((s) => s.id === id));
    const lengths = new Map();

    let idx = 0;
    let best = null;
    for (let len = 0; len <= total + 2 && idx < targets.length; len += 2) {
      const p = el.getPointAtLength(Math.min(len, total));
      const t = targets[idx];
      const dist = Math.hypot(p.x - t.x, p.y - t.y);
      if (dist < 8 && (!best || dist < best.dist)) {
        best = { len: Math.min(len, total), dist };
      } else if (best && dist > 12) {
        lengths.set(t.id, best.len);
        idx += 1;
        best = null;
        len -= 2; // re-examine this position for the next station
      }
    }
    if (best && idx < targets.length) lengths.set(targets[idx].id, best.len);

    setTrack({
      total,
      lengths,
      pointAt: (len) => el.getPointAtLength(Math.max(0, Math.min(total, len))),
    });
  }, [stations, tourOrder]);

  return { trackRef, track };
}
