import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import ServiceApuestas from '../services/ApuestasService'

export default class PaginaApuestas extends Component {
    service = new ServiceApuestas();

    state = {
        apuestas: [],
        status: false
    }

    loadApuestas = () => {
        this.service.getApuestas().then((datos) => {
            this.setState({
                apuestas: datos,
                status: true
            })
        })
    }

    componentDidMount = () => {
        this.loadApuestas();
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
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h1>Apuestas</h1>
                    <NavLink to="/create" className="btn btn-success">
                        Nueva apuesta
                    </NavLink>
                </div>
                <table className="table table-info table-striped">
                    <thead>
                        <tr>
                            <th>Usuario</th>
                            <th>Resultado</th>
                            <th>Fecha</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.apuestas.map((apuesta, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{apuesta.usuario}</td>
                                        <td>{apuesta.resultado}</td>
                                        <td>{apuesta.fecha && apuesta.fecha.substring(0, 10)}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}