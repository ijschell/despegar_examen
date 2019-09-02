import React, { Component } from 'react'
import { connect } from 'react-redux'
import './App.scss';
import deliveries from './services/deliveries'
import { BrowserRouter as Router, Route, withRouter } from "react-router-dom";
import Header from './components/header';
import Home from './pages/home';
import Pedido from './pages/pedido'
import Checkout from './pages/checkout'
import './loader.scss'

export class App extends Component {

  constructor(){
    super();
    this.state = {
      ready : false
    }
  }  

  componentDidMount(){

    // get all deliveries from api
    deliveries.then(data => {
        // set all deliveries in store
        this.props.initiDeliveries(data['deliveries']);

        // init render in this component        
        this.props.dispatch_change_deliveries('init', data['deliveries'])

        // set ready the app and disapear loader
        this.setState({
          ready : true
        })

    })
      
  }

  render(){

    if(this.state.ready){

      return (
        <Router>
          <div className="App">            
            <Route path="/" exact component={Home} />
            <Route path="/pedido/:ID" exact component={Pedido} />
            <Route path="/checkout" exact component={Checkout} />
          </div>
        </Router>
      );
      
    }else{

      return (
        <div id="contentLoader">
          <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
        </div>
      )

    }
  }
}

const mapStateToProps = (state) => ({
  deliveriesShow : state.deliveriesShow
})

const mapDispatchToProps = dispatch => (
  {
      
      initiDeliveries : (data) => dispatch({
          component : 'deliveries',
          type : 'init_deliveries',
          value : data
      }),

      dispatch_change_deliveries : (where, value) => dispatch({
          component : 'deliveries',
          type : 'change_deliveries',
          where : where,
          value : value
      })

  }
)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))

