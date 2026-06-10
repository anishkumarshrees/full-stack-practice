const mongoose=require('mongoose')

const Schema = mongoose.Schema //schema is a class that is used to define the structure of the document in a collection in mongodb. it is used to define the fields and their data types in a document.

//object vaneko chai ghar ko naksa jastai ho jasma ghar ko naksa ma bedroom, kitchen, bathroom, living room etc. hunchan. tyesai gari schema ma chai document ko structure define garincha jasma field haru ra tyo field haru ko data type define garincha.

const blogSchema=new Schema({
    //eauta matra xa vani esari garna milxa
    //title:string
    title:{
        type:String||Number ,
        unique:true 
    },
    subtitle:{
        type:String||Number
    },
    description:{
        type:Text
    },
    image:{
        type:String
    }
})


const Blog=mongoose.model('Blog',blogSchema)
//manoose.model('Blog (this is name of table ,blogschema(this is structure of table from up))')

 module.exports= Blog



  