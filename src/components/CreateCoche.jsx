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
      <div>
        <h1>Crear el coche</h1>
        {
            this.state.mensaje &&
            (<p style={{color:"fuchsia", fontWeight: "bold"}}>
                {this.state.mensaje}
            </p>)
        }
        <form onSubmit={this.insertCoche}>
            <label> Id del coche: </label>
            <input type="number" className='form-control'
            ref={this.cajaNumero}/>
            <label>Marca: </label>
            <input type="text" className='form-control'
            ref={this.cajaMarca}/>
            <label>Modelo: </label>
            <input type="text" className='form-control'
            ref={this.cajaModelo}/>
            <label>Conductor: </label>
            <input type="text" className='form-control'
            ref={this.cajaConductor}/>
            <label>Imagen: </label>
            <input type="file" className='form-control'
            ref={this.cajaImagen}/>
            <button type="submit">
                Insertar
            </button>
        </form>
      </div>
    )
  }
}
}