const User = require("../models/userSchema")

const profile = async(req,res) => {
    try{
        const userId = req.userId
        console.log(userId,'111111111111111111111111111111111111111111')
        const findUser = await User.findOne({_id:userId})
        console.log(findUser,'22222222222222222222222')
        if(findUser){
            return res.status(200).json({Data: findUser, message: "Data Fetched successfully"})
        }else{
            return  res.status(401).json( "User not found")
        }

    }catch(error){
        console.log(error.message)
        res.status(500).json("Internal Server error")
    }
}

module.exports = profile