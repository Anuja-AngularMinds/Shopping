import "./App.css";
import CardPage from "./CardPage";
import MainPage from "./MainPage";
import OrderPage from "./OrderPage";
import React from "react";
import {BrowserRouter,Routes,Route,Outlet} from 'react-router-dom'


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage/> } />
          <Route path={`/card`}  element={<CardPage/>} />
          <Route path={`/order`} element={<OrderPage/>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
