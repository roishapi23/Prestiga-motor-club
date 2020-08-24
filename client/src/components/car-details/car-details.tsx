import React, { Component } from 'react'
import "./car-details.css"
import { Car } from '../../models/Car';
import axios from "axios";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { withRouter } from 'react-router-dom';


interface CarDetailsState {
    car: Car;
    pictures: string;
}

class CarDetails extends Component<any, CarDetailsState> {

    constructor(props: any) {
        super(props);
        this.state = {
            car : null,
            pictures:""
        };

       
    }

    componentDidMount = async () => {

        try {
            const id = this.props.match.params.id;
            const response = await axios.get<Car>("/cars/"+id);
            let carDetails = response.data
            // console.log("enterd " + carDetails) 
            carDetails.pictures = JSON.parse(carDetails.pictures)
            let carPictures = (carDetails.pictures)
            console.log(carPictures)
            
            this.setState({car:carDetails});
            this.setState({pictures:carPictures});
            console.log(carDetails)
            console.log(this.state.pictures)
            
        } catch (error) {
            console.log("error at car details");
            
        }
    }

    public render() {
        return (
            <div className="carDetailsComponent">



                <br></br>
                <div className="carosuel-container">

                <Carousel className="carousel" >

                <div>
                    
                    <img id="displayedCarImg" src={`/${this.state.pictures[0]}`} />

                </div>
                <div>
                    <img id="displayedCarImg" src={`/${this.state.pictures[1]}`} />

                </div>
                <div>
                    <img id="displayedCarImg" src={`/${this.state.pictures[2]}`}/>

                </div>
                <div>
                    <img id="displayedCarImg" src={`/${this.state.pictures[3]}`}/>
                </div>
                </Carousel>
                </div>
                
                    {
                        this.state.car === null ||
                        <React.Fragment>
                    <div className="details">
                        <div className="carText">

                    
                            <h1><b>{this.state.car.company} {this.state.car.model}</b></h1>
                            <h3> {this.state.car.pointsPerDay} points / Day</h3><hr></hr>
                            <div className="singleCarDetails">

                                <span>
                                <h4><u>HP:</u> </h4>
                                <h4><u>Top speed:</u></h4>
                                <h4><u>Engine:</u></h4>
                                <h4><u>Model:</u></h4>
                                <h4><u>Color:</u></h4>
                                <h4><u>Interior color:</u></h4>
                                <h4><u>Seats:</u></h4>
                                </span>
                                <span>
                                <h4>{this.state.car.hp}</h4>
                                <h4>{this.state.car.topSpeed}</h4>
                                <h4>{this.state.car.engine}</h4>
                                <h4>{this.state.car.productionYear}</h4>
                                <h4>{this.state.car.color}</h4>
                                <h4>{this.state.car.interiorColor}</h4>
                                <h4>{this.state.car.numberOfSeats}</h4>
                                </span>
                                <br></br>
                            </div>
                           
                        </div>
                </div>
                <div className="iframe-container">

                    <iframe  src={`https://www.youtube.com/embed/${this.state.car.youtubeVid}`} allow="accelerometer; autoplay; fullscreen; encrypted-media; gyroscope; picture-in-picture"></iframe>
                </div>
                </React.Fragment>
                    }
            </div>
            
            );
        }
}

export default withRouter (CarDetails);