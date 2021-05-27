import { useMotionValue } from "framer-motion";
import { useContext, useEffect } from "react";

import ModelsContext from "./ModelsContext";

export default function useWrapperScroll() {
  const scrollY = useMotionValue(0);
  const scrollYProgress = useMotionValue(0);
  const { wrapperRef } = useContext(ModelsContext);

  useEffect(() => {
    const element = wrapperRef.current;

    if (element) {
      const updateScrollValue = () => {
        if (wrapperRef.current) {
          const { scrollTop, scrollHeight, offsetHeight } = element;

          const fullScroll = scrollHeight - offsetHeight;

          scrollY.set(scrollTop); // number
          scrollYProgress.set(scrollTop / fullScroll); //0 - 1 %
        }
      };

      element.addEventListener("scroll", updateScrollValue);

      return () => element.removeEventListener("scroll", updateScrollValue);
    }
  }, [wrapperRef, scrollY, scrollYProgress]);

  return { scrollY, scrollYProgress };
}
