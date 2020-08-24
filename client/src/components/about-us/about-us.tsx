import React, { Component } from "react";
// import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import "./2.css"
import { store } from "../../redux/store";
import { Unsubscribe } from "redux";
// import connectionString from "./../../interceptor/baseUrl";


export default class AboutUs extends Component<any>{


    public constructor(props:any){
       super(props)
    }

    public navToOurCars = () =>{
        this.props.history.push('/Our-cars')
    }

    public navToMemberships = () =>{
        this.props.history.push('/Memberships')
    }


    public render(){
        return(
        <div className="aboutUsComponent" >
          
           <div className="firstText">
               {/* <br></br> */}
                <h2>Fractional Ownbership</h2><br></br>
                <h3>why to buy a cow for a cup of milk?</h3>
            </div> 
            <div className="bigDiv">
                <div className="aboutText">
                    <h2><b><u>Largest verity of vehicles</u></b> </h2>

                   <h4> With PRESTIGA Motor club you can enjoy the full veriety of cars that are available in our fleet, you can use the car you want whenever you wish</h4>
                </div> 
                <div className="aboutPic">
                <img src="/five-assorted-color-cars-parked-inside-room-1231643(1).jpg"  alt=""/>
                {/* dsfsdfsdfsdfsf */}
                </div>

            </div>
            <div className="bigDiv">

                <div className="aboutTextRight" >
                    
                    <h2><b><u>Fully Cover Program</u></b></h2>

                        <h4>No insurance, no devaluation, no headaches 
                        just come over and pick up you vehicle</h4>
                    
                </div> 
                <div className="aboutPic">
                    <img className="fullyCoverPic" src="/1.jpg" alt=""/>
                    
                </div>
            </div>

            <div className="bigDiv">

           <div className="aboutText">
               
               <h3><b><u>HOW FRACTIONAL OWNERSHIP WORKS?</u></b></h3>

                 <h5>
                - IT STARTS WITH A SHARE <br></br>
                - MINIMAL CAPITAL INVESTMENT<br></br>
                - Better than you can allow yourself <br></br>
                - a Very safe investment <br></br>
                - the best of all worlds
                </h5>

            </div> 
            <div className="aboutPic">

                <img src="/2.jpg" alt=""/>
            </div>
            </div>
            <div className="warrenBuffett">

            <img className="warrenBuffettPic" src="/111.png" alt=""/>
            {/* <br></br> */}
            </div>
             <div className="bigDiv">

           <div className="aboutTextRight">
               
            <h2><b><u>MEET THE FLEET</u></b></h2>
               <h4> Our fleet includes many vehicles for your personal use a Jaguar F Type or an Audi R8 
                why to own if you can enjoy all?</h4>

                <button className="btn btn-primary" onClick={() => this.navToOurCars()}>
                        See all cars
                        </button>

            </div> 
            <div className="aboutPic">
                <img className="meetTheFleetPic" src="/a-car-parked-beside-airplane-3647693.jpg"/>

            </div>
           
            </div>
            <div className="bigDiv" >

           <div className="aboutText">
             
            <h2><b><u>EXPLORE THE POSSIBILITIES</u></b></h2>
               <h4> We have the right solution to feet your plesure needs with our packages. 
                Learn more about the advantages of a PRESTIGA Motor Club membership</h4>
                <button className="btn btn-primary" onClick={() => this.navToMemberships()}>
                       See our memberships 
                </button>

            </div> 
            <div className="aboutPic">

                <img className="explorePic" src="/223.jpg" alt=""/>

            </div>
          
            </div>

           {/* <div className="bigDiv"> */}
            {/* <div className="warrenBuffett">

            <img className="warrenBuffettPic" src="/111.png" alt=""/>
            <br></br>
            </div> */}
            {/* </div> */}
            
        </div>

        )
    }
}