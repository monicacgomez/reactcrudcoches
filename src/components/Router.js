import React, { Component } from 'react'
import { BrowserRouter, Route, Routes, useParams } from 'react-router-dom'
import MenuComponent from './MenuComponent'
import HomeComponent from './HomeComponent'
import CreateCoche from './CreateCoche'
import UpdateCoche from './UpdateCoche'
import DetallesCoche from './DetallesCoche'

export default class Router extends Component {
  render() {
    function UpdateCoche () {
        let {id, marca, modelo, conductor, imagen} = useParams();
        return <UpdateCoche id={id} marca={marca} modelo={modelo} conductor={conductor} imagen={imagen}/>
    }

    return (
      <BrowserRouter>
      <MenuComponent/>
        <Routes>
            <Route path="/" element={<HomeComponent/>}/>
            <Route path="/create" element={<CreateCoche/>}/>
            <Route path="/update/:id/:marca/:modelo/:conductor/:imagen" 
            element={<UpdateCocheElement/>}/>
        </Routes>
      </BrowserRouter>
    )
  }
}