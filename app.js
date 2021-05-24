
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");


const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'ejs');
app.use(express.static("public"));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");

})

app.post("/", function(req, res){
    const query = req.body.cityName;
    const apiKey = "056e8cffd3e3bc9d3e903db65a626d9e"
    const unit = "customary";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;

    https.get(url, function(response){
        console.log(response.statusCode);

        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

            res.render(
                "index.ejs", {nameOfCity: query,temperature: temp, caption: weatherDescription, weatherImage: imageURL});
        })
    })

})


app.listen(process.env.PORT || 3000, function(){
    console.log("Server started on port 3000.");
});



