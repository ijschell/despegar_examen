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
        this.checkPermissionToChargePage = this.checkPermissionToChargePage.bind(this);
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
        
        // get the pathname of location
        const pathname = window.location.pathname;

        // check if can access to path
        this.checkPermissionToChargePage(pathname)

        if(pathname === '/'){
            // set active the first button
            this.setActive('one');
        }else if(pathname.search('/pedido') !== -1){
            // set active the second button
            this.setActive('two');
        }else if(pathname === '/checkout'){
            // set active the third button
            this.setActive('three');
        }

        // check which buttons are enable to click
        this.isEnable();

    }

    isEnable(){
        
        // if the cart is not empty, set the second and the third like to enable
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

        // make the link button each item
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

        // reset all buttons and set to active the selected
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

    checkPermissionToChargePage(pathname){

        // checkeo si el usuario llega directamente a este getEnabledCategories, si no tiene 
        // productos cargados en el createBrotliCompress, lo envío a la home
        if(pathname === '/checkout'){
            if(this.props.cart.length === 0){
                window.location.href = window.location.origin;
            }
        }

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