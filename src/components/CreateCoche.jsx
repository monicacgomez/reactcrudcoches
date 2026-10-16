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
            numero: parseInt(this.cajaNumero.current.value),
            marca: this.cajaMarca.current.value,
            modelo: this.cajaModelo.current.value,
            conductor: this.cajaConductor.current.value
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
    return (
      <div>CreateCoche</div>
    )
  }
}
