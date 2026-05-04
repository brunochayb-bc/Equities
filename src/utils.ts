export const esc = (s: string | number) => String(s);
export const isPos = (v: string | number) => /^\+|▲/.test(String(v));
export const isNeg = (v: string | number) => /^[-−]|▼/.test(String(v));

export function getChartPath(prices: number[], yMin: number, yMax: number) {
  const W = 760, H = 280;
  const left = 60, right = 718, top = 40, bottom = 220;
  const xStep = (right - left) / (prices.length - 1);
  const span = yMax - yMin;
  
  const pts = prices.map((p, i) => {
    const x = left + i * xStep;
    const y = bottom - ((p - yMin) / span) * (bottom - top);
    return { x, y };
  });

  const line = pts.map((p, i) => (i ? 'L' : 'M') + ' ' + p.x.toFixed(1) + ' ' + p.y.toFixed(1)).join(' ');
  const area = line + ` L ${pts[pts.length - 1].x.toFixed(1)} ${bottom} L ${pts[0].x.toFixed(1)} ${bottom} Z`;
  
  return { pts, line, area };
}

export function getGaugeNeedle(score: number) {
  const angle = 180 - (score / 100) * 180;
  const rad = angle * Math.PI / 180;
  const cx = 150, cy = 150, r = 100;
  const x = cx + Math.cos(rad) * r;
  const y = cy - Math.sin(rad) * r;
  return { x: x.toFixed(1), y: y.toFixed(1) };
}

export function getScoreColor(score: number) {
  if (score >= 70) return 'var(--color-green)';
  if (score >= 50) return 'var(--color-amber)';
  if (score >= 30) return '#ff8a3d';
  return 'var(--color-red)';
}

export function getScoreBarClass(score: number) {
  if (score >= 70) return 'green';
  if (score >= 40) return 'amber';
  return 'red';
}
