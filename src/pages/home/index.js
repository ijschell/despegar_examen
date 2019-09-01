import React, { Component } from 'react'
import { connect } from 'react-redux'
import Header from '../../components/header'
import Filters from '../../components/filters'
import Deliveries from '../../components/deliveries'
import './style.scss'

export class Home extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             
        }
    }

    componentDidMount(){
        this.props.set_default_deliveries_show()
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

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = dispatch => (
    {
        set_default_deliveries_show : () => dispatch({
            component : 'deliveries',
            type : 'set_default_deliveries_show'
        })
    }
)

export default connect(mapStateToProps, mapDispatchToProps)(Home)
