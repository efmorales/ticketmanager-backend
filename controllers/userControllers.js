const User = require("../models/User");
const { generateToken, verifyToken } = require("../config/auth");

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

const updateUser = async (req, res) => {};

const verifyUser = async (req, res) => {
  try {
    const { id } = verifyToken(req.header("token"));

    const user = await User.findOne({ _id: id });

    res.json({
      user,
    });
  } catch (error) {
    res.json({
      success: false,
      error,
    });
  }
};

module.exports = {
  getAllUsers,
  registerUser,
  loginUser,
  updateUser,
  verifyUser,
};
