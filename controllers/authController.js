const User = require("../models/userSchema")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const signup = async(req,res)=> {
    try {
        const {username, email, password, phone} = req.body
        if(!username | !email |!password | !phone) return res.status(401).json("Please fill all the fields")
            const userExists = await User.findOne({email:email})
        if(userExists) return res.status(401).json("User already exists")
            const hashPassword = await bcrypt.hash(password, 10)
        const createUser = await User.create({username, email, password:hashPassword, phone})
        return res.status(200).json({Data: createUser, message:"User created successfully"})
    } catch (error) {
        console.log(error)
        res.status(500).json("Internal server error")
    }
}

const login = async (req, res) => {
    try{
        const {email, password} = req.body
        if(!email | !password) return res.status(401).json("Please fill all the fields")
            const userExists = await User.findOne({email:email})
        if(!userExists) return res.status(401).json("User Not Found")
            const isValidUser = await bcrypt.compare(password, userExists.password)
        if(isValidUser){
            const userToken = await jwt.sign({userId: userExists._id, email:userExists.email}, process.env.SECRET_KEY)
            return res.status(200).json({message:"Login successfully", token:userToken})
        }else{
            return res.status(401).json("Invalid Password")
        }    
    }catch(error){
    console.log(error.message)
    res.status(500).json("Internal server error")
}
}

module.exports = {signup, login}