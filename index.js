const express = require("express");
const app = express();
const port= 8080;

const path = require("path");
const { v4: uuidv4 } = require('uuid'); //generates a unique id

const methodOverride = require("method-override");
app.use(methodOverride("_method"));

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));

app.get("/",(req,res)=>{
    res.send("Everything is working well");
});

app.listen(port ,()=>{
    console.log(`App is listening to port ${port}`);
});


let posts = [
    // {
    //     id:  "1a",
    //     username: "RhythmMotwani",
    //     content: "I am learning backened",
    // },
    // {
    //     id: uuidv4(),
    //     username: "TarangMotwani",
    //     content: "I am learning frontend",
    // },
    // {
    //     id: uuidv4(),
    //     username: "RabindraKumar",
    //     content: "I am learning Marketing", 
    // },
];



app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts});
});

app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
});

app.use(express.urlencoded({extended:true}));
app.use(express.json());

// Adding a new post in Quora
app.post("/posts",(req,res)=>{
    let {username, content} = req.body;//req.body mei id, username and content hai 
    let id = uuidv4();
    posts.push({id,username,content});

    // res.send("post request working");
    res.redirect("/posts");//by default get request hi bhejta hai form mei
});

//show route
app.get("/posts/:id",(req,res)=>{
    let { id } = req.params;// request mei jo id gayi hai wo btaiyega
    let post = posts.find((p)=> id === p.id);//will check ki jo id pe request jaa rhi hai wo posts wale array mei exit bhi krti hai ki nahi 
    res.render("show.ejs" ,{ post });
});

// Editing a post in Quora
app.patch("/posts/:id",(req,res)=>{
    let {id} = req.params;
    let newContent = req.body.content;
    let post = posts.find((p)=> id === p.id);
    post.content = newContent;
    // res.send("Patch Request Working...");
    res.redirect("/posts")
});

app.get("/posts/:id/edit",(req,res)=>{
    let {id} = req.params; 
    let post = posts.find((p)=> id === p.id);

    res.render("edit.ejs",{post});
});

app.delete("/posts/:id",(req,res)=>{
    let {id} = req.params;
     posts = posts.filter((p)=> id !== p.id);//filter means delete
    // res.send("delete Success");
    res.redirect("/posts");
});


