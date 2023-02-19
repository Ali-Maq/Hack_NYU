import React from 'react'
import logo from './logo.svg'
import Home from './components/Home/Home'
import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/:id" element={<Home/>}/>
        <Route path="*" element={ <Navigate to ='/'/> }/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
