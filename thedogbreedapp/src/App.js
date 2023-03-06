import {BrowserRouter, Routes, Route} from "react-router-dom"
import React, { Component }  from 'react'
import Home from "./pages/Home"
import SingleDog from "./pages/SingleDog"

function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home /> }></Route>
      <Route path="/:name" element={<SingleDog /> }></Route>
        </Routes>
        </BrowserRouter>
        </>
  );
}

export default App;
