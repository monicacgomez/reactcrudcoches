import React, { Component } from 'react';
import loading from './../assets/images/loading.gif';
import ServiceCoches from '../services/ServiceCoches';
import { NavLink } from 'react-router-dom';

export default class HomeComponent extends Component {
    service = new ServiceCoches();
    state = {
        coches: [],
        status: false
    }

    loadCoches = () => {
        this.service.getCoches().then((result) => {
            this.setState({
                coches: result,
                status: true
            })
        })
        .catch((error) => {
            this.setState({
                status: true,
                mensaje: error.message
            });
        });
    };

    deleteCoche = (idCoche) => {
        if (window.confirm("¿Seguro que quieres eliminar este coche?")) {
        this.service.deleteCoche(idCoche).then((result) => {
            this.loadCoches();
        })
        .catch((error) => {
                this.setState({
                    error: error.message
                });
            });
        }
    };

    componentDidMount = () => {
        this.loadCoches();
    }

  render() {
    if (this.state.status === false) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <img src={loading} alt="Cargando coches..." />
            </div>
        );
    }

    return (
     <main className="mx-auto min-h-screen max-w-7xl px-5 py-10">
        
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <div>
                <h1 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
                Nuestro concesionario
                </h1>
                <p className="mt-2 text-slate-700">
                    Descubre todos nuestros coches.
                </p>
            </div>

            <NavLink to="/create" className="rounded-xl bg-[#7da7d9] px-5 py-3 font-bold text-[#304860] shadow-md transition hover:bg-[#ddeeff]">
            Añadir coche
            </NavLink>
            </div>
            
            {this.state.mensaje && 
            (<p className="mb-6 rounded-lg bg-red-100 p-4 font-medium text-red-800">
                Error: {this.state.mensaje}
            </p>
            )}
            
            {this.state.coches.length === 0 ? (
                <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
                    <h2 className="text-xl font-bold text-slate-800">
                        Todavía no hay coches
                    </h2>
                    <p className="mt-2 text-slate-600">
                    ¡Añade el primero a tu concesionario!
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {this.state.coches.map((car) => (
                        <article 
                        key={car.idCoche}
                        className="overflow-hidden rounded-2xl bg-white shadow-md transition duration-200 hover:-translate-y-1 hover:shadow-xl">
                            
                            <div className="flex h-52 items-center justify-center bg-[#ddeeff] p-4">
                                <img
                                src={car.imagen}
                                alt={car.marca + ' ' + car.modelo}
                                className="h-full w-full object-contain"
                                />
                            </div>

                            <div className="p-5">
                                <p className="text-sm font-semibold uppercase tracking-wider text-[#304860]">
                                    {car.marca}
                                </p>
                                
                                <h2 className="mt-1 text-2xl font-bold text-slate-900"> {car.modelo} </h2>

                                <p className="mt-3 text-sm text-slate-600">
                                    <span className="font-semibold text-slate-800">
                                    Conductor:
                                    </span>{' '}
                                    {car.conductor}
                                </p>

                            <div className="mt-5 grid grid-cols-2 gap-2">
                                <NavLink to={"/details/" + car.idCoche}
                                className="rounded-lg bg-[#304860] px-3 py-2 text-center text-sm font-semibold text-white transition hover:bg-[#7da7d9] hover:text-[#304860]">
                                Ver detalles
                                </NavLink>
                                
                                <NavLink to={"/update/" + car.idCoche}
                                className="rounded-lg bg-[#ddeeff] px-3 py-2 text-center text-sm font-semibold text-[#304860] transition hover:bg-[#7da7d9]">
                                Editar
                                </NavLink>
                                
                                <button 
                                type="button" 
                                onClick={() => this.deleteCoche(car.idCoche)}
                                className="col-span-2 rounded-lg bg-red-50 px-3 py-2 text-sm font-semibold text-red-700 transition hover:bg-red-100">
                                Eliminar coche
                                </button>
                            </div>
                            </div>
                        </article>
                    ))}
                </div>
            )}
    </main>
    );
}
}