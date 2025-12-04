const Users = require("../models/User")
const { Op } = require("sequelize")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const loginController = async(req,res)=>{
    const {identifier,password} = req.body

    const existingUser = await Users.findOne({
        where:{
            [Op.or]:[{username:identifier},{phone:identifier}]
        }
    })

    if(!existingUser) return res.status(400).json({
        success:false,
        message:"Username or Phone doesn't exist"
    })

    const comparePassword = await bcrypt.compare(password,existingUser.password)

    if(!comparePassword) return res.status(400).json({
        success:false,
        message:"Password incorrect, please try again"
    })

    // token creation
    const tokenPayload = {id:existingUser.id,role:existingUser.role}

    const expirationTime = 60 * 60 * 24 * 7 // One Week

    const token = jwt.sign(tokenPayload,process.env.JWT_SECRET,{
        expiresIn: expirationTime
    })

    existingUser.password = undefined

    res.status(200).json({
        success:true,
        message:"User Logged in successfully",
        activeUser:existingUser,
        token
    })
}

module.exports = loginController