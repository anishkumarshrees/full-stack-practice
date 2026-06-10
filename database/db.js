//functional based approach
//function add(){}
//function subtract(){}

//oop
//class Caluculator{
    // add(){
        // }
        //subtract(){
            // }}

const mongoose=require('mongoose')
//jaba databse,api request, network sanga sambandhit code xa await use garna parxa so tyo code lai async function ma rakhna parxa await le chai asynchronous code lai synchronous jasto banauna madat garcha jaba database sanga sambandhit code xa await use garna parxa so tyo code lai async function ma rakhna parxa await le chai asynchronous code lai synchronous jasto banauna madat garcha. async chai function lai banaunai parxa.
async function connectToDatabase(){
   await mongoose.connect(process.env.MONGODB_URL)
   console.log('connected to database')
}

module.exports=connectToDatabase