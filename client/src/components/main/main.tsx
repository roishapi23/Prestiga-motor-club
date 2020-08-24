import React, { Component } from "react";
// import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import "./main.css"




export default class Main extends Component<any>{

    public constructor(props:any){
       super(props)
    }

    public navToAboutUs = () => {
       this.props.history.push('/About-us')
    }
    public navToContactUs = () => {
       this.props.history.push('/Contact-us')
    }
    public navToOurCars = () => {
       this.props.history.push('/Our-Cars')
    }
    public navToMemberships= () => {
       this.props.history.push('/Memberships')
    }

    public render(){
        return(
        <div className="main" >

            <br></br>
            <h1 id="mainText"><b>PRESTIGA MOTOR CLUB</b></h1>
            <h4>A Great Way to Own a Super Car</h4><br></br>
            <div className="menu">
                <div className="aboutUs" onClick={this.navToAboutUs} ><span className="btn btn-one">About us</span></div>
                <div className="memberships" onClick={this.navToMemberships} ><span className="btn btn-one">Memberships</span></div>
                <div className="cars" onClick={this.navToOurCars} ><span className="btn btn-one">Our Cars</span></div>
                <div className="contactUs" onClick={this.navToContactUs} ><span className="btn btn-one">Contact us</span></div>
            </div>

        </div>

        )
    }
}