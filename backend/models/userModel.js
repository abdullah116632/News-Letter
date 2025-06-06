import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    img: {
      type: String,
      required: [true, "profile img is required"],
      default: "/images/userprofile.png",
    },
    fullName: {
      type: String,
      required: [true, "name is required"],
      maxlength: [20, "name cannot exceed 20 characters"],
    },
    profession: {
      type: String,
    },
    occupation: {
      type: String,
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
    institute: {
      type: String,
    },
    fieldOfStudy: {
      type: [String],
      default: []
    },
    interests: {
      type: [String], // Array of strings
      default: [],
    },
    priorResearchExperience: {
      type: Boolean,
      default: null,
    },
    englishProficiency: {
      type: Boolean,
      default: null,
    },
    preferredDegree: {
      type: String,
    },
    countrypreference: {
      type: [String],
      default: [],
    },
    internshipJobPreferences: {
      type: [String],
      default: []
    },
    preferredFieldsofOpportunity: {
      type: [String],
      default: []
    },
    skills: {
      type: [String],
      default: [],
    },
    isVerified: {
      type: Boolean,
      default: false
    },
    isAdded: {
      type: Boolean,
      default: false
    },
    isAdmin : {
      type: Boolean,
      default: false
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function(next){
    if (!this.isModified('password')) {
        return next();
      }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    this.confirmPassword = undefined;

    next()
})

userSchema.pre(/^find/, function(next){
    this.find({active: {$ne: false}})

    next()
})


const User = mongoose.model("User", userSchema);

export default User;
