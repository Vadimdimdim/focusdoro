const   express = require('express'),
        router = express.Router();

const { Tasks } = require("../models/tasks");
const { User } = require("../models/user");
const { auth } = require("../middleware/auth");

router.post("/getTasks", auth, (req, res) => {
    Tasks.findOne({'user': req.body.user})
        .exec((err, tasks) => {
            if (err) {
                return res.status(400).send(err)
            }
            return res.status(200).json({ success: true, tasks })
        })
});

router.post("/saveTasks", (req, res) => {
    const tasks = new Tasks(req.body)
    
    tasks.save((err, tasks) => {
        if (err) return res.status(400).json({ success: false, err })
        return res.status(200).json({ success: true})
    })

});

router.put('/updateTasks/:id', (req, res) => {
    Tasks.findByIdAndUpdate({_id: req.params.id}, req.body)
        .exec((err, tasks) => {
            if (err) return res.status(400).json({ success: false, err })
            return res.status(200).json({ success: true})
        })
})

module.exports = router;