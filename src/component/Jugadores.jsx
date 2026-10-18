import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import ServiceJugadores from '../services/JugadoresService'

export default class Jugadores extends Component {
    service = new ServiceJugadores();

    state = {
        jugadores: [],
        status: false
    }

    //MIRAMOS QUE PROP NOS HA LLEGADO Y BUSCAMOS EN CONSECUENCIA
    loadJugadores = () => {
        if (this.props.idequipo) {
            this.service.getJugadoresEquipo(this.props.idequipo).then((result) => {
                this.setState({
                    jugadores: result,
                    status: true
                })
            })
        } else if (this.props.nombre) {
            this.service.buscarJugadores(this.props.nombre).then((result) => {
                this.setState({
                    jugadores: result,
                    status: true
                })
            })
        }
    }

    componentDidMount = () => {
        this.loadJugadores();
    }

    //SI HACEMOS OTRA BUSQUEDA, CAMBIAN LAS PROPS Y VOLVEMOS A BUSCAR
    componentDidUpdate = (oldProps) => {
        if (oldProps.idequipo != this.props.idequipo
            || oldProps.nombre != this.props.nombre) {
            this.loadJugadores();
        }
    }

    render() {
        //MIENTRAS CARGA
        if (this.state.status == false) {
            return (
                <div className="text-center mt-4">
                    <div className="spinner-border text-primary"></div>
                </div>
            )
        }

        //SI LA BUSQUEDA NO DEVUELVE NADA
        if (this.state.jugadores.length == 0) {
            return (
                <div className="alert alert-warning mt-4">
                    No se han encontrado jugadores.
                </div>
            )
        }

        return (
            <table className='table table-info align-middle mt-4'>
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
        )
    }
}