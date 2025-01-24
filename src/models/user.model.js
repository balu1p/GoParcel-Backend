const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

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

userSchema.pre('save', async function(next){
  if(!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  
})

module.exports = mongoose.model("User", userSchema);
