import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Button, Tooltip } from 'antd';
import { ForwardFilled } from '@ant-design/icons'
import '../../../stylesheets/pomodoro.css';

import Settings from './Settings';
import Tasks from './Tasks'

function Pomodoro() {

    const [Duration, setDuration] = useState(25)
    const [ShortBreak, setShortBreak] = useState(5)
    const [LongBreak, setLongBreak] = useState(15)
    const [LongBreakDelay, setLongBreakDelay] = useState(4)
    const [AutoPomodoro, setAutoPomodoro] = useState(true)
    const [AutoBreak, setAutoBreak] = useState(true)

    const [Minutes, setMinutes] = useState(Duration)
    const [Seconds, setSeconds] = useState(0)
    const [IsOn, setIsOn] = useState(false)
    const [IsAutoStop, setIsAutoStop] = useState(false)
    const [IsPomodoro, setIsPomodoro] = useState(false)
    const [IsBreak, setIsBreak] = useState(false)
    const [IsShortBreak, setIsShortBreak] = useState(false)
    const [IsLongBreak, setIsLongBreak] = useState(false)
    const [Counter, setCounter] = useState(1)
    const [FinishedPomodoro, setFinishedPomodoro] = useState(false)

    const updateSettings = () => {
        let variable = { user: localStorage.getItem("userId") }

        axios.post('/api/pomodoro/getSettings', variable)
            .then(response => {
                if (response.data.success) {
                    // console.log(response.data.settings);
                    setDuration(response.data.settings.duration)
                    setShortBreak(response.data.settings.shortBreak)
                    setLongBreak(response.data.settings.longBreak)
                    setLongBreakDelay(response.data.settings.longBreakDelay)
                    setAutoPomodoro(response.data.settings.autoStartPomodoro)
                    setAutoBreak(response.data.settings.autoStartBreak)
                    if (!IsOn && !IsShortBreak && !IsLongBreak) {
                        setMinutes(response.data.settings.duration)
                    }
                } else {
                    if (!IsOn && !IsShortBreak && !IsLongBreak) {
                        setMinutes(Duration)
                    }
                    // alert('Failed to get Settings from pomodoro 43')
                }
            })
    }

    useEffect(() => {
        updateSettings()
    }, [])

    useEffect(() => {
        let interval = null;

        if (IsOn) {
            setIsAutoStop(false)
            interval = setInterval(() => {
                if (Seconds > 0) {
                    setSeconds(Seconds => Seconds - 1)
                } else if (Seconds === 0) {
                    setMinutes(Minutes => Minutes - 1)
                    setSeconds(59)
                }
                if (Seconds === 0 && Minutes === 0) {
                    if (!IsBreak && IsPomodoro) {
                        // Pomodoro Counter
                        setCounter(Counter => Counter + 1)
                        setFinishedPomodoro(!FinishedPomodoro)
                        StartBreak()
                    }
                    else {
                        setFinishedPomodoro(!FinishedPomodoro)
                        CheckAutoPomodoro()
                    }
                }
            }, 1000);
        } else if (!IsOn) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [IsOn, Minutes, Seconds, IsBreak, IsPomodoro])

    const StartPomodoro = () => {
        setIsOn(true)
        setIsPomodoro(true)
        setIsBreak(false)
        setMinutes(Duration)
        setSeconds(3)
        // console.log('Start Pomodoro')
    }

    const CheckAutoPomodoro = () => {
        if (AutoPomodoro) {
            // console.log('Auto Pomodoro', AutoPomodoro)
            setIsAutoStop(false)
            StartPomodoro()
        } else {
            // console.log('Auto Pomodoro', AutoPomodoro)
            setIsAutoStop(true)
            setIsOn(false)
            setIsPomodoro(true)
            setIsBreak(false)
            setMinutes(Duration)
            setSeconds(0)
        }
    }

    const StartBreak = () => {
        if (AutoBreak) {
            // console.log('Auto Break', AutoBreak)
            setIsAutoStop(false)
            setIsOn(true)
        } else {
            // console.log('Auto Break', AutoBreak)
            setIsAutoStop(true)
            setIsOn(false)
        }
        setIsPomodoro(false)
        setIsBreak(true)
        let counter = Counter
        let longBreakDelay = LongBreakDelay
        if (counter % longBreakDelay === 0) {
            setMinutes(LongBreak)
            setSeconds(0)
            setIsShortBreak(false)
            setIsLongBreak(true)
            // console.log('Start Long Break')
        } else {
            setMinutes(ShortBreak)
            setSeconds(0)
            setIsShortBreak(true)
            setIsLongBreak(false)
            // console.log('Start Short Break')
        }
    }

    const StopPomodoro = () => {
        setIsOn(false)
    }

    const ResumePomodoro = () => {
        setIsOn(true)
    }

    const ResetPomodoro = () => {
        // console.log('Reset pomodoro')
        StartPomodoro()
    }

    const SkipPomodoro = () => {
        if (!IsBreak) {
            // console.log('Skip Break')
            StartBreak()
        } else {
            setCounter(Counter => Counter + 1)
            // console.log('Skip Pomodoro')
            setFinishedPomodoro(!FinishedPomodoro)
            CheckAutoPomodoro()
        }
    }

    return (
        <div className='pomodoro-container'>
            <div className='space-align-container' type='flex' align='middle'>
                <div className='timer-container'>
                    <Tooltip placement="top" title="Open Settings Menu">
                        <div className='settings-button'>
                            <Settings update={updateSettings}
                                setDuration={setDuration}
                                setShortBreak={setShortBreak}
                                setLongBreak={setLongBreak}
                                setLongBreakDelay={setLongBreakDelay}
                                setAutoPomodoro={setAutoPomodoro}
                                setAutoBreak={setAutoBreak}
                                Duration={Duration}
                                ShortBreak={ShortBreak}
                                LongBreak={LongBreak}
                                LongBreakDelay={LongBreakDelay}
                                AutoPomodoro={AutoPomodoro}
                                AutoBreak={AutoBreak}
                            />
                        </div>
                    </Tooltip>

                    <div className='pomodoro-counter'>
                        {!IsBreak ?
                            !IsBreak && IsOn ?
                                <p>Pomodoro #{Counter}</p>
                                :
                                <p>Pomodoro #{Counter}
                                    <Tooltip placement="top" title="Skip Pomodoro">
                                        <ForwardFilled style={{ fontSize: '2rem', color: '#6969f5' }} onClick={SkipPomodoro} />
                                    </Tooltip>
                                </p>

                            :
                            IsBreak && IsOn ?
                                IsLongBreak ? <p>On Long Break</p> : <p>On Short Break</p>
                                :
                                IsLongBreak ? <p>On Long Break
                                        <Tooltip placement="top" title="Skip Long Break">
                                        <ForwardFilled style={{ fontSize: '2rem', color: '#6969f5' }} onClick={SkipPomodoro} />
                                    </Tooltip>
                                </p>
                                    :
                                    <p>On Short Break
                                        <Tooltip placement="top" title="Skip Short Break">
                                            <ForwardFilled style={{ fontSize: '2rem', color: '#6969f5' }} onClick={SkipPomodoro} />
                                        </Tooltip>
                                    </p>
                        }
                    </div>
                    <div className='timer'>
                        {Seconds > 9 ? <h1 style={{ color: 'aliceblue' }}>{Minutes}:{Seconds}</h1> : <h1 style={{ color: 'aliceblue' }}>{Minutes}:0{Seconds}</h1>}
                    </div>
                    <br />
                    <div>
                        {!IsOn && !IsBreak && !IsPomodoro ? <Button onClick={StartPomodoro}>Start</Button> : null}
                        {IsOn ? <Button onClick={StopPomodoro}>Stop</Button> : null}
                        {!IsOn && (IsBreak || IsPomodoro) && !IsAutoStop ? <Button onClick={ResumePomodoro}>Resume</Button> : null}
                        {!IsOn && IsPomodoro && IsAutoStop ? <Button onClick={ResumePomodoro}>Start Pomodoro #{Counter}</Button> : null}
                        {!IsOn && IsBreak && IsAutoStop ? <Button onClick={ResumePomodoro}>Start Break</Button> : null}
                        {!IsOn && !IsBreak && IsPomodoro ? <Button onClick={ResetPomodoro}>Reset</Button> : null}
                    </div>
                </div>
                <Tasks FinishedPomodoro={FinishedPomodoro}/>
            </div>
        </div >
    )
}

export default Pomodoro
