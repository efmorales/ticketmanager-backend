const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/authenticate");

const {
  getAllUsers,
  registerUser,
  loginUser,
  searchUsers,
  getUserById,
} = require("../controllers/userControllers");

router.get("/", getAllUsers);

router.get("/search", authenticate, searchUsers);

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/:id", authenticate, getUserById);


module.exports = router;
