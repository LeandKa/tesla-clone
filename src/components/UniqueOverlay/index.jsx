import { useTransform } from "framer-motion";
import React from "react";
import useWrapperScroll from "../Model/useWrapperScroll";
import { Container, Header, Logo, Burger, Footer } from "./styles";

export default function UniqueOverlay() {
  const { scrollYProgress } = useWrapperScroll()

  const opacity = useTransform(scrollYProgress, [0.9, 1], [0, 1])

  return (
    <Container>
      <Header>
        <Logo />
        <Burger />
      </Header>

      <Footer style={{ opacity }}>
        <ul>
          <li>
            <a href='#'>Ui Clone</a>
          </li>
          <li>
            <a href='#'>Made with React</a>
          </li>
          <li>
            <a href='#'>by Leandro Pereira</a>
          </li>
        </ul>
      </Footer>
    </Container>
  );
}
