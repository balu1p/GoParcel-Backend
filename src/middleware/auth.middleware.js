const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies; 

    if (!token) {
      res.status(401).json({
        status: false,
        message: "Unauthorized request!",
      });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const { _id } = decodedToken;

    const user = await userModel.findOne({ _id });

    if (!user) {
      res.status(401).json({
        status: false,
        message: "Unauthorised request",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({
      message: error.message,
      status: false,
    });
  }
};

module.exports = {
  userAuth,
};
