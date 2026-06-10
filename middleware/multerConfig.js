const multer = require('multer')
const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./storage') //yo chai file kaha store garne vanne ho so yo chai storage folder ma store garne vanne ho eg: cb(erro,success) so error vaneko chai null ho ra success vaneko chai storage folder ho
    },
    filename:function(req,file,cb){
            cb(null, Date.now() +  file.originalname)
    }//filename vaneko chai file ko name tetikai rakni ki change garni vanne ho so esko kam modify garni ki tetikai rakhni vanni ho
    //esko main kaam chai jastai file ko name eautai 2 ota user le upload garyo vani details haru modify garera rakhxa
})

module.exports={
    multer,
    storage
}