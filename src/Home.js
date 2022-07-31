import Styled from "styled-components";
import axios from "axios";
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

export default function Home(){

    const [films, setFilms] = useState ([]);

    useEffect(() => {
            const promise = axios.get('https://mock-api.driven.com.br/api/v5/cineflex/movies')
            promise.then((response) => {
            setFilms (response.data)
        });

    }, [])
    
    return(
    <>        
            <Select>
                    <h1>Selecione o filme</h1>
            </Select>            
            <Container>
                <Poster>
                        {films.map (film => (   

                            <Link to={`/Sessions/${film.id}`}> 
                                <Backimg><img src={film.posterURL} /></Backimg> 
                            </Link>          

                        ))}
                </Poster>            
            </Container>
    </>
    )}

    const Container = Styled.div`
    display: flex;
    justify-content: center;
    
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

const Backimg = Styled.div`
    width: 145px;
    height: 209px;
    margin-bottom: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #FFFFFF;
    box-shadow: 0px 2px 4px 2px rgba(0, 0, 0, 0.1);
    border-radius: 3px;
`

const Poster = Styled.div`

    width: 80vw;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between; 

img{

    width: 130px;
    height: 194px;

}

`


/*const Poster = Styled.div`
    width: 145px;
    height: 209px;
    background: #FFFFFF;
    box-shadow: 0px 2px 4px 2px rgba(0, 0, 0, 0.1);
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin-right: 10px;
    margin-bottom: 10px;

    & img{
        width: 130px;
        height: 194px;
        background: #C3CFD9;
    }

`*/