export const ease = [0.25, 0.1, 0.25, 1];

export const bounce = { type: "spring", stiffness: 260, damping: 12, mass: 0.9 };
export const bounceSoft = { type: "spring", stiffness: 210, damping: 11, mass: 1 };
export const pop = { type: "spring", stiffness: 380, damping: 10, mass: 0.7 };

export const spring = bounce;

export const viewportOnce = { once: true, amount: 0.15, margin: "0px 0px -10% 0px" };

export const fadeUp = {
  hidden: { opacity: 0, y: 56, scale: 0.94 },
  show: { opacity: 1, y: 0, scale: 1, transition: bounce },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.5, ease } },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.4, rotate: -8 },
  show: { opacity: 1, scale: 1, rotate: 0, transition: bounceSoft },
};

export const squishHover = { scale: 1.1, y: -6, rotate: -1.5, transition: pop };
export const squishTap = { scaleX: 1.12, scaleY: 0.88, transition: pop };

export const stagger = (staggerChildren = 0.12, delayChildren = 0) => ({
  hidden: {},
  show: { transition: { staggerChildren, delayChildren } },
});
