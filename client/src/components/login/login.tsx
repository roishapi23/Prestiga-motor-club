import React, { Component, ChangeEvent } from "react";
// import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import "./login.css"
import axios from "axios"
import { UserLoginDetails } from "../../models/UserLoginDetails";
import { User } from "../../models/User";
import { store } from "../../redux/store";
import { ActionType } from "../../redux/action-Type";
// import axiosService from "./../../interceptor/axiosService";

import { Button,Modal } from 'react-bootstrap'


interface loginState{
    email:string
    password:string
    showHide:boolean
}

export default class Login extends Component<any,loginState>{

    public constructor(props:any){
       super(props)
        this.state = {
            email:"",
            password:"",
            showHide : false
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
    public login = async () => {

        try {
            let userLoginDetails = new UserLoginDetails(this.state.email, this.state.password)
            let response = await axios.post<User>("/users/login",userLoginDetails)
            console.log(response.data)
            let user = response.data
            localStorage.setItem("key" ,user.token)
            store.dispatch({ type: ActionType.Login, payload: user.name});
            localStorage.setItem("userDetails" ,JSON.stringify(user))
                localStorage.setItem("isLogin" ,"true")
                
                // store.dispatch({ type: ActionType.setUserName, payload: user.name});
                // this.setState({ showHide: !this.state.showHide })
                // setAxiousHeaders()
            this.props.history.push('/Car-rental')
            console.log("connected")
            

        } catch (error) {
            console.log(error)
            if (error.response.status == 401) {
                alert("user or password is not correct")
                
            }
        }
    }
    
    handleModalShowHide() {
        this.setState({ showHide: !this.state.showHide })
    }

    public render(){
        return(
        <div className="login">
            <br/><br/>
            <div className="loginForm">

                <input type="text" placeholder="User name" name="username" 
                value={this.state.email} onChange={this.setEmail} /><br/>

                <input type="password" placeholder = "Password" name="password"
                value={this.state.password} onChange={this.setPassword} /><br/>
                
                <input id="loginButton" type="button" className="button hover-shadow2" value="login" onClick={this.login}/>
            </div>

        <Modal className="myModal" show={this.state.showHide}>
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
                </Modal>

        </div>
        
        )
    }
}