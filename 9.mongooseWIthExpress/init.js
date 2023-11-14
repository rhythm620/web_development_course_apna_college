const mongoose = require("mongoose");

const Chat = require("./models/chat.js");

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

   let allChats  = [
      {
         from:"Neha",
         to:"Patwa",
         message:"send me your photo",
         created_at: new Date(),
    },
      {
         from:"ram",
         to:"raman",
         message:"send me your photo raman",
         created_at: new Date(),
    },
      {
         from:"raja",
         to:"pandey",
         message:"send me your photo of your notes",
         created_at: new Date(),
    },
      {
         from:"rhythm",
         to:"priyal",
         message:"send me your photo priyal",
         created_at: new Date(),
    },
      {
         from:"satyam",
         to:"shukla",
         message:"send me your photo of your nose",
         created_at: new Date(),
    },
      {
         from:"priyal",
         to:"rhythm",
         message:"send me your photo rhythm I want to see your body",
         created_at: new Date(),
    },
      {
         from:"rohan",
         to:"sohan",
         message:"send me your photo of your birthday",
         created_at: new Date(),
    },

  ];

  Chat.insertMany(allChats);
