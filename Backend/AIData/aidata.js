const express = require("express");
const router = express.Router();
const fs = require("fs");
const multer = require("multer");
const pdf = require("pdf-parse");
require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { PrismaClient } = require("@prisma/client");
const userMiddleWare = require("../Middleware/Middleware");

const prisma = new PrismaClient();

const upload = multer({ dest: "uploads/" });
const apikey = process.env.API_KEY;

console.log("The API key of the AI is: " + apikey);

router.post("/createmcqs", userMiddleWare, upload.single("pdf"), async (req, res) => {
    let findUser = req.usercheckId;
    if (!findUser) {
        return res.json({ msg: "User is not signed in; we can't proceed further." });
    }

    try {
        const genAI = new GoogleGenerativeAI(apikey);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const pdfPath = req.file.path;
        if (!pdfPath) {
            return res.json({ msg: "No file uploaded" });
        }

        const pdfBuffer = fs.readFileSync(pdfPath);
        const pdfContent = await pdf(pdfBuffer);

        const prompt = `
       The following content is extracted from a PDF document:
      "${pdfContent.text}"
      Using the above content, create MCQs in the following JSON format:

      [  
      {
        "question": "write_question_here",
        "option1": "first_option",
        "option2": "second_option",
        "option3": "third_option",
        "option4": "fourth_option",
        "answer": "answer_here"
    }
   ]
   Please ensure all questions follow this format. and please try to create as much as 
   probelem you can set `;

        const result = await model.generateContent(prompt);

        const finalDataPartOne = result.response.text();
        const jsonData = finalDataPartOne.replace(/```json|```/g, "").trim();
        const parsedData = JSON.parse(jsonData);

        fs.unlinkSync(pdfPath);

        const createdMcqs = await prisma.mcqsData.create({
            data: {
                authorId: findUser,
                questions: parsedData,
            },
        });

        res.json({
            msg: "Data is stored successfully",
            data: parsedData,
            yourId: createdMcqs.uniqueId,
        });
    } catch (error) {
        console.error(error);
        res.json({
            msg: "Something went wrong: " + error.message,
        });
    }
});


router.get("/getmcqsdata/:id" , async(req,res)=>{

   try{
    let id = parseInt(req.params.id)
    let findID = await prisma.mcqsData.findUnique({
       where:{
         uniqueId : id
       }
    })
    if(!findID) return res.json({msg : "Unable to find the data"})
    
    return res.json({
        mcqsdata : findID.questions
    })
   }

   catch(error){
     return res.json({
        msg : "Something went wrong while cathching of the data"
     })
   }
   

})


module.exports = router
