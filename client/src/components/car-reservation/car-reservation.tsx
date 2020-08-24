
import React, { Component } from "react";
// import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import "./car-reservation.css"
import CarDetails from "../car-details/car-details";
import { Car } from "../../models/Car";
import { Reservation } from "../../models/Reservation";
import axios from "axios";
import { store } from "../../redux/store";
import { ActionType } from "../../redux/action-Type";
import { Button,Modal } from 'react-bootstrap'


interface carReservationState{
    showHide : boolean
    pickedCar:Car
    startDate:string
    endDate:string
    daysAmount:number
    totalUsedPoints:number
}

export default class CarReservation extends Component<any,carReservationState>{

    public constructor(props:any){
       super(props)
       this.state = {
           showHide : false,
           pickedCar:{company:"",model:""},
           startDate:"",
           endDate:"",
           daysAmount:null,
           totalUsedPoints:null
       }
    }

    componentDidMount = async () =>{

        await this.varifyUserAuth()
        
        const pickedCarId = +this.props.match.params.id;
        console.log("the picked car is "+pickedCarId)
        const cars = JSON.parse(localStorage.getItem("cars"))
        if (cars == null) {
            this.logout()
        }
        for (let index = 0; index < cars.length; index++) {
            if (pickedCarId == cars[index].id) {
                // this.state.pickedCar = cars[index]
                let chosenCar = cars[index]
                console.log(chosenCar)
                this.setState({pickedCar:chosenCar})
            }
        }
        
        const startDate = localStorage.getItem("startDate")
        const endDate = localStorage.getItem("endDate")
        if (startDate == null || endDate == null) {
            alert("no dates was picked")
            this.props.history.replace("/Car-rental")
            return;
        }
        this.setState({startDate:startDate})
        this.setState({endDate: endDate})
        let rentalDaysAmount = this.getDaysAmount(startDate,endDate);
        this.setState({daysAmount:rentalDaysAmount})
        let totalUsedPoints = rentalDaysAmount*this.state.pickedCar.pointsPerDay
        this.setState({totalUsedPoints:totalUsedPoints})
        
        
    }

    public varifyUserAuth = async () => {
        let userToken = localStorage.getItem("key")
        if (userToken == null) {
            this.props.history.replace("/Home")
            return;
        }
        try {
            let isUserAuthenticated = await axios.get<boolean>("/users/auth/Bearer "+ userToken)
            if (!isUserAuthenticated.data) {
                // localStorage.clear()
                this.logout()
                return
            }
        } catch (error) {
            console.log(error)
            this.logout()
        }
    }

    public logout = () => {
        store.dispatch({ type: ActionType.Logout});
        localStorage.clear();
        this.props.history.replace("/Home")
    }

    public navToUserReservations = () =>{
        this.handleModalShowHide();
        this.props.history.push('/My-reservations')
    }

    public getDaysAmount = (startDate:any,endDate:any) => {
        
            startDate = new Date(startDate.split('/')[2],startDate.split('/')[1]-1,startDate.split('/')[0]);
            endDate = new Date(endDate.split('/')[2],endDate.split('/')[1]-1,endDate.split('/')[0]);
            var timeDiff = Math.abs(startDate.getTime() - endDate.getTime());
            var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
            return diffDays;
    }

    handleModalShowHide() {
        this.setState({ showHide: !this.state.showHide })
    }

    public book = async () => {
        console.log(this.state.pickedCar);
        console.log(this.state.startDate);
        console.log(this.state.endDate);

        try {
            // const userId = JSON.parse(localStorage.getItem("userId"))
            let newReservation = new Reservation(this.state.pickedCar.id,this.state.startDate,this.state.endDate,this.state.pickedCar.carLocation)
            let response = await axios.post<object>("/orders",newReservation)
            console.log(response.data)
            // alert("booked \n"+ JSON.stringify(response.data))
            this.handleModalShowHide();
            
            
        } catch (error) {
            console.log(error)
            if (error.response.status == 601) {
                alert("you dont have enough points")
            }

            if (error.response.status == 401 || error.response.status == 607) {
                localStorage.clear()
                store.dispatch({ type: ActionType.Logout});
                this.props.history.replace("/Home")
            }
        }



        // this.setState({endDate:endDateInput})
    }

    public render(){
        return(
        <div className="carReservation" >
            
            {/* <div className="details" > */}

            <div className="reservationText">
            <span>
            <h1><b>Reservation details:</b></h1>
                            <h4><u>Car</u> <br></br> {this.state.pickedCar.company} {this.state.pickedCar.model}</h4>
                            <h4><u>Pick-up date</u> <br></br> {this.state.startDate}</h4>
                            <h4><u>Drop-off date</u> <br></br> {this.state.endDate} </h4>
                            <h4><u>Total days</u> <br></br> {this.state.daysAmount} </h4>
                            <h4><u>Points</u> <br></br> {this.state.totalUsedPoints} </h4>
                            </span>

        {/* <button id="bookingButton" className="btn btn-success" onClick={this.book}>Book this {this.state.pickedCar.company} {this.state.pickedCar.model}</button> */}
        <button id="bookButton" onClick={() => this.book()} className="btn btn-success">Book !</button>
            </div>
            {/* </div> */}

            <CarDetails/>

            <Modal className="myModal" show={this.state.showHide}>
                    <div className="modalWrapper">
                        
                    <Modal.Header closeButton onClick={() => this.handleModalShowHide()}>
                    <Modal.Title className="modalHeader">
                        {/* <img className="membershipModalPic" src={`${this.state.clickedMembership.pic[1]}`} alt=""/> */}
                        <b>{this.state.pickedCar.company} {this.state.pickedCar.model} Booked !</b>
                    </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <img className="completedPic" src="/completed.png" width="90" alt=""/>
                        <h2>Booking Confirmed !</h2>
                        <Button variant="primary" onClick={() => this.navToUserReservations()}>
                        See my reservations
                        </Button>

                        </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={() => this.handleModalShowHide()}>
                        Close
                    </Button>
                    {/* <Button variant="primary" onClick={() => this.handleModalShowHide()}>
                        Save Changes
                    </Button> */}
                    </Modal.Footer>
                    </div>
                </Modal>

                
            
        </div>

        )
    }
}