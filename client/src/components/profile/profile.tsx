import React, { Component, ChangeEvent } from "react";
import "./login.css"
import axios from "axios"
import { store } from "../../redux/store";
import { ActionType } from "../../redux/action-Type";

import { ProfileDetails } from "../../models/ProfileDetails";

interface profileState{
    profileDetails:ProfileDetails
}

export default class Profile extends Component<any,profileState>{

    public constructor(props:any){
       super(props)
        this.state = {
            profileDetails:null
        }
    }
    
    public componentDidMount = async () =>{
        let userToken = localStorage.getItem("key")
        if (userToken == null) {
            this.props.history.replace("/Home")
            return;
        }
    
        try {
            let response = await axios.get<ProfileDetails>("/users/profile")/* request */
            let userProfileDetails = response.data;
            // for (let index = 0; index < allReservations.length; index++) {
                userProfileDetails.pic = JSON.parse(userProfileDetails.pic)
            // }
            console.log(userProfileDetails)
            // allReservations.reverse()
            this.setState({profileDetails:userProfileDetails})
            
        } catch (error) {
            console.log(error.response)
            // console.log(error.response.status)

            if (error.response.status == 401 || error.response.status == 607) {
                localStorage.clear()
                store.dispatch({ type: ActionType.Logout});
                this.props.history.replace("/Home")
            }
        }
    }


    public render(){
        return(
        <div className="profile">
            <br/>
            <div className="loginForm">
            {
                    this.state.profileDetails === null ||
                <span>
                    <h1><b>My Profile</b></h1>
                    <div>
                        <div className="profileDetails">
                            <span id="detailKey"><h4>Name: </h4></span>
                            <span id="detailValue"><h4>{this.state.profileDetails.userName}</h4></span>
                        </div>

                        <div className="profileDetails">
                            <span id="detailKey"><h4>Last Name: </h4></span>
                            <span id="detailValue"><h4>{this.state.profileDetails.familyName}</h4></span>
                        </div>

                        <div className="profileDetails">
                            <span id="detailKey"><h4>Membeship:</h4></span>
                            <span id="detailValue"><h4><img width="30" src={`${this.state.profileDetails.pic[1]}`} /> {this.state.profileDetails.type}</h4></span>
                        </div>

                        <div className="profileDetails">
                            <span id="detailKey"><h4>Yearly points: </h4></span>
                            <span id="detailValue"><h4>{this.state.profileDetails.pointsPerYear}</h4></span>
                        </div>

                        <div className="profileDetails">
                            <span id="detailKey"><h4>Points used: </h4></span>
                            <span id="detailValue"><h4>{this.state.profileDetails.totalUsedPoints}</h4></span>
                        </div>

                        <div className="profileDetails">
                            <span id="detailKey"><h4>Points left: </h4></span>
                            <span id="detailValue"><h4>{this.state.profileDetails.currentPointsAmount}</h4></span>
                        </div>

                        <div className="profileDetails">
                            <span id="detailKey"><h4>Percentages of use: </h4></span>
                            <span id="detailValue"><h4>{((this.state.profileDetails.totalUsedPoints/this.state.profileDetails.pointsPerYear)*100).toFixed(2)} %</h4></span>
                        </div>

                        <div className="profileDetails">
                            <span id="detailKey"><h4>Address: </h4></span>
                            <span id="detailValue"><h4>{this.state.profileDetails.street} , {this.state.profileDetails.city}</h4></span>
                        </div>

                        <div className="profileDetails">
                            <span id="detailKey"><h4>Driving license: </h4></span>
                            <span id="detailValue"><h4>{this.state.profileDetails.drivingLicense}</h4></span>
                        </div>

                        <div className="profileDetails">
                            <span id="detailKey"><h4>ID </h4></span>
                            <span id="detailValue"><h4>{this.state.profileDetails.idNumber}</h4></span>
                        </div>
                                    
                    </div>
                </span>
            }
        </div>

        {/* <Modal className="myModal" show={this.state.showHide}>
                    <div className="modalWrapper">
                        
                    <Modal.Header closeButton onClick={() => this.handleModalShowHide()}>
                    <Modal.Title className="modalHeader">
                        <h1>Login</h1>
                    </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        
                        <input type="text" placeholder="User name" name="username" 
                        value={this.state.email} onChange={this.setEmail} /><br/>

                        <input type="password" placeholder = "Password" name="password"
                        value={this.state.password} onChange={this.setPassword} /><br/>

                        <input id="loginButton" type="button" value="login" onClick={this.login}/>

                        </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={() => this.handleModalShowHide()}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => this.login()}>
                        Login
                    </Button>
                    </Modal.Footer>
                    </div>
                </Modal> */}

        </div>
        
        )
    }
}