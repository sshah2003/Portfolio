import { motion, useReducedMotion } from 'framer-motion';
import { LINE_DOTS, STATIONS } from '../data/journey.js';
import { useSectionTransition } from '../hooks/useSectionTransition.js';

// Entry animations a section can pick from so they no longer all fade-up.
const VARIANTS = {
  'fade-up': { hidden: { opacity: 0, y: 26 }, show: { opacity: 1, y: 0 } },
  'slide-left': { hidden: { opacity: 0, x: 48 }, show: { opacity: 1, x: 0 } },
  'slide-right': { hidden: { opacity: 0, x: -48 }, show: { opacity: 1, x: 0 } },
  'scale-in': { hidden: { opacity: 0, scale: 0.9 }, show: { opacity: 1, scale: 1 } },
  mask: { hidden: { opacity: 0, y: 40, filter: 'blur(8px)' }, show: { opacity: 1, y: 0, filter: 'blur(0px)' } },
};

// Scroll-reveal wrapper. Fades/slides content in the first time it enters the
// viewport using the chosen `variant`; respects reduced motion.
export function Reveal({ children, delay = 0, className, variant = 'fade-up' }) {
  const reduced = useReducedMotion();
  const v = VARIANTS[variant] || VARIANTS['fade-up'];
  return (
    <motion.div
      className={className}
      initial={reduced ? false : v.hidden}
      whileInView={v.show}
      viewport={{ once: true, margin: '0px 0px -60px 0px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 0.6, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function StationHeader({ data }) {
  return (
    <Reveal className="station-head">
      <div className="station-sign">
        <span className="station-sign-dot" style={{ background: data.accent }} />
        <span className="station-sign-name">{data.station}</span>
        <span className="station-sign-lines" aria-hidden="true">
          {data.lines.map((l) => (
            <i key={l} style={{ background: LINE_DOTS[l] }} />
          ))}
        </span>
      </div>
      {data.kicker && <p className="station-kicker">{data.kicker}</p>}
      <h2 className="station-title">{data.title}</h2>
    </Reveal>
  );
}

// Section scaffold: registers itself with the journey hook, renders the
// header and a "Next stop" link that rides the cinematic transition.
export function Station({ index, register, children, className = '', hideHeader = false }) {
  const data = STATIONS[index];
  const next = STATIONS[index + 1];
  const { goToSection } = useSectionTransition();
  return (
    <section
      id={data.id}
      ref={register(index)}
      className={`station ${className}`}
      style={{ '--accent': data.accent }}
      aria-label={`${data.station} — ${data.title}`}
    >
      <div className="container">
        {!hideHeader && <StationHeader data={data} />}
        {children}
        {next && (
          <Reveal className="next-stop-wrap">
            <a
              className="next-stop"
              href={`#${next.id}`}
              onClick={(e) => {
                e.preventDefault();
                goToSection(next.id);
              }}
            >
              <span className="next-stop-pulse" style={{ background: next.accent }} />
              Next stop: <strong>{next.station}</strong>
              <span className="next-stop-arrow" aria-hidden="true">→</span>
            </a>
          </Reveal>
        )}
      </div>
    </section>
  );
}
