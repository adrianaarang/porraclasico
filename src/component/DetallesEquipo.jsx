//Ruta /equipo/:idequipo, con su función envoltorio.
//componentDidMount y componentDidUpdate.
//✔ Comprobación: entra en un equipo desde el menú y luego cambia a otro. Tiene que actualizarse.
// hay que añadirlo a router

import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
import ServiceEquipos from '../services/EquiposService';

export default class DetallesEquipo extends Component {
    service = new ServiceEquipos();

    state = {
        equipo: null
    }

    loadEquipo = () => {
        this.service.findEquipo(this.props.idequipo).then((result) => {
            this.setState({
                equipo: result
            })
        })
    }

    //LA PRIMERA VEZ QUE SE PINTA
    componentDidMount = () => {
        this.loadEquipo();
    }

    //CUANDO CAMBIAMOS DE EQUIPO DESDE EL MENU (MISMA RUTA, OTRO ID)
    componentDidUpdate = (oldProps) => {
        if (oldProps.idequipo != this.props.idequipo) {
            this.loadEquipo();
        }
    }

    render() {
        if (this.state.equipo == null) {
            return (
                <div className="text-center mt-5">
                    <div className="spinner-border text-primary"></div>
                </div>
            )
        }

        return (
            <div className="container mt-4">
                <div className="card shadow-sm">
                    <div className="row g-0">
                        <div className="col-md-4 d-flex align-items-center justify-content-center p-4">
                            <img src={this.state.equipo.imagen}
                                alt={this.state.equipo.nombre}
                                className="img-fluid" style={{ maxHeight: "250px" }} />
                        </div>
                        <div className="col-md-8">
                            <div className="card-body">
                                <h1 className="card-title">{this.state.equipo.nombre}</h1>
                                <p className="card-text">{this.state.equipo.descripcion}</p>

                                <ul className="list-group list-group-flush mb-3">
                                    <li className="list-group-item d-flex justify-content-between">
                                        <strong>Champions</strong>
                                        <span>{this.state.equipo.champions}</span>
                                    </li>
                                    <li className="list-group-item d-flex justify-content-between">
                                        <strong>Finalista</strong>
                                        <span>{this.state.equipo.finalista}</span>
                                    </li>
                                    <li className="list-group-item d-flex justify-content-between">
                                        <strong>Web</strong>
                                        <a href={this.state.equipo.web} target="_blank">
                                            {this.state.equipo.web}
                                        </a>
                                    </li>
                                </ul>

                                <NavLink to={"/jugadores/" + this.state.equipo.idEquipo}
                                    className="btn btn-primary me-2">
                                    Ver jugadores
                                </NavLink>
                                <NavLink to="/" className="btn btn-outline-secondary">
                                    Volver
                                </NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}