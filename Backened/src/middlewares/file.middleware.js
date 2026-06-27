const multer = require("multer")

const upload = multer({
    storage: multer.memoryStorage(),
    limits:{
        fileSize: 3*1024*1024 // Maximum size of pdf which i will upload is 3MB
    }

})

module.exports=upload