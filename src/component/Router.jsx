import React, { Component } from 'react'
import { BrowserRouter, Route, Routes, useParams } from 'react-router-dom'
import MenuComponent from './MenuComponent'
import HomeComponent from './HomeComponent' 
import DetallesEquipo from './DetallesEquipo'

function DetallesEquipoElement() {
    let { idequipo } = useParams();
    return <DetallesEquipo idequipo={idequipo}/>
}

export default class Router extends Component {
    render() {
        return (
            <BrowserRouter>
                <MenuComponent/>
                <Routes>
                    <Route path="/" element={<HomeComponent/>}/>
                    <Route path="/equipo/:idequipo" element={<DetallesEquipoElement/>}/>
                </Routes>
            </BrowserRouter>
        )
    }
}