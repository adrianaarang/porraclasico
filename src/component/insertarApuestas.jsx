///Ruta /create, con el formulario y idApuesta: 0. Al guardar, Navigate a /apuestas.
import React, { Component } from 'react'
import { Navigate } from 'react-router-dom'
import ServiceApuestas from '../services/ApuestasService'

export default class InsertarApuestas extends Component {
    service = new ServiceApuestas();
    cajaUsuario = React.createRef();
    cajaResultado = React.createRef();
    cajaFecha = React.createRef();

    state = {
        mensaje: null,
        status: false
    }

    insertApuesta = (event) => {
        event.preventDefault();
        //CREAMOS EL OBJETO APUESTA (EL ID DA IGUAL, LO GENERA LA API)
        let apuesta = {
            idApuesta: 0,
            usuario: this.cajaUsuario.current.value,
            resultado: this.cajaResultado.current.value,
            fecha: this.cajaFecha.current.value
        }
        //LOS ERRORES SE CAPTURAN IGUAL EN UNA PROMESA (then...catch)
        this.service.insertApuesta(apuesta)
            .then((result) => {
                this.setState({
                    status: true
                })
            }).catch((error) => {
                this.setState({
                    mensaje: error.message
                })
            })
    }

    render() {
        //AL GUARDAR, VOLVEMOS A LA LISTA DE APUESTAS
        if (this.state.status == true) {
            return (<Navigate to="/apuestas" />)
        }

        return (
            <div className="container mt-4" style={{ maxWidth: "500px" }}>
                <h1 className="mb-3">Nueva apuesta</h1>
                {
                    this.state.mensaje &&
                    (<div className="alert alert-danger">{this.state.mensaje}</div>)
                }
                <form>
                    <div className="mb-3">
                        <label className="form-label">Usuario</label>
                        <input type="text" className="form-control" ref={this.cajaUsuario} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Resultado</label>
                        <input type="text" className="form-control" ref={this.cajaResultado}
                            placeholder="Ej: 2-1" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Fecha</label>
                        <input type="date" className="form-control" ref={this.cajaFecha} />
                    </div>
                    <button className="btn btn-primary" onClick={this.insertApuesta}>
                        Guardar apuesta
                    </button>
                </form>
            </div>
        )
    }
}