import React, { Component } from 'react'
import { BrowserRouter, Route, Routes, useParams } from 'react-router-dom'
import MenuComponent from './MenuComponent'
import HomeComponent from './HomeComponent'
import DetallesEquipo from './DetallesEquipo'
import JugadoresEquipo from './JugadoresEquipo'
import DetallesJugador from './DetallesJugador'
import PaginaApuestas from './PaginaApuestas'
import InsertarApuestas from './InsertarApuestas'

function DetallesEquipoElement() {
    let { idequipo } = useParams();
    return <DetallesEquipo idequipo={idequipo} />
}

function JugadoresEquipoElement() {
    let { idequipo } = useParams();
    return <JugadoresEquipo idequipo={idequipo} />
}

function DetallesJugadorElement() {
    let { idjugador } = useParams();
    return <DetallesJugador id={idjugador} />
}

export default class Router extends Component {
    render() {
        return (
            <BrowserRouter>
                <MenuComponent />
                <Routes>
                    <Route path="/" element={<HomeComponent />} />
                    <Route path="/equipo/:idequipo" element={<DetallesEquipoElement />} />
                    <Route path="/jugadores/:idequipo" element={<JugadoresEquipoElement />} />
                    <Route path="/jugador/:idjugador" element={<DetallesJugadorElement />} />
                    <Route path="/apuestas" element={<PaginaApuestas />} />
                    <Route path="/create" element={<InsertarApuestas />} />
                </Routes>
            </BrowserRouter>
        )
    }
}