import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import './style.scss'

export class Navigation extends Component {

    constructor() {
        super()
        this.isEnable = this.isEnable.bind(this);
        this.setActive = this.setActive.bind(this);
        this.printLink = this.printLink.bind(this);
        this.state = {
            navigationClass : {
                one : 'active',
                two : '',
                three : ''
            },
            navigationEnable : {
                one : false,
                two : false,
                three : false
            }
        }
    }

    componentDidMount() {
        
        const pathname = window.location.pathname;

        if(pathname === '/'){
            this.setActive('one');
        }else if(pathname.search('/pedido') !== -1){
            this.setActive('two');
        }else if(pathname === '/checkout'){
            this.setActive('three');
        }

        this.isEnable();

    }

    isEnable(){

        console.log(this.props.cart);            
        if(this.props.cart.length > 0){
            this.setState(state => ({
                navigationEnable : {
                    ...state.navigationEnable,
                    one : true,
                    two : true,
                    three : true
                }
            })) 
        }

    }

    printLink(item){

        switch (item) {
            case 'one':
                if(this.state.navigationEnable.one){
                    return (<Link to="/">1 - Elegi tu delivery</Link>)
                }else{
                    return ('1 - Elegi tu delivery')
                }
            break;
            case 'two':
                if(this.state.navigationEnable.two){
                    return (<Link to={`/pedido/${this.props.lastLocal}`}>2 - Realiza tu pedido</Link>)
                }else{
                    return ('2 - Realiza tu pedido') 
                }
            break;
            case 'three':
                if(this.state.navigationEnable.three){
                    return (<Link to="/checkout">3 - Completa tus datos</Link>)
                }else{
                    return ('3 - Completa tus datos') 
                }
            break;
        }

    }

    setActive(item){

        this.setState(state => ({
            navigationClass : {
                ...state.navigationClass,
                one : '',
                two : '',
                three : '',
                [item] : 'active'
            }
        }))

    }
    
    render() {

        const navigationClass = this.state.navigationClass;

        return (
            <ul id="navigation">
                <li className={navigationClass.one}>
                    {this.printLink('one')}
                </li>
                <li className={navigationClass.two}>
                    {this.printLink('two')}
                </li>
                <li className={navigationClass.three}>
                    {this.printLink('three')}
                </li>
            </ul>
        )
    }
}

const mapStateToProps = (state) => ({
    cart : state.cart,
    lastLocal : state.lastLocal
})

const mapDispatchToProps = dispatch => (
    {

    }
)


export default connect(mapStateToProps, mapDispatchToProps)(Navigation);