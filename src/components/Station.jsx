import { motion, useReducedMotion } from 'framer-motion';
import { LINE_DOTS, STATIONS } from '../data/journey.js';

// Scroll-reveal wrapper. Fades/slides content in the first time it enters
// the viewport; respects reduced motion.
export function Reveal({ children, delay = 0, className }) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
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
// header and a "Next stop" link to the following station.
export function Station({ index, register, children, className = '', hideHeader = false }) {
  const data = STATIONS[index];
  const next = STATIONS[index + 1];
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
            <a className="next-stop" href={`#${next.id}`}>
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
