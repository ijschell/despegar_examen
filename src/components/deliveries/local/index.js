import React, { Component } from 'react'
import { Link } from "react-router-dom";
import './style.scss'

export default class Local extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            ID : this.props.ID,
            name : this.props.name,
            description : this.props.description
        }
    }

    render() {
        return (
            <div className="contentBox">
                <div className="header">
                    {this.state.name}
                </div>
                <div className="description">
                    {this.state.description}
                </div>
                <div className="link">
                    <Link to={`/pedido/${this.state.ID}`}>Realizar pedido</Link>
                </div>
            </div>
        )
    }
}
