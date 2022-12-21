const express =require("express");
const https =require("https");
const bodyParser= require("body-parser");

const app= express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req,res){
    res.sendFile(__dirname+"/index.html");  
});

app.post("/", function(req,res){

    const query=req.body.cityName;
 const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid=376ff33e1f4b26261cfaf638ed54e48c&units=metric";
    https.get(url, function(response){
       console.log(response.statusCode);

      response.on("data", function(data){
        const weatherData=JSON.parse(data);
        const temp=weatherData.main.temp;
        const description =weatherData.weather[0].description;
        const icon=weatherData.weather[0].icon;
        const imgURL="http://openweathermap.org/img/wn/"+icon+"@2x.png";
        console.log(temp);
        console.log(description);

        // res.write("<h3> The weather is "+description+"</h3>");
        // res.write("<h1>The temperaturein" is "+ temp+"</h1>");
      
        res.write("<p>Weather condition  "+description+" </p>");
        res.write("<h1>The temperature in "+query+" is "+ temp+"</h1>");
        res.write("<img src="+imgURL+">");
        res.send()
      });
    });
})





app.listen(3000,function(){
    console.log("Serving is running on 3000.")
});