import React from "react";
import Styled from "styled-components";
import axios from "axios";
import { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";


export default function Sessions(){

    const [hours, setHours] = useState ([]);
    const [filmSelected, setFilmSelected] = useState ({});
    const {filmId} = useParams();

    useEffect(() => {
        const promise = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/movies/${filmId}/showtimes`)
            promise.then((response) => {
            setHours (response.data.days)   
            setFilmSelected ({poster: response.data.posterURL, name: response.data.title})       
        })
    }, []);

    return(
        <Container>
            <Select>
                <h1>Selecione o horário</h1>
            </Select>
            <StartSessions>              
                    {hours.map (hour => {
                        return( 
                                <>
                                    <Weekdate>
                                        {hour.weekday} - {hour.date} 
                                    </Weekdate>
                                    <Flex>
                                        {hour.showtimes.map(showtime => 
                                        <HourOptions>
                                            <Link to={`/Seat/${showtime.id}`} style={{textDecoration: 'none'}}>                                            
                                                <HourSessions>{showtime.name}</HourSessions>
                                            </Link>
                                        </HourOptions>
                                        )}
                                    </Flex>
                                </>
                        )
                    })}                
            </StartSessions>
            <Footer>
                    <FooterImg><img src={filmSelected.poster} /></FooterImg>
                    <p>{filmSelected.name}</p>
            </Footer>
        </Container>
    )
}

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

const Container = Styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 117px;
`
const StartSessions = Styled.div`
    width: 500px;
    height: 100%;
`
const Weekdate = Styled.div`
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 23px;
    margin-bottom: 20px;
    padding-left: 10px;
`
const HourOptions = Styled.div`
    height: 57px;
    padding-left: 10px;

`
const Flex = Styled.div`
    display: flex;
    justify-content: flex-start;

`
const HourSessions = Styled.div`
    width: 84px;
    height: 44px;
    background-color: #E8833A;
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Roboto';
    font-weight: 400;
    font-size: 18px;
    margin-right: 10px;
    margin-bottom: 20px;
    color: #ffffff;
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
    & p{
        font-family: 'Roboto';
        font-weight: 400;
        font-size: 26px;
    }
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
