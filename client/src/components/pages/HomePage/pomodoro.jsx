import React, { Component } from 'react';
import "./pomodoro.css"

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
            breakMinutes: this.props.breakMinutes,
            startMinutes: this.props.startMinutes,
            minutes: this.props.startMinutes,
            seconds: this.props.startSeconds,
            isOn: false,
            isBreak: false
        }
        this.startTimer = this.startTimer.bind(this)
        this.stopTimer = this.stopTimer.bind(this)
        this.resetTimer = this.resetTimer.bind(this)
        this.onBreak = this.onBreak.bind(this)
        this.stopBreak = this.stopBreak.bind(this)
        this.addMinutes = this.addMinutes.bind(this)
        this.subtractMinutes = this.subtractMinutes.bind(this)
        this.addBreakMinutes = this.addBreakMinutes.bind(this)
        this.subtractBreakMinutes = this.subtractBreakMinutes.bind(this)
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
            seconds: this.props.startSeconds,
        })
        clearInterval(this.timer)
    }

    onBreak() {
        console.log("Break")
        if (!this.state.isBreak) {
            this.setState({
                isOn: false,
                minutes: this.state.breakMinutes,
                seconds: this.props.breakSeconds,
                isBreak: true
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
            seconds: this.props.startSeconds,
        })
        clearInterval(this.timer)
    }

    addMinutes() {
        this.setState({
            startMinutes: this.state.startMinutes + 1,
            minutes: this.state.minutes + 1
        })
    }

    subtractMinutes() {
        if (this.state.minutes > 0) {
            this.setState({
                startMinutes: this.state.startMinutes - 1,
                minutes: this.state.minutes - 1
            })
        }
    }

    addBreakMinutes() {
        this.setState({
            breakMinutes: this.state.breakMinutes + 1
        })
    }

    subtractBreakMinutes() {
        if (this.state.breakMinutes > 0) {
            this.setState({
                breakMinutes: this.state.breakMinutes - 1
            })
        }
    }

    render() {
        const { minutes, seconds, startMinutes, breakMinutes } = this.state

        let start = (!this.state.isOn) ?
            <button className="btn btn-success" onClick={this.startTimer}><FaPlay /></button> : null;

        let stop = (this.state.isOn && !this.state.isBreak) ?
            <button className="btn btn-danger" onClick={this.stopTimer}><FaPause /></button> : null;

        let reset = (!this.state.isOn) ?
            null : <button style={{ marginLeft: '10px' }} className="btn btn-info" onClick={this.resetTimer}><FaRedoAlt /></button>;

        let skip = (this.state.isBreak) ?
            <button className="btn btn-danger" onClick={this.stopBreak}><FaForward /></button> : null;

        let plus = (this.state.isOn || this.state.isBreak) ?
            <button onClick={this.addMinutes} className="btn btn-outline-light" disabled><FaPlus /></button> :
            <button onClick={this.addMinutes} className="btn btn-outline-light"><FaPlus /></button>;

        let minus = (this.state.isOn || this.state.isBreak) ?
            <button onClick={this.subtractMinutes} className="btn btn-outline-light" disabled><FaMinus /></button> :
            <button onClick={this.subtractMinutes} className="btn btn-outline-light"><FaMinus /></button>;

        let plusBreak = (this.state.isOn || this.state.isBreak) ?
            <button className="btn btn-outline-light" disabled><FaPlus /></button> :
            <button onClick={this.addBreakMinutes} className="btn btn-outline-light"><FaPlus /></button>;

        let minusBreak = (this.state.isOn || this.state.isBreak) ?
            <button className="btn btn-outline-light" disabled><FaMinus /></button> :
            <button onClick={this.subtractBreakMinutes} className="btn btn-outline-light"><FaMinus /></button>;

        return (
            <div className="pomodoro-container">
                <div className="settings-wrap">
                    <div className="settings">
                        <div className="session">
                            <div className="length">SESSION LENGTH</div>
                            <div className="controls">
                                <div>{minus}</div>
                                <span className="time">{startMinutes < 10 ? `0${startMinutes}` : startMinutes}</span>
                                <div>{plus}</div>
                            </div>
                        </div>

                        <div className="break">
                            <div className="length">BREAK LENGTH</div>
                            <div className="controls">
                                <div>{minusBreak}</div>
                                <span className="time">{breakMinutes < 10 ? `0${breakMinutes}` : breakMinutes}</span>
                                <div>{plusBreak}</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="timer-wrap">
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