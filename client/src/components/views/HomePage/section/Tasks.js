import React, { useState, useEffect } from 'react'
import axios from 'axios'

import { Form, Input, Select, Divider, Row, Col, Popover } from 'antd'
import { PlusOutlined, EditFilled, MoreOutlined, DeleteFilled, CheckOutlined } from '@ant-design/icons'
import '../../../stylesheets/tasks.css'

const { Search } = Input
const { Option } = Select;

function Tasks() {

    const [Task, setTask] = useState("")
    const [Category, setCategory] = useState("")
    const [EditTask, setEditTask] = useState("")
    const [EditCategory, setEditCategory] = useState("")
    const [Tasks, setTasks] = useState([])
    const [Categories, setCategories] = useState([])
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
                } else {
                    // alert('Failed to get Tasks')
                }
            })
    }, [])

    useEffect(() => {
        if(TasksId !== ""){
            let variable = {
                tasks: Tasks,
                categories: Categories
            }
            axios.put(`/api/tasks//updateTasks/${TasksId}`, variable)
            .then(response => {
                if (response.data.success) {
                    // console.log('updated tasks')
                } else {
                    // alert('Failed to get tasks')
                }
            })
        }
    }, [Tasks, Categories])

    const onAddTask = () => {
        setTasks(Tasks => Tasks.concat(Task))
        setCategories(Categories => Categories.concat(Category))
        setTask('')
        setCategory('')
        // UpdateData()
    }

    const DeleteTask = (event) => {
        // console.log(event)
        let tasks = [...Tasks];
        let categories = [...Categories];
        if (event !== -1) {
            tasks.splice(event, 1)
            categories.splice(event, 1)
            setTasks(tasks)
            setCategories(categories)
        }
        setTask('')
        setCategory('')
        // UpdateData()
    }

    const onEditTask = (event) => {
        console.log(event)
        let tasks = [...Tasks];
        let categories = [...Categories]
        tasks[event] = EditTask
        categories[event] = EditCategory
        setTasks(tasks)
        setCategories(categories)
        setEdit(false)
        setTask('')
        setCategory('')
        // UpdateData()
    }

    const HandleEdit = (event) => {
        console.log('edit task number',event)
        setEdit(true)
        setEditByIndex(event)
        setEditTask(EditTask => EditTask = Tasks[event])
    }

    const HandleTaskChange = (event) => {
        setTask(event.target.value)
    }

    const HandleCategoryChange = (event) => {
        setCategory(event)
    }

    const HandleTaskEdit = (event) => {
        setEditTask(event.target.value)
    }

    const HandleCategoryEdit = (event) => {
        console.log(event)
        setEditCategory(event)
    }

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
                        onChange={HandleCategoryChange}
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
                        value={Task}
                        placeholder='input search text'
                        onChange={HandleTaskChange}
                        addonAfter={<PlusOutlined onClick={onAddTask} style={{ fontSize: '1rem' }} />}
                    />
                </Form.Item>
            </Form.Item>
            <div>
                {Tasks.map((task, index) =>
                    Edit && EditByIndex == index ?
                        <Form.Item style={{ height: '33px' }} key={index}>
                            <Form.Item
                                style={{ display: 'inline-block', width: '16%' }}
                            >
                                <Select
                                    type='text'
                                    name='category'
                                    placeholder="Category"
                                    onChange={HandleCategoryEdit}
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
                                    onChange={HandleTaskEdit}
                                    addonAfter={<CheckOutlined  onClick={() => onEditTask(index)} style={{ fontSize: '1rem' }} />}
                                />
                            </Form.Item>
                        </Form.Item>
                        :
                        <Row className='task-container' justify="space-around" key={index}>
                            <Col className='head' xs={4} sm={4} md={4} lg={4}>
                                {Categories[index]}
                            </Col>
                            <Col className='body' xs={16} sm={18} md={18} lg={18}>
                                {task}
                            </Col>
                            <Col className='tail' xs={4} sm={2} md={2} lg={2}>
                                <Popover
                                    placement="right"
                                    content={
                                        <div>
                                            <p><DeleteFilled style={{ fontSize: '1.5rem' }} onClick={() => DeleteTask(index)} /></p>
                                            <p style={{ marginBottom: '0px' }}><EditFilled style={{ fontSize: '1.5rem' }} onClick={() => HandleEdit(index)} /></p>

                                        </div>
                                    }
                                    trigger="click"
                                >
                                    <MoreOutlined style={{ fontSize: '2rem' }} rotate={90} />
                                </Popover>
                            </Col>
                        </Row>
                )}
                <div style={{ borderTop: '1px solid #6969f5' }}></div>
            </div>
        </div>
    )
}

export default Tasks
