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
const cors=require('cors')
app.use(cors({
    origin:["http://localhost:5173","https://blog-project-nine-sigma.vercel.app"]
    //  origin:["http://localhost:5173/","digitalpathshala.com","facebook.com"] edi dherai website lai request accept dina paryo vani
}))
app.use('/storage', express.static('storage'))

const upload= multer({storage:storage})
const fs=require('fs')

const image = (req, blog) => {
    const blogData = blog.toObject ? blog.toObject() : blog
    const imageName = blogData.image

    if (imageName && imageName.startsWith('http')) {
        return {
            ...blogData,
            imageUrl: imageName
        }
    }

    return {
        ...blogData,
        imageUrl: imageName
  ? `${req.protocol}://${req.get('host')}/storage/${imageName}`
  : ""
    }
}

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
    res.status(200).json({"message":'okey'})
})





// app.post("/home",async(req,res)=>{
    app.post("/blog",upload.single("image"),async(req,res)=>{
    // const title= req.body.title
    // const subtitle=req.body.subtitle
    // const description=req.body.description
    // console.log(req.body)
    console.log(req.body)
    // if(
    //     req.file>=100000{
    //     return res.status(400).json({
    //         message:"file size should be less than 100kb"
    //     }
    //     else{}
    // )
    // console.log(req.file) //yo chai file ko details haru console ma dekhaune vanne ho
 const {title,subtitle,description}=req.body
//  const filename = req.file.filename
let filename;
 if (req.file){
    filename = "https://blog-project-nine-sigma.vercel.app/"+ req.file.filename
 }else{
    filename=""
 }
 if(!title && !description && !subtitle || !image ){
    return res.status(400).json({
        message:"please provide atleat title or write description"
    })
 }
   const blog = await Blog.create({
   
        title:title,
        subtitle:subtitle,
        description:description,
        image: filename
    })
    res.json({
        'message':'data added successfully',
        data:image(req, blog)
    })
})
app.get("/blog",async (req,res)=>{

const blogs = await Blog.find()
res.status(200).json({
    message:"all blogs",
    data:blogs.map((blog)=>image(req, blog))
})
})

app.get("/blog/:id",async (req,res)=>{
const id = req.params.id
const blog =await Blog.findById(id)
if(!blog){
    res.status(404).json({
        message:"id not foud"
    })

}
else {
  return  res.status(200).json({
        message:"blog found",
        data:image(req, blog)
    })
}

})

app.delete("/blog/:id",async (req,res)=>{
    const id = req.params.id
    const blog = await Blog.findByIdAndDelete(id)
    if(!blog){
        res.status(404).json({
            message:"id not found"
        })
    }
    else{
       return res.status(200).json({
            message:"blog deleted successfully"
            
        })
    }
})
app.patch("/blog/:id",upload.single("image") , async (req,res)=>{
    const id = req.params.id
    const {title,subtitle,description}=req.body
    let imageName;
  if(req.file){
    imageName =   req.file.filename
    const blog =await Blog.findById(id)
    const oldimageName=blog.image

if(req.file){
    imageName=req.file.filename
}

if(blog.image){

    fs.unlink(`storage/${oldimageName}`,(err)=>{
        if(err){
            console.log(err)
        }
        else{
            console.log("file deleted successfully")
        }
    })
}
    await  Blog.findByIdAndUpdate(id,{
        title:title,
        subtitle:subtitle,
        description:description,
        image:imageName

        
    })
    res.status(200).json({
        message:"blog updated successfully"
    
  })
}
})


app.listen(process.env.PORT,()=>//(3000 is port number and ()=> is a callback function that will be executed once the server starts listening on the specified port.)
    {
    console.log('server is running on 3000')
})



 
