import './SearchView.css'
import React from 'react'

class SearchView extends React.Component{
    constructor(props){
        super(props);
        this.state = {     
            keyword:"",
            onSearch:false
        }
        this.handleInput = this.handleInput.bind(this);
        this.onClick = this.onClick.bind(this);
        this.keyDown = this.keyDown.bind(this);
    }
    keyDown(e){
        if(e.which == 13){
            this.onClick();
        }
    }
    handleInput(e){
        this.setState({
            keyword:e.target.value
        })
        //console.log("input="+this.state.keyword);
    }
    onClick(){
        this.props.handleSearch(this.state.keyword);
        this.setState({
            onSearch:true
        })
    }
    render(){
        var bnstyle = {
            backgroundColor:"rgb(0,122,204)",
            boxShadow:"none",
            borderRadius:"20px",
        };
        var instyle = {
            boxShadow:"none",
            borderRadius:"20px",
        };
        if(!this.state.onSearch){
            bnstyle = {
                backgroundColor:"rgb(220,57,53)",
                boxShadow:"4px 4px 10px rgb(88, 88, 88)",
                borderRadius:"0px",
            };
            var instyle = {
                boxShadow:"4px 4px 10px rgb(88, 88, 88)",
                borderRadius:"0px",
            };
        }
        return(
            <div className='container'>
                <input className="in" onChange={this.handleInput} style={instyle} placeholder="Input keyword to search" onKeyDown={this.keyDown}/>
                <button className="bn" onClick={this.onClick} style={bnstyle}>Search</button>
            </div>
        );
    }
}

export default SearchView;