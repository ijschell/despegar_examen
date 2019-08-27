import React, { Component } from 'react'
import { connect } from 'react-redux';
import './style.scss'

export class Navigation extends Component {

    constructor(props) {
        super(props)
        this.state = {
             
        }
        this.testStore = this.testStore.bind(this);
    }

    componentDidMount(){
        
    }

    testStore(){

        console.log('exce');        

        this.props.test('Algoooooooooooooo')

    }

    render() {
        return (
            <ul>
                <li onClick={this.testStore} className="active">1 - Elegi tu delivery</li>
                <li>2 - Realiza tu pedido</li>
                <li>3 - Comprobá tus datos</li>
            </ul>
        )
    }
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = dispatch => (
    {
        test : (value) => dispatch({
            type : 'test',
            value : value
        })    
    }
)


export default connect(null, mapDispatchToProps)(Navigation);