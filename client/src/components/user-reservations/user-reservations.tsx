import React, { Component, ChangeEvent } from "react";
// import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import "./user-reservations.css"
import { Car } from "../../models/Car";
import axios from "axios";
import { SearchDates } from "../../models/Search dates";
import OurCars from "../our-cars/our-cars";
import axiosService, { setAxiousHeaders } from "./../../interceptor/axiosService";
import { Reservation } from "../../models/Reservation";
import { ReservationDetails } from "../../models/ReservationDetails";
import { store } from "../../redux/store";
import { ActionType } from "../../redux/action-Type";
// import connectionString from "./../../interceptor/baseUrl";

interface carRentalState{
    reservations: ReservationDetails[]
    filter:string
    isUserHaveReservation:boolean

}


export default class UserReservetions extends Component<any,carRentalState>{

    public constructor(props:any){
       super(props)
       this.state = {
        reservations:[],
        filter:"",
        isUserHaveReservation:true
       }
    }

    public componentDidMount = async () =>{
        let userToken = localStorage.getItem("key")
        if (userToken == null) {
            this.props.history.replace("/Home")
            return;
        }
    
        try {
            let response = await axios.get<ReservationDetails[]>("/orders/byUser")/* request */
            let allReservations = response.data;
            if (allReservations.length == 0) {
                this.setState({isUserHaveReservation:false})
            }
            for (let index = 0; index < allReservations.length; index++) {
                allReservations[index].pictures = JSON.parse(allReservations[index].pictures)
            }
            console.log(allReservations)
            // allReservations.reverse()
            this.setState({reservations:allReservations})
            
        } catch (error) {
            console.log(error)

            if (error.response.status == 401 || error.response.status == 607) {
                localStorage.clear()
                store.dispatch({ type: ActionType.Logout});
                this.props.history.replace("/Home")
            }
            
        }
    }


    public setSearchByReservationNumber = (args: ChangeEvent<HTMLInputElement>) => {
        let searchInput = args.target.value   
        this.setState({filter:searchInput})
    }

    public render(){
        return(
        <div className="userReservation" >
            <br></br>

            <div className="reservationOutputArea" >

                <h1>My Reservations</h1>

                <input  type="text" placeholder="Enter reservation number" name="reservationSearch" 
                value={this.state.filter} onChange={this.setSearchByReservationNumber} />


                <div className="container">
                    <br/>
                    <div className="noReservationText" hidden={this.state.isUserHaveReservation}>
                        <h2>You don't have any reservations</h2>
                    </div>

                    <div className="card-deck">
                   {this.state.reservations.filter(reservation => {
                        if (this.state.filter === "") {/* if filter is empty approve all */
                            return true;
                        }
                        
                        /* else approve only the one that include the filter text */
                        return reservation.reservationNumber.includes(this.state.filter)
                    }
                    ).map(singleDay =>                          
                              <div key={singleDay.id} className="card" id="card">
                                  <img className="card-img-top"  src={`/${singleDay.pictures[0]}`} alt="" ></img>
                                 <div className="card-body">
                                    <h5 className="card-title">{singleDay.company} {singleDay.model}</h5>
                                    <p className="card-text">Pick-up date:  {singleDay.startDate}</p>
                                    <p className="card-text">Drop-off date:  {singleDay.endDate}</p>
                                    <p className="card-text">Points used:  {singleDay.pointsCost}</p>
                                    <p className="card-text">Rental days:  {singleDay.rentalDaysAmount}</p>
                                    
                                 </div>
                                 <div className="card-footer">
                                    <p className="text-muted">{singleDay.reservationNumber}</p>
                                 </div>
                              </div>
                           )}
                        </div>
               
                </div>   
            </div>
    

            <br></br>

        </div>

        )
    }
}