//JugadoresService: getJugadoresEquipo(idequipo), findJugador(id) y buscarJugadores(nombre).

import axios from 'axios';
import Global from '../Global';

export default class ServiceJugadores {
async getJugadoresEquipo(idequipo) {
    let response = await axios.get(Global.urlApi + "api/Jugadores/JugadoresEquipos/" + idequipo);
    return response.data;
}
    async findJugador(id){
        const response = await axios.get(Global.urlApi + 'api/Jugadores/' + id);
        return response.data;
    }
async buscarJugadores(nombre) {
    const response = await axios.get(Global.urlApi + 'api/Jugadores/FindJugadores/' + nombre);
    return response.data;
}
}