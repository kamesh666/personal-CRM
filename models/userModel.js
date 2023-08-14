const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  UserID: {
    type: Number,
    unique: true,
  },
  username: {
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
  timezone: {
    type: String,
    default: "UTC",
  },
  lastSignInAt: {
    type: Date,
    default: null, // Set to null initially
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
