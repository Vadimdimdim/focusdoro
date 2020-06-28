import React, { Component } from 'react'
import { FaCode, FaCcAmazonPay } from "react-icons/fa";
import { findDOMNode } from "react-dom";
import $ from "jquery";

import Pomodoro from "./pomodoro"
import "./HomePage.css";

class HomePage extends Component {
    constructor(props){
        super(props);
        this.state = {
            startMinutes: 25,
            startSeconds: 0,
            brakeMinutes: 5,
            brakeSeconds: 0
        }
    }
    
    render() {
        return (
            <>
                <div className="container">
                    <Pomodoro 
                        startMinutes = {this.state.startMinutes}
                        startSeconds = {this.state.startSeconds}
                        brakeMinutes = {this.state.brakeMinutes}
                        brakeSeconds = {this.state.brakeSeconds}
                    />
                </div>
            </>
        )
    }
}

export default HomePage;