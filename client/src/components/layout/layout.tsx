import React, { Component } from "react";
import "./layout.css"
import { BrowserRouter, Switch, Route, Redirect, RouteComponentProps, withRouter } from "react-router-dom";
import Header from "../header/header";
import Footer from "../footer/footer";
import Main from "../main/main";
import Login from "../login/login";
import CarsRental from "../cars-rental/cars-rental";
import AboutUs from "../about-us/about-us";
import ContactUs from "../contact-us/contact-us";
import OurCars from "../our-cars/our-cars";
import Memberships from "../memberships/memberships";
import CarDetails from "../car-details/car-details";
import MembershipDetails from "../membership-Details/membership-details";
import CarReservation from "../car-reservation/car-reservation";
import UserReservetions from "../user-reservations/user-reservations";
import Profile from "../profile/profile";
// import requireAuth from "../../interceptor/AuthenticatedComponent";
// import { PrivateRoute } from "../protectedRoute/protectedRoute";






export default class Layout extends Component<any>{


    // componentDidMount = async () => {
    //     let userToken = localStorage.getItem("key")
    //     if (userToken == null) {
    //         return;
    //     }
    //     try{
            
    //         let isUserAuthenticated = await axiosService.get<boolean>("/users/auth/Bearer "+ userToken)
    //         // this.setState({ showHide: !this.state.showHide })
            
    //             this.setState({isUserLoggedIn : true})
    //             console.log("changed to true")
    //             store.dispatch({ type: ActionType.Login});              
            
            
    //         console.log("already logged in")

    //     } catch (error) {
    //         console.log("not logged in")
    //     }
    // }

    public render(){
        return(
        <BrowserRouter>
        <section className="layout">
            <header>
                <Header/>
            </header>
            <div className="headerMargin"></div>
                    <main>
                        <Switch>
                        <Route path="/Home" component={Main} exact></Route>
                        <Route path="/Login" component={Login} exact></Route>
                        <Route path="/About-us" component={AboutUs} exact></Route>
                        <Route path="/Contact-us" component={ContactUs} exact></Route>
                        <Route path="/Our-cars" component={OurCars} exact></Route>
                        <Route path="/Our-cars/:id" component={CarDetails} exact></Route>
                        <Route path="/Memberships" component={Memberships} exact></Route>
                        <Route path="/Memberships/:name" component={MembershipDetails} exact></Route>
                        <Route path="/Car-rental" component={CarsRental} exact></Route>
                        <Route path="/Profile" component={Profile} exact></Route>
                        <Route path="/My-reservations" component={UserReservetions} exact></Route>
                        <Route path="/Car-reservation/:id" component={CarReservation} exact></Route>
                        <Redirect from="/" to="/Home" ></Redirect>
                        </Switch>
                    </main>
                    <footer>
                        <Footer />
                    </footer>
                </section>
            
        </BrowserRouter>
        )
    }
}

  