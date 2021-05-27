import React, { useEffect, useRef } from "react";
import { Container } from "./styles";
import PropTypes from "prop-types";
import useModel from "../userModel";

export default function ModelSection({
  modelName,
  overlayNode,
  children,
  ...props
}) {
  const { registerModel } = useModel(modelName);
  const sectionRef = useRef(null);

  useEffect(() => {
    if (sectionRef.current) {
      registerModel({
        modelName,
        overlayNode,
        sectionRef,
      });
    }
  }, []);

  return (
    <Container ref={sectionRef} {...props}>
      {children}
    </Container>
  );
}

ModelSection.propTypes = {
  modelName: PropTypes.string,
  overlayNode: PropTypes.node,
};
