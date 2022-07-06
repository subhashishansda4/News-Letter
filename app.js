const express = require("express");
const body_parser = require("body-parser");
const request = require("request");
const https = require("https");
const { response } = require("express");

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

    if(checkbox == "on") {
        var checkbox = "subscribed";
    } else {
        var checkbox = "unsubscribed";
    }

    // const url_weather = "https://api.openweathermap.org/data/2.5/weather?q=" + location + "&appid=b38d0f86761aee3f54252831bc315430&units=metric#"
    
    // https.get(url, function(_res) {
    // console.log(_res.statusCode);

    // _res.on("data", function(data) {
    //     const weather = JSON.parse(data);
    //     const temp = weather.main.temp;
    //     const location = weather.loc;
    //     const desc = weather.weather[0].description;
    //     const hum = weather.main.humidity;
    //     const icon = weather.weather[0].icon;
    //     const image_url = "https://openweathermap.org/img/wn/" + icon + "@2x.png"

    //     res.write("<img src=" + image_url + "><br>");
    //     res.write(location + ": " + temp + " °C <br>");
    //     res.write("Humidity: " + hum + "<br>");
    //     res.write("Description: " + desc + "<br>");
    //     res.send();
    // })

    var data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: first_name,
                    LNAME: last_name
                },
                // location: {
                //     latitude: weather.coord.lat,
                //     latitude: weather.coord.lon
                // }
            }
        ]
    };

    var json_data = JSON.stringify(data);

    const url_mailchimp = "https://us9.api.mailchimp.com/3.0/lists/2a7e0826ab";
    const options = {
        method: "POST",
        auth: "Subhashis:765d9ef2c65b9fc2db241543606a0eda-us9"
    }
    
    const _req = https.request(url_mailchimp, options, function(_res) {
        if(_res.statusCode === 200) {
            res.sendFile(__dirname + "/success.html");
        } else {
            res.sendFile(__dirname + "/failure.html");
        }

        _res.on("data", function(data) {
            console.log(JSON.parse(data));
        })
    })

    _req.write(json_data);
    _req.end();
})

app.post("/failure", function(req, res) {
    res.redirect("/");
})

app.listen(1000, function() {
    console.log("Server is running on port 1000");
})

// MAILCHIMP API
// 765d9ef2c65b9fc2db241543606a0eda-us9

// AUDIENCE ID
// 2a7e0826ab