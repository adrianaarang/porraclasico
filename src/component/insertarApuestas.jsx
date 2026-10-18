//Ruta /create, con el formulario y idApuesta: 0. Al guardar, Navigate a /apuestas.
import React, { Component } from 'react'
import ServiceApuestas from '../services/ApuestasService'
import { Navigate } from 'react-router-dom'; 

export default class InsertarApuestas extends Component {

service = new ServiceApuestas(); 
idApuesta = 0;
cajaUsuario = React.createRef();
cajaResultado = React.createRef();
cajaFecha = React.createRef();


 state = {
        mensaje: null,
        status: false,
    }
 insertApuesta = (event) => {
        event.preventDefault();
        //CREAMOS EL OBJETO APUESTA
        let apuesta = {
            idApuesta: 0,
            usuario: this.cajaUsuario.current.value,
            resultado: this.cajaResultado.current.value,
            fecha: this.cajaFecha.current.value,
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
        if (this.state.status == true) {
            return (<Navigate to="/" />)
        }

        let input = "mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-200";
        let label = "block text-sm font-medium text-slate-700";

        return (
            <main className="mx-auto max-w-lg px-4 py-12">
                <div className="overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-slate-200">

                    <div className="p-6">
                        <h1 className="text-2xl font-bold text-slate-900">Nueva apuesta</h1>
                        {
                            this.state.mensaje &&
                            (<p className="mt-3 rounded-lg bg-red-50 px-4 py-2 text-sm font-medium text-red-600">
                                {this.state.mensaje}
                            </p>)
                        }
                        <form className="mt-4 space-y-4">
                            <div>
                                <label className={label}>Id apuesta</label>
                                <input type="number" className={input} ref={this.idApuesta} />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className={label}>Usuario</label>
                                    <input type="text" className={input} ref={this.cajaUsuario} />
                                </div>
                                <div>
                                    <label className={label}>Resultado</label>
                                    <input type="text" className={input} ref={this.cajaResultado} />
                                </div>
                            </div>
                            <div>
                                <label className={label}>Fecha</label>
                                <input type="text" className={input} ref={this.cajaFecha} />
                            </div>
                         
                            <button onClick={this.insertApuesta}
                                className="w-full rounded-lg bg-amber-400 px-4 py-2.5 font-semibold text-slate-900 transition hover:bg-amber-300">
                                Insertar
                            </button>
                        </form>
                    </div>
                </div>
            </main>
        )
    }
}