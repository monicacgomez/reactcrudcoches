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
            <div className="mx-auto max-w-3xl px-5 py-10">
                <div className="rounded-2xl bg-white p-6 shadow-md">
                    <h1 className="text-3xl font-extrabold text-[#304860]">
                    Detalles del coche
                    </h1>
                    <p className="mt-4 rounded-lg bg-red-50 p-4 text-red-700">
                        {this.state.mensaje}</p>
                </div>
            </div>
            );
        }

        if (this.state.coche === null) {
            return (
            <div className="mx-auto max-w-3xl px-5 py-10">
                <div className="rounded-2xl bg-white p-6 text-center text-[#304860] shadow-md">
                Cargando detalles del coche...
                </div>
            </div>
            );
        }

        return (
            <div className="mx-auto max-w-3xl px-5 py-10">
                <div className="overflow-hidden rounded-2xl bg-white shadow-lg">
                    <div className="bg-[#304860] px-6 py-5">
                        <p className="text-sm font-semibold uppercase tracking-widest text-[#ddeeff]">
                            AUTO DRIVE · Ficha del vehículo
                        </p>
                        <h1 className="mt-2 text-3xl font-extrabold text-white">
                            Detalles del coche
                        </h1>
                    </div>

                    <div className="grid gap-6 p-6 sm:grid-cols-2 sm:p-8">
                        <div className="flex min-h-56 items-center justify-center rounded-xl bg-[#ddeeff] p-5">
                            <img
                                src={this.state.coche.imagen}
                                alt={this.state.coche.marca + ' ' + this.state.coche.modelo}
                                className="max-h-56 w-full object-contain"
                            />
                        </div>

                        <div className="flex flex-col justify-center gap-4">
                            <div className="rounded-xl bg-[#ddeeff] p-4">
                                <p className="text-sm font-semibold text-[#304860]">
                                    ID del coche
                                </p>
                                <p className="mt-1 text-lg font-bold text-[#304860]">
                                    {this.state.coche.idCoche}
                                </p>
                            </div>

                            <div className="rounded-xl bg-[#ddeeff] p-4">
                                <p className="text-sm font-semibold text-[#304860]">
                                    Marca
                                </p>
                                <p className="mt-1 text-lg font-bold text-[#304860]">
                                    {this.state.coche.marca}
                                </p>
                            </div>

                            <div className="rounded-xl bg-[#ddeeff] p-4">
                                <p className="text-sm font-semibold text-[#304860]">
                                    Modelo
                                </p>
                                <p className="mt-1 text-lg font-bold text-[#304860]">
                                    {this.state.coche.modelo}
                                </p>
                            </div>

                            <div className="rounded-xl bg-[#ddeeff] p-4">
                                <p className="text-sm font-semibold text-[#304860]">
                                    Conductor
                                </p>
                                <p className="mt-1 text-lg font-bold text-[#304860]">
                                    {this.state.coche.conductor}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
