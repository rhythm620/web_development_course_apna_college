const express = require("express");
const app = express();

let port = 3000;

app.listen(port,()=>{
    console.log(`app is listening on port ${port}`);
});

// app.use((req,res)=>{
//     console.log(req);
//     console.log("requst received")

//     res.send("this is my firer3q32st efadfaver2    3123node response in the server side coding ");
// });

app.get("/",(req,res)=>{
    res.send("You contacted root path...");
});

app.get("/rhythm",(req,res)=>{
    res.send("Hello I am rhythm Motwani Nice to meet you ");
});

app.get("/:username/:id",(req,res)=>{
    let {username,id} = req.params;
    res.send(`Welcome to the page of @${username}`);
});

app.get("/search",(req,res)=>{
    let {q} = req.query;
    if(!q){
        res.send("Nothing searched...")
    }
    res.send(`search results for query ${q}:`);
})