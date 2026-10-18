// No importo axios ni Global en este componente: toda la comunicación con la API queda centralizada en ServiceCoches.js
import React, { Component } from 'react';
import ServiceCoches from '../services/ServiceCoches';

export default class DetallesCoche extends Component {

    service = new ServiceCoches();

    state = {
        coche: null,
        mensaje: null
    }

    loadCoche = () => {
        // this.props.id recibe el identificador enviado por el router - this.service.getCoche(this.props.id) consulta el servicio que ya he creado
        this.service.getCoche(this.props.id)
            .then((result) => {
                this.setState({
                    coche: result,
                    mensaje: null
                });
            })
            .catch((error) => {
                this.setState({
                    mensaje: error.message
                });
            });
    }

    componentDidMount = () => {
        this.loadCoche();
    }

    render() {
        if (this.state.mensaje) {
            return (
                <div>
                    <h1>Detalles del coche</h1>
                    <p>{this.state.mensaje}</p>
                </div>
            );
        }

        if (this.state.coche === null) {
            return <p>Cargando detalles del coche...</p>;
        }

        return (
            <div>
                <h1>Detalles del coche</h1>

                <h2>ID: {this.state.coche.idCoche}</h2>
                <h3>Marca: {this.state.coche.marca}</h3>
                <h3>Modelo: {this.state.coche.modelo}</h3>
                <h3>Conductor: {this.state.coche.conductor}</h3>

                <img
                    src={this.state.coche.imagen}
                    alt={this.state.coche.marca + ' ' + this.state.coche.modelo}
                    style={{ width: "150px", height: "150px", objectFit: "contain" }}
                />
            </div>
        );
    }
}
