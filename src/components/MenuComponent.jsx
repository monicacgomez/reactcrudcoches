import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import car from '../assets/images/car.png';

export default class MenuComponent extends Component {
    render() {
        return (
            <nav
                className="navbar navbar-expand-lg"
                style={{ backgroundColor: "#e3f2fd" }}
            >
                <div className="container-fluid">
                    <NavLink className="navbar-brand" to="/">
                        <img
                            src={car}
                            alt="Inicio"
                            style={{ width: "60px" }}
                        />
                    </NavLink>

                    <div className="navbar-nav">
                        <NavLink className="nav-link" to="/">
                            Coches
                        </NavLink>

                        <NavLink className="nav-link" to="/create">
                            Crear coche
                        </NavLink>
                    </div>
                </div>
            </nav>
        );
    }
}
