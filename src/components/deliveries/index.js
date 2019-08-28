import React, { Component } from 'react'
import { connect } from 'react-redux'
import deliveries from '../../services/deliveries'
import Local from './local'
import './style.scss'

export class Deliveries extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             deliveriesToRender : []
        }
    }

    componentDidMount(){

        console.log(this.props);
        
        deliveries.then(data => {
            this.props.dispatch_change_deliveries('init', data['deliveries'])
            // Guardo la información en session storage para poder recuperar nuevamente más tarde
            sessionStorage.setItem('allDeliveries', JSON.stringify(data['deliveries']))
        })
        
    }

    render() {

        console.log(this.props.deliveriesShow);        

        if(this.props.deliveriesShow.length > 0){

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

        }else{

            return 'Loading...'

        }

    }
}

const mapStateToProps = (state) => ({
    deliveriesShow : state.deliveriesShow
})

const mapDispatchToProps = dispatch => (
    {
        dispatch_change_deliveries : (where, value) => dispatch({
            type : 'change_deliveries',
            where : where,
            value : value
        })
    }
)

export default connect(mapStateToProps, mapDispatchToProps)(Deliveries)
