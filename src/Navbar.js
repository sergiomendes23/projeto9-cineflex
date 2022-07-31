import React from "react";
import Styled from "styled-components";
import { Link } from "react-router-dom";

export default function Navbar (){
    return (
        <Topo>
            <Link to="/" style={{textDecoration: 'none'}} ><h1>CINEFLEX</h1></Link>
        </Topo>
    )
}

const Topo = Styled.div`
    width: 100%;
    height: 67px;
    background-color: #C3CFD9;
    display: flex;
    align-items: center;
    justify-content: center;
     

    h1{
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 400;
        font-size: 34px;
        line-height: 40px;
        color: #E8833A;
    }
`