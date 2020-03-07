import './BottomFooter.css'
import React from 'react'

class BottomFooter extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div className="footer-holder">
                <div className="more-about">
                   <a target="_blank" href="https://coder.twtstudio.com/index">Contract us</a> - 
                   <a target="_blank" href="https://coder.twtstudio.com/join"> Join us</a> -
                   <a target="_blank" href="https://support.twtstudio.com/"> Feedback</a>
                </div>
                <div className="copy-right">POWERED BY TWT STUDIO © 2000-2018</div>
                <div className="copy-right">CREATED BY CreatorFan</div>
            </div>
        );
    }
}

export default BottomFooter;