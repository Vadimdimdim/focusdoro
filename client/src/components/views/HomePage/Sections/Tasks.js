import React, { useState, useEffect } from 'react'
import { useDispatch } from "react-redux";
import { getTasks } from "../../../../_actions/tasks_actions";
import { updateTasks } from "../../../../_actions/tasks_actions";

import { Form, Input, Select, Divider, Row, Col, Popover, Tooltip } from 'antd'
import { PlusOutlined, MinusOutlined, EditFilled, MoreOutlined, DeleteFilled, CheckOutlined, RedoOutlined } from '@ant-design/icons'
import '../../../stylesheets/tasks.css'

const { Option } = Select;

function Tasks(props) {
    const dispatch = useDispatch();

    const [TasksId, setTasksId] = useState("")
    const [Task, setTask] = useState("")
    const [Category, setCategory] = useState("")
    const [EditTask, setEditTask] = useState("")
    const [EditCategory, setEditCategory] = useState("")
    const [Tasks, setTasks] = useState([])
    const [FinishedTasks, setFinishedTasks] = useState([])
    const [Edit, setEdit] = useState(false)
    const [EditByIndex, setEditByIndex] = useState(null)
    

    useEffect(() => {
        handleGetTasks()
    }, [])

    useEffect(() => {
        handleUpdateTasks()
    }, [Tasks, FinishedTasks])

    useEffect(() => {
        handleFinish()
    }, [props.FinishedPomodoro])

    const handleGetTasks = () => {
        let variable = { user: localStorage.getItem("userId") }
        dispatch(getTasks(variable)).then(response => {
            if (response.payload.success && response.payload.tasks) {
                setTasksId(response.payload.tasks._id)
                setTasks(response.payload.tasks.tasks)
                setFinishedTasks(response.payload.tasks.finishedTasks)
            }else{
                const tasksLS = localStorage.getItem('Tasks')
                if(tasksLS){
                    const parsedJSON = JSON.parse(tasksLS)
                    setTasks(parsedJSON.tasks)
                    setFinishedTasks(parsedJSON.finishedTasks)
                }
            }
        })
    }

    const handleUpdateTasks = () => {
        let variables = {
            tasks: Tasks,
            finishedTasks: FinishedTasks,
        }
        if (TasksId !== "") {
            dispatch(updateTasks(variables, TasksId));
        }else{
            if(variables.tasks.length !== 0){
                const json = JSON.stringify(variables);
                localStorage.setItem('Tasks', json);
                console.log('yo')
            }
        }
    }

    const handleFinish = () => {
        if (props.FinishedPomodoro && Tasks[0].pomodoros !== undefined) {
            if (Tasks[0].pomodoros[0] <= 1) {
                onFinishedTask(0)
                onDeleteTask(0)
            } else {
                onRemovePomodoros(0)
            }
        }
    }

    const onAddTask = () => {
        if (Task !== '') {
            let task = {
                task: Task,
                category: Category,
                pomodoros: 1
            }
            setTasks(Tasks => Tasks.concat(task))
            setTask('')
        }
        setCategory('')
    }

    const onDeleteTask = (event) => {
        let tasks = [...Tasks];
        if (event !== -1) {
            tasks.splice(event, 1)
            setTasks(tasks)
        }
    }

    const onEditTask = (event) => {
        let tasks = [...Tasks];
        tasks[event].task = EditTask
        tasks[event].category = EditCategory
        if (tasks[event].task !== '') {
            setTasks(tasks)
        }
        setEdit(false)
    }

    const onEdit = (event) => {
        setEdit(true)
        setEditByIndex(event)
        setEditTask(EditTask => EditTask = Tasks[event].task)
    }

    const onAddPomodoros = (event) => {
        let tasks = [...Tasks]
        tasks[event].pomodoros += 1
        setTasks(tasks)
    }

    const onRemovePomodoros = (event) => {
        let tasks = [...Tasks]
        tasks[event].pomodoros -= 1

        if (tasks[event].pomodoros <= 0) {
            onDeleteTask(event)
        } else {
            setTasks(tasks)
        }
    }

    const onFinishedTask = (event) => {
        let tasks = [...Tasks];
        if (tasks[event] !== '') {
            setFinishedTasks(FinishedTasks => FinishedTasks.concat(tasks[event]))
        }
        onDeleteTask(event)
    }

    const onDeleteFinisedTask = (event) => {
        let tasks = [...FinishedTasks];

        tasks.splice(event, 1)
        setFinishedTasks(tasks)
    }

    const onRepeatFinisedTask = (event) => {

        let task = {
            task: FinishedTasks[event].task,
            category: FinishedTasks[event].category,
            pomodoros: 1,
        }

        setTasks(Tasks => Tasks.concat(task))

        onDeleteFinisedTask(event)
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

    const renderTask = (task, index) =>
        <Row className='task-container' justify="space-around" key={index}>
            <Col className='head' xs={4} sm={4} md={4} lg={4}>
                {task.category}
            </Col>
            <Col className='body' xs={16} sm={16} md={16} lg={16}>
                {task.task}
            </Col>
            <Col className='tail' xs={4} sm={4} md={4} lg={4} style={{ textAlign: 'right' }}>
                <Popover
                    placement="right"
                    content={
                        <div>
                            <Tooltip placement="right" title="Add Pomodoro">
                                <PlusOutlined style={{ fontSize: '1.5rem', marginBottom: '7px' }} onClick={() => onAddPomodoros(index)} />
                            </Tooltip>
                            <br />
                            <Tooltip placement="right" title="Remove Pomodoro">
                                <MinusOutlined style={{ fontSize: '1.5rem' }} onClick={() => onRemovePomodoros(index)} />
                            </Tooltip>

                        </div>
                    }
                    trigger="click"
                >
                    <div id='task-pomodoros'>
                        <p style={{ textAlign: 'center' }}>
                            {task.pomodoros}
                        </p>
                    </div>
                </Popover>
                <Popover
                    placement="right"
                    content={
                        <div>
                            <Tooltip placement="right" title="Delete Task">
                                <DeleteFilled style={{ fontSize: '1.5rem', marginBottom: '7px' }} onClick={() => onDeleteTask(index)} />
                            </Tooltip>
                            <br />
                            <Tooltip placement="right" title="Edit Task">
                                <EditFilled style={{ fontSize: '1.5rem', marginBottom: '7px' }} onClick={() => onEdit(index)} />
                            </Tooltip>
                            <br />
                            <Tooltip placement="right" title="Done">
                                <CheckOutlined style={{ fontSize: '1.5rem' }} onClick={() => onFinishedTask(index)} />
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
                {task.category}
            </Col>
            <Col className='body' xs={16} sm={16} md={16} lg={16}>
                {task.task}
            </Col>
            <Col className='tail' xs={4} sm={4} md={4} lg={4} style={{ textAlign: 'right' }}>
                <Popover
                    placement="right"
                    content={
                        <div>
                            <Tooltip placement="right" title="Delete Task">
                                <DeleteFilled style={{ fontSize: '1.5rem', marginBottom: '7px' }} onClick={() => onDeleteFinisedTask(index)} />
                            </Tooltip>
                            <br />
                            <Tooltip placement="right" title="Repeat Task">
                                <RedoOutlined style={{ fontSize: '1.5rem', marginBottom: '7px' }} onClick={() => onRepeatFinisedTask(index)} />
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