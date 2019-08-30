import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import './style.scss'

export class Navigation extends Component {

    constructor(props) {
        super(props)
    }

    isActive(item){

        if(item.active){
            return 'active';
        }else{
            return '';
        }

    }

    canPress(item){
        
        if(item.enable){
            // if can print link, I will get from store the ID of local and print the link
            return (
                <Link to={item.baseUrl}>{item.text}</Link>
            )
        }else{
            return item.text
        }

    }

    render() {

        console.log(this.props.navigation);

        const navigation = this.props.navigation;

        return (
            <ul id="navigation">
                <li className={this.isActive(navigation.item1)}>
                    {this.canPress(navigation.item1)}
                </li>
                <li className={this.isActive(navigation.item2)}>
                    {this.canPress(navigation.item2)}
                </li>
                <li className={this.isActive(navigation.item3)}>
                    {this.canPress(navigation.item3)}
                </li>
            </ul>
        )
    }
}

const mapStateToProps = (state) => ({
    navigation : state.navigation
})

const mapDispatchToProps = dispatch => (
    {

    }
)


export default connect(mapStateToProps, mapDispatchToProps)(Navigation);