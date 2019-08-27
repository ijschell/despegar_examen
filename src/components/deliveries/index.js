import React, { Component } from 'react'
import deliveries from '../../services/deliveries'
import Local from './local'
import './style.scss'

export default class Deliveries extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             deliveriesToRender : []
        }
    }

    componentDidMount(){

        deliveries.then(data => {
            this.setState({
                deliveriesToRender : data['deliveries']
            })
            console.log(this.state.deliveriesToRender);
        })

    }    

    render() {

        if(this.state.deliveriesToRender.length > 0){

            return (
                <div>
                    <h2>Deliveries:</h2>
    
                    <div className="contentDeliveries">

                        {
                            this.state.deliveriesToRender.map((v, k) => (
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
