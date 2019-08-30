import React, { Component } from 'react'
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
                <Filters></Filters>
                <Deliveries></Deliveries>
            </div>
        )
    }
}