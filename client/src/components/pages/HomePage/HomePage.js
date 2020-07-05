import React, {Component} from 'react';
import Pomodoro from "./pomodoro";
import Task from "./taskList";

import "./HomePage.css";

class HomePage extends Component {
    constructor(props){
        super(props);
        this.state = {
            startMinutes: 25,
            breakMinutes: 5,
            longBreakMinutes: 15
        }
    }
    render() {
        return (
            <>
                <div className="container">
                    <Pomodoro 
                        startMinutes = {this.state.startMinutes}
                        breakMinutes = {this.state.breakMinutes}
                        longBreakMinutes = {this.state.longBreakMinutes}
                    />
                    <Task/>
                </div>
            </>
        )
    }
}

export default HomePage;