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
        this.service.deleteCoche(idCoche).then((result) => {
            this.loadCoches();
        })
        .catch((error) => {
                this.setState({
                    error: error.message
                });
            });
    };

    componentDidMount = () => {
        this.loadCoches();
    }

  render() {
    if (this.state.status == true) {
        return (
            <div style={{margin: "auto", width: "90%"}}>
                <table className="table table-info">
                    <thead>
                        <tr>
                            <th>Marca</th>
                            <th>Modelo</th>
                            <th>Conductor</th>
                            <th>Imagen</th>
                            <th>Acciones</th>
                            </tr>
                    </thead>

<tbody>
    {
        this.state.coches.map((car) => {
            return (
                <tr key={car.idCoche}>
                    <td>{car.marca}</td>
                    <td>{car.modelo}</td>
                    <td>{car.conductor}</td>
                    <td>
                        <img
                            src={car.imagen}
                            alt={car.modelo}
                            width="100"
                        />
                    </td>
                    <td>
                        <button
                            type="button"
                            onClick={() => {
                                this.deleteCoche(car.idCoche)
                            }}
                        >
                            Eliminar coche
                        </button>

                        <NavLink to={"/update/" + car.idCoche}>
                            Editar coche
                        </NavLink>

                        <NavLink to={"/details/" + car.idCoche}>
                            Ver detalles
                        </NavLink>
                    </td>
                </tr>
            )
        })
    }
</tbody>
                </table>
            </div>
        )
    } else {
        return (<img src={loading} alt="loading..."/>)
    }
  }
}