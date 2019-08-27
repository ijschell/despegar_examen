import React from 'react';
import './App.scss';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from './components/header';
import Home from './pages/home';
import Pedido from './pages/pedido'
import Checkout from './pages/checkout'


function App() {
  return (
    <Router>
      <div className="App">
        <Header></Header>
        <div className="wrapper">
          <Route path="/" exact component={Home} />
          <Route path="/pedido" exact component={Pedido} />
          <Route path="/checkout" exact component={Checkout} />
        </div>
      </div>
    </Router>
  );
}

export default App;
