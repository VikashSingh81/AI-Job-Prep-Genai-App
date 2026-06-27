const pdfParse = require("pdf-parse")
const generateInterviewReport = require("../services/ai.service")
const interviewReportModel = require("../models/interviewReport.model")

async function generateInterviewReportController(req,res){
    const resumeFile= req.file  

    // console.log("FILE RECEIVED:", req.file);
    // console.log("BODY RECEIVED:", req.body);


    const resumeContent = await(new pdfParse.PDFParse(Uint8Array.from(req.file.buffer))).getText()
    const {selfDescription,jobDescription} = req.body


    // Lot Error is coming so I am replacing code here
    const interViewReportByAi = await generateInterviewReport({
        resume: resumeContent.text  ,
        selfDescription,
        jobDescription
    })



    interViewReportByAi.technicalQuestions =
    interViewReportByAi.technicalQuestions.map(q =>
        typeof q === "string" ? JSON.parse(q.replace(/`/g, "")) : q
    );

    interViewReportByAi.behavioralQuestions =
    interViewReportByAi.behavioralQuestions.map(q =>
        typeof q === "string" ? JSON.parse(q.replace(/`/g, "")) : q
    );

    interViewReportByAi.skillGaps =
    interViewReportByAi.skillGaps.map(s =>
        typeof s === "string" ? JSON.parse(s.replace(/`/g, "")) : s
    );

    interViewReportByAi.preparationPlan =
    interViewReportByAi.preparationPlan.map(p =>
        typeof p === "string" ? JSON.parse(p.replace(/`/g, "")) : p
    );


    // Here done changes for printing
    console.log(JSON.stringify(interViewReportByAi, null, 2))

    const interviewReport = await interviewReportModel.create({
        user:req.user.id,
        resume: resumeContent.text,
        selfDescription,
        jobDescription,
        ...interViewReportByAi
    })

    res.status(201).json({
        message:"Interview report generated successfully.",
        interviewReport
    })

}

module.exports = {generateInterviewReportController}
