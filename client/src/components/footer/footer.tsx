import React, { Component } from "react";
import { BrowserRouter, Switch, Route, Redirect, withRouter } from "react-router-dom";
import "./footer.css"
// @import url('https://fonts.googleapis.com/css2?family=Oleo+Script&display=swap');

class Footer extends Component<any>{

    public constructor(props:any){
       super(props)
    }

    // public navToLogin = () => {
    //    this.props.history.push('/Login')
    // }
    public navToHome = () => {
       this.props.history.push('/Home')
    }



    public render(){
        return(
        <div className="footer" >
            {/* <img className="logo" src="http://localhost:3001/prestiga Logo(1).png" onClick={this.navToHome}/> */}
            
            {/* <h5>Prestiga Motor Club</h5> */}
            <img src="/rslogo.png" width="20" alt=""/>
            Web development
 
            {/* <button className="loginButton" onClick={this.navToLogin}>Log in</button> */}
        </div>

        )
    }
}

export default withRouter (Footer);