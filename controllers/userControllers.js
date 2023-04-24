const User = require("../models/User");
const { generateToken } = require("../config/auth");

const getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find({});

    res.json({
      success: true,
      message: "List of all users!",
      users: allUsers,
    });
  } catch (error) {
    res.json({ error: error.message });
  }
};

const registerUser = async (req, res) => {
  try {
    const { _id, name, email } = await User.register(req.body);

    const token = generateToken(_id);

    res.json({
      success: true,
      message: "New user registered!",
      user: {
        id: _id,
        name,
        email,
      },
      token,
    });
  } catch (error) {
    res.json({ error: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { _id, name, email } = await User.login(req.body);

    const token = generateToken(_id);

    res.json({
      success: true,
      message: "User logged in!",
      user: {
        id: _id,
        name,
        email,
      },
      token,
    });
  } catch (error) {
    res.json({ error: error.message });
  }
};

const searchUsers = async (req, res, next) => {
  try {
    const name = req.query.name;
    const regex = new RegExp(name, "i"); // case-insensitive search
    const users = await User.find({ name: { $regex: regex } }).exec();
    res.json(users);
  } catch (error) {
    next(error);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllUsers, registerUser, loginUser, searchUsers, getUserById };
