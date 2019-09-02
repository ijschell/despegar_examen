import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from "react-router-dom";
import './style.scss'

export class Local extends Component {

    constructor() {
        super();
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

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Local)
