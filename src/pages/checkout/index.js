import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from "react-router-dom"
import Header from '../../components/header'
import Filters from '../../components/filters'
import Cart from '../../components/cart'
import './style.scss'
import { stat } from 'fs';

export class Checkout extends Component {

    constructor(props) {
        super(props)
        this.handleForm = this.handleForm.bind(this);
        this.printCheckoutButton = this.printCheckoutButton.bind(this);
        this.goBack = this.goBack.bind(this);
        this.checkIfAllDataValues = this.checkIfAllDataValues.bind(this);
        this.printPopUpResult = this.printPopUpResult.bind(this);
        this.showPop = this.showPop.bind(this);
        this.hidePop = this.hidePop.bind(this);
        this.state = {
             form : {
                 name : '',
                 lastname : '',
                 address : '',
                 phone : '',
                 email : '',
             },
             showPop : false,
             jsonResult : ''
        }
    }
    
    handleForm(e, input){

        const newValue = e.target.value;
        
        this.setState(state => ({
          form : {
              ...state.form,
              [input] : newValue
          }
        }))

    }

    checkIfAllDataValues(){

        // check if a value is empty
        // return true if all values has text or false
        const obj = this.state.form;

        for (let i = 0; i < Object.keys(obj).length; i++) {
            const element = Object.keys(obj)[i];
            if(obj[element] === ''){
                return false;
            }
        }

        return true; 
    
    }

    printCheckoutButton(){

        // if the cart is not empty and the form has all values, print the button to finish
        if(this.props.cart.length > 0 && this.checkIfAllDataValues()){
            return (<span onClick={this.printPopUpResult}>Realizar pedido</span>)
        }else{
            return (<Link className="disabled">Realizar pedido</Link>)
        }
    }

    goBack(){
        window.history.back();
    }

    printPopUpResult(){

        // the funcion set to show the popup and print the json result
        const cart = this.props.cart;

        this.setState({
            jsonResult : JSON.stringify(cart),
            showPop : true
        })

    }

    showPop(){

        // print popup if showPop is true
        if(this.state.showPop){
            return (
                <div className="popUp">
                    <div>{this.state.jsonResult}
                        <span className="close" onClick={this.hidePop}>
                            <i className="fas fa-times-circle"></i>
                        </span>
                    </div>
                </div>
            )
        }

    }

    hidePop(){

        this.setState({
            showPop : false
        })

    }

    render() {
        return (
            <div>
                <Header></Header>
                <div className="wrapper">
                    <div id="containerCheckout">
                    
                        <h2>Completa tus datos!</h2>

                        <hr />

                        <div className="left">

                            <form>
                                <div className="groupForm">
                                    <div>
                                        <label>Nombre:</label>
                                    </div>
                                    <div>
                                        <input type="text" placeholder="Su nombre" onChange={e => (this.handleForm(e, 'name'))} />
                                    </div>
                                </div>
                                <div className="groupForm">
                                    <div>
                                        <label>Apellido:</label>
                                    </div>
                                    <div>
                                        <input type="text" placeholder="Su apellido" onChange={e => (this.handleForm(e, 'lastname'))} />
                                    </div>
                                </div>
                                <div className="groupForm">
                                    <div>
                                        <label>Dirección:</label>
                                    </div>
                                    <div>
                                        <input type="text" placeholder="Su dirección de envío" onChange={e => (this.handleForm(e, 'address'))}/>
                                    </div>
                                </div>
                                <div className="groupForm">
                                    <div>
                                        <label>Teléfono:</label>
                                    </div>
                                    <div>
                                        <input type="text" placeholder="Su teléfono de contacto" onChange={e => (this.handleForm(e, 'phone'))}/>
                                    </div>
                                </div>
                                <div className="groupForm">
                                    <div>
                                        <label>Email:</label>
                                    </div>
                                    <div>
                                        <input type="text" placeholder="Su email de contacto" onChange={e => (this.handleForm(e, 'email'))}/>
                                    </div>
                                </div>
                            </form>
                        </div>

                        <div className="right">
                            <Cart></Cart>
                        </div>

                        <div className="buttons">
                            <div>
                                <span onClick={this.goBack}>Atrás</span>
                                {this.printCheckoutButton()}
                            </div>
                        </div>

                        {this.showPop()}

                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    cart : state.cart
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)
