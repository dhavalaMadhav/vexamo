import { useEffect } from "react";
import Lenis from "lenis";

const useLocomotiveScroll = () => {
  useEffect(() => {
    const lenis = new Lenis({
      
      duration: 1.1,
      smoothWheel: true,
      smoothTouch: false,
      wheelMultiplier: 1,
      lerp: 0.06 // THIS is the real smoothness
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);
};

export default useLocomotiveScroll;
