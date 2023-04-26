const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/authenticate");

const {
  getAllUsers,
  registerUser,
  loginUser,
  searchUsers,
  getUserById,
  updateUser,
  verifyUser,
  getUser
} = require("../controllers/userControllers");

router.get("/", getAllUsers);

router.get("/search", authenticate, searchUsers);

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/user/:id", getUser);

router.put("/user", updateUser);

router.get("/verify-user", verifyUser);

router.get("/:id", authenticate, getUserById);

router.put("/user", updateUser);


module.exports = router;
