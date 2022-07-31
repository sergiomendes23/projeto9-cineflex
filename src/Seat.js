import React from "react";
import Styled from "styled-components";
import axios from "axios";
import { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";


export default function Seat(){

    const [assentos, setAssentos] = useState ([]);
    const [filmSelected, setFilmSelected] = useState ({});
    const {seatId} = useParams();

    useEffect(() => {
        const promise = axios.get(`https://mock-api.driven.com.br/api/v7/cineflex/showtimes/${seatId}/seats`)
    
        promise.then(response => {
            setAssentos (response.data.seats)
            console.log(setAssentos);
            setFilmSelected ({days: response.data.day.weekday,
                            dateDays: response.data.day.date,
                            poster: response.data.movie.posterURL,
                            name: response.data.movie.title})
        })
        promise.catch(error => alert(`erro ao buscar assentos: $(erro.message}`))
    }, []);

    return(
        <Container>
            <Select>
                    <h1>Selecione o(s) assento(s)</h1>
            </Select>
            <Items>
                {assentos.map(assento => {
                    return(
                    <div key={assento.id}>
                        {assento.name}
                    </div>)
                })}
            </Items>
            <Subtitle>
                <div>
                    <BallGreen></BallGreen>
                    <p>Selecionado</p>
                </div>
                <div>
                    <BallGrey></BallGrey>
                    <p>Disponível</p>
                </div>
                <div>
                    <BallYellow></BallYellow>
                    <p>Indisponível</p>
                </div>
            </Subtitle>
            <Info>
                <p>Nome do Comprador:</p>
                <input placeholder="Digite seu nome..."></input>
                <p>CPF do Comprador:</p>
                <input placeholder="Digite seu CPF..."></input>                
            </Info>
            <Reserve>
                <button>Reservar assento(s)</button>
            </Reserve>
            <Footer>
                    <FooterImg><img src={filmSelected.poster} /></FooterImg>
                    <Sessions>
                        <p>{filmSelected.name}</p>
                        <p>{filmSelected.days} - {filmSelected.dateDays}</p>
                    </Sessions>
            </Footer>
        </Container>
    )
}

const Container = Styled.div`
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-bottom: 117px;
`
const Select = Styled.div`
width: 100%;
height: 100px;
display: flex;
align-items: center;
justify-content: center;

& h1{
    font-family: 'Roboto';
    font-weight: 400;
    font-size: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
}
`
const Items = Styled.div`
    width: 70%;
    height: 70%;
    display:flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;

    div{
        width: 25px;
        height: 25px;
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 400;
        font-size: 11px;
        line-height: 13px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #C3CFD9;
        border: 1px solid #808F9D;
        border-radius: 50px;
        margin: 7px;
    }
`
const Footer = Styled.div`
    width: 100%;
    height: 117px;
    display: flex;
    align-items: center;
    background-color: #9EADBA;
    padding-left: 10px;
    position: fixed;
    bottom: 0;
    left: 0;

    & img{
        width: 48px;
        height: 72px;
    }
`
const Sessions = Styled.div`
    font-family: 'Roboto';
    font-weight: 400;
    font-size: 26px;
`
const FooterImg = Styled.div`
    width: 64px;
    height: 89px;
    background: #FFFFFF;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
    border-radius: 2px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 10px;
`
const Subtitle = Styled.div`
    width: 70vw;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: space-around;

    & div{
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }
    & p{
        font-family: 'Roboto';
        font-weight: 400;
        font-size: 13px;
    }
    
`
const BallGreen = Styled.div`
    width: 25px;
    height: 25px;
    background-color: #8DD7CF;
    border: 1px solid #1AAE9E;
    border-radius: 17px;
`
const BallGrey = Styled.div`
    width: 25px;
    height: 25px;
    background-color: #C3CFD9;
    border: 1px solid #7B8B99;
    border-radius: 17px;
`
const BallYellow = Styled.div`
    width: 25px;
    height: 25px;
    background-color: #FBE192;
    border: 1px solid #F7C52B;
    border-radius: 17px;
`
const Info = Styled.div`
    width: 70%;
    height: 150px;
    input{
        
    }

`
const Reserve = Styled.div`
    button{width: 225px;
    height: 42px;
    background: #E8833A;
    border-radius: 3px;
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    color: #ffffff;
    border: none;
    }
`