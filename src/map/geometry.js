// Builds a rounded-corner SVG path from a polyline of waypoints.
// Collinear and reversal vertices (the train turnaround) are emitted as
// plain line segments — rounding only applies to genuine turns.
export function buildRoutePath(waypoints, radius = 26) {
  const fmt = (n) => Math.round(n * 100) / 100;
  let d = `M ${fmt(waypoints[0][0])} ${fmt(waypoints[0][1])}`;

  for (let i = 1; i < waypoints.length - 1; i++) {
    const [px, py] = waypoints[i - 1];
    const [cx, cy] = waypoints[i];
    const [nx, ny] = waypoints[i + 1];

    const inLen = Math.hypot(cx - px, cy - py);
    const outLen = Math.hypot(nx - cx, ny - cy);
    const v1 = [(cx - px) / inLen, (cy - py) / inLen];
    const v2 = [(nx - cx) / outLen, (ny - cy) / outLen];
    const cross = v1[0] * v2[1] - v1[1] * v2[0];

    if (Math.abs(cross) < 1e-6) {
      d += ` L ${fmt(cx)} ${fmt(cy)}`;
      continue;
    }

    const r = Math.min(radius, inLen / 2, outLen / 2);
    const a = [cx - v1[0] * r, cy - v1[1] * r];
    const b = [cx + v2[0] * r, cy + v2[1] * r];
    d += ` L ${fmt(a[0])} ${fmt(a[1])} Q ${fmt(cx)} ${fmt(cy)} ${fmt(b[0])} ${fmt(b[1])}`;
  }

  const [lx, ly] = waypoints[waypoints.length - 1];
  d += ` L ${fmt(lx)} ${fmt(ly)}`;
  return d;
}
