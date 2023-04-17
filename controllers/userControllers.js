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
        name,
        email,
      },
      token,
    });
  } catch (error) {
    res.json({ error: error.message });
  }
};

module.exports = { getAllUsers, registerUser, loginUser };

