import React, { Component } from "react";
// import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import "./memberships.css"
import axios from "axios";

import { Button,Modal } from 'react-bootstrap'
import { Membership } from "../../models/Membership";
// import connectionString from "../../interceptor/baseUrl";

interface modalState{
    showHide:boolean,
    memberships : Membership[];
    clickedMembership:Membership
}


export default class Memberships extends Component<any,modalState>{

    public constructor(props:any){
       super(props)
        this.state = {
            showHide : false,
            memberships : [],
            clickedMembership : null
        }
    }

    
    componentDidMount = async () =>{
        try {
            let response = await axios.get<Membership[]>("/users/memberships")/* request */
            let allMemberships = response.data;
            for (let index = 0; index < allMemberships.length; index++) {
                console.log(allMemberships[index].pic)
                allMemberships[index].pic = JSON.parse(allMemberships[index].pic)
            }
            console.log(allMemberships)
            this.setState({memberships:allMemberships})
            
        } catch (error) {
            console.log(error)
          alert("failed")  
        }
    }
    

    public onMembershipClicked = (membership:Membership) =>{
        console.log(membership)
        // this.props.history.push('/memberships/'+name)
        this.setState({ clickedMembership: membership })
        this.setState({ showHide: !this.state.showHide })
    }

    handleModalShowHide() {
        this.setState({ showHide: !this.state.showHide })
    }

    

    public render(){
        return(
            
        <div className="membershipsTypes" >


            <br></br>
            <h4><u>Memberships</u></h4>
            
            {this.state.memberships.map((membership) =>
                <img key={membership.id} className={membership.type} src={`/${membership.pic[0]}`} onClick={() => this.onMembershipClicked(membership)}  />
                
            )}

            <div>
                {/* <Button variant="primary" >
                    Launch demo modal
                </Button> */}
                    {
                    this.state.clickedMembership === null ||
                    
                <Modal className="myMembershipModal" show={this.state.showHide}>
                    <div className="modalWrapper">
                        
                    <Modal.Header closeButton onClick={() => this.handleModalShowHide()}>
                    <Modal.Title className="modalHeader">
                        <div className="membershipHeader">
                            <img className="membershipModalPic" src={`${this.state.clickedMembership.pic[1]}`} alt=""/>
                            <b>{this.state.clickedMembership.type} Membership</b>
                        </div>
                    </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <div className="membershipText">
                            <span className="membershipDetailName">
                                Membership period: <br></br>
                                Points per year:<br></br>
                                Price per point:<br></br>
                                Membership price:<br></br>
                                Prepayment:<br></br>
                                Monthly payment:<br></br>
                            </span>

                            <span className="membershipDetailDescription">
                                {this.state.clickedMembership.yearsOfMembership} Years <br></br>
                                {this.state.clickedMembership.pointsPerYear} <br></br>
                                {this.state.clickedMembership.pricePerPoint}<br></br>
                                {this.state.clickedMembership.membershipPrice} ₪<br></br>
                                {this.state.clickedMembership.prepayment} ₪<br></br>
                                {this.state.clickedMembership.monthlyPayment} ₪<br></br>
                            </span>

                        </div>

                        {/* Membership period: {this.state.clickedMembership.yearsOfMembership} Years<br></br>
                        Points per year: {this.state.clickedMembership.pointsPerYear}<br></br>
                        Price per point: {this.state.clickedMembership.pricePerPoint}<br></br>
                        Membership price: ILS {this.state.clickedMembership.membershipPrice}<br></br>
                        MonthlyPayment: {this.state.clickedMembership.monthlyPayment}<br></br>
                        Prepayment: {this.state.clickedMembership.prepayment} */}

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
                }

            </div>

        </div>

        )
    }
}


