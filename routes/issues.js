const express = require("express");
const router = express.Router();

const {
    getOneIssue,
    getAllIssues,
    newIssue,
    editOneIssue,
    deleteOneIssue
} = require("../controllers/issueControllers");

router.get("/", getAllIssues);
router.get("/:id", getOneIssue);
router.post("/", newIssue);
router.put("/:id", editOneIssue);
router.delete("/:id", deleteOneIssue);

module.exports = router;