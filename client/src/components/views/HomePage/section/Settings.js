import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { Modal, Switch, Button, InputNumber } from 'antd';
import { SettingTwoTone } from '@ant-design/icons';

import '../../../stylesheets/settings.css';

function Settings(props) {

    const [Visible, setVisible] = useState(false)
    const [SettingsId, setSettingsId] = useState("")

    useEffect(() => {
        let variable = { user: localStorage.getItem("userId") }

        axios.post('/api/pomodoro/getSettings', variable)
            .then(response => {
                if (response.data.success) {
                    setSettingsId(response.data.settings._id)
                    let duration = response.data.settings.duration
                    let shortBreak = response.data.settings.shortBreak
                    let longBreak = response.data.settings.longBreak
                    let longBreakDelay = response.data.settings.longBreakDelay
                    let autoPomodoro = response.data.settings.autoStartPomodoro
                    let autoBreak = response.data.settings.autoStartBreak
                    props.setDuration(duration)
                    props.setShortBreak(shortBreak)
                    props.setLongBreak(longBreak)
                    props.setLongBreakDelay(longBreakDelay)
                    props.setAutoPomodoro(autoPomodoro)
                    props.setAutoBreak(autoBreak)
                } else {
                    
                }
            })
    }, [])

    const showModal = () => {
        setVisible(true)
    }

    const handleSave = () => {
        if (SettingsId !== "") {
            let variable = {
                duration: props.Duration,
                shortBreak: props.ShortBreak,
                longBreak: props.LongBreak,
                longBreakDelay: props.LongBreakDelay,
                autoStartPomodoro: props.AutoPomodoro,
                autoStartBreak: props.AutoBreak
            }
            // console.log(variable)
            axios.put(`/api/pomodoro/updateSettings/${SettingsId}`, variable)
                .then(response => {
                    if (response.data.success) {
                        // console.log('updated settings')
                    } else {
                        alert('Failed to get settings')
                    }
                })
            setVisible(false)
            props.update()
        } else {
            setVisible(false)
            props.update()
            alert('Please Log In to save your settings')
        }

    }

    const handleCancel = () => {
        setVisible(false)
    }

    const onChangeDuration = (value) => {
        // console.log('duration', value)
        props.setDuration(value)
    }

    const onChangeShortBreak = (value) => {
        // console.log('short break', value)
        props.setShortBreak(value)
    }

    const onChangeLongBreak = (value) => {
        // console.log('long break', value)
        props.setLongBreak(value)
    }

    const onChangeLongBreakDelay = (value) => {
        // console.log('long break delay', value)
        props.setLongBreakDelay(value)
    }

    const onChangeAutoPomodoro = () => {
        let autoPomodoro = !props.AutoPomodoro
        props.setAutoPomodoro(autoPomodoro)
    }

    const onChangeAutoBreak = () => {
        let autoBreak = !props.AutoBreak
        props.setAutoBreak(autoBreak)
    }

    return (
        <div>
            <Button onClick={showModal} type="link">
                <SettingTwoTone
                    style={{ fontSize: '2rem' }}
                    twoToneColor="#6969f5"
                />
            </Button>
            <Modal
                title='Settings'
                centered
                className='modal-container'
                visible={Visible}
                onOk={handleSave}
                onCancel={handleCancel}
                okText="Save"
                cancelText="Cancel"
            >
                <form onSubmit={handleSave}>
                    <div className='settings'>
                        <div className='setting-container'>
                            <label htmlFor='pomodoro-duration'>Pomodoro duration: </label>
                            <div className='number-input'>
                                <InputNumber min={0} max={100} defaultValue={props.Duration} onChange={onChangeDuration} />
                                <span> in minutes</span>
                            </div>
                        </div>
                        <div className='setting-container'>
                            <label htmlFor='pomodoro-duration'>Short break duration: </label>
                            <div className='number-input'>
                                <InputNumber min={0} max={100} defaultValue={props.ShortBreak} onChange={onChangeShortBreak} />
                                <span> in minutes</span>
                            </div>
                        </div>
                        <div className='setting-container'>
                            <label htmlFor='pomodoro-duration'>Long break duration: </label>
                            <div className='number-input'>
                                <InputNumber min={0} max={100} defaultValue={props.LongBreak} onChange={onChangeLongBreak} />
                                <span> in minutes</span>
                            </div>
                        </div>
                        <div className='setting-container'>
                            <label htmlFor='pomodoro-duration'>Long break delay: </label>
                            <div className='number-input'>
                                <InputNumber min={1} max={100} defaultValue={props.LongBreakDelay} onChange={onChangeLongBreakDelay} />
                                <span> in pomodoros</span>
                            </div>
                        </div>
                        <div className='setting-container'>
                            <label htmlFor='pomodoro-duration'>Auto start: </label>
                            <div className='switch-input'>
                                <Switch
                                    defaultChecked={props.AutoPomodoro}
                                    onChange={onChangeAutoPomodoro}
                                />
                            </div>
                        </div>
                        <div className='setting-container'>
                            <label htmlFor='pomodoro-duration'>Auto break: </label>
                            <div style={{ flex: 'true', width: '200px', marginTop: '1rem' }}>
                                <Switch
                                    defaultChecked={props.AutoBreak}
                                    onChange={onChangeAutoBreak}
                                />
                            </div>
                        </div>
                    </div>
                </form>
            </Modal>
        </div>
    )
}

export default Settings
