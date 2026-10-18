//Ruta /jugador/:idjugador.
//Enlace desde cada fila de la tabla.
// Comprobación: haces clic en un jugador y ves su ficha.
//añadir a route

import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
import ServiceJugador from '../services/JugadoresService';

export default class DetallesJugador extends Component {
    service = new ServiceJugador();

    state = {
        jugador: null
    }

    loadJugador = () => {
        this.service.findJugador(this.props.id).then((result) => {
            this.setState({
                jugador: result
            })
        })
    }

    componentDidMount = () => {
        this.loadJugador();
    }

    componentDidUpdate = (oldProps) => {
        if (oldProps.id != this.props.id) {
            this.loadJugador();
        }
    }


    
        render() {
            if (this.state.jugador == null) {
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
                                <img src={this.state.jugador.imagen}
                                    alt={this.state.jugador.nombre}
                                    className="img-fluid" style={{ maxHeight: "250px" }} />
                            </div>
                            <div className="col-md-8">
                                <div className="card-body">
                                    <h1 className="card-title">{this.state.jugador.nombre}</h1>
                                    <p className="card-text">{this.state.jugador.posicion}</p>
    
                                    <ul className="list-group list-group-flush mb-3">
                                        <li className="list-group-item d-flex justify-content-between">
                                            <strong>fecha nacimiento</strong>
                                            <span>{this.state.jugador.fechaNacimiento}</span>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between">
                                            <strong>pais
                                                
                                            </strong>
                                            <span>{this.state.jugador.pais}</span>
                                        </li>
                                          <li className="list-group-item d-flex justify-content-between">
                                            <strong>Id equipo
                                                
                                            </strong>
                                            <span>{this.state.jugador.idEquipo}</span>
                                        </li>
                                        
                                    </ul>
    
                                    <NavLink to={"/jugadores/" + this.state.jugador.idEquipo}
                                        className="btn btn-primary me-2">
                                        Volver jugadores
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