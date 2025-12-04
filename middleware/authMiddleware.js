// Authentication - username+password
const jwt = require("jsonwebtoken")
// jwt.sign(payload,signature,waqtiga)
const authenticate = (req,res,next)=>{
    // get the token
    const token = req.headers.authorization && req.headers.authorization.split(" ")[1]

    if(!token) return res.status(404).json({
        success:false,
        message:"No Token Available"
    })

    try {
        // checking the token
        jwt.verify(token,process.env.JWT_SECRET,(err,decoded)=>{
            // const user = {
            //     id:10,
            //     role:ADMIN
            // }
            if(err) return res.status(400).json({
                success:false,
                message:"Invalid Or Expired Token"
            })

            req.user = decoded // {Id:1,Role:ADMIN}
            next()

        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Authentication process failed",
            error:error.message,
        })
    }
}
// tracking
// waqtigii dhamaaday
// logout
// Authorization - access 

// authorize("ADMIN","STAFF","TEACHER") 

// Dynamic = 1,2,3

// Spread Operator = ...

const authorize = (...allowedRoles) => {
    // Logs the allowed roles
    return (req,res,next) =>{
        //["ADMIN","STAFF"]
        // Log the active user
        const userRole = req.user.role
        if(allowedRoles.includes(userRole)){
            next()
        }else{
            return res.status(403).json({
                success:false,
                message:"Forbidden Access Denied"
            })
        }
    }
}

module.exports = {
    authenticate,
    authorize
}