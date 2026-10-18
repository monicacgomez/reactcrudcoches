import React, { Component } from 'react'
import ServiceCoches from '../services/ServiceCoches'
import { Navigate } from 'react-router-dom'

export default class CreateCoche extends Component {
    service = new ServiceCoches();

    cajaNumero = React.createRef();
    cajaMarca = React.createRef();
    cajaModelo = React.createRef();
    cajaConductor = React.createRef();
    cajaImagen = React.createRef();

    state = {
        mensaje: null,
        status: false
    }

    insertCoche = (event) => {
        event.preventDefault();
        // CREO EL OBJETO COCHE
        let coche = {
            idCoche: parseInt(this.cajaNumero.current.value),
            marca: this.cajaMarca.current.value,
            modelo: this.cajaModelo.current.value,
            conductor: this.cajaConductor.current.value,
            imagen: this.cajaImagen.current.value
        }

        // CAPTURA DE ERRORES
        this.service.insertCoche(coche)
        .then ((result) => {
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
        return (<Navigate to="/"/>)
    }else{
        return (
        <div className="mx-auto max-w-2xl px-5 py-10">
            <div className="overflow-hidden rounded-2xl bg-white shadow-lg">
                <div className="bg-[#304860] px-6 py-5">
                    <p className="text-sm font-semibold uppercase tracking-widest text-[#ddeeff]">
                        AUTO DRIVE · Gestión de vehículos
                    </p>
                    <h1 className="mt-2 text-3xl font-extrabold text-white">
                    Añadir coche
                    </h1>
                    <p className="mt-2 text-sm text-[#ddeeff]">
                    Introduce los datos del nuevo vehículo.
                    </p>
                </div>
                
                <form onSubmit={this.insertCoche} className="space-y-5 p-6 sm:p-8">
                {this.state.mensaje && (
                    <p className="rounded-lg bg-red-50 p-4 text-red-700">
                    Error: {this.state.mensaje}
                    </p>
                )}
                
                <div>
                    <label className="mb-2 block text-sm font-semibold text-[#304860]">
                        ID del coche
                    </label>
                    <input type="number" ref={this.cajaNumero}
                    required className="w-full rounded-lg border border-[#7da7d9] bg-white px-4 py-3 text-[#304860] outline-none transition focus:ring-2 focus:ring-[#7da7d9]"/>
                </div>
                
                <div>
                    <label className="mb-2 block text-sm font-semibold text-[#304860]">
                    Marca
                    </label>
                    <input type="text" ref={this.cajaMarca}
                    required className="w-full rounded-lg border border-[#7da7d9] bg-white px-4 py-3 text-[#304860] outline-none transition focus:ring-2 focus:ring-[#7da7d9]"
                    />
                </div>
                
                <div>
                    <label className="mb-2 block text-sm font-semibold text-[#304860]">
                    Modelo
                    </label>
                    <input type="text" ref={this.cajaModelo}
                    required className="w-full rounded-lg border border-[#7da7d9] bg-white px-4 py-3 text-[#304860] outline-none transition focus:ring-2 focus:ring-[#7da7d9]"
                    />
                </div>
                
                <div>
                    <label className="mb-2 block text-sm font-semibold text-[#304860]">
                    Conductor
                    </label>
                    <input type="text" ref={this.cajaConductor} 
                    required className="w-full rounded-lg border border-[#7da7d9] bg-white px-4 py-3 text-[#304860] outline-none transition focus:ring-2 focus:ring-[#7da7d9]"
                    />
                </div>

                <div>
                    <label className="mb-2 block text-sm font-semibold text-[#304860]">
                    Imagen (URL o ruta)
                    </label>
                    <input type="text" ref={this.cajaImagen} placeholder="https://..."
                    className="w-full rounded-lg border border-[#7da7d9] bg-white px-4 py-3 text-[#304860] outline-none transition focus:ring-2 focus:ring-[#7da7d9]"
                    />
                    <p className="mt-1 text-xs text-slate-500">
                    Introduce la dirección de la imagen del coche.
                    </p>
                </div>
                
                <button type="submit"
                className="w-full rounded-xl bg-[#304860] px-5 py-3 font-bold text-white shadow-md transition hover:bg-[#7da7d9] hover:text-[#304860]">
                    Añadir coche
                </button>
                </form>
            </div>
        </div>
    );
}
}
}