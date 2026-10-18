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
            return (<div className="mx-auto max-w-2xl px-5 py-10">
                    <div className="rounded-2xl bg-white p-6 shadow-md">
                        <h1 className="text-2xl font-bold text-[#304860]">
                            Editar coche
                        </h1>
                        <p className="mt-4 rounded-lg bg-red-50 p-4 text-red-700">
                            Error: {this.state.mensaje}
                        </p>
                    </div>
                </div>
            );
        }

        if (this.state.coche === null) {
            return (
                <div className="mx-auto max-w-2xl px-5 py-10">
                    <div className="rounded-2xl bg-white p-6 text-center text-[#304860] shadow-md">
                        Cargando coche...
                    </div>
                </div>
            );
        }

        return (
        <div className="mx-auto max-w-2xl px-5 py-10">
            <div className="overflow-hidden rounded-2xl bg-white shadow-lg">
                <div className="bg-[#304860] px-6 py-5">
                    <p className="text-sm font-semibold uppercase tracking-widest text-[#ddeeff]">
                    AUTO DRIVE · Gestión de vehículos
                    </p>
                    <h1 className="mt-2 text-3xl font-extrabold text-white">
                    Editar coche
                    </h1>
                    <p className="mt-2 text-sm text-[#ddeeff]">
                    Modifica los datos del vehículo seleccionado.
                    </p>
                </div>
                
                <form onSubmit={this.updateCoche} className="space-y-5 p-6 sm:p-8">
                    {this.state.mensaje && (
                        <p className="rounded-lg bg-red-50 p-4 text-red-700">
                        {this.state.mensaje}
                        </p>
                    )}

                <div>
                    <label className="mb-2 block text-sm font-semibold text-[#304860]">
                        ID del coche
                    </label>
                    <input
                    type="text"
                    value={this.state.coche.idCoche}
                    disabled
                    readOnly 
                    className="w-full rounded-lg border border-[#ddeeff] bg-[#ddeeff] px-4 py-3 text-[#304860] opacity-80"
                    />
                    
                    <p className="mt-1 text-xs text-slate-500">
                    El identificador no se puede modificar.
                    </p>
                </div>

                <div>
                    <label className="mb-2 block text-sm font-semibold text-[#304860]">
                    Marca
                    </label>
                    <input type="text" defaultValue={this.state.coche.marca} ref={this.cajaMarca} required
                    className="w-full rounded-lg border border-[#7da7d9] bg-white px-4 py-3 text-[#304860] outline-none transition focus:ring-2 focus:ring-[#7da7d9]"/>
                </div>
                
                <div>
                    <label className="mb-2 block text-sm font-semibold text-[#304860]">
                    Modelo
                    </label>
                    <input type="text" defaultValue={this.state.coche.modelo} ref={this.cajaModelo}
                    required className="w-full rounded-lg border border-[#7da7d9] bg-white px-4 py-3 text-[#304860] outline-none transition focus:ring-2 focus:ring-[#7da7d9]"
                    />
                </div>

                <div>
                    <label className="mb-2 block text-sm font-semibold text-[#304860]">
                    Conductor
                    </label>
                    <input type="text" defaultValue={this.state.coche.conductor} ref={this.cajaConductor}
                    required className="w-full rounded-lg border border-[#7da7d9] bg-white px-4 py-3 text-[#304860] outline-none transition focus:ring-2 focus:ring-[#7da7d9]"
                    />
                </div>
                
                <div>
                    <label className="mb-2 block text-sm font-semibold text-[#304860]">
                    Imagen (URL o ruta)
                    </label>
                    <input type="text" defaultValue={this.state.coche.imagen || ''}
                    ref={this.cajaImagen} className="w-full rounded-lg border border-[#7da7d9] bg-white px-4 py-3 text-[#304860] outline-none transition focus:ring-2 focus:ring-[#7da7d9]"
                    />
                    <p className="mt-1 text-xs text-slate-500">
                    Introduce la URL o ruta de la imagen del coche.
                    </p>
                </div>
                
                <button type="submit" className="w-full rounded-xl bg-[#304860] px-5 py-3 font-bold text-white shadow-md transition hover:bg-[#7da7d9] hover:text-[#304860]">
                Guardar cambios
                </button>
                </form>
            </div>
        </div>
        );
    }
}
