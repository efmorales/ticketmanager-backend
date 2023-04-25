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
    const { _id, name, email, bio } = await User.login(req.body);

    const token = generateToken(_id);

    res.json({
      success: true,
      message: "User logged in!",
      user: {
        id: _id,
        name,
        email,
        bio,
      },
      token,
    });
  } catch (error) {
    res.json({ error: error.message });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.send({
      success: true,
      user,
    });
  } catch (error) {
    res.send({
      success: false,
      error: error.message,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findOneAndUpdate(
      { _id: req.body.id },
      req.body.updates,
      { new: true }
    )
      .select("_id name email bio")
      .lean();

    res.send({
      success: true,
      updatedUser,
    });
  } catch (error) {
    res.send({
      success: false,
      error: error,
    });
  }
};

const verifyUser = async (req, res) => {
  try {
    const { id } = verifyToken(req.header("token"));

    const user = await User.findOne({ _id: id })
      .select("_id name email bio")
      .lean();

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
  getUser,
};
