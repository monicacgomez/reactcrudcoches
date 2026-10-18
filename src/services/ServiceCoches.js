import axios from 'axios';
import Global from '../Global';

export default class ServiceCoches {

    //Método para obtener TODOS los coches.
    getCoches() {

        // new Promise, permite entregar el resultado cuando termine la petición
        return new Promise(function(resolve, reject) {
            //La URL base - recupera la dirección guardada en Global.js
            let url = Global.urlApiCoches;

            //La ruta de la operación - debe coincidir con la ruta de listado de Swagger
            let request = "api/Coches";

            //La petición - combina la URL base con la ruta y realiza una petición GET
            axios.get(url + request).then((response) => {
                console.log("Leyendo coches");

                //La respuesta - response: contiene la respuesta de Axios & responsed.data: contiene los datos que devuelve la API
                resolve(response.data);
            }).catch((error)  => {
                console.log("Error obteniendo los coches: " + error);
                reject(error);
            })
        })
    }

    //Método para obtener un coche por su ID
    getCoche(idCoche) {
        return new Promise(function(resolve, reject) {
            let url = Global.urlApiCoches;
            let request = "api/Coches/FindCoche/" + idCoche;

            axios.get(url + request).then((response) => {
                console.log("Obteniendo el coche: " + idCoche);
                resolve(response.data);
            }).catch((error) => {
                reject(error);
            })
        })
    }

    //Método para insertar un coche
    insertCoche(coche){
        return new Promise(function(resolve, reject) {
            let url = Global.urlApiCoches;
            let request = "api/Coches/InsertCoche";

            //url + request indica a qué endpoint envío la petición - coche: es el objeto que envío en el cuerpo de la petición
            axios.post(url + request, coche)
            .then((response) => {
                console.log ("Insertando el coche");
                resolve(response);
            }).catch((error)  => {
                console.log("Error insertando " + error);
                reject(error);
            })
        })
    }

    //Método para actualizar un coche
    updateCoche(coche) {
        return new Promise(function(resolve, reject) {
            let url = Global.urlApiCoches;
            let request = "api/Coches/UpdateCoche";

            axios.put(url + request, coche).then((response) => {
                console.log("Actualizar el coche");
                resolve(response);
            }).catch((error)  => {
                console.log("Error actualizando el coche: " + error);
                reject(error);
            })
        })
    }

    //Método para eliminar un coche por su ID
    deleteCoche (idCoche){
        return new Promise(function(resolve, reject) {
            let url = Global.urlApiCoches;
            let request = "api/Coches/DeleteCoche/" + idCoche;
            
            axios.delete(url + request).then((response) => {
                console.log("Coche eliminado: "+ idCoche);
                resolve(response);
            }).catch((error) => {
                reject(error);
            })
        })
    }
}