import React, { Component } from 'react'
import './style.scss'

export default class Filters extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             
        }
    }
    

    render() {
        return (
            <div>
                <h2>Filtros:</h2>
                <div className="form">
                    <div className="form-group">
                        <label htmlFor="name">Nombre:</label>
                        <input type="text" id="name" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Descripción:</label>
                        <input type="text" id="description" />
                    </div>
                </div>
            </div>
        )
    }
}
