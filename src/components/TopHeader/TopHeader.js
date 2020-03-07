import './TopHeader.css'
import React from 'react';

class TopHeader extends React.Component{
    constructor(props){
        super(props);
        this.login = this.login.bind(this);
    }
    login(){
        window.open('about:blank').location.href = 'https://login.twtstudio.com/login';
    }
    render(){
        return(
            <div className="holder">
                <img className="svg-logo" src={require("../../assets/headerlogo.svg")} />
                <img className="svg-account" src={require("../../assets/account.svg")} onClick={this.login}/>
            </div>
        );
    }
}

export default TopHeader;