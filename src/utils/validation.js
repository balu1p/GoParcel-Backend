const validator = require('validator');

const validateSignup = (req) => {
    const { 
        name, 
        email, 
        password, 
        role, 
        address, 
        phoneNo, 
        profileImg, 
    } = req.body;

    if (!name || !role || !password || !email || !phoneNo) {
        throw new Error("All fields are mandatory.");
    }

    if (name.length < 2 || name.length > 50) {
        throw new Error("First name must be between 2 and 50 characters.");
    }
    if (!validator.isEmail(email)) {
        throw new Error("Invalid email format.");
    }

    if (!validator.isStrongPassword(password, { minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 })) {
        throw new Error("Password must be at least 8 characters long and include uppercase, lowercase, numbers, and symbols.");
    }

    if (phoneNo) {
        const strPhoneNo = phoneNo.toString();
        if(!validator.isMobilePhone(strPhoneNo, 'any')) {
            throw new Error("Invalid phone number.");
        }
    }

    if (profileImg && !validator.isURL(profileImg)) {
        throw new Error("Profile image must be a valid URL.");
    }
};

module.exports = {
    validateSignup
}