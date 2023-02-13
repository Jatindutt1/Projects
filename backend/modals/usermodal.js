const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

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
  avatar: {
    public_id: {
      type: String,
      require: true,
    },
    url: {
      type: String,
      require: true,
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
  role: {
    type: String,
    default: "user",
  },

  // resetPasswordToken:String,
  // resetPasswordExpire:Date,

});

//for bcrypt password change in to bcrypt form
userSchema.pre("save", async function (next) {
  const salt = bcrypt.genSaltSync(10);
  this.password = bcrypt.hashSync(this.password, salt);
});
//for match password in user login
userSchema.methods.ispasswordMatched = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("user", userSchema);
