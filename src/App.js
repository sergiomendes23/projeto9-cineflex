import React from "react";
import Navbar from "./Navbar";
import Home from "./Home";
import Sessions from "./Sessions";
import Success from "./Success";
import Seat from "./Seat";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";


export default function App (){

    const [selectedSeats, setSelectedSeats] = useState ([]);
    const [cpf, setCpf] = useState("");
    const [nome, setNome] = useState("");
    const [filme, setFilme] = useState ([]);
    const [data, setData] = useState ([]);

    function resetData() {
        setData([]);
        setCpf("");
        setNome("");
        setFilme([]);
        setSelectedSeats([]);
    }

    return (
        <BrowserRouter>
                <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/Sessions/:filmId" element={<Sessions />} />
                <Route path="/Seat/:seatId" element={<Seat  
                                                            selectedSeats={selectedSeats} 
                                                            setSelectedSeats = {setSelectedSeats}
                                                            cpf={cpf} 
                                                            setCpf = {setCpf} 
                                                            nome={nome} 
                                                            setNome = {setNome}
                                                            setFilme = {setFilme}
                                                    />} 
                />

                <Route path="/Success" element={<Success    resetData={resetData}
                                                            cpf={cpf}
                                                            nome={nome}
                                                            filme={filme}
                                                            selectedSeats={selectedSeats} />} />
            </Routes>
        </BrowserRouter>
    )
}