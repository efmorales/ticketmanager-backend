const express = require("express");
const router = express.Router({mergeParams: true});

const {
  getAllOrgMembers,
  registerOrgMember,
  searchOrgMembers,
  updateOrgMember,
  getOrgMember,
} = require("../controllers/orgMemberControllers");

router.get("/", getAllOrgMembers);

router.post("/", registerOrgMember);

router.get("/search", searchOrgMembers);

router.get("/:memberId", getOrgMember);

router.put("/:memberId", updateOrgMember);

module.exports = router;
