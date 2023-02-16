const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto")


const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "first name is required."],
  },
  lastName: {
    type: String,
    required: [true, "last name is required."],
  },
  email: {
    type: String,
    required: [true, "email is required."],
    index: {
      unique: true,
    },
  },
  phoneNumber: {
    type: Number,
    required: [true, "phoneNumber is required."],
  },
  password: {
    type: String,
    required: [true, "password is required."],
  },
  avatar :
  {
    public_id: {
      type: String,
      require: true,
    },
    url: {
      type: String,
      require: true,
    },
  },

  role: {
    type: String,
    default: "user",
  },
  resetPasswordToken:String,
  resetPasswordExpire:Date,


});

//for bcrypt password change in to bcrypt form
userSchema.pre("save", async function (next) {
if(!this.isModified("password")){
  next();
}
  this.password = bcrypt.hash(this.password, 10);
});
//for match password in user login
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

//JWT Token
userSchema.methods.generateToken = function(){
  return jwt.sign({ id:this._id }, process.env.JWT_SECRETKEY, { expiresIn: "3d" });
};

//Genrate reset password token
userSchema.methods.getResetPasswordToken= function(){
  //Geneating Token
  const resetToken = crypto.randomBytes(20).toString("hex");

  //Hashing and add reset password token to userSchema

  this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");

  //expire time set
  this.resetPasswordExpire = Date.now()+15*60*1000;

  return resetToken;

}


module.exports = mongoose.model("user", userSchema);
