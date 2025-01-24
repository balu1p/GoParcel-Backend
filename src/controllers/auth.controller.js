const User = require("../models/user.model");
const { validateSignup } = require("../utils/validation");
const { v4: uuidv4 } = require("uuid");

const registerUser = async (req, res) => {
  try {
    const { name, email, password, phoneNo, address, role } = req.body;
    validateSignup(req);
    const exiteduUser = await User.findOne({ email });
    let profileUrl = "";
    if (req.file) {
      const filename = req.file.filename;
      profileUrl = `/public/temp/${uuidv4()}/${filename}`;
    }

    if (exiteduUser) {
      res.status(409).json("user allready exits");
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
    const { email, password } = req.body;
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
