import React, { Component } from 'react';
import "./pomodoro.css";

import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa";
import { FaRedoAlt } from "react-icons/fa";
import { FaForward } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";

class Pomodoro extends Component {
    constructor(props) {
        super(props)
        this.state = {
            startMinutes: this.props.startMinutes,
            breakMinutes: this.props.breakMinutes,
            longBreakMinutes: this.props.longBreakMinutes,
            minutes: this.props.startMinutes,
            seconds: 0,
            isOn: false,
            isBreak: false,
            isLongBreak: false,
            counter: 1
        }
    }

    startTimer() {
        if (!this.state.isOn) {
            this.setState({
                isOn: true,
                isBreak: false,
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
                if (seconds === 0 && minutes === 0) {
                    this.onBreak()
                }
            }, 1000);
        }
    }

    stopTimer() {
        this.setState({ isOn: false, start: false })
        clearInterval(this.timer)
    }

    resetTimer() {
        this.setState({
            isOn: false,
            minutes: this.state.startMinutes,
            seconds: 0,
        })
        clearInterval(this.timer)
    }

    onBreak() {
        console.log("Break")
        if (!this.state.isBreak) {
            this.setState({
                isOn: false,
                minutes: this.state.breakMinutes,
                seconds: 0,
                isBreak: true,
                counter: this.state.counter + 1
            })
            if ((this.state.counter - 1) % 4 === 0) {
                this.setState({
                    minutes: this.state.longBreakMinutes,
                    seconds: 0,
                    isLongBreak: true
                })
                console.log("true")
            } else {
                this.setState({
                    isLongBreak: false
                })
            }
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
                } if (seconds === 0 && minutes === 0 && this.state.isBreak) {
                    this.stopBreak()
                }
            }, 1000);
        }
    }

    stopBreak() {
        this.setState({
            isBreak: false,
            minutes: this.state.startMinutes,
            seconds: 0,
        })
        clearInterval(this.timer)
    }

    incrementMinutes() {
        this.setState({
            startMinutes: this.state.startMinutes + 1,
            minutes: this.state.minutes + 1
        })
    }

    decrementMinutes() {
        if (this.state.minutes > 0) {
            this.setState({
                startMinutes: this.state.startMinutes - 1,
                minutes: this.state.minutes - 1
            })
        }
    }

    incrementBreakMinutes() {
        this.setState({
            breakMinutes: this.state.breakMinutes + 1
        })
    }

    decrementBreakMinutes() {
        if (this.state.breakMinutes > 0) {
            this.setState({
                breakMinutes: this.state.breakMinutes - 1
            })
        }
    }

    incrementLongBreakMinutes() {
        this.setState({
            longBreakMinutes: this.state.longBreakMinutes + 1
        })
    }

    decrementLongBreakMinutes() {
        if (this.state.longBreakMinutes > 0) {
            this.setState({
                longBreakMinutes: this.state.longBreakMinutes - 1
            })
        }
    }

    render() {
        const { minutes, seconds, startMinutes, breakMinutes, longBreakMinutes, counter } = this.state

        let start = (!this.state.isOn && !this.state.isBreak) ?
            <button className="btn btn-success btn-correction" onClick={() => this.startTimer()}><FaPlay /></button> : null;

        let stop = (this.state.isOn && !this.state.isBreak) ?
            <button className="btn btn-danger btn-correction" onClick={() => this.stopTimer()}><FaPause /></button> : null;

        let reset = (!this.state.isOn) ?
            null : <button className="btn btn-info btn-correction" onClick={() => this.resetTimer()} style={{ marginLeft: '10px' }}><FaRedoAlt /></button>;

        let skip = (this.state.isBreak) ?
            <button className="btn btn-danger btn-correction" onClick={() => this.stopBreak()}><FaForward /></button> : null;

        let plus = (this.state.isOn || this.state.isBreak) ?
            <button className="btn btn-outline-light btn-correction" disabled><FaPlus /></button> :
            <button onClick={() => this.incrementMinutes()} className="btn btn-outline-light btn-correction"><FaPlus /></button>;

        let minus = (this.state.isOn || this.state.isBreak) ?
            <button className="btn btn-outline-light btn-correction" disabled><FaMinus /></button> :
            <button onClick={() => this.decrementMinutes()} className="btn btn-outline-light btn-correction"><FaMinus /></button>;

        let plusBreak = (this.state.isOn || this.state.isBreak) ?
            <button className="btn btn-outline-light btn-correction" disabled><FaPlus /></button> :
            <button onClick={() => this.incrementBreakMinutes()} className="btn btn-outline-light btn-correction"><FaPlus /></button>;

        let minusBreak = (this.state.isOn || this.state.isBreak) ?
            <button className="btn btn-outline-light btn-correction" disabled><FaMinus /></button> :
            <button onClick={() => this.decrementBreakMinutes()} className="btn btn-outline-light btn-correction"><FaMinus /></button>;

        let plusLongBreak = (this.state.isOn || this.state.isBreak) ?
            <button className="btn btn-outline-light btn-correction" disabled><FaPlus /></button> :
            <button onClick={() => this.incrementLongBreakMinutes()} className="btn btn-outline-light btn-correction"><FaPlus /></button>;

        let minusLongBreak = (this.state.isOn || this.state.isBreak) ?
            <button className="btn btn-outline-light btn-correction" disabled><FaMinus /></button> :
            <button onClick={() => this.decrementLongBreakMinutes()} className="btn btn-outline-light btn-correction"><FaMinus /></button>;

        let counterDiv = (!this.state.isBreak) ?
            <p>POMODORO #{counter}</p> : (this.state.isLongBreak) ?
                <p>LONG BREAK</p> : <p>SHORT BREAK</p>

        return (
            <div className="pomodoro-container">
                <div className="row" style={{marginBottom: '20px'}}>
                    <div className="settings col-md-3 col-xs-12">
                        <p>SESSION</p>
                        <div className="controls">
                            <div>{minus}</div>
                            <span className="time">{startMinutes < 10 ? `0${startMinutes}` : startMinutes}</span>
                            <div>{plus}</div>
                        </div>
                    </div>

                    <div className="settings col-md-3 col-xs-12">
                        <p>SHORT BREAK</p>
                        <div className="controls">
                            <div>{minusBreak}</div>
                            <span className="time">{breakMinutes < 10 ? `0${breakMinutes}` : breakMinutes}</span>
                            <div>{plusBreak}</div>
                        </div>
                    </div>

                    <div className="settings col-md-3 col-xs-12">
                        <p>LONG BREAK</p>
                        <div className="controls">
                            <div>{minusLongBreak}</div>
                            <span className="time">{longBreakMinutes < 10 ? `0${longBreakMinutes}` : longBreakMinutes}</span>
                            <div>{plusLongBreak}</div>
                        </div>
                    </div>
                </div>

                <div className="timer-wrap">
                    <div className="pomodoro-counter">{counterDiv}</div>

                    <div>
                        <h1 className="text-white">{minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}</h1>
                    </div>
                    <br />
                    <div className="button-container">
                        <div>{start}</div>
                        <div>{stop}</div>
                        <div >{reset}</div>
                        <div>{skip}</div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Pomodoro;