const { request } = require("express");
const jwt = require("jsonwebtoken");

const jwtAuthMiddleware = (req,res,next)=>{
    const authorization = req.headers.authorization;
    console.log(authorization);
    if(!authorization){
        return res.status(401).json({error:"Token not found"});
    }
    // Extract jwt token from the request headers
    const token = req.headers.authorization.split(" ")[1];
    if(!token){
        return res.status(401).json({error:"Unauthorized"});
    }

    try{
        // Verify the JWT token
        const decodedData = jwt.verify(token,process.env.JWT_SECRET);

        req.userData = decodedData;
        next();

    }catch(e){
        res.status(401).json({error:"Invalid Token"});
    }
}

// Function to generate JWT Token
const generateToken = (userData)=>{
    // Generate a new JWT Token using userData
    return jwt.sign(userData,process.env.JWT_SECRET,{expiresIn:30000});
}

module.exports = {jwtAuthMiddleware,generateToken};