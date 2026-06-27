const express = require("express")
const authMiddleware = require("../middlewares/auth.middleware")
const interviewController = require("../controllers/interview.controller")
const upload = require("../middlewares/file.middleware")

const interviewRouter = express.Router()

/*
@route: POST/api/interview/
@description: generate new interview report on basis of user self description or resume pdf or job description
@access private
*/
interviewRouter.post("/",authMiddleware.authUser,upload.single("resume"),interviewController.generateInterviewReportController)

// interviewRouter.post(
//     "/test",
//     upload.single("resume"),
//     (req,res)=>{
//         console.log("FILE:", req.file)
//         console.log("BODY:", req.body)

//         res.json({
//             file:req.file,
//             body:req.body
//         })
//     }
// )


module.exports = interviewRouter