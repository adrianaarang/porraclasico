import React, { Component } from 'react'
import { BrowserRouter, Route, Routes, useParams } from 'react-router-dom'
import MenuComponent from './MenuComponent'
import HomeComponent from './HomeComponent'
import DetallesEquipo from './DetallesEquipo'
import JugadoresEquipo from './JugadoresEquipo'

import DetallesJugador from './DetallesJugador'

function DetallesJugadorElement(){
    let { idjugador } = useParams();
    return <DetallesJugador id={idjugador} />
}

function JugadoresEquipoElement() {
    let { idequipo } = useParams();
    return <JugadoresEquipo idequipo={idequipo} />
}

function DetallesEquipoElement() {
    let { idequipo } = useParams();
    return <DetallesEquipo idequipo={idequipo} />
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
                    <Route path="/jugador/:idjugador" element ={<DetallesJugadorElement />} />
                </Routes>
            </BrowserRouter>
        )
    }
}
