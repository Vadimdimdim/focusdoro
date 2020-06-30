import React, { Component } from 'react'

import "./taskList.css"

import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa"

class Task extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: "",
            taskArr: []
        }
        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleSubmit(event) {
        this.state.taskArr.push(this.state.value);
        this.setState({
            taskArr:this.state.taskArr,
            value:""
        });
        event.preventDefault();
    }

    onDelete(index) {
        var array = [...this.state.taskArr]; // make a separate copy of the array
        array.splice(index, 1);
        this.setState({taskArr: array});
    }

    render() {
        const { taskArr } = this.state
        return (
            <div className="task-container">
                <h1>TASK LIST</h1>
                <form onSubmit={this.handleSubmit} className="input-group mb-3" >
                    <input type="text" className="form-control" value={this.state.value} onChange={this.handleChange} placeholder="New Task" />
                    <div className="input-group-append">
                        <button className="btn btn-outline-secondary" type="submit"><FaPlus/></button>
                    </div>
                </form>
                <div id="list" className="entry-container">
                    {taskArr.map((taskText, index) =>
                        <div className="entry" key={"task" + index}>
                            <div className="minus" onClick={() => this.onDelete(index)}>
                                <div className="minus-logo">
                                    <FaMinus aria-hidden="true" />
                                </div>
                            </div>
                            <div className="text">
                                {taskText}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        )
    }
}

export default Task;