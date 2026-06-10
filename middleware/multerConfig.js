const multer = require('multer')
multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./storage')
    }
})

module.exports=multer