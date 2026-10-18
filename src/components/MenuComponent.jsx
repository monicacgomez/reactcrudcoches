import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import car from '../assets/images/car.png';

export default class MenuComponent extends Component {
    render() {
        return (
            <nav style={{ backgroundColor: "#304860" }} className="text-white shadow-lg">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
                     <NavLink to="/" className="flex items-center gap-3">
                        <img
                            src={car}
                            alt="Concesionario"
                            className="h-12 w-12 rounded-full bg-white object-contain p-1"
                        />
                        
                        <div>
                            <span className="block text-lg font-extrabold tracking-wide">
                                AUTO<span className="text-amber-400">DRIVE</span>
                            </span>
                            <span className="text-xs uppercase tracking-widest text-blue-100">
                                Concesionario 
                            </span>
                        </div>
                     </NavLink>

                     <div className="flex items-center gap-3">
                        <NavLink to="/" className="rounded-lg px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/20">
                        Coches
                        </NavLink>

                        <NavLink to="/create" className="rounded-lg bg-[#7da7d9] px-4 py-2 text-sm font-bold text-[#304860] transition hover:bg-[#ddeeff]">
                        Añadir coche
                        </NavLink>
                     </div>
                </div>
            </nav>
        );
    }
}
