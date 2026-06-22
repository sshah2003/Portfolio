import { createContext, useContext } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const ItemContext = createContext(null);

// Animated child — each block inside a panel uses <Item> to inherit the
// panel's stagger container.
export function Item({ children, className, as = 'div', style }) {
  const variants = useContext(ItemContext);
  const Comp = motion[as] || motion.div;
  return (
    <Comp className={className} variants={variants} style={style}>
      {children}
    </Comp>
  );
}

// Per-section enter/exit variants. Each section has a distinct "feel".
// direction prop ('fwd' | 'bwd') controls the horizontal offset.
export const PANEL_TRANSITIONS = {
  intro: {
    enter: (dir) => ({ opacity: 0, scale: 1.03, x: dir === 'fwd' ? 20 : -20 }),
    exit:  (dir) => ({ opacity: 0, scale: 0.97, x: dir === 'fwd' ? -20 : 20 }),
    duration: 0.5,
  },
  about: {
    enter: (dir) => ({ opacity: 0, x: dir === 'fwd' ? 40 : -40, filter: 'blur(4px)' }),
    exit:  (dir) => ({ opacity: 0, x: dir === 'fwd' ? -40 : 40, filter: 'blur(4px)' }),
    duration: 0.45,
  },
  work: {
    enter: (dir) => ({ opacity: 0, y: dir === 'fwd' ? 24 : -24 }),
    exit:  (dir) => ({ opacity: 0, y: dir === 'fwd' ? -24 : 24 }),
    duration: 0.45,
  },
  projects: {
    enter: () => ({ opacity: 0, scale: 0.94 }),
    exit:  () => ({ opacity: 0, scale: 1.04 }),
    duration: 0.5,
  },
  skills: {
    enter: (dir) => ({ opacity: 0, x: dir === 'fwd' ? 50 : -50 }),
    exit:  (dir) => ({ opacity: 0, x: dir === 'fwd' ? -50 : 50 }),
    duration: 0.42,
  },
  experience: {
    enter: (dir) => ({ opacity: 0, y: dir === 'fwd' ? -20 : 20 }),
    exit:  (dir) => ({ opacity: 0, y: dir === 'fwd' ? 20 : -20 }),
    duration: 0.48,
  },
  contact: {
    enter: () => ({ opacity: 0 }),
    exit:  () => ({ opacity: 0 }),
    duration: 0.6,
  },
};

export function Panel({ id, index, eyebrow, children, className = '', direction = 'fwd' }) {
  const reduced = useReducedMotion();
  const cfg = PANEL_TRANSITIONS[id] || PANEL_TRANSITIONS.intro;

  const initial  = reduced ? { opacity: 0 }    : cfg.enter(direction);
  const animate  = { opacity: 1, scale: 1, x: 0, y: 0, filter: 'blur(0px)' };
  const exit     = reduced ? { opacity: 0 }    : cfg.exit(direction);
  const transition = { duration: cfg.duration, ease: [0.22, 0.6, 0.2, 1] };

  // Per-item stagger inside the panel (content cascades in after panel arrives)
  const itemVariants = {
    hidden: reduced ? { opacity: 0 } : { opacity: 0, y: 10 },
    show: {
      opacity: 1, y: 0,
      transition: { duration: 0.42, ease: [0.22, 0.6, 0.2, 1] },
    },
  };
  const container = {
    hidden: {},
    show: { transition: { staggerChildren: reduced ? 0 : 0.07, delayChildren: 0.06 } },
  };

  return (
    <motion.section
      id={id}
      key={id}
      role="tabpanel"
      aria-labelledby={`tab-${id}`}
      className={`panel ${className}`}
      initial={initial}
      animate={animate}
      exit={exit}
      transition={transition}
    >
      <motion.div
        className="panel-inner"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <ItemContext.Provider value={itemVariants}>
          {eyebrow && (
            <Item className="panel-eyebrow">
              <span className="panel-num">{String(index + 1).padStart(2, '0')}</span>
              {eyebrow}
            </Item>
          )}
          {children}
        </ItemContext.Provider>
      </motion.div>
    </motion.section>
  );
}
