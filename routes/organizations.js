const express = require("express");
const router = express.Router();

// const orgMembersRouter = require("./orgMembers");

const {
  getAllOrgs,
  registerOrg,
  searchOrgs,
  updateOrg,
  getOrg,
} = require("../controllers/organizationControllers");

router.get("/", getAllOrgs);

router.post("/", registerOrg);

router.get("/search", searchOrgs);

router.get("/:orgId", getOrg);

router.put("/:orgId", updateOrg);



module.exports = router;
