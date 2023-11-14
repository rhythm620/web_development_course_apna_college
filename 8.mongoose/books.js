const mongoose = require("mongoose");

main()
.then(()=>{
    console.log("connection Successful")
})
.catch((err)=>console.log(err));

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/test");
}

  const bookSchema = new mongoose.Schema({
      title:{
          type:String,
          required:true,
      },
      author:{
          type:String,
      },
      price:{
          type:Number,
          default:90,
          min:[1,"Price is too low to buy any product from amazon"],
      },
      discount:{
          type:Number,
          default :10,
      },
      category:{
          type:String,
          enum:["fiction","Non-fiction"],
      },
      genre:[String],
});

const Book = mongoose.model("Book",bookSchema);// collection form  ho jayega db ke andar

Book.findByIdAndUpdate("651fb42dfc52c73abe9a9bf4",{price: -100},
{runValidators :true})
.then((res)=>{
    console.log(res);
})
.catch((err)=>{
    console.log(err.errors.price.properties);
});

let book1=new Book({

    title:"Mathematics",
    author:"RD Sharma",
    price:909,
    category: "fiction",
    genre:["comics", "superheors","jonres bolte hai genre ko"]
});

book1.save()
.then((res)=>{
    console.log(res);
})
.catch((err)=>{
    console.log(err);
});