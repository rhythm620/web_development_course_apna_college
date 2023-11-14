// let url = "https://localhost:8080/users"; -- > Pehle yahi likh ke aata tha mongoose ki website pe

const mongoose = require("mongoose");

main()
.then(()=>{
    console.log("connection Successful")
})
.catch((err)=>console.log(err));

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/test");
  }

  const userSchema = new mongoose.Schema({
      name:String,
      email:String,
      age:Number,
  });

  const User = mongoose.model("User",userSchema);
  const Employee = mongoose.model("Employee",userSchema);

  const user1 = new User({
      name:"rhythm",
      age :22,
      email:"rhythmmotwani206@gmail.com",
  });
  const user2 = new User({
      name:"tarang",
      age :20,
      email:"tarangmotwani1234@gmail.com",
  });

  user1.save();

  user2.save()
  .then((res)=>{
      console.log(res);
  })
  .catch((err)=>{
      console.log(err);
  });

  User.insertMany([
      {name:"sanjay",age:19,email:"sanjay@gmail.com"},
      {name:"tarun",age:29,email:"tarunwa@gmail.com"},
      {name:"raja",age:1,email:"rajapandey@gmail.com"},
  ]).then((res)=>{
      console.log(res);
  });

User.findOne({age:{$gt:19}})
.then((res)=>{
    console.log(res);
})
.catch((err)=>{
    console.log(err);
});

User.findOne({_id:"651f720e4d5bbe50fb8ead57"})
.then((res)=>{
    console.log(res);
})
.catch((err)=>{
    console.log(err);
});

User.findOneAndUpdate({name:"rhythm"},{age:245},{new:true})
.then((res)=>{
    console.log(res);
})
.catch((err)=>{
    console.log(err);
});

User.deleteOne({name:"tarang"}).then((res)=>{
    console.log(res);
});
User.deleteMany({age:{$gt :28}}).then((res)=>{
    console.log(res);
});

User.findByIdAndDelete("651f6d8158edd31ea54673bb").then((res)=>{
    console.log(res);
});