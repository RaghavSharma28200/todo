const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please Tell us your name"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please Provide your email"],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "Please Provide a valid email"],
    },
    password: {
      type: String,
      required: [true, "Please Provide a password"],
      minlength: 8,
      trim: true,
    },

    passwordConfirm: {
      type: String,
      required: [true, "Please Provide a password"],
      minlength: 8,
      trim: true,
      validate: {
        validator: function (el) {
          return el === this.password;
        },
        message: "Password are not same ",
      },
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

userSchema.pre("save", async function (next) {
  // 1) check if password is modify or new
  if (!this.isModified("password")) return next();
  //2) Hashing the password
  this.password = await bcrypt.hash(this.password, 12);
  //3) Delete the passwordConfirm
  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.virtual("tasks", {
  ref: "Task",
  foreignField: "user",
  localField: "_id",
});

const User = mongoose.model("User", userSchema);

module.exports = User;
