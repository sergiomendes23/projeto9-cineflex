import React from "react";
import Navbar from "./Navbar";
import Home from "./Home";
import Sessions from "./Sessions";
import Seat from "./Seat";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";


export default function App (){
    return (
        <BrowserRouter>
                <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/Sessions/:filmId" element={<Sessions />} />
                <Route path="/Seat/:seatId" element={<Seat />} />
            </Routes>
        </BrowserRouter>
    )
}