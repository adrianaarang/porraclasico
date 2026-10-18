import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
import ServiceEquipos from '../services/EquiposService';

export default class HomeComponent extends Component {
    serviceEquipos = new ServiceEquipos();

    state = {
        equipos: [],
        status: false
    }

    loadEquipos = () => {
        this.serviceEquipos.getEquipos().then((datos) => {
            this.setState({
                equipos: datos,
                status: true
            })
        });
    }

    componentDidMount = () => {
        this.loadEquipos();
    }

    render() {
        if (this.state.status == false) {
            return (<div className="text-center mt-5"><div className="spinner-border"></div></div>)
        }
        return (
            <div className="container mt-4">
                <h1 className="text-center mb-4">Porra del Clásico</h1>
                <div className="row">
                    {
                        this.state.equipos.map((equipo, index) => {
                            return (
                                <div className="col-md-6 mb-4" key={index}>
                                    <div className="card h-100 text-center">
                                        <img src={equipo.imagen} className="card-img-top p-4"
                                            style={{ height: "250px", objectFit: "contain" }} alt={equipo.nombre} />
                                        <div className="card-body">
                                            <h5 className="card-title">{equipo.nombre}</h5>
                                            <NavLink to={"/equipo/" + equipo.idEquipo} className="btn btn-primary">
                                                Ver equipo
                                            </NavLink>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}