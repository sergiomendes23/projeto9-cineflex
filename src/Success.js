import { Link, useNavigate } from "react-router-dom";
import Styled from "styled-components";


export default function Success(props){
    
    const{ cpf, nome, selectedSeats, filme, resetData} = props
    const navigate = useNavigate();


    return (
        <Container>
            <Done>
                <h1>Pedido feito com sucesso!</h1>
            </Done>
            <Info>
                <h1>Filme e Sessão</h1>
                <p>{filme.movie.title}</p>
                <p>{filme.day.date} {filme.name}</p>
            </Info>
            <Dados>
                <h1>Ingressos</h1>
                <p>{selectedSeats.map((selectedSeats) => {
                    return(<p>assento {selectedSeats.name}</p>)
                })}</p>
            </Dados>
            <PeopleData>
                <h1>Pedido feito</h1>
                <p>Nome: {nome}</p>
                <p>CPF: {cpf}</p>
            </PeopleData>            
            <BackHome to="/" style={{textDecoration: 'none'}}>Voltar para home</BackHome>            
        </Container>
    )
}

const Container = Styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-Content: center;
    flex-direction: column;
`
const Done = Styled.div`
    width: 150px;
    height: 100px;
    font-family: 'Roboto';
    font-weight: 700;
    font-size: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    color: #247A6B;
`
const Info = Styled.div`
    width: 250px;
    height: 150px;

    & h1{
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    color: #293845;
    margin-bottom: 15px;
    }
    & p{
    font-family: 'Roboto';
    font-weight: 400;
    font-size: 22px;
    line-height: 26px;
    display: flex;
    align-items: center;
    color: #293845;
    }
`
const Dados = Styled.div`
    width: 250px;
    height: 150px;

    & h1{
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    color: #293845;
    margin-bottom: 15px;
    }
    & p{
    font-family: 'Roboto';
    font-weight: 400;
    font-size: 22px;
    line-height: 26px;
    color: #293845;
    }
`
const PeopleData = Styled.div`
    width: 250px;
    height: 120px;

    & h1{
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    color: #293845;
    margin-bottom: 10px;
    }
    & p{
    font-family: 'Roboto';
    font-weight: 400;
    font-size: 22px;
    line-height: 26px;
    color: #293845;
    }
`
const BackHome = Styled(Link)`
    width: 225px;
    height: 42px;
    font-family: 'Roboto';
    font-weight: 400;
    font-size: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #E8833A; 
    color: #FFFFFF;
    border-radius: 3px;
    border: none;
    cursor:pointer;
`