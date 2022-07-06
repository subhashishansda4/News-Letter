const express = require("express");
const body_parser = require("body-parser");
const https = require("https");

const app = express();
app.use(body_parser.urlencoded({extended: true}));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");

    
})

app.post("/", function(req, res) {
    res.set("Content-Type", "text/html");

    var weight = Number(req.body.w);
    var height = Math.pow([Number(req.body.h)*0.01], 2);
    var result = weight / height;
    var loc = req.body.l;

    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + loc + "&appid=b38d0f86761aee3f54252831bc315430&units=metric";
    https.get(url, function(_res) {
        console.log(_res.statusCode);

        _res.on("data", function(data) {
            const weather = JSON.parse(data);
            const temp = weather.main.temp;
            const location = weather.name;
            const desc = weather.weather[0].description;
            const hum = weather.main.humidity;
            const icon = weather.weather[0].icon;
            const image_url = "https://openweathermap.org/img/wn/" + icon + "@2x.png"

            res.write("<img src=" + image_url + "><br>");
            res.write(location + ": " + temp + " °C <br>");
            res.write("Humidity: " + hum + "<br>");
            res.write("Description: " + desc + "<br>");
            
            if(result < 18.5) {
                res.write("<h1>Underweight</h1>");
            } else  if(18.5 < result < 25) {
                res.write("<h1>Normal</h1>");
            } else if(25 < result < 30) {
                res.write("<h1>Overweight</h1>");
            } else {
                res.write("<h1>Obese</h1>");
            }
            res.write("<h3>Your BMI is " + result + "</h3>");

            res.send();
        })
    })
})

app.listen(2000, function() {
    console.log("Server is running on port 2000");
})