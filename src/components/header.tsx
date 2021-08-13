import React from "react"
import logo from "../assets/mentemia_logo.png"
import styled from 'styled-components';

const RootDiv = styled.div`
padding: 10px 20px 40px 20px;
`
const Header = () => {

    return (
        <RootDiv>
            <img width={"15%"} src={logo} alt={"logo"}></img>
        </RootDiv>
    )
}

export default Header;