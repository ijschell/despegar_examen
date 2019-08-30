import React, { Component } from 'react'
import { connect } from 'react-redux'
import './style.scss'

export class Pedido extends Component {

    constructor(props) {
        super(props)
        // this.activateCategory = this.activateCategory.bind(this);
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

    render() {

        if(this.state.ready){
            
            console.log(this.state.data);
            const local = this.state.data[0];

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

                                        return (
                                            <li key={k}>
                                                <span className="img" style={style}></span>
                                                <span className="name">{v.name}</span>
                                                <span className="price">${v.price}</span>
                                                <span className="action">
                                                    <a href="#" className="lupa"><i class="fas fa-search"></i></a>
                                                    <a href="#" className="addToCart"><i class="fas fa-cart-plus"></i></a>
                                                </span>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>

                    </div>

                    <div className="right">
                        CARRITO
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

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(Pedido)
