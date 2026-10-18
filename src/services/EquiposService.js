import axios from 'axios';
import Global from '../Global';

export default class ServiceEquipos {

    async getEquipos() {
        const response = await axios.get(Global.urlApi + '/api/Equipos');
        return response.data;
    }
    async findEquipo(idEquipo) {
        const response = await axios.get(Global.urlApi + '/api/Equipos/' + idEquipo);
        return response.data;
    }


}