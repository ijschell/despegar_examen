import React, { Component } from 'react'
import Header from '../../components/header'
import Filters from '../../components/filters'
import Deliveries from '../../components/deliveries'
import './style.scss'

export default class Home extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             
        }
    }
    

    render() {
        return (
            <div>
                <Header></Header>
                <div className="wrapper">
                    <Filters></Filters>
                    <Deliveries></Deliveries>
                </div>
            </div>
        )
    }
}
