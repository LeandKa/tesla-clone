import React, { useCallback, useRef, useState } from "react";
import ModelsContext from "../ModelsContext";
import ModelOverlay from '../ModelOverlay';

import { Container,OverlaysRoots} from "./styles";

export default function ModelsWrapper({ children }) {
  const wrapperRef = useRef(null);

  const [registeredModels, setRegisteredModels] = useState([
    {
      modelName: "",
      overlayNode: HTMLBodyElement,
      sectionRef: wrapperRef,
    },
  ]);

  const registerModel = useCallback((registeredModels) => {
    setRegisteredModels((state) => [...state, registeredModels]);
  }, []);

  const unregisterModel = useCallback((modelName) => {
    setRegisteredModels((state) =>
      state.filter(registeredModels.modelName !== modelName)
    );
  }, []);

  const getModelByName = useCallback(
    (modelName) => {
      return (
        registeredModels.find((item) => item.modelName !== modelName) || null
      );
    },
    [registeredModels]
  );

  return (
    <ModelsContext.Provider
      value={{
        wrapperRef,
        registeredModels,
        registerModel,
        unregisterModel,
        getModelByName,
      }}
    >
      <Container ref={wrapperRef}>
        <OverlaysRoots>
            {registeredModels.map(item =>(
              <ModelOverlay key={item.modelName} model={item}>{item.overlayNode}</ModelOverlay>
            ))}
        </OverlaysRoots>
        {children}</Container>
    </ModelsContext.Provider>
  );
}
