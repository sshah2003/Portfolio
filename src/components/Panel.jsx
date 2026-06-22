import { createContext, useContext } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

// Distinct-but-quiet entrance per panel. Each maps to how its content's
// items animate in when the screen scrolls into view.
const VARIANTS = {
  'fade-up': { opacity: 0, y: 16 },
  'slide-left': { opacity: 0, x: -28 },
  'slide-right': { opacity: 0, x: 28 },
  'scale-in': { opacity: 0, scale: 0.96 },
  'draw-down': { opacity: 0, y: -14 },
};

const ItemContext = createContext(null);

// Animated child. Sections wrap each block they want to reveal in <Item>.
export function Item({ children, className, as = 'div' }) {
  const variants = useContext(ItemContext);
  const Comp = motion[as] || motion.div;
  return (
    <Comp className={className} variants={variants}>
      {children}
    </Comp>
  );
}

export function Panel({ id, index, eyebrow, variant = 'fade-up', children, className = '' }) {
  const reduced = useReducedMotion();

  const hidden = reduced ? { opacity: 0 } : VARIANTS[variant] || VARIANTS['fade-up'];
  const itemVariants = {
    hidden,
    show: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      transition: { duration: 0.55, ease: [0.22, 0.6, 0.2, 1] },
    },
  };
  const container = {
    hidden: {},
    show: { transition: { staggerChildren: reduced ? 0 : 0.08, delayChildren: 0.05 } },
  };

  return (
    <section id={id} className={`panel ${className}`}>
      <motion.div
        className="panel-inner"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.4 }}
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
    </section>
  );
}
