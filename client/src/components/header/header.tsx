import React, { Component, ChangeEvent } from "react";
import { BrowserRouter, Switch, Route, Redirect, withRouter } from "react-router-dom";
import "./header.css"
import { Unsubscribe } from "redux";
import { store } from "../../redux/store";
import { ActionType } from "../../redux/action-Type";
import { Button,Modal } from 'react-bootstrap'
import { UserLoginDetails } from "../../models/UserLoginDetails";
import { User } from "../../models/User";
import axios from "axios"
import axiosService, { setAxiousHeaders } from "./../../interceptor/axiosService";
// import connectionString from "./../../interceptor/baseUrl";
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'


interface headerState{
    email:string
    password:string
    isUserLoggedIn:boolean
    showHide:boolean,
    userName:string
}

class Header extends Component<any,headerState>{

    private unsubscribeStore: Unsubscribe

    public constructor(props:any){
       super(props)
       this.state = {
           email:"",
           password:"",
           isUserLoggedIn : false,
           showHide : false,
           userName:""
        }

       this.unsubscribeStore = store.subscribe(
            // In fact, the following function is our "listener", "refresh function"
            () => this.setState(
            {
                isUserLoggedIn: store.getState().isUserLoggedIn,
                userName: store.getState().userName


            })
        );

    }

    public componentDidMount = () =>{
    
        if(localStorage.getItem("isLogin")=="true"){
            store.dispatch({ type: ActionType.Login});
        }
        if(localStorage.getItem("userDetails")!=null){
            let user = JSON.parse(localStorage.getItem("userDetails"))
            store.dispatch({ type: ActionType.setUserName, payload: user.name});
        }
        else{
            this.setState({userName:store.getState().userName})
        }
        
    }

    public setEmail = (args: ChangeEvent<HTMLInputElement>) => {
        let emailInput = args.target.value   
        this.setState({email:emailInput})
    }
    public setPassword = (args: ChangeEvent<HTMLInputElement>) => {
        let passwordInput = args.target.value   
        this.setState({password:passwordInput})
    }
    // public login = async () => {

    //     try {
    //         let userLoginDetails = new UserLoginDetails(this.state.email, this.state.password)
    //         let response = await axios.post<User>("/users/login",userLoginDetails)
    //         console.log(response.data)
    //         let user = response.data
    //         localStorage.setItem("key" ,user.token)
    //             store.dispatch({ type: ActionType.Login});
    //             localStorage.setItem("userId" ,JSON.stringify(user.id))
    //             localStorage.setItem("isLogin" ,"true")
    //             this.setState({ showHide: !this.state.showHide })
    //             // setAxiousHeaders()
    //         this.props.history.push('/Car-rental')
    //         console.log("connected")
            

    //     } catch (error) {
    //         alert("failed")
    //     }
    // }
    
    public navToLogin = () => {
        this.props.history.push('/Login')
        this.closeNavCollapseOnMobile();
    }
    public handleModalShowHide = () => {
        this.setState({ showHide: !this.state.showHide })
        this.closeNavCollapseOnMobile();
    }
    public navToHome = () => {
       this.props.history.push('/Home')
       this.closeNavCollapseOnMobile();
    }
    
    public navToAboutUs = () =>{
        this.props.history.push('/About-us')
        this.closeNavCollapseOnMobile();
    }

    public navToOurCars = () =>{
        this.props.history.push('/Our-cars')
        this.closeNavCollapseOnMobile();
    }
    public navToContact = () =>{
        this.props.history.push('/Contact-us')
        this.closeNavCollapseOnMobile();
    }
    public navToBooking = () =>{
        this.props.history.push('/Car-rental')
        this.closeNavCollapseOnMobile();
    }
    public navToMemberships = () =>{
        this.props.history.push('/Memberships')
        this.closeNavCollapseOnMobile();
    }
    public navToUserReservations = () =>{
        this.props.history.push('/My-reservations')
        this.closeNavCollapseOnMobile();
    }

    public navToProfile = () =>{
        this.props.history.push('/Profile')
        this.closeNavCollapseOnMobile();
    }

    public logOut = () =>{
        store.dispatch({ type: ActionType.Logout});
        localStorage.clear();
        this.navToHome();
    }

