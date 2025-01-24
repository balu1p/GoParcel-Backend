const User = require("../models/user.model");
const becrypt = require('bcrypt');
const { validateSignup } = require("../utils/validation");

const registerUser = async(req, res) => {
    try {
        const { name, email, password, phoneNo, address, profileImg, role } = req.body;

        validateSignup(req);
    
        // check email already exits
        const exiteduUser = await User.findOne({email});
        if(exiteduUser) {
            res.status(409).json("user allready exits");
        }
    
        // const hashedPassword = await becrypt.hash(password, 10);
    
        const user = new User({
            name,
            email,
            password,
            phoneNo,
            address,
            profileImg,
            role
        });
    
        await user.save();
        res.status(200).json({
            data: user,
            message: `${role} registered succefully.`,
            status: true
        })
    
    } catch (error) {
        res.status(400).json({
            data: [],
            message: error.message,
            status: false
        });
    }
}

module.exports = {
    registerUser,
}