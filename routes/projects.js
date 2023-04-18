const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/authenticate");

const {
    getOneProject,
    getAllProjects,
    newProject,
    editOneProject,
    deleteOneProject
} = require("../controllers/projectControllers");

router.get("/", authenticate, getAllProjects);
router.get("/:id", authenticate, getOneProject);
router.post("/", authenticate, newProject);
router.put("/:id", authenticate, editOneProject);
router.delete("/:id", authenticate, deleteOneProject);

module.exports = router;