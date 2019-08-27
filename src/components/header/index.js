import React, { Component } from 'react'
import Navigation from './navigation'
import './style.scss';

export default class Header extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             
        }
    }
    

    render() {
        return (
            <header>
                <div className="wrapper">
                    <h1>Delivery Online</h1>
                    <div className="right">
                        <Navigation></Navigation>
                    </div>
                </div>
            </header>
        )  
    }
}
