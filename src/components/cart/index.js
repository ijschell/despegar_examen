import React, { Component } from 'react'
import { connect } from 'react-redux'
import Tippy from '@tippy.js/react'
import './style.scss'

export class Cart extends Component {

    constructor(props){
        super(props);
        this.calculatePriceIVA = this.calculatePriceIVA.bind(this);
        this.calculateTotal = this.calculateTotal.bind(this);
        this.calculateTotalPricePeritem = this.calculateTotalPricePeritem.bind(this);
        this.removeProductOfCart = this.removeProductOfCart.bind(this);
        this.state = {
            inputs : [1,1]
        }
    }

    changeInputValue(e, local, id){

        var cant = e.target.value;

        // update cant selected in store
        // first check if the value is less to 0
        if(cant < 0){
            cant = 0
        }        
        this.props.add_cant_to_item(local, id, cant)

    }

    calculatePriceIVA(price){

        // add 22% to price
        return Math.round(price * 1.22)

    }

    calculateTotalPricePeritem(cant, price){

        // calculate the total price to pay and multiplicate by cant of item
        return this.calculatePriceIVA(price) * cant;

    }

    calculateTotal(){

        // this function calculate the total to pay for the client
        let total = 0
        
        this.props.cart.map(v => {
            total = total + (this.calculatePriceIVA(v.price) * v.cant)
        })

        return total

    }

    removeProductOfCart(local, id){

        this.props.remove_product_of_cart(local, id)
        this.props.set_selected_prod(local, id)

    }

    render() {

        // console.log(this.props.cart);
        
        return (
            <div id="containerCart">

                <div className="header">
                    <div>Producto</div>
                    <div>Cantidad</div>
                    <div>Precio uni.</div>
                    <div>Total</div>
                </div>

                <div className="body">
                    {
                        this.props.cart.map((v,k) => (
                            <div key={k} className="tr">
                                <div>
                                    <Tippy content="Eliminar producto del carrito">
                                        <span className="remove" onClick={e => (this.removeProductOfCart(v.local, v.id))}><i className="fas fa-trash-alt"></i></span>
                                    </Tippy>
                                    {v.name}
                                </div>
                                <div><input type="number" value={v.cant} onChange={e => this.changeInputValue(e, v.local, v.id)} /></div>
                                <div>${v.price}</div>
                                <div>${this.calculateTotalPricePeritem(v.cant, v.price)}</div>
                            </div>
                        ))
                    }
                </div>

                <div className="footer">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div>${this.calculateTotal()}</div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    cart : state.cart
})

const mapDispatchToProps = dispatch => (
    {
        add_cant_to_item : (local, id, cant) => dispatch({
            component : 'cart',
            type : 'add_cant_to_item',
            local,
            id,
            cant
        }),
        remove_product_of_cart : (local, id) => dispatch({
            component : 'cart',
            type : 'remove_product_of_cart',
            local,
            id
        }),
        set_selected_prod : (local, id) => dispatch({
            component : 'deliveries',
            type : 'set_selected_prod',
            local,
            id,
            selected : false
        })
    }
)

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
