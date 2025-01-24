const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phoneNo: {
    type: Number,
    required: true,
  },
  role: {
    type: String,
    enum: ["admin", "customer", "partner"],
    required: true,
  },
  address: {
    street: {
      type: String,
    },
    city: {
      type: String,
    },
    zip: {
      type: String,
    },
  },
  profileImg: {
    type: String,
    // required: true,
  },
},
{
    timestamps: true,
}
);

//encrypt password
userSchema.pre('save', async function(next){
  if(!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  
});

//compare password
userSchema.methods.isPasswordCorrect = async function (password) {
  const isPassword = await bcrypt.compare(password, this.password);
  return isPassword;
}

//get jwt 
userSchema.methods.getJWT = async function () {
  const generatedToken = jwt.sign({_id: this._id, email: this.email}, process.env.JWT_SECRET_KEY, {
    expiresIn: "7d",
});
return generatedToken;
}

module.exports = mongoose.model("User", userSchema);
