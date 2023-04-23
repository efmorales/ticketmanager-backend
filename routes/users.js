const express = require("express");
const router = express.Router();

const {
  getAllUsers,
  registerUser,
  loginUser,
  updateUser,
  verifyUser,
} = require("../controllers/userControllers");

router.get("/", getAllUsers);

router.post("/register", registerUser);

router.post("/login", loginUser);

router.put("/user", updateUser);

router.get("/verify-user", verifyUser);

module.exports = router;
