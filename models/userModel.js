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

/*
userSchema.pre("save", async function (next) {
  let doc = this;
  if (doc.isNew) {
    const lastUser = await User.findOneAndUpdate(
      { $inc: { UserID: 1 } },
      { new: true, upsert: true },
      { sort: { userID: -1 } }
    );
    const newUserId = (lastUser && lastUser.userId) || 0;
    doc.UserID = newUserId + 1;
  }
  next();
});
*/

userSchema.pre("save", async function (next) {
  if (this.isNew) {
    const lastUser = await User.findOne({}, {}, { sort: { userID: -1 } });
    const newUserId = (lastUser && lastUser.userID) || 0;
    this.userID = newUserId + 1;
  }
  next();
});

const User = mongoose.model("User", userSchema);
const Admin = mongoose.model("Admin", AdminSchema);

module.exports = {
  User,
  Admin,
};
