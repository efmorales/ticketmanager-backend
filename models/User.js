const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema(
  {
    fName: {
      type: String,
      required: true,
    },
    lName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      lowercase: true,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
  { strictQuery: true }
);

// ----- User registration method -----
userSchema.statics.register = async function (newUserData) {
  const { fName, lName, email, password } = newUserData;

  if (!fName || !lName || !email || !password) {
    throw Error("All fields are required.");
  }

  const userExists = await this.findOne({ email });

  if (userExists) {
    throw Error("Email already in use. Try a different one or log in.");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await this.create({
    fName,
    lName,
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

  const user = await this.findOne({ email });

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
