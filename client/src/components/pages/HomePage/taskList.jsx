import React, { Component } from 'react'
import "./taskList.css";

import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";

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
        if (this.state.value !== "") {
            this.state.taskArr.push(this.state.value);
            this.setState({
                taskArr: this.state.taskArr,
                value: ""
            });
        } else {
            console.log("error")
        }

        event.preventDefault();
    }

    onDelete(index) {
        var array = [...this.state.taskArr]; // make a separate copy of the array
        array.splice(index, 1);
        this.setState({ taskArr: array });
    }

    render() {
        const { taskArr } = this.state
        return (
            <div className="task-container">
                <h1 style={{color: 'white', marginBottom: '20px'}}>TASK LIST</h1>
                <form onSubmit={this.handleSubmit} className="input-group mb-3">
                    <div className="input-group-prepend">
                        <button className="btn btn-outline-light" type="submit" style={{ paddingTop: '0' }}><FaPlus /></button>
                    </div>
                    <input type="text" className="form-control" value={this.state.value} onChange={this.handleChange} placeholder="New Task" />
                </form>

                <div>
                    {taskArr.map((taskText, index) =>
                        <div key={"task" + index}>
                            <div onClick={() => this.onDelete(index)}>
                                <FaMinus/>
                            </div>
                            <div>
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