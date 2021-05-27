import React from "react";
import PropTypes from "prop-types";

import { Container, Heading, Buttons } from "./styles";

export default function DefaultOverlayContent({ label, description }) {
  return (
    <Container>
      <Heading>
        <h1>{label}</h1>
        <h2>{description}</h2>
      </Heading>

      <Buttons>
        <button>Custom Order</button>
        <button className='white'>Existing Inventory</button>
      </Buttons>
    </Container>
  );
}

DefaultOverlayContent.propTypes = {
  label: PropTypes.string,
  description: PropTypes.string,
};
