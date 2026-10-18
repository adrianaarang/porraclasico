//Jugadores del equipo
//Ruta /jugadores/:idequipo, con la tabla de jugadores.
//Enlace desde DetallesEquipo.
// Comprobación: ves la tabla con foto, nombre, posición y país.
import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
import ServiceJugadores from '../services/JugadoresService';

export default class JugadoresEquipo extends Component {
    service = new ServiceJugadores();

    state = {
        jugadores: [],
        status: false
    }

    loadJugadores = () => {
        this.service.getJugadoresEquipo(this.props.idequipo).then((result) => {
            this.setState({
                jugadores: result,
                status: true
            })
        })
    }

    componentDidMount = () => {
        this.loadJugadores();
    }

    componentDidUpdate = (oldProps) => {
        if (oldProps.idequipo != this.props.idequipo) {
            this.loadJugadores();
        }
    }

    render() {
        if (this.state.status == false) {
            return (
                <div className="text-center mt-5">
                    <div className="spinner-border text-primary"></div>
                </div>
            )
        }

        return (
            <div className="container mt-4">
                <h1 className="mb-4">Jugadores</h1>
                <table className='table table-info align-middle'>
                    <thead>
                        <tr>
                            <th>Imagen</th>
                            <th>Nombre</th>
                            <th>Posición</th>
                            <th>País</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.jugadores.map((jugador, index) => {
                                return (
                                    <tr key={index}>
                                        <td>
                                            <img src={jugador.imagen} alt={jugador.nombre}
                                                style={{ width: "60px" }} />
                                        </td>
                                        <td>{jugador.nombre}</td>
                                        <td>{jugador.posicion}</td>
                                        <td>{jugador.pais}</td>
                                        <td>
                                            <NavLink to={"/jugador/" + jugador.idJugador}
                                                className="btn btn-sm btn-primary">
                                                Detalles
                                            </NavLink>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
                <NavLink to={"/equipo/" + this.props.idequipo} className="btn btn-outline-secondary">
                    Volver al equipo
                </NavLink>
            </div>
        )
    }
}