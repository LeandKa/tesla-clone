import { useTransform } from "framer-motion";
import React, { useCallback, useLayoutEffect, useState } from "react";
import useWrapperScroll from "../useWrapperScroll";
import { Container } from "./styles";

export default function ModelOverlay({ model, children }) {
  const { scrollY } = useWrapperScroll();

  const getSectionDimensions = useCallback(() => {
    return {
      offsetTop: model.sectionRef.current?.offsetTop,
      offsetHeight: model.sectionRef.current?.offsetHeight,
    };
  }, [model.sectionRef]);

  const [dimensions, setDimensions] = useState(getSectionDimensions());

  useLayoutEffect(() => {
    function onResize() {
      window.requestAnimationFrame(() => setDimensions(getSectionDimensions()));
    }

    window.addEventListener("resize", onResize);

    return () => window.removeEventListener("resize", onResize);
  }, []);

  const sectionScrollProgress = useTransform(
    scrollY,
    (y) => (y - dimensions.offsetTop) / dimensions.offsetHeight
  );

  const opacity = useTransform(
    sectionScrollProgress,
    [-0.42, -0.05, 0.05, 0.42],
    [0, 1, 1, 0]
  );
  const pointerEvents = useTransform(opacity, (value) =>
    value > 0 ? "auto" : "none"
  );

  return <Container style={{ opacity, pointerEvents }}>{children}</Container>;
}
