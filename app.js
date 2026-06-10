require('dotenv').config()
//require is used to import modules in node.js
const express = require('express') //express is a web application framework for Node.js, designed for building web applications and APIs. It provides a robust set of features for web and mobile applications, making it easier to manage routes, handle requests and responses, and integrate with various middleware.
const connectToDatabase = require('./database/db')
const Blog = require('./model/blogModel')
const { storage, multer } = require('./middleware/multerConfig')
connectToDatabase()
const app = express()
app.use(express.json()) //yo chai sadhai hannu parxa json ko file lai read garna lai express.json() le help garxa. edi yo na haney undefined aaunxa
storage
multer 

const upload= multer({storage : storage})

//app.get is used to get data from the server and send to client.it takes two paramerters, first is the route '/' which is the root route means where route means the path of url example localhost:3000 is using root route and second is a callback function that will be executed when a get request is made to specified route.
app.get("/",(req,res)=>{
    //this is api route , eha / vaneko api ho so when we hit / in url then this api will be called and callback function will be executed
    //yo code chai backend maa run vako xa
    // console.log("hello world")
    // res.send("bye world") thi is in string format so we use json format to sent data to client
    //res.json is used to send data in json format which is used to send data in json format where json is data format that is used to send data in key value pair format and it is easy to read and undestand by both humans and machines.
    //res.status(300).json this is used to change status code and run code succesfully in postman  
    res.json({
        "message":'hello world'
    })
})
app.get("/home",(req,res)=>{
    
    res.json({
        'message':'welcome to home page'
    })
})





// app.post("/home",async(req,res)=>{
    app.post("/home",upload.single("image"),async(req,res)=>{
    // const title= req.body.title
    // const subtitle=req.body.subtitle
    // const description=req.body.description
    // console.log(req.body)
    console.log(req.body)
 const {title,subtitle,description,image}=req.body
 if(!title && !description &&!subtitle  ){
    return res.status(400).json({
        message:"please provide atleat title or write description"
    })
 }
   await Blog.create({
   
        title:title,
        subtitle:subtitle,
        description:description,
        image: image
    })
    res.json({
        'message':'data added successfully'
    })
})
app.listen(process.env.PORT,()=>//(3000 is port number and ()=> is a callback function that will be executed once the server starts listening on the specified port.)
    {
    console.log('server is running on 3000')
})



 