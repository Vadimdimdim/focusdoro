const mongoose = require("mongoose");

const tasksSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    tasks: [{
        task: {
            type: String,
            default: ""
        },
        category: {
            type: String,
            default: ""
        },
        pomodoros: {
            type: String,
            default: ""
        }
    }],
    finishedTasks: [{
        task: {
            type: String,
            default: ""
        },
        category: {
            type: String,
            default: ""
        }
    }]
});

const Tasks = mongoose.model("tasks", tasksSchema);

module.exports = { Tasks }