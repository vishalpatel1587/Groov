import React from "react";
import styled from "styled-components";
import Header from "./header";
import Footer from "./Footer";
import { colors } from "../styling/styles/colors";

const RootDiv = styled.div`
  background-color: ${colors.grey[5]};
  min-height: 100vh;
`;

const RootMain = styled.div`
  display: flex;
  justify-content: center;
`;

interface Props {
  children: React.ReactNode;
}
const Layout = (props: Props) => {
  return (
    <RootDiv>
      <Header />
      <RootMain>
        <main>{props.children}</main>
      </RootMain>
      <Footer />
    </RootDiv>
  );
};

export default Layout;
