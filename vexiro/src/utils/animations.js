export const TRANSITION_EASE = [0.16, 1, 0.3, 1]; // Premium cubic-bezier
export const TRANSITION_DURATION = 1.0;
export const STAGGER_DELAY = 0.08;

export const unifiedVariants = {
  hidden: { 
    opacity: 0, 
    y: 28 
  },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: TRANSITION_DURATION,
      ease: TRANSITION_EASE
    }
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

export const staggerContainer = {
  hidden: {},
  show: {
    transition: {}
  }
};

export const revealMask = {
  initial: { width: "0%" },
  animate: { 
    width: "100%",
    transition: {
      duration: 1.2,
      ease: TRANSITION_EASE
    }
  }
};

export const sectionWrapper = {
  initial: { opacity: 0 },
  whileInView: { 
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  },
  viewport: { margin: "-120px", once: true }
};
