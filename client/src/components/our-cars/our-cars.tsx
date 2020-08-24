
import React, { Component } from "react";
// import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import "./MinimalisticIntro.css"
import { Car } from "../../models/Car";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { store } from "../../redux/store";
import { ActionType } from "../../redux/action-Type";
import { Unsubscribe } from "redux";
// import connectionString from "./../../interceptor/baseUrl";


interface ourCarsState{
    cars: Car[]
}

export default class OurCars extends Component<any,ourCarsState>{

    private unsubscribeStore: Unsubscribe

    public constructor(props:any){
       super(props)
       this.state = {
           cars:[],
       }

       this.unsubscribeStore = store.subscribe(
            // In fact, the following function is our "listener", "refresh function"
            () => this.setState(
            {
                cars: store.getState().cars,
            })
        );
    }

    componentDidMount = async () =>{
        try {
            let response = await axios.get<Car[]>("/cars")/* request */
            let allCars = response.data;
            for (let index = 0; index < allCars.length; index++) {
                allCars[index].pictures = JSON.parse(allCars[index].pictures)
            }
            
            store.dispatch({ type: ActionType.GetAllCars, payload: response.data});
            console.log(allCars)
            this.setState({cars:allCars})
            
        } catch (error) {
            console.log(error)
          alert("failed")  
        }
    }


    public navToLogin = () => {
       this.props.history.push('/Login')
    }
    
    public onCarClicked = (carId:number) =>{
        console.log(carId)
        this.props.history.push('/Our-cars/'+carId)
    }

    public render(){
        return(
        <div className="ourCarsComponent" >

            <br></br>
            
            <h1><b><u>Our cars</u></b></h1>

            <div className="grid-wrap">
                {this.state.cars.map((singleCar) =>
                <a key={singleCar.id} className="list-block" onClick={() => this.onCarClicked(singleCar.id)} >
                <figure>
                    
                <img src={`/${singleCar.pictures[0]}`} alt="" className="singleCar" />
                        
                    
                <figcaption>
                <h2>{singleCar.company}</h2>
                
                <h2>{singleCar.model}</h2>
                
                </figcaption>
            </figure>
            </a>
                )}
            </div>
           
        </div>

        )
    }
}