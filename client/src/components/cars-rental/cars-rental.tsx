import React, { Component, ChangeEvent } from "react";
// import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import "./cars-rental.css"
import { Car } from "../../models/Car";
import axios from "axios";
import { SearchDates } from "../../models/Search dates";
import OurCars from "../our-cars/our-cars";
// import connectionString from "./../../interceptor/baseUrl";
import { Unsubscribe } from "redux";
import { store } from "../../redux/store";
import { ActionType } from "../../redux/action-Type";

interface carRentalState{
    cars: Car[],
    // ordersDetails:
    startDate:string
    endDate:string
    location: string
    filter:string
    isSearchClicked:boolean
    // isUserLoggedIn:boolean

}


export default class CarsRental extends Component<any,carRentalState>{

    private unsubscribeStore: Unsubscribe

    public constructor(props:any){
       super(props)
       this.state = {
        cars:[],
        startDate:"",
        endDate:"",
        location:"Tel Aviv",
        filter:"",
        isSearchClicked:false,
        // isUserLoggedIn:false
       }
    //    this.unsubscribeStore = store.subscribe(
    //     // In fact, the following function is our "listener", "refresh function"
    //     () => this.setState(
    //     {
    //         isUserLoggedIn: store.getState().isUserLoggedIn,

    //     })
    // );
    }

    public componentDidMount = async () =>{
        
        await this.varifyThatUserHaveAToken()

        try {
            let response = await axios.get<Car[]>("/cars/rental")/* request */
            let allCars = response.data;
            for (let index = 0; index < allCars.length; index++) {
                allCars[index].pictures = JSON.parse(allCars[index].pictures)
            }
            console.log(allCars)
            this.setState({cars:allCars})
            localStorage.setItem("cars" ,JSON.stringify(allCars))
            
            
        } catch (error) {
            console.log(error)
            store.dispatch({ type: ActionType.Logout});
            this.props.history.replace("/Home")
        }
    }


    public varifyThatUserHaveAToken = async () => {
        let userToken = localStorage.getItem("key")
        if (userToken == null) {
            this.props.history.replace("/Home")
            return;
        }
        // try {
        //     let isUserAuthenticated = await axios.get<boolean>("/users/auth/Bearer "+ userToken)
        //     if (!isUserAuthenticated.data) {
        //         localStorage.clear()
        //         store.dispatch({ type: ActionType.Logout});
        //         this.props.history.replace("/Home")
        //         return
        //     }
        // } catch (error) {
        //     console.log(error)
        //     store.dispatch({ type: ActionType.Logout});
        //     this.props.history.replace("/Home")
        // }
    }

    public search = async () => {
        console.log(this.state.startDate)
        console.log(this.state.endDate)
        if (this.state.startDate == "" || this.state.endDate == "") {
            alert("Please choose rental dates")
            return;
        }
        localStorage.setItem("startDate" ,this.setGoodLookingDate(this.state.startDate));
        localStorage.setItem("endDate" ,this.setGoodLookingDate(this.state.endDate))
        for (let index = 0; index < this.state.cars.length; index++) {
            this.state.cars[index].isAvailble = "true";
            
        }
       try {
            let searchDates = new SearchDates(this.setGoodLookingDate(this.state.startDate), this.setGoodLookingDate(this.state.endDate))
            let response = await axios.post<[]>("/orders/searchByDates",searchDates)
            console.log(response.data)
            let unAvailbleCars = response.data
            if (unAvailbleCars.length!=0) {
                // for (let index = 0; index < this.state.cars.length; index++) {
                //     for (let i = 0; i < unAvailbleCars.length; i++) {
                //         if (this.state.cars[index].id == unAvailbleCars[i]) {
                //             this.state.cars[index].isAvailble = "false";
                //         }
                //         else{
                //             this.state.cars[index].isAvailble = "true";
                //         }
                //     }
                // }
                for (let index = 0; index < this.state.cars.length; index++) {
                    for (let i = 0; i < unAvailbleCars.length; i++) {
                        if (this.state.cars[index].id == unAvailbleCars[i] && this.state.cars[index].isAvailble != "false") {
                            this.state.cars[index].isAvailble = "false";
                        }
                        else if (this.state.cars[index].isAvailble != "false") {
                            this.state.cars[index].isAvailble = "true";
                        }
                    }
                }
                this.setState({filter:"true"})
            }

           this.setState({isSearchClicked:true})
           console.log(this.state.cars)
            console.log("got availble dates")
            

        } catch (error) {
            alert("failed")
        }
    }

    public setStartDate = (args: ChangeEvent<HTMLInputElement>) => {
        let startDateInput = args.target.value  
        this.setState({startDate: startDateInput})
    }
    public setEndDate = (args: ChangeEvent<HTMLInputElement>) => {
        let endDateInput = args.target.value   
        this.setState({endDate:endDateInput})
    }
    public onCarClicked = (carId:number) => {
        this.props.history.push('/car-reservation/'+carId)
        // this.setState({endDate:endDateInput})
    }

    // public css = () =>{
    //     let input = document.getElementById("floatContainer1")
    //     input.className = "float-container active"
    // }

    public setGoodLookingDate = (day:string) => {
        let dd = day.substring(8,10);
        let mm = day.substring(5,7);
        let yyyy = day.substring(0,4);
        return dd+"/"+mm+"/"+yyyy;
    }

    public render(){
        return(
        <div className="carsRental" >


            <div className="carsRentalSearchArea">
            <h1 className="bookACar">Book a Car !</h1>
            {/* <img height="90" width="220" src="https://images.unsplash.com/photo-1502219422320-9ca47798b75b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1868&q=80" alt="" className="searchCarsAreaImg" /> */}
            
            {/* <h5>From: </h5>

            <input type="text" disabled placeholder="location" name="location" 
        value={this.state.location} />
            <h5>Pick-up: </h5>
            <input type="date" name="startDate" 
        value={this.state.startDate} onChange={this.setStartDate} />
            <h5>Drop-off: </h5>
        <input type="date" name="endDate" 
        value={this.state.endDate} onChange={this.setEndDate} /><br></br> */}

        <div className="float-container active">
  <label className="floatField1">Location</label>
        <input id="locationInput" type="text" disabled placeholder="location" name="location" 
        value={this.state.location} />
        </div>

        <div id="floatContainer1" className="float-container active">
  <label className="floatField1">Pick-up</label>
  <input type="date" id="floatField1" data-placeholder="Placeholder 1" value={this.state.startDate} onChange={this.setStartDate} />
</div>

<div id="floatContainer2" className="float-container active">
  <label className="floatField2">Drop-off</label>
  <input type="date" id="floatField2" data-placeholder="Placeholder 2" value={this.state.endDate} onChange={this.setEndDate}/>
</div>
        <input id="search" type="button" className="btn btn-primary" value="Search" onClick={this.search}/>

            </div>

        {/* <OurCars/> */}

        <div hidden={!this.state.isSearchClicked}>
                   
                       {this.state.cars.filter(car => {
                        if (this.state.filter === "") {/* if filter is empty approve all */
                            return true;
                        }
                        
                        /* else approve only the one that include the filter text */
                        return car.isAvailble.includes(this.state.filter)
                    }
                    ).map(singleCar => 
                        /* on server click display this function */
                         <a key={singleCar.id} className="list-block" onClick={() => this.onCarClicked(singleCar.id)} >
            <figure>
                    
                <img src={`/${singleCar.pictures[0]}`} alt="" className="singleCar" />
                        
                    
                <figcaption>
                <h2>{singleCar.company} {singleCar.model}</h2>
                
              
                {/* <h3>View more</h3> */}
                {/* <h3>HP: {singleCar.hp}</h3>
                <h3>Engine: {singleCar.engine}</h3> */}
                <h3>Daily cost <br></br> {singleCar.pointsPerDay} points</h3>
                </figcaption>
            </figure>
            </a>

                    //     <tr onClick={() => this.onCarClicked(singleCar.id)} key={singleCar.id} >
                    //          <td>{singleCar.id}</td>
                    //    <td>{singleCar.company}</td>
                    //         <td>{singleCar.model}</td>
                       
                    //     </tr>
                        )}
                   
               
            
            {/* <button onClick={this.onfilterClicked}>Show online only</button>
            <button onClick={this.initFilter}>Show all</button> */}
            
            </div>
        </div>

        )
    }
}