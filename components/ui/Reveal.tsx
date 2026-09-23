"use client";

import { m, type HTMLMotionProps, type Variants } from "motion/react";

const ease = [0.22, 1, 0.36, 1] as const;

type RevealProps = HTMLMotionProps<"div"> & {
  delay?: number;
  /** Vertical offset in px the element rises from */
  y?: number;
};

/** Fades and lifts its children into view once, when scrolled to. */
export function Reveal({ delay = 0, y = 24, children, ...rest }: RevealProps) {
  return (
    <m.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.7, ease, delay }}
      {...rest}
    >
      {children}
    </m.div>
  );
}

const groupVariants: Variants = {
  hidden: {},
  visible: (stagger: number = 0.08) => ({ transition: { staggerChildren: stagger } }),
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
};

type RevealGroupProps = HTMLMotionProps<"div"> & { stagger?: number };

/** Staggers the entrance of its <RevealItem> children. */
export function RevealGroup({ stagger = 0.08, children, ...rest }: RevealGroupProps) {
  return (
    <m.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      custom={stagger}
      variants={groupVariants}
      {...rest}
    >
      {children}
    </m.div>
  );
}

export function RevealItem({ children, ...rest }: HTMLMotionProps<"div">) {
  return (
    <m.div variants={itemVariants} {...rest}>
      {children}
    </m.div>
  );
}

type RevealListProps = HTMLMotionProps<"ul"> & { stagger?: number };

/** List variant of RevealGroup, for semantic <ul>/<li> markup. */
export function RevealList({ stagger = 0.08, children, ...rest }: RevealListProps) {
  return (
    <m.ul
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      custom={stagger}
      variants={groupVariants}
      {...rest}
    >
      {children}
    </m.ul>
  );
}

export function RevealListItem({ children, ...rest }: HTMLMotionProps<"li">) {
  return (
    <m.li variants={itemVariants} {...rest}>
      {children}
    </m.li>
  );
}
