import React, { Component } from 'react'
import { BrowserRouter, Route, Routes, useParams } from 'react-router-dom'
import MenuComponent from './MenuComponent'
import HomeComponent from './HomeComponent'
import CreateCoche from './CreateCoche'
import UpdateCoche from './UpdateCoche'
import DetallesCoche from './DetallesCoche'

function UpdateCocheRoute () {
        let { id } = useParams();
        return <UpdateCoche id={id} />;
    }

function DetallesCocheRoute() {
    let { id } = useParams();
    return <DetallesCoche id={id} />;
}

export default class Router extends Component {
  render() {
    return (
    <BrowserRouter>
    <MenuComponent />
    <Routes>
      <Route path="/" element={<HomeComponent />} />
      <Route path="/create" element={<CreateCoche />} />
      <Route path="/update/:id" element={<UpdateCocheRoute />} />
      <Route path="/details/:id" element={<DetallesCocheRoute />} />
    </Routes>
    </BrowserRouter>
    );
  }
}