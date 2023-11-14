const express =  require("express");
const app = express();

const mongoose = require("mongoose");
const path = require("path");

const Chat = require("./models/chat.js");

app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");

app.use(express.static(path.join(__dirname,"public")));//css ko use krne ke liye likhe hai 

app.use(express.urlencoded({extended:true}));//isse post request bhej payenge ham lo req.body ko parse krne ke liye likhte hai ye line

const methodOverride =require("method-override");
const ExpressError = require("../13.middleware/ExpressError.js");
app.use(methodOverride("_method"));

// const ExpressError = require('./ExpressError');

main()
.then(()=>{
    console.log("connection successful");
})
.catch((err)=>{
    console.log(err);
});

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/test");
}

//   let Chat1 =  new Chat({
//       from:"Neha",
//       to:"Priya",
//       message:"Hi priya how are you",
//       created_at: new Date()
//   });

//   Chat1.save().then((res)=>{
//       console.log(res);
//   })

  //Creating Index Route
app.get("/chats",async(req,res)=>{
  try{
    let chats = await Chat.find();
   //  console.log(chats);
   res.render("index.ejs",{chats});
  }
  catch(err){
  next(err);
} 
 });


app.get("/",(req,res)=>{
    res.send("root is working");
});

app.listen(8080,()=>{
    console.log("App is listening to port 8080");
});


// Creating a new chat  --> isse form aa jayega

app.get("/chats/new",(req,res)=>{
  res.render("new.ejs");
});

// Creating a new chat --> isse new chat ban jayegi 

app.post("/chats",(req,res)=>{
  let {from,to,message} =req.body;

  let newChat = new Chat({
    from:from,
    to:to,
    message:message,
    created_at :new Date(),
  });

  // console.log(newChat);
  newChat.save().then(res=>{
    console.log("Chat was saved");
  })
  .catch(err=>{
    console.log(err);
  })
  // res.send("working");

  res.redirect("/chats");
  
});

// Creating edit route --> isse edit form khul jayega jab edit pe click krenge

app.get("/chats/:id/edit",async(req,res)=>{
  let {id} = req.params;
  let chat = await Chat.findById(id);
  res.render("edit.ejs",{chat});
});

// Creating edit route --> isse edit ho jayega changes that we want to make to the text

app.put("/chats/:id",async (req,res)=>{

  let {id} = req.params;
  let {message : newMessage}= req.body;
  console.log(newMessage);

  let updatedChat = await Chat.findByIdAndUpdate(
    id,
    {message : newMessage},
    {runValidators:true,new : true},
  );

  res.redirect("/chats");
});


function asyncWrap(fn){
  return function (req,res,next){
    fn(req,res,next).catch((err) => next(err));
  }
}
// Show Route:

app.get("/chats/:id", asyncWrap(async(req,res,next)=>{
  // try{
    let {id} = req.params;
    let chat = await Chat.findById(id);
  
    if(!chat){
      next(new ExpressError(404,"Chat Not Found Rhythm"));
    }
    res.render("edit.ejs",{chat});
  // }
  // catch(err){
  //   next(err);
  // }

}));

const handleValidationError = (err)=>{
  console.log("This was a validation error plaease follow some rules idiot");
  console.dir(err.message);
  return err;
}


app.use((err,req,res,next)=>{
  console.log(error.name);
  if(err.name == "ValidationError"){
    handleValidationError(err);
  }
  next(err);
});

// Error Handling Middleware

app.use((err,req,res,next)=>{
  let {status=500,message = "Some Error Occured I am extremely sorry"}=err;
  res.status(status).send(message);
});


// Deleting Route

app.delete("/chats/:id",async(req,res)=>{
  let {id} = req.params;
  let deletedChat = await Chat.findByIdAndDelete(id);
  res.redirect("/chats");
})



