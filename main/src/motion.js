export const ease = [0.25, 0.1, 0.25, 1];

export const bounce = { type: "spring", stiffness: 520, damping: 14, mass: 0.6 };
export const bounceSoft = { type: "spring", stiffness: 380, damping: 13, mass: 0.7 };
export const pop = { type: "spring", stiffness: 700, damping: 12, mass: 0.5 };

export const spring = bounce;

export const viewportOnce = { once: true, amount: 0.15, margin: "0px 0px -10% 0px" };

export const fadeUp = {
  hidden: { opacity: 0, y: 48, scale: 0.92 },
  show: { opacity: 1, y: 0, scale: 1, transition: bounce },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.35, ease } },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.3 },
  show: { opacity: 1, scale: 1, transition: bounceSoft },
};

export const squishHover = { scale: 1.08, y: -6, transition: pop };
export const squishTap = { scaleX: 1.12, scaleY: 0.88, transition: pop };

export const stagger = (staggerChildren = 0.07, delayChildren = 0) => ({
  hidden: {},
  show: { transition: { staggerChildren, delayChildren } },
});
