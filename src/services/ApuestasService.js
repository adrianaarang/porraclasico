//ApuestasService: getApuestas(), insertApuesta(apuesta) y deleteApuesta(id).

import axios from 'axios';
import Global from '../Global';

export default class ServiceApuestas {
    async getApuestas(){
        const response = await axios.get(Global.urlApi + '/api/Apuestas');
        return response.data;
    }
    async insertApuesta(apuesta){
        const response = await axios.post(Global.urlApi + '/api/Apuestas', apuesta);
        return response.data;
    }
    async deleteApuesta(id){
        const response = await axios.delete(Global.urlApi + '/api/Apuestas/' + id);
        return response.data;
    }

    
}

