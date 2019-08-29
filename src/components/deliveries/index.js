import React, { Component } from 'react'
import { connect } from 'react-redux'
import Local from './local'
import './style.scss'

export class Deliveries extends Component {

    constructor(props) {
        super(props)
    }

    render() {

        return (
            <div>
                <h2>Deliveries:</h2>

                <div className="contentDeliveries">

                    {
                        this.props.deliveriesShow.map((v, k) => (
                            <div key={k} className="box">
                                <Local 
                                    ID={v.id}
                                    name={v.name}
                                    description={v.description}
                                ></Local>
                            </div>        
                        ))
                    }

                </div>

            </div>
        )

    }
}

const mapStateToProps = (state) => ({
    deliveriesShow : state.deliveriesShow
})

const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Deliveries)
