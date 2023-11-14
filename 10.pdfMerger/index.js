const express  = require("express");
const path  = require("path");

const app = express();
const port = 3000;

app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");

app.use("/static",express.static("public"));// ye line tm  nhi likh rhe the, tmko lga neeche wali jo line likhi hai usse kaam  chal jayega tmko laga dono same hai 

app.use(express.static(path.join(__dirname,"public")));//css ko use krne ke liye likhe hai 

app.use(express.urlencoded({extended:true}));//isse post request bhej payenge ham lo req.body ko parse krne ke liye likhte hai ye line

const multer  = require('multer');
const upload = multer({ dest: 'uploads/' });

const {mergePdfs} = require("./merge");//destructuring kiya because mergedPdfs is an object

app.get("/",(req,res)=>{
    res.render("index.ejs");
});

app.listen(port,()=>{
    console.log(`app is listening to port ${port}`);
});

// maximum files which we can choose is 12

app.post("/merge",upload.array("pdfs",2) ,async(req,res)=>{

  let d = await mergePdfs(path.join(__dirname,req.files[0].path),path.join(__dirname,req.files[1].path));

    res.redirect(`http://localhost:3000/static/${d}.pdf`)

    // console.log(req.files);
    // res.send({data:req.files});
});

