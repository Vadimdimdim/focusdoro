const mongoose = require("mongoose");

const settingsSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    duration: {
        type: Number,
        default: 25
    },
    shortBreak: {
        type: Number,
        default: 5
    },
    longBreak: {
        type: Number,
        default: 15
    },
    longBreakDelay: {
        type: Number,
        default: 4
    },
    pomodoroCounter: {
        type: Number,
        default: 0
    },
    autoStartPomodoro: {
        type: Boolean,
        default: true
    },
    autoStartBreak: {
        type: Boolean,
        default: true
    },
    alarmVolume: {
        type: Number,
        default: 100
    },
    alarmPlay: {
        type: Boolean,
        default: true
    },
    alarmSound: {
        type: String,
        default: "softBells"
    }
});

const Settings = mongoose.model("settings", settingsSchema);

module.exports = { Settings }