import React, { Component } from 'react'
import { Link } from "react-router-dom";
import './style.scss'

export default class Local extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="contentBox">
                <div className="header">
                    {this.props.name}
                </div>
                <div className="description">
                    {this.props.description}
                </div>
                <div className="link">
                    <Link to={`/pedido/${this.props.ID}`}>Realizar pedido</Link>
                </div>
            </div>
        )
    }
}
