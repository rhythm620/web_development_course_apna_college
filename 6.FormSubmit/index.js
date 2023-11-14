const express  = require("express");
const { json } = require("express/lib/response");
const app = express();
const port = 8080;

const path = require("path");


app.listen(port,()=>{
    console.log(`App is listening to port ${port}`);
});

app.get("/register" ,(req,res)=>{
    let {user,password} = req.query;
    res.send(`get response Welcome ${user}`);
});

app.use(express.urlencoded({extended:true}));//this is a middleware
app.use(express.json());//abb hamara url json and urlencoded dono data ko bhi pass kr payega
app.post("/register" ,(req,res)=>{
    let {user ,password} = req.body; //ye line post request ke liye work nhi kregi
    res.send(`post response welcome ${user}`);
});

