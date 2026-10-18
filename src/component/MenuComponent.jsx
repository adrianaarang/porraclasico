import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import ServiceEquipos from '../services/EquiposService'

export default class MenuComponent extends Component {
    serviceEquipos = new ServiceEquipos();

    state = {
        equipos: []
    }

    //AL MONTAR EL MENU, CARGAMOS LOS EQUIPOS PARA EL DESPLEGABLE
    componentDidMount = () => {
        this.serviceEquipos.getEquipos().then((datos) => {
            this.setState({
                equipos: datos
            })
        })
    }

    render() {
        return (
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <NavLink className="navbar-brand" to="/">
                        Champions
                    </NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#menuPrincipal" aria-controls="menuPrincipal"
                        aria-expanded="false" aria-label="Abrir menú">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="menuPrincipal">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/">Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/apuestas">Apuestas</NavLink>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" role="button"
                                    data-bs-toggle="dropdown" aria-expanded="false">
                                    Equipos
                                </a>
                                <ul className="dropdown-menu">
                                    {
                                        this.state.equipos.map((equipo, index) => {
                                            return (
                                                <li key={index}>
                                                    <NavLink className="dropdown-item"
                                                        to={"/equipo/" + equipo.idEquipo}>
                                                        {equipo.nombre}
                                                    </NavLink>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}