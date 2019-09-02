import React, { Component } from 'react'
import { connect } from 'react-redux'
import './style.scss'

export class Filters extends Component {

    constructor(){
        super();
        this.searchDelivery = this.searchDelivery.bind(this)
    }

    searchDelivery(e, where){

        // Pienso que para el usuario combinar ambos campos como búsqueda no sería lo mejor.
        // Creo que es más fácil de encontrar si buscas por un campo o por el otro.
        if(where === 'name'){
            document.getElementById('description').value = '';
        }else if(where === 'description'){
            document.getElementById('name').value = '';
        }

        // get value
        let name = e.target.value;

        // dispatching if search by name or description and pass the value
        this.props.dispatch_change_deliveries(where, name);

    }

    render() {
        return (
            <div>
                <h2>Filtros:</h2>
                <small>Resultados encontrados: {this.props.deliveriesShow.length}</small>
                <div className="form">
                    <div className="form-group">
                        <label htmlFor="name">Nombre:</label>
                        <input type="text" id="name" onKeyUp={(e) => {this.searchDelivery(e, 'name')}} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Descripción:</label>
                        <input type="text" id="description" onKeyUp={(e) => {this.searchDelivery(e, 'description')}} />
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    deliveriesShow : state.deliveriesShow
})

const mapDispatchToProps = dispatch => (
    {
        dispatch_change_deliveries : (where, value) => dispatch({
            component : 'deliveries',
            type : 'change_deliveries',
            where : where,
            value : value
        })
    }
)

export default connect(mapStateToProps, mapDispatchToProps)(Filters)
