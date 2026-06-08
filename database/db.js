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
   await mongoose.connect('mongodb://anishshrees12_db_user:admin123@ac-tbkwwyx-shard-00-00.l5jcm5a.mongodb.net:27017,ac-tbkwwyx-shard-00-01.l5jcm5a.mongodb.net:27017,ac-tbkwwyx-shard-00-02.l5jcm5a.mongodb.net:27017/?ssl=true&replicaSet=atlas-yz6qpu-shard-0&authSource=admin&appName=Cluster0')
   console.log('connected to database')
}

module.exports=connectToDatabase