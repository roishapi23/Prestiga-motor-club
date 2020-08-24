import React, { Component } from 'react'
import "./membership-details.css"

import axios from "axios";
import { Membership } from '../../models/Membership';


interface MembershipDetailsState {
    membership: Membership;
}

export default class MembershipDetails extends Component<any, MembershipDetailsState> {

    constructor(props: any) {
        super(props);
        this.state = {membership: null};
    }

    public async componentDidMount() {
        const name = this.props.match.params.name;
        const response = await axios.get<Membership>("/users/memberships/"+name);
        console.log(response.data)
        this.setState({membership:response.data});
    }


    public render() {
        return (
            <div className="membershipDetails">
                <br></br>

                <div></div>
                {
                    this.state.membership === null ||
                    <p>{this.state.membership.type}<br />
                        {this.state.membership.pricePerPoint}<br />
                        {this.state.membership.pointsPerYear}<br />
                    </p>
                }

            </div>
        );
    }
}