const express = require("express");
const router = express.Router();

const {
    getOneProject,
    getAllProjects,
    newProject,
    editOneProject,
    deleteOneProject
} = require("../controllers/projectControllers");

router.get("/", getAllProjects);
router.get("/:id", getOneProject);
router.post("/", newProject);
router.put("/:id", editOneProject);
router.delete("/:id", deleteOneProject);

module.exports = router;