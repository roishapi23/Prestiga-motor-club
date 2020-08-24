
import React, { Component, ChangeEvent } from "react";
// import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import "./contact-us.css"
import axios from "axios"


import { Message } from "../../models/Message";
// import connectionString from "./../../interceptor/baseUrl";




interface contactState{
    name:string
    email:string
    message:string
    phone:string
    isMessageSent:boolean
}

export default class ContactUs extends Component<any,contactState>{


    public constructor(props:any){
       super(props)
       this.state = {
           name:"",
            email:"",
            message:"",
            phone:"",
            isMessageSent:false
        }

    }

    // public navToLogin = () => {
    //    this.props.history.push('/Login')
    // }

    public setEmail = (args: ChangeEvent<HTMLInputElement>) => {
        let emailInput = args.target.value   
        this.setState({email:emailInput})
    }
    public setName = (args: ChangeEvent<HTMLInputElement>) => {
        let nameInput = args.target.value   
        this.setState({name:nameInput})
    }

    public setPhone = (args: ChangeEvent<HTMLInputElement>) => {
        let phoneInput = args.target.value   
        this.setState({phone:phoneInput})
    }
    public setMessage = (args: ChangeEvent<HTMLTextAreaElement>) => {
        let messageInput = args.target.value   
        this.setState({message:messageInput})
    }

    public sendMessage = async () => {
        console.log(this.state)
        console.log(this.state.email)
        console.log(this.state.name)
        console.log(this.state.message)

        try {
            let userDetails = new Message(this.state.name, this.state.phone ,this.state.email, this.state.message)
            let response = await axios.post<string>("/users/message",userDetails)
            console.log(response.data)
            this.setState({name:""})
            this.setState({email:""})
            this.setState({message:""})
            this.setState({phone:""})
            this.setState({isMessageSent:true})

        } catch (error) {
            alert("failed")
        }
    }

    public render(){
        return(
        <div className="contactUsComponent" >

            <br></br>
            
            <h4><b><u>Contact us</u></b></h4>
            <br></br>
            <div className="contactInfo">
            <span className="contactText">
                <h5>Address : Nisim Aloni 3, Tel Aviv </h5>
                <h5>Phone : +972-58511611 </h5>
                <h5>Email : prestiga@gmail.com </h5>
            </span>
            <span className="contactPic">
            <img className="mapPic" src="/location.png" alt=""/>
            </span>
            </div>
            <img hidden={!this.state.isMessageSent} className="completedPic" src="/completed.png" width="90" alt=""/>
            <h5 hidden={!this.state.isMessageSent}> Your message has been sent successfully </h5>
            <div hidden={this.state.isMessageSent} className="contactForm">
                <input className="form-control" type="text" placeholder="Name" value={this.state.name} onChange={this.setName} /><br></br>
                <input className="form-control" type="text" placeholder="Phone" value={this.state.phone} onChange={this.setPhone} /><br></br>
                <input className="form-control" type="text" placeholder="Email" value={this.state.email} onChange={this.setEmail} /><br></br>
                
                <textarea className="form-control" placeholder="Write here..." name="message" value={this.state.message} onChange={this.setMessage} ></textarea><br></br>
                <button className="btn btn-primary" onClick={this.sendMessage} >Send</button>
            </div>
            <div>
            </div>
            
        </div>

        )
    }
}