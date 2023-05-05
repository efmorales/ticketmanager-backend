const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      lowercase: true,
      required: true,
      unique: true,
      validate: [isEmail, "Please enter a valid email"],
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    bio: String,
  },
  { timestamps: true },
  { strictQuery: true }
);

// ----- User registration method -----
userSchema.statics.register = async function (newUserData) {
  const { name, email, password } = newUserData;

  if (!name || !email || !password) {
    throw Error("All fields are required.");
  }

  const userExists = await this.findOne({ email });

  if (userExists) {
    throw Error("Email already in use.");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await this.create({
    name,
    email,
    password: hashedPassword,
  });

  return newUser;
};


// ----- User login method -----
userSchema.statics.login = async function (userData) {
  const { email, password } = userData;

  if (!email || !password) {
    throw Error("All fields are required.");
  }

  const user = await this.findOne({ email }).select("+password");

  if (!user) {
    throw Error("That email is not registered.");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error("Invalid password.");
  }

  return user;
};

module.exports = mongoose.model("User", userSchema);
