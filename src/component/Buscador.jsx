import React, { Component } from 'react'
import ServiceEquipos from '../services/EquiposService'
import Jugadores from './Jugadores'

export default class Buscador extends Component {
    serviceEquipos = new ServiceEquipos();
    selectEquipo = React.createRef();
    cajaNombre = React.createRef();

    state = {
        equipos: [],
        idequipo: null,
        nombre: null
    }

    //AL INICIAR, CARGAMOS LOS EQUIPOS EN EL SELECT
    componentDidMount = () => {
        this.serviceEquipos.getEquipos().then((datos) => {
            this.setState({
                equipos: datos
            })
        })
    }

    //BUSCAR POR EQUIPO: GUARDAMOS EL ID Y BORRAMOS EL NOMBRE
    buscarPorEquipo = (event) => {
        event.preventDefault();
        this.setState({
            idequipo: this.selectEquipo.current.value,
            nombre: null
        })
    }

    //BUSCAR POR NOMBRE: GUARDAMOS EL NOMBRE Y BORRAMOS EL EQUIPO
    buscarPorNombre = (event) => {
        event.preventDefault();
        this.setState({
            nombre: this.cajaNombre.current.value,
            idequipo: null
        })
    }

    render() {
        return (
            <div className="container mt-4">
                <h1 className="mb-4">Buscador de jugadores</h1>

                <div className="row g-3">
                    {/* BUSCAR POR EQUIPO */}
                    <div className="col-md-6">
                        <form className="card card-body h-100">
                            <label className="form-label fw-bold">Por equipo</label>
                            <select className="form-select mb-3" ref={this.selectEquipo}>
                                {
                                    this.state.equipos.map((equipo, index) => {
                                        return (
                                            <option key={index} value={equipo.idEquipo}>
                                                {equipo.nombre}
                                            </option>
                                        )
                                    })
                                }
                            </select>
                            <button className="btn btn-primary" onClick={this.buscarPorEquipo}>
                                Buscar por equipo
                            </button>
                        </form>
                    </div>

                    {/* BUSCAR POR NOMBRE */}
                    <div className="col-md-6">
                        <form className="card card-body h-100">
                            <label className="form-label fw-bold">Por nombre</label>
                            <input type="text" className="form-control mb-3"
                                ref={this.cajaNombre} placeholder="Ej: Vini" />
                            <button className="btn btn-primary" onClick={this.buscarPorNombre}>
                                Buscar por nombre
                            </button>
                        </form>
                    </div>
                </div>

                {/* RESULTADOS: SOLO UNA DE LAS DOS PROPS */}
                {
                    this.state.idequipo &&
                    (<Jugadores idequipo={this.state.idequipo} />)
                }
                {
                    this.state.nombre &&
                    (<Jugadores nombre={this.state.nombre} />)
                }
            </div>
        )
    }
}