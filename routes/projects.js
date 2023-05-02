const express = require("express");
const router = express.Router({mergeParams: true});
const authenticate = require("../middleware/authenticate");

const {
    getOneProject,
    getAllProjects,
    newProject,
    editOneProject,
    deleteOneProject,
    getProjectMembers
} = require("../controllers/projectControllers");

router.get("/", authenticate, getAllProjects);
router.get("/:id/members", authenticate, getProjectMembers);
router.get("/:id", authenticate, getOneProject);
router.post("/", authenticate, newProject);
router.put("/:id", authenticate, editOneProject);
router.delete("/:id", authenticate, deleteOneProject);

module.exports = router;