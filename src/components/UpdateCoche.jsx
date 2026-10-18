import React, { Component } from 'react';
import ServiceCoches from '../services/ServiceCoches';
import { Navigate } from 'react-router-dom';

export default class UpdateCoche extends Component {
    service = new ServiceCoches();

    cajaMarca = React.createRef();
    cajaModelo = React.createRef();
    cajaConductor = React.createRef();
    cajaImagen = React.createRef();

    state = {
        status: false,
        coche: null,
        mensaje: null
    };

    loadCoche = () => {
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
    };

    componentDidMount = () => {
        this.loadCoche();
    };

    updateCoche = (event) => {
        event.preventDefault();

        let coche = {
            idCoche: this.state.coche.idCoche,
            marca: this.cajaMarca.current.value,
            modelo: this.cajaModelo.current.value,
            conductor: this.cajaConductor.current.value,
            imagen: this.cajaImagen.current.value
        };

        this.service.updateCoche(coche)
            .then(() => {
                this.setState({
                    status: true
                });
            })
            .catch((error) => {
                this.setState({
                    mensaje: error.message
                });
            });
    };

    render() {
        if (this.state.status === true) {
            return <Navigate to="/" />;
        }

        if (this.state.mensaje && this.state.coche === null) {
            return <p>Error: {this.state.mensaje}</p>;
        }

        if (this.state.coche === null) {
            return <p>Cargando coche...</p>;
        }

        return (
            <div>
                <h1>Update coche</h1>

                {this.state.mensaje && (
                    <p>{this.state.mensaje}</p>
                )}

                <form onSubmit={this.updateCoche}>
                    <label>Id:</label>
                    <input
                        type="text"
                        value={this.state.coche.idCoche}
                        disabled
                        readOnly
                    />

                    <label>Marca:</label>
                    <input
                        type="text"
                        defaultValue={this.state.coche.marca}
                        ref={this.cajaMarca}
                        required
                    />

                    <label>Modelo:</label>
                    <input
                        type="text"
                        defaultValue={this.state.coche.modelo}
                        ref={this.cajaModelo}
                        required
                    />

                    <label>Conductor:</label>
                    <input
                        type="text"
                        defaultValue={this.state.coche.conductor}
                        ref={this.cajaConductor}
                        required
                    />

                    <label>Imagen (URL o ruta):</label>
                    <input
                        type="text"
                        defaultValue={this.state.coche.imagen || ''}
                        ref={this.cajaImagen}
                    />

                    <button type="submit">
                        Update
                    </button>
                </form>
            </div>
        );
    }
}
