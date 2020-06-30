import React, { Component } from 'react'

import Pomodoro from "./pomodoro"
import Task from "./taskList"

import "./HomePage.css";

class HomePage extends Component {
    constructor(props){
        super(props);
        this.state = {
            startMinutes: 25,
            startSeconds: 0,
            breakMinutes: 5,
            breakSeconds: 0
        }
    }
    brake
    render() {
        return (
            <>
                <div className="container">
                    <Pomodoro 
                        startMinutes = {this.state.startMinutes}
                        startSeconds = {this.state.startSeconds}
                        breakMinutes = {this.state.breakMinutes}
                        breakSeconds = {this.state.breakSeconds}
                    />
                    <Task 
                        
                    />
                </div>
            </>
        )
    }
}

export default HomePage;