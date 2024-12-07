// now here we are going to createa a middleware
const jwt = require("jsonwebtoken")
require("dotenv").config()
const SECRET_KEY = process.env.SECRET_KEY

const userMiddleWare = (req,res,next)=>{
    const userid = req.headers.authorization
    if(!userid || !userid.startsWith("Bearer ")) return res.json({msg : "You are not allowed to do this || please sign in to create a mcqs"})
    // now the user is signed/registered so now we are going to use jwt
    
    try{
        let extractData = userid.split(" ")[1]
        let newHolder = jwt.verify(extractData , SECRET_KEY)
        if(newHolder.userId){
          req.usercheckId = newHolder.userId;
          next()
        }
        else{
            return res.json({msg : "Unable to find the userId that's why not able to verify"})
        }
    }
    catch(error){
        return res.json({msg : "Something went wrong and some middleware error is catched" + error})
    }

}

module.exports = userMiddleWare