import React, {Component} from 'react';

class Pomodoro extends Component {
    constructor(props){
        super(props)
        this.state = {
            startMinutes: this.props.startMinutes,
            startSeconds: this.props.startSeconds,
            brakeMinutes: this.props.brakeMinutes,
            rakeSeconds: this.props.brakeSeconds,
            minutes: this.props.startMinutes,
            seconds: this.props.startSeconds,
            start: true,
            isOn: false,
            isBrake: false
        }    
        this.startTimer = this.startTimer.bind(this)
        this.stopTimer = this.stopTimer.bind(this)
        this.resetTimer = this.resetTimer.bind(this)
        this.onBrake = this.onBrake.bind(this)
        this.stopBrake = this.stopBrake.bind(this)
    }

    interval(){
        
    }
  
    startTimer() {
        if(!this.state.isOn){
            this.setState({
                isOn: true,
                isBrake: false,
                start: true,
                minutes: this.state.minutes,
                seconds: this.state.seconds
            })
        
            this.timer = setInterval(() => {
                const { seconds, minutes } = this.state

                if (seconds > 0) {
                    this.setState(({ seconds }) => ({
                        seconds: seconds - 1
                    }))
                }
                if (seconds === 0) {
                    if (minutes === 0) {
                        clearInterval(this.timer)
                    } else {
                        this.setState(({ minutes }) => ({
                            minutes: minutes - 1,
                            seconds: 59
                        }))
                    }
                }
                if(seconds === 0 && minutes === 0){
                    this.onBrake()
                }
            }, 1000);
        }
    }
  
    stopTimer() {
        this.setState({isOn: false, start: false})
        clearInterval(this.timer)
    }  
  
    resetTimer() {
        this.setState({
            start: true,
            isOn: false,
            minutes: this.props.startMinutes,
            seconds: this.props.startSeconds,
        })
        clearInterval(this.timer)
    }

    onBrake(){
        console.log("Brake")
        if(!this.state.isBrake){
            this.setState({
                isOn: false,
                minutes: this.props.brakeMinutes,
                seconds: this.props.brakeSeconds,
                isBrake: true
            })
            this.timer = setInterval(() => {
                const { seconds, minutes } = this.state

                if (seconds > 0) {
                    this.setState(({ seconds }) => ({
                        seconds: seconds - 1
                    }))
                }
                if (seconds === 0) {
                    if (minutes === 0) {
                        clearInterval(this.timer)
                    } else {
                        this.setState(({ minutes }) => ({
                            minutes: minutes - 1,
                            seconds: 59
                        }))
                    }
                }if(seconds === 0 && minutes === 0 && this.state.isBrake){
                    this.stopBrake()
                }
            }, 1000);
        }
    }

    stopBrake(){
        this.setState({
            isBrake: false,
            start: true,
            minutes: this.props.startMinutes,
            seconds: this.props.startSeconds,
        })
        clearInterval(this.timer)
    }
  
    render() {    
        const { minutes, seconds} = this.state

        let start = (!this.state.isOn && this.state.start && !this.state.isBrake) ?
        <button className="btn btn-success" onClick={this.startTimer}>Start</button> : null;

        let stop = (this.state.isOn && !this.state.isBrake) ? 
        <button className="btn btn-danger" onClick={this.stopTimer}>Stop</button> : null;

        let reset = (!this.state.isOn) ? 
        null : <button className="btn btn-info" onClick={this.resetTimer}>Reset</button>;

        let resume = (this.state.start) ? 
        null : <button className="btn btn-success" onClick={this.startTimer}>Resume</button>;

        let skip = (this.state.isBrake) ? 
        <button className="btn btn-danger" onClick={this.stopBrake}>Skip</button> : null;

        return(
            <div className="container">
                {/* { minutes === 0 && seconds === 0
                    // ? <h1>{brakeMinutes < 10 ? `0${brakeMinutes}` : brakeMinutes}:{brakeSeconds < 10 ? `0${brakeSeconds}` : brakeSeconds}</h1>
                    ? this.onBrake()
                    : <h1>{minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}</h1>
                } */}
                <h1>{minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}</h1>
                {start}
                {stop}
                {reset}
                {resume}
                {skip}
            </div>
        )
    }
}

export default Pomodoro;