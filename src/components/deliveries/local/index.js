import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from "react-router-dom";
import './style.scss'

export class Local extends Component {

    constructor() {
        super();
        this.changeStateOfNavigation = this.changeStateOfNavigation.bind(this)
    }

    changeStateOfNavigation(){

        var state = {
            item1 : {
                text : '1 - Elegi tu delivery',
                active : false,
                enable : true,
                baseUrl : '/'
            },
            item2 : {
                text : '2 - Realiza tu pedido',
                active : true,
                enable : false,
                baseUrl : '/pedido/'
            },
            item3 : {
                text : '3 - Comprobá tus datos',
                active : false,
                enable : false,
                baseUrl : '/checkout/'
            }
        }

        this.props.change_navigation_state(state);

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
                    <Link to={`/pedido/${this.props.ID}`} onClick={this.changeStateOfNavigation}>Realizar pedido</Link>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = dispatch => (
    {
        change_navigation_state : (state) => dispatch({
            component : 'navigation',
            type : 'change_navigation',
            state : state
        })
    }
)

export default connect(mapStateToProps, mapDispatchToProps)(Local)
