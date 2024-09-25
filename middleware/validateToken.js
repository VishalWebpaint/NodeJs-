const jwt = require("jsonwebtoken")
const User = require("../models/userSchema")

const validate = async(req, res, next) => {
    try{
        const userToken  = req.headers["authorization"]
        console.log(userToken,'usertoken')
        if(!userToken) return res.status(401).json("Token not get")
            const token = userToken.replace(/^Bearer\s+/, "");
        console.log(token,'tooooooooooooo')
        if(!token) return res.status(401).json("Token not found")
    
        const docode = jwt.verify(token, process.env.SECRET_KEY)
        console.log(docode,'docode')
    
        const findAccount = await User.findOne({_id: docode.userId})
        if(!findAccount) return res.status(401).json("Unauthorizied user")
            req.userId = docode.userId
        next()
    }catch(error){
        console.log(error)
        res.status(500).json("Internal server error")
    }
}
module.exports = validate