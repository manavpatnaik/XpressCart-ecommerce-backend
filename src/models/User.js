const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Firstname is required"],
      trim: true,
      minlength: [3, "Firstname must be atleast 3 characters long"],
      maxlength: [20, "Firstname cannot exceed 20 characters"],
    },
    lastName: {
      type: String,
      required: [true, "Lastname is required"],
      trim: true,
      minlength: [3, "Lastname must be atleast 3 characters long"],
      maxlength: [20, "Lastname cannot exceed 20 characters"],
    },
    username: {
      type: String,
      required: [true, "Username is required"],
      trim: true,
      unique: true,
      index: true,
      lowercase: true,
      minlength: [3, "Username must be atleast 3 characters long"],
      maxlength: [20, "Username cannot exceed 20 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      unique: true,
      lowercase: true,
      minlength: [3, "Email must be atleast 3 characters long"],
      maxlength: [20, "Email cannot exceed 20 characters"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be atleast 6 characters long"],
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    contactNumber: {
      type: String,
    },
    profilePicture: {
      type: String,
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  const password = this.password;
  this.password = await bcrypt.hash(password, salt);
});

UserSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`;
});

UserSchema.methods = {
  authenticate: async function (password) {
    const isValid = await bcrypt.compare(password, this.password);
    return isValid;
  },
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
