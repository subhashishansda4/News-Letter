const express = require("express");
const body_parser = require("body-parser");

const app = express();
app.use(body_parser.urlencoded({extended: true}));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {
    var weight = Number(req.body.w);
    var height = Math.pow([Number(req.body.h)*0.01], 2);
    var result = weight / height;

    if(result < 18.5) {
        res.send("Your BMI is " + result + ". [Underweight]");
    } else if(result < 25 && result > 18.5) {
        res.send("Your BMI is " + result + ". [Normal]");
    } else if(resullt < 31 && result > 25) {
        res.send("Your BMI is " + result + ". [Overweight]");
    } else {
        res.send("Your BMI is " + result + ". [Obese]");
    }
});

app.listen(5000, function() {
    console.log("Server started on port 5000");
});