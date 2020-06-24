const express = require("express");
const app = express();
const mongoose = require("mongoose");

mongoose.connect('mongodb+srv://VadimEgorov:angel1972@cluster0-9xth0.mongodb.net/<dbname>?retryWrites=true&w=majority', 
    {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('DB CONNECTED'))
    .catch(err => console.error(err));

app.get("/", function(req, res){
    res.send("test");
});

app.listen("5000", function(){
    console.log("Server is working on port 5000");
});