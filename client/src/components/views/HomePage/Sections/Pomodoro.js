import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UIfx from 'uifx';

import { Button, Tooltip } from 'antd';
import { ForwardFilled } from '@ant-design/icons'
import '../../../stylesheets/pomodoro.css';

import Settings from './Settings';
import Tasks from './Tasks'

import demonstrative from "../../../sounds/demonstrative.ogg";
import eventually from "../../../sounds/eventually.ogg";
import goesWithoutSaying from "../../../sounds/goes-without-saying.ogg";
import gotItDone from "../../../sounds/got-it-done.mp3";
import juntos from "../../../sounds/juntos.ogg";
import longChimeSound from "../../../sounds/long-chime-sound.ogg";
import pieceOfCake from "../../../sounds/piece-of-cake.ogg";
import pristine from "../../../sounds/pristine.ogg";
import slowSpringBoard from "../../../sounds/slow-spring-board.ogg";
import softBells from "../../../sounds/soft-bells.ogg";

function Pomodoro() {
    const [SettingsId, setSettingsId] = useState("")
    const [Duration, setDuration] = useState(25)
    const [ShortBreak, setShortBreak] = useState(5)
    const [LongBreak, setLongBreak] = useState(15)
    const [LongBreakDelay, setLongBreakDelay] = useState(4)
    const [AutoPomodoro, setAutoPomodoro] = useState(true)
    const [AutoBreak, setAutoBreak] = useState(true)
    const [AlarmVolume, setAlarmVolume] = useState(100)
    const [AlarmPlay, setAlarmPlay] = useState(true)
    const [AlarmSound, setAlarmSound] = useState("softBells")

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
                    setSettingsId(response.data.settings._id)
                    setDuration(response.data.settings.duration)
                    setShortBreak(response.data.settings.shortBreak)
                    setLongBreak(response.data.settings.longBreak)
                    setLongBreakDelay(response.data.settings.longBreakDelay)
                    setAutoPomodoro(response.data.settings.autoStartPomodoro)
                    setAutoBreak(response.data.settings.autoStartBreak)
                    setAlarmVolume(response.data.settings.alarmVolume)
                    setAlarmPlay(response.data.settings.alarmPlay)
                    setAlarmSound(response.data.settings.alarmSound)
                    if (!IsOn && !IsShortBreak && !IsLongBreak) {
                        setMinutes(response.data.settings.duration)
                    }
                } else {
                    if (!IsOn && !IsShortBreak && !IsLongBreak) {
                        setMinutes(Duration)
                    }
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
                        if(AlarmPlay){
                            playSound(AlarmSound, AlarmVolume)
                        }
                        setFinishedPomodoro(!FinishedPomodoro)
                        startBreak()
                    }
                    else {
                        if(AlarmPlay){
                            playSound(AlarmSound, AlarmVolume)
                        }
                        setFinishedPomodoro(!FinishedPomodoro)
                        checkAutoPomodoro()
                    }
                }
            }, 1000);
        } else if (!IsOn) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [IsOn, Minutes, Seconds, IsBreak, IsPomodoro])

    const startPomodoro = () => {
        setIsOn(true)
        setIsPomodoro(true)
        setIsBreak(false)
        setMinutes(Duration)
        setSeconds(0)
    }

    const checkAutoPomodoro = () => {
        if (AutoPomodoro) {
            startPomodoro()
        } else {
            setIsOn(false)
            setIsPomodoro(true)
            setIsBreak(false)
            setMinutes(Duration)
            setSeconds(0)
        }
    }

    const startBreak = () => {
        if (AutoBreak) {
            setIsAutoStop(false)
            setIsOn(true)
        } else {
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
        } else {
            setMinutes(ShortBreak)
            setSeconds(0)
            setIsShortBreak(true)
            setIsLongBreak(false)
        }
    }

    const stopPomodoro = () => {
        setIsOn(false)
    }

    const resumePomodoro = () => {
        setIsOn(true)
    }

    const resetPomodoro = () => {
        startPomodoro()
    }

    const skipPomodoro = () => {
        if (!IsBreak) {
            startBreak()
        } else {
            setCounter(Counter => Counter + 1)
            setFinishedPomodoro(!FinishedPomodoro)
            checkAutoPomodoro()
        }
    }

    const playSound = (sound, volume) => {
        const sounds = {
            softBells: new UIfx(softBells),
            demonstrative: new UIfx(demonstrative),
            eventually: new UIfx(eventually),
            goesWithoutSaying: new UIfx(goesWithoutSaying),
            gotItDone: new UIfx(gotItDone),
            juntos: new UIfx(juntos),
            longChimeSound: new UIfx(longChimeSound),
            pieceOfCake: new UIfx(pieceOfCake),
            pristine: new UIfx(pristine),
            slowSpringBoard: new UIfx(slowSpringBoard)
        }

        switch (sound) {
            case "softBells":
                return sounds.softBells.setVolume(volume / 100).play()
            case "demonstrative":
                return sounds.demonstrative.setVolume(volume / 100).play()
            case "eventually":
                return sounds.eventually.setVolume(volume / 100).play()
            case "goesWithoutSaying":
                return sounds.goesWithoutSaying.setVolume(volume / 100).play()
            case "gotItDone":
                return sounds.gotItDone.setVolume(volume / 100).play()
            case "juntos":
                return sounds.juntos.setVolume(volume / 100).play()
            case "longChimeSound":
                return sounds.longChimeSound.setVolume(volume / 100).play()
            case "pieceOfCake":
                return sounds.pieceOfCake.setVolume(volume / 100).play()
            case "pristine":
                return sounds.pristine.setVolume(volume / 100).play()
            case "slowSpringBoard":
                return sounds.slowSpringBoard.setVolume(volume / 100).play()
            default:
                return sounds.softBells.setVolume(volume / 100).play()
        }
    }

    return (
        <div className='pomodoro-container' type='flex' align='middle'>
            <div className='timer-container'>
                <Tooltip placement="top" title="Open Settings Menu">
                    <div className='settings-button'>
                        <Settings
                            update={updateSettings}
                            playSound={playSound}
                            setDuration={setDuration}
                            setShortBreak={setShortBreak}
                            setLongBreak={setLongBreak}
                            setLongBreakDelay={setLongBreakDelay}
                            setAutoPomodoro={setAutoPomodoro}
                            setAutoBreak={setAutoBreak}
                            setAlarmVolume={setAlarmVolume}
                            setAlarmPlay={setAlarmPlay}
                            setAlarmSound={setAlarmSound}
                            SettingsId={SettingsId}
                            Duration={Duration}
                            ShortBreak={ShortBreak}
                            LongBreak={LongBreak}
                            LongBreakDelay={LongBreakDelay}
                            AutoPomodoro={AutoPomodoro}
                            AutoBreak={AutoBreak}
                            AlarmVolume={AlarmVolume}
                            AlarmPlay={AlarmPlay}
                            AlarmSound={AlarmSound}
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
                                    <ForwardFilled style={{ fontSize: '2rem', color: '#6969f5' }} onClick={skipPomodoro} />
                                </Tooltip>
                            </p>
                        :
                        IsBreak && IsOn ?
                            IsLongBreak ? <p>On Long Break</p> : <p>On Short Break</p>
                            :
                            IsLongBreak ?
                                <p>On Long Break
                                        <Tooltip placement="top" title="Skip Long Break">
                                        <ForwardFilled style={{ fontSize: '2rem', color: '#6969f5' }} onClick={skipPomodoro} />
                                    </Tooltip>
                                </p>
                                :
                                <p>On Short Break
                                        <Tooltip placement="top" title="Skip Short Break">
                                        <ForwardFilled style={{ fontSize: '2rem', color: '#6969f5' }} onClick={skipPomodoro} />
                                    </Tooltip>
                                </p>
                    }
                </div>
                <div style={{ marginTop: '2rem' }}>
                    {Seconds > 9 ? <h1 className="timer-numbers">{Minutes}:{Seconds}</h1> : <h1 className="timer-numbers">{Minutes}:0{Seconds}</h1>}
                </div>
                <br />
                <div>
                    {!IsOn && !IsBreak && !IsPomodoro ? <Button onClick={startPomodoro}>Start</Button> : null}
                    {IsOn ? <Button onClick={stopPomodoro}>Stop</Button> : null}
                    {!IsOn && (IsBreak || IsPomodoro) && !IsAutoStop ? <Button onClick={resumePomodoro}>Resume</Button> : null}
                    {!IsOn && IsPomodoro && IsAutoStop ? <Button onClick={resumePomodoro}>Start Pomodoro #{Counter}</Button> : null}
                    {!IsOn && IsBreak && IsAutoStop ? <Button onClick={resumePomodoro}>Start Break</Button> : null}
                    {!IsOn && !IsBreak && IsPomodoro ? <Button style={{ marginLeft: '1rem' }} onClick={resetPomodoro}>Reset</Button> : null}
                </div>
            </div>
            <Tasks FinishedPomodoro={FinishedPomodoro} />
        </div >
    )
}

export default Pomodoro
