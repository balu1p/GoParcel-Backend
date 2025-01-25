const User = require("../models/user.model");
const { validateSignup } = require("../utils/validation");
const { v4: uuidv4 } = require("uuid");

const registerUser = async (req, res) => {
  try {
    const { name, email, password, phoneNo, address, role, adminSecret } = req.body;
    validateSignup(req);
    const exiteduUser = await User.findOne({ email });
    if (exiteduUser) {
      res.status(409).json("user allready exits");
    }
    if(role === "admin") {
      const exitedAdmin = await User.findOne({role: "admin"})
      if(exitedAdmin) {
        res.status(403).json({
          status: false,
          message: "An admin already exists. Only one admin is allowed."
        })
      }
      if(adminSecret !== process.env.ADMIN_SECRET) {
        res.status(403).json({
          status: false, 
          message: "Invalid admin secret. You are not authorized to create an admin."
        })
      }
    }
    let profileUrl = "";
    if (req.file) {
      const filename = req.file.filename;
      profileUrl = `/public/temp/${uuidv4()}/${filename}`;
    }

    const user = new User({
      name,
      email,
      password,
      phoneNo,
      address,
      profileImg: profileUrl,
      role,
    });

    await user.save();
    res.status(200).json({
      data: user,
      message: `${role} registered succefully.`,
      status: true,
    });
  } catch (error) {
    res.status(400).json({
      data: [],
      message: error.message,
      status: false,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({
        message: "user not found",
        status: false,
      });
    }
    const isPassword = await user.isPasswordCorrect(password);
    if (isPassword) {
      const token = await user.getJWT();
      res.cookie("authToken", token, {
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      });

      res.cookie("role", user.role, {
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      });

      res.status(200).json({
        message: "user login successfully",
        status: true,
      })
    } else {
      res.status(409).json({
        message: "Invalid credetials",
        status: false,
      });
    }
  } catch (error) {
    res.status(400).json({
      message: error.message,
      status: false,
    });
  }
};

module.exports = {
  registerUser,
  loginUser
};
