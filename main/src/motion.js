export const ease = [0.25, 0.1, 0.25, 1];

export const bounce = { type: "spring", stiffness: 320, damping: 16, mass: 0.8 };
export const bounceSoft = { type: "spring", stiffness: 240, damping: 15, mass: 0.9 };
export const pop = { type: "spring", stiffness: 450, damping: 14, mass: 0.6 };

export const spring = bounce;

export const viewportOnce = { once: true, amount: 0.15, margin: "0px 0px -10% 0px" };

export const fadeUp = {
  hidden: { opacity: 0, y: 48 },
  show: { opacity: 1, y: 0, transition: bounce },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.35, ease } },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.6 },
  show: { opacity: 1, scale: 1, transition: bounceSoft },
};

export const squishHover = { scale: 1.08, y: -6, transition: pop };
export const squishTap = { scaleX: 1.12, scaleY: 0.88, transition: pop };

export const stagger = (staggerChildren = 0.09, delayChildren = 0) => ({
  hidden: {},
  show: { transition: { staggerChildren, delayChildren } },
});
