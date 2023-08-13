const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Username is Required"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
  },
  password: {
    type: String,
    minlength: 6,
  },
});

const AdminSchema = new Schema({
  name: {
    type: String,
    required: [true, "Username is Required"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
  },
});

const User = mongoose.model("User", userSchema);
const Admin = mongoose.model("Admin", AdminSchema);

module.exports = {
  User,
  Admin,
};
