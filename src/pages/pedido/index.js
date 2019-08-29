import React, { Component } from 'react'
import { connect } from 'react-redux'
import './style.scss'

export class Pedido extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            data : null,
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
            ready : true
        })

    }    

    render() {

        if(this.state.ready){
            
            console.log(this.state.data);
            const local = this.state.data[0];

            return (
                <div>
                    
                    <h2>Realiza tu pedido en {local.name}!</h2>

                    <div className="description">
                        {local.name} le ofrece {local.description}
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
