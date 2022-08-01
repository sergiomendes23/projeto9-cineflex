import React from "react";
import Styled from "styled-components";
import axios from "axios";
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";


export default function Seat(props){

    const [assentos, setAssentos] = useState ([]);
    const [filmSelected, setFilmSelected] = useState ({});
    const [newSeats, setNewSeats] = useState ([]);
    const {seatId} = useParams();
    
    const navigate = useNavigate();
    
    const {selectedSeats, setSelectedSeats, cpf, setCpf, nome, setNome,setFilme} = props

    useEffect(() => {
        const promise = axios.get(`https://mock-api.driven.com.br/api/v7/cineflex/showtimes/${seatId}/seats`)
    
        promise.then(response => {
            setAssentos (response.data.seats)
            setFilmSelected ({days: response.data.day.weekday,
                            hour: response.data.name,
                            poster: response.data.movie.posterURL,
                            name: response.data.movie.title})
            setFilme(response.data)
        })
        promise.catch(error => alert(`erro ao buscar assentos: $(erro.message}`))
    }, []);

    function seatSelected(id, isAvailable){
        console.log(id, isAvailable)
        if (isAvailable === false){
            alert("Esse assento não está disponível")
            return
        }
        const chosenSeat = assentos.map(assento => {
            if(assento.id === id){
                assento.isSelected = !assento.isSelected
            }
            return assento;
        })
        setNewSeats (chosenSeat);
        const selectedSeats = newSeats.filter(newSeat => newSeat.isSelected === true)
        setSelectedSeats(selectedSeats);

    }

    function sendInfo(event){
        event.preventDefault();
        console.log(selectedSeats)
        if(selectedSeats.length === 0){
            alert("Escolha ao menos um assento")
            return
        } 
        if(cpf === null){
            alert("CPF inválido")
            return
        }

        const body = {
            ids: selectedSeats.map(selectedSeat => selectedSeat.id),
            name: nome,
            cpf: cpf
        }
        const promise = axios.post("https://mock-api.driven.com.br/api/v7/cineflex/seats/book-many", body)
        promise.then(response => {
            navigate("/success")
            console.log(response)
        
        })
        
    }

    return(
        <Container>
            <Select>
                    <h1>Selecione o(s) assento(s)</h1>
            </Select>
            <Items>
                {assentos.map(assento => {
                    return(
                    <Ball key={assento.id} isAvailable={assento.isAvailable} isSelected={assento.isSelected} onClick={() => seatSelected(assento.id, assento.isAvailable)}>
                        {assento.name}
                    </Ball>)
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
                <input placeholder="Digite seu nome..." value={nome} type="text" onChange={(event) => setNome(event.target.value)}></input>
                <p>CPF do Comprador:</p>
                <input placeholder="Digite seu CPF..." value={cpf} type="text" onChange={(event) => setCpf(event.target.value)}></input>                
            </Info>
            <Reserve>
                <button onClick={sendInfo}>Reservar assento(s)</button>
            </Reserve>
            <Footer>
                    <FooterImg><img src={filmSelected.poster} /></FooterImg>
                    <Sessions>
                        <p>{filmSelected.name}</p>
                        <p>{filmSelected.days} - {filmSelected.hour}</p>
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
    margin-bottom: 150px;
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

`
const Ball = Styled.div`
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
        background-color: ${props => props.isAvailable ? "#C3CFD9":"#F7C52B"};
        background-color: ${props => props.isSelected ? "#8DD7CF":""}; 
        border: 1px solid #808F9D;
        border-radius: 50px;
        margin: 7px;
        cursor: pointer;
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
    height: 280px;
    p{
        font-family: 'Roboto';
        font-weight: 400;
        font-size: 18px;
        margin-bottom: 10px;
        margin-top: 10px;
    }
    input{
        width: 270px;
        height: 50px;
        font-family: 'Roboto';
        font-style: italic;
        font-weight: 400;
        font-size: 18px;
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
    cursor: pointer;
    }
`