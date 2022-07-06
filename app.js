const express = require("express");
const body_parser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();
app.use(express.static("public"));
app.use(body_parser.urlencoded({extended: true}));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/contact.html");

})

app.post("/", function(req, res) {
    res.set("Content-Type", "text/html")

    var first_name = req.body.first;
    var last_name = req.body.last;
    var email = req.body.email;
    var location = req.body.loc;
    var message = req.body.message;
    var checkbox = req.body.checkbox;

    console.log(first_name, last_name, email, location, message, checkbox);

    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + location + "&appid=b38d0f86761aee3f54252831bc315430&units=metric";
    https.get(url, function(_res) {
        console.log(_res.statusCode);

        _res.on("data", function(data) {
            const weather = JSON.parse(data);
            const temp = weather.main.temp;
            const location = weather.loc;
            const desc = weather.weather[0].description;
            const hum = weather.main.humidity;
            const icon = weather.weather[0].icon;
            const image_url = "https://openweathermap.org/img/wn/" + icon + "@2x.png"

            res.write("<img src=" + image_url + "><br>");
            res.write(location + ": " + temp + " °C <br>");
            res.write("Humidity: " + hum + "<br>");
            res.write("Description: " + desc + "<br>");
            res.send();
        })
    })
})

app.listen(5000, function() {
    console.log("Server is running on port 5000");
})