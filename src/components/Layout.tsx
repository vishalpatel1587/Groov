import React from 'react';
import styled from 'styled-components';
import Header from './header';
import Footer from './Footer';

const RootDiv = styled.div`
  background-color: #fbfbfd;
  min-height: 100vh;
`;

const RootMain = styled.div`
  background-color: #fbfbfd;
  margin: 0px 15%;
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
