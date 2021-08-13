import React from 'react';
import styled from 'styled-components';
import Header from './header';

const RootDiv = styled.div`
background-color: #FBFBFD;
min-height: 100vh;
// width: 100vw;
`

const RootMain = styled.div`
background-color: #FBFBFD;
margin: 0px 15%;
display: flex;
justify-content: center;
`

interface Props {
  children: React.ReactNode;
}
const Layout = (props:Props) => {
    return (
        <RootDiv>
            <Header/>
            <RootMain>
                <main>{props.children}</main>
            </RootMain>
        </RootDiv>
    )
}

export default Layout;