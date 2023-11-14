const express = require("express");
const app = express();

const port = 8000;
const path = require("path");

app.set("view engine","ejs");

app.set("views", path.join(__dirname,"/views"))

app.get("/" , (req,res)=>{
      res.render("home.ejs");
});

app.get("/hello",(req,res)=>{
    res.send("Hello rhythm")
});
app.listen(port,()=>{
    console.log(`App is listening to port ${port}`);
});

app.get("/rolldice", (req,res)=>{
    let diceVal = Math.floor(Math.random()*6)+1;
    res.render("rolldice.ejs",{diceVal});
});

// app.get("/ig/:username", (req,res)=>{
//     const followers = ["Rhythm ","tarang","komal"];
//     let {username} = req.params;
//     res.render("instagram.ejs",{username,followers});
// });

app.use(express.static("public"));
app.use(express.static(path.join(__dirname,"/public/css")));
app.use(express.static(path.join(__dirname,"/public/js")));

app.get("/ig/:username", (req,res)=>{
    let {username} = req.params;
    const instaData = require("./data.json");
    const data = instaData[username];
    if(data){
        res.render("instagram1.ejs",{data});
    }
    else{
        res.render("error.ejs");
    }
});

