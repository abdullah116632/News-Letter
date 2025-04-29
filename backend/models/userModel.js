import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is required"],
    maxlength: [20, "name cannot exceed 20 characters"],
  },
  email: {
    type: String,
    required: [true, "email is required"],
    lowercase: true,
    validate: [validator.isEmail, "Please enter a valid email"],
    unique: [true, "email already exists"],
  },
  password: {
    type: String,
    required: [true, "please enter a password"],
    minlength: 6,
    select: false,
  },
  confirmPassword: {
    type: String,
    required: [true, "please enter confirm password"],
    validate: {
      validator: function (val) {
        return val == this.password;
      },
      message: "Password & Confirm password must be same",
    },
  },
}, {timestamps: true});

const User = mongoose.model("User", userSchema);


export default User;