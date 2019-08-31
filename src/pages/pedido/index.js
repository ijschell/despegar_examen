import React, { Component } from 'react'
import { connect } from 'react-redux'
import Tippy from '@tippy.js/react'
import Cart from '../../components/cart'
import './style.scss'

export class Pedido extends Component {

    constructor(props) {
        super(props)
        this.addToCart = this.addToCart.bind(this);
        this.printLinkToAdd = this.printLinkToAdd.bind(this);
        this.state = {
            data : null,
            catActive : 0,
            productsRender : null,
            ready : false
        }
    }

    componentDidMount(){

        // get ID from URL param
        const ID = this.props.match.params.ID;

        // get Data Food from JSON by ID
        /** 
         Consulto el JSON desde el store pero en realidad en este caso realizaría una consulta
         al API solicitando la información del Local de commidas con su ID.
         **/
        const localSelected = this.props.allDeliveries.filter(item => {     
            if(item.id === parseInt(ID)){
                return item;
            }
        })
        
        this.setState({            
            data : localSelected,
            productsRender : localSelected[0].food[0].menu,
            ready : true
        })

    }

    activateCategory(e, k){

        this.setState({
            catActive : k,
            productsRender : this.state.data[0].food[k].menu
        })

    }

    addToCart(ID){

        // get product of state
        const productSelected = this.state.productsRender.filter(item => {
            if(item.id === ID){
                return item;
            }
        })

        // add local in product
        let toUpdate = {
            local : this.state.data[0].name,
            cant : 1
        }
        const mergedProduct = {...productSelected[0], ...toUpdate}

        this.props.add_to_cart(mergedProduct)

        // set selected producto in all products
        this.props.set_selected_prod(toUpdate.local, ID)

        return false;

    }

    printLinkToAdd(isSelected, id){
        if(!isSelected){
            return (<span className="addToCart" onClick={e => (this.addToCart(id))}><i className="fas fa-cart-plus"></i></span>)
        }else{
            return (<span className="addToCart"><i className="fas fa-cart-plus"></i></span>)
        }
    }

    render() {

        console.log(this.props);        

        if(this.state.ready){
            
            // console.log(this.state.data);
            const local = this.state.data[0];
            console.log(local);

            return (
                <div id="contentProducts">
                    
                    <h2>Realiza tu pedido en {local.name}!</h2>

                    <div className="description">
                        {local.name} le ofrece {local.description}
                    </div>

                    <div className="left">
                        
                        <div className="cats">
                            <ul>
                                {
                                    // print list of categories
                                    local.food.map((v, k) => {
                                        var active = '';
                                        if(k===this.state.catActive){
                                            active = 'active';
                                        }
                                        return (
                                            <li key={k} className={active} onClick={(e) => this.activateCategory(e, k)}>{v.cat}</li>    
                                        )

                                    })
                                }
                            </ul>
                        </div>
                        <div className="products">
                            <ul>
                                {
                                    this.state.productsRender.map((v,k) => {

                                        var style = {
                                            backgroundImage : 'url('+v.image+')'
                                        }

                                        let selected = '';

                                        if(v.selected){
                                            selected = 'selected'
                                        }

                                        return (
                                            <li key={k} className={selected}>
                                                <span className="img" style={style}></span>
                                                <span className="name">{v.name}</span>
                                                <span className="price">${v.price}</span>
                                                <span className="action">
                                                    <Tippy content={v.description}>
                                                        <span className="lupa"><i className="fas fa-search"></i></span>
                                                    </Tippy>
                                                    {this.printLinkToAdd(selected, v.id)}
                                                </span>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>

                    </div>

                    <div className="right">
                        <Cart></Cart>
                    </div>

                </div>
            )

        }else{
            return 'Loading...'
        }

    }
}

const mapStateToProps = (state) => ({
    allDeliveries : state.allDeliveries
})

const mapDispatchToProps = dispatch => (
    {
        add_to_cart : (product) => dispatch({
            component : 'cart',
            type : 'add_to_cart',
            value : product
        }),
        set_selected_prod : (local, id) => dispatch({
            component : 'deliveries',
            type : 'set_selected_prod',
            local,
            id,
            selected : true
        })
    }
)

export default connect(mapStateToProps, mapDispatchToProps)(Pedido)
