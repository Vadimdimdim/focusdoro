import React, { useState, useEffect } from 'react'
import axios from 'axios'

import { Form, Input, Select, Divider, Row, Col, Popover, Tooltip } from 'antd'
import { PlusOutlined, MinusOutlined, EditFilled, MoreOutlined, DeleteFilled, CheckOutlined, RedoOutlined } from '@ant-design/icons'
import '../../../stylesheets/tasks.css'

const { Option } = Select;

function Tasks(props) {

    const [Task, setTask] = useState("")
    const [Category, setCategory] = useState("")
    const [EditTask, setEditTask] = useState("")
    const [EditCategory, setEditCategory] = useState("")
    const [Tasks, setTasks] = useState([])
    const [Categories, setCategories] = useState([])
    const [Pomodoros, setPomodoros] = useState([])
    const [FinishedTasks, setFinishedTasks] = useState([])
    const [FinishedCategories, setFinishedCategories] = useState([])
    const [Edit, setEdit] = useState(false)
    const [EditByIndex, setEditByIndex] = useState(null)

    const [TasksId, setTaskssId] = useState("")

    useEffect(() => {
        let variable = { user: localStorage.getItem("userId") }

        axios.post('/api/tasks/getTasks', variable)
            .then(response => {
                if (response.data.success) {
                    // console.log(response.data.tasks);
                    setTaskssId(response.data.tasks._id)
                    setTasks(response.data.tasks.tasks)
                    setCategories(response.data.tasks.categories)
                    setPomodoros(response.data.tasks.pomodoros)
                    setFinishedTasks(response.data.tasks.finishedTasks)
                    setFinishedCategories(response.data.tasks.finishedCategories)
                } else {
                    // alert('Failed to get Tasks')
                }
            })
    }, [])

    useEffect(() => {
        if (TasksId !== "") {
            let variable = {
                tasks: Tasks,
                categories: Categories,
                pomodoros: Pomodoros,
                finishedTasks: FinishedTasks,
                finishedCategories: FinishedCategories
            }
            axios.put(`/api/tasks/updateTasks/${TasksId}`, variable)
                .then(response => {
                    if (response.data.success) {
                        // console.log('updated tasks')
                    } else {
                        // alert('Failed to get tasks')
                    }
                })
        }
    }, [Tasks, Categories, TasksId, Pomodoros, FinishedTasks, FinishedCategories])

    useEffect(() => {

        if (props.FinishedPomodoro && Pomodoros[0] !== undefined) {
            if (Pomodoros[0] <= 1) {
                handleFinishedTask(0)
                deleteTask(0)
                console.log('delete')
            } else {
                handleRemovePomodoros(0)
                console.log('-1')
            }
        }
    }, [props.FinishedPomodoro])

    const onAddTask = () => {
        if (Task !== '') {
            setTasks(Tasks => Tasks.concat(Task))
            setCategories(Categories => Categories.concat(Category))
            setPomodoros(Pomodoros => Pomodoros.concat(1))
            setTask('')
        }
        setCategory('')
    }

    const deleteTask = (event) => {
        let tasks = [...Tasks];
        let categories = [...Categories];
        let pomodoros = [...Pomodoros];
        if (event !== -1) {
            tasks.splice(event, 1)
            categories.splice(event, 1)
            pomodoros.splice(event, 1)
            setTasks(tasks)
            setCategories(categories)
            setPomodoros(pomodoros)
        }
        setTask('')
        setCategory('')
    }

    const onEditTask = (event) => {
        let tasks = [...Tasks];
        let categories = [...Categories]
        tasks[event] = EditTask
        categories[event] = EditCategory
        if (tasks[event] !== '') {
            setTasks(tasks)
            setCategories(categories)
        }
        setEdit(false)
        setTask('')
        setCategory('')
    }

    const handleEdit = (event) => {
        setEdit(true)
        setEditByIndex(event)
        setEditTask(EditTask => EditTask = Tasks[event])
    }

    const handleTaskChange = (event) => {
        setTask(event.target.value)
    }

    const handleCategoryChange = (event) => {
        setCategory(event)
    }

    const handleTaskEdit = (event) => {
        setEditTask(event.target.value)
    }

    const handleCategoryEdit = (event) => {
        setEditCategory(event)
    }

    const handleAddPomodoros = (event) => {
        let pomodoros = [...Pomodoros]
        pomodoros[event] += 1
        setPomodoros(pomodoros)
    }

    const handleRemovePomodoros = (event) => {
        let pomodoros = [...Pomodoros]
        pomodoros[event] -= 1

        if (pomodoros[event] <= 0) {
            deleteTask(event)
        } else {
            setPomodoros(pomodoros)
        }
    }

    const handleFinishedTask = (event) => {
        let tasks = [...Tasks];
        let categories = [...Categories]
        if (tasks[event] !== '') {
            setFinishedTasks(FinishedTasks => FinishedTasks.concat(tasks[event]))
            setFinishedCategories(FinishedCategories => FinishedCategories.concat(categories[event]))
        }
        deleteTask(event)
    }

    const deleteFinisedTask = (event) => {
        let tasks = [...FinishedTasks];
        let categories = [...FinishedCategories];

        tasks.splice(event, 1)
        categories.splice(event, 1)
        setFinishedTasks(tasks)
        setFinishedCategories(categories)
    }

    const repeatFinisedTask = (event) => {
        let tasks = [...FinishedTasks];
        let categories = [...FinishedCategories];

        setTasks(Tasks => Tasks.concat(tasks[event]))
        setCategories(Categories => Categories.concat(categories[event]))
        setPomodoros(Pomodoros => Pomodoros.concat(1))

        deleteFinisedTask(event)
    }

    const renderTask = (task, index) =>
        <Row className='task-container' justify="space-around" key={index}>
            <Col className='head' xs={4} sm={4} md={4} lg={4}>
                {Categories[index]}
            </Col>
            <Col className='body' xs={16} sm={16} md={16} lg={16}>
                {task}
            </Col>
            <Col className='tail' xs={4} sm={4} md={4} lg={4} style={{ textAlign: 'right' }}>
                <Popover
                    placement="right"
                    content={
                        <div>
                            <Tooltip placement="right" title="Add Pomodoro">
                                <PlusOutlined style={{ fontSize: '1.5rem', marginBottom: '7px' }} onClick={() => handleAddPomodoros(index)} />
                            </Tooltip>
                            <br />
                            <Tooltip placement="right" title="Remove Pomodoro">
                                <MinusOutlined style={{ fontSize: '1.5rem' }} onClick={() => handleRemovePomodoros(index)} />
                            </Tooltip>

                        </div>
                    }
                    trigger="click"
                >
                    <div id='task-pomodoros'>
                        <p style={{ textAlign: 'center' }}>
                            {Pomodoros[index]}
                        </p>
                    </div>
                </Popover>
                <Popover
                    placement="right"
                    content={
                        <div>
                            <Tooltip placement="right" title="Delete Task">
                                <DeleteFilled style={{ fontSize: '1.5rem', marginBottom: '7px' }} onClick={() => deleteTask(index)} />
                            </Tooltip>
                            <br />
                            <Tooltip placement="right" title="Edit Task">
                                <EditFilled style={{ fontSize: '1.5rem', marginBottom: '7px' }} onClick={() => handleEdit(index)} />
                            </Tooltip>
                            <br />
                            <Tooltip placement="right" title="Done">
                                <CheckOutlined style={{ fontSize: '1.5rem' }} onClick={() => handleFinishedTask(index)} />
                            </Tooltip>

                        </div>
                    }
                    trigger="click"
                >
                    <MoreOutlined style={{ fontSize: '2rem' }} rotate={90} />
                </Popover>
            </Col>
        </Row>

    const renderEditTaks = (index) =>
        <Form.Item style={{ height: '33px' }} key={index}>
            <Form.Item
                style={{ display: 'inline-block', width: '16%' }}
            >
                <Select
                    type='text'
                    name='category'
                    placeholder="Category"
                    onChange={handleCategoryEdit}
                    style={{ maxWidth: '100px' }}
                >
                    <Option value='Work'>Work</Option>
                    <Option value='Study'>Study</Option>
                    <Option value='Personal'>Personal</Option>
                </Select>
            </Form.Item>
            <Form.Item
                style={{ display: 'inline-block', width: '84%' }}
            >
                <Input
                    type='text'
                    name='task'
                    value={EditTask}
                    placeholder='input search text'
                    onChange={handleTaskEdit}
                    addonAfter={<CheckOutlined onClick={() => onEditTask(index)} style={{ fontSize: '1rem' }} />}
                />
            </Form.Item>
        </Form.Item>

    const renderFinishedTask = (task, index) =>
        <Row className='finished-task-container' justify="space-around" key={index}>
            <Col className='head' xs={4} sm={4} md={4} lg={4}>
                {FinishedCategories[index]}
            </Col>
            <Col className='body' xs={16} sm={16} md={16} lg={16}>
                {task}
            </Col>
            <Col className='tail' xs={4} sm={4} md={4} lg={4} style={{ textAlign: 'right' }}>
                <Popover
                    placement="right"
                    content={
                        <div>
                            <Tooltip placement="right" title="Delete Task">
                                <DeleteFilled style={{ fontSize: '1.5rem', marginBottom: '7px' }} onClick={() => deleteFinisedTask(index)} />
                            </Tooltip>
                            <br />
                            <Tooltip placement="right" title="Repeat Task">
                                <RedoOutlined style={{ fontSize: '1.5rem', marginBottom: '7px' }} onClick={() => repeatFinisedTask(index)} />
                            </Tooltip>
                        </div>
                    }
                    trigger="click"
                >
                    <MoreOutlined style={{ fontSize: '2rem' }} rotate={90} />
                </Popover>
            </Col>
        </Row>


    return (
        <div style={{ maxWidth: '600px' }}>
            <Divider>TODO</Divider>
            <Form.Item style={{ height: '33px' }}>
                <Form.Item
                    style={{ display: 'inline-block', width: '16%' }}
                >
                    <Select
                        type='text'
                        name='category'
                        placeholder="Category"
                        onChange={handleCategoryChange}
                        style={{ maxWidth: '100px' }}
                    >
                        <Option value='Work'>Work</Option>
                        <Option value='Study'>Study</Option>
                        <Option value='Project'>Project</Option>
                        <Option value='Personal'>Personal</Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    style={{ display: 'inline-block', width: '84%' }}
                >
                    <Input
                        type='text'
                        name='task'
                        value={Task}
                        placeholder='Add short description'
                        onChange={handleTaskChange}
                        addonAfter={<PlusOutlined onClick={onAddTask} style={{ fontSize: '1rem' }} />}
                    />
                </Form.Item>
            </Form.Item>

            {Tasks.map((task, index) =>
                Edit && EditByIndex === index ?
                    renderEditTaks(index)
                    :
                    renderTask(task, index)
            )}
            <div style={{ borderTop: '1px solid #6969f5' }}></div>

            {FinishedTasks[0] !== undefined ?
                <div style={{ marginTop: '3rem' }}>
                    <Divider>FINISHED TASKS</Divider>
                    {FinishedTasks.map((task, index) =>
                        renderFinishedTask(task, index)
                    )}
                </div>
                :
                null
            }
        </div>
    )
}

export default Tasks