    public closeNavCollapseOnMobile = () => {
        let nav = document.getElementById("navToggle")
        nav.className = "navbar-toggler collapsed";
        let navBar = document.getElementById("responsive-navbar-nav")
        navBar.className = "navbar-collapse collapse"
    }



    public render(){
        return(
        <div className="header" >

        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Navbar.Brand >
          <img className="logo" src="/prestiga logo(1).png" onClick={this.navToHome}/>
              </Navbar.Brand>
        <h6 className="helloGuest">Hello {this.state.userName}</h6>
          <Navbar.Toggle id="navToggle" aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
                {/* Hello Guest  */}
            </Nav>
            <Nav>
              <Nav.Link hidden={this.state.isUserLoggedIn} href="" onClick={this.navToHome}>Home</Nav.Link>
              <Nav.Link hidden={this.state.isUserLoggedIn} href="" onClick={this.navToMemberships}>Memberships</Nav.Link>
              <Nav.Link hidden={this.state.isUserLoggedIn} href="" onClick={this.navToOurCars}>Cars</Nav.Link>
              <Nav.Link hidden={this.state.isUserLoggedIn} href="" onClick={this.navToAboutUs}>About Us</Nav.Link>
              <Nav.Link hidden={this.state.isUserLoggedIn} href="" onClick={this.navToContact}>Contact Us</Nav.Link>
              <Nav.Link hidden={!this.state.isUserLoggedIn} href="" onClick={this.navToBooking}>New Reservation</Nav.Link>
              <Nav.Link hidden={!this.state.isUserLoggedIn} href="" onClick={this.navToUserReservations}>My Bookings</Nav.Link>
              <Nav.Link hidden={!this.state.isUserLoggedIn} href="" onClick={this.navToProfile}> <img height="27" src="https://image.flaticon.com/icons/svg/847/847969.svg" alt="" className="searchCarsAreaImg" /> </Nav.Link>
              <Nav.Link hidden={this.state.isUserLoggedIn} className="loginButton" onClick={this.navToLogin}><b>Log in</b></Nav.Link>
              <Nav.Link hidden={!this.state.isUserLoggedIn} className="loginButton" onClick={this.logOut}><b>Log Out</b></Nav.Link>
             
            </Nav>
          </Navbar.Collapse>
        </Navbar>
          
            {/* <span className="dropdown">
                <button className="dropbtn"></button>
                <div className="dropdown-content">
                    <a hidden={this.state.isUserLoggedIn} onClick={() => this.navToHome()} href="#"><b>Home</b></a>
                    <a hidden={this.state.isUserLoggedIn} onClick={() => this.navToOurCars()} href="#"><b>Cars</b></a>
                    <a hidden={this.state.isUserLoggedIn} onClick={() => this.navToMemberships()} href="#"><b>Memberships</b></a>
                    <a hidden={!this.state.isUserLoggedIn} onClick={() => this.navToBooking()} href="#"><b>New Reservation</b></a>
                    <a hidden={!this.state.isUserLoggedIn} onClick={() => this.navToUserReservations()} href="#"><b>My Reservations</b></a>
                    <a hidden={this.state.isUserLoggedIn} onClick={() => this.navToAboutUs()} href="#"><b>About us</b></a>
                    <a hidden={this.state.isUserLoggedIn} onClick={() => this.navToContact()} href="#"><b>Contact</b></a>

                </div>
            </span>

            <img className="logo" src="/prestiga logo(1).png"  onClick={this.navToHome}/>
            <button hidden={this.state.isUserLoggedIn} className="loginButton" onClick={this.handleModalShowHide}>Log in</button>
            <button hidden={!this.state.isUserLoggedIn} className="loginButton" onClick={this.logOut}>Log out</button> */}


            {/* <Modal className="myModal" show={this.state.showHide}>
                    <div className="modalWrapper">
                        
                    <Modal.Header closeButton onClick={() => this.handleModalShowHide()}>
                    <Modal.Title className="modalHeader">
                        <h1>Members Login</h1>
                    </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        
                        <input id="loginInput" type="text" placeholder="User name" name="username" 
                        value={this.state.email} onChange={this.setEmail} /><br/>

                        <input id="loginInput" type="password" placeholder = "Password" name="password"
                        value={this.state.password} onChange={this.setPassword} /><br/>

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

export default withRouter (Header);