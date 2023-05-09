const express = require("express");
const router = express.Router({mergeParams: true});

const {
  getAllOrgMembers,
  registerOrgMember,
  searchOrgMembers,
  updateOrgMember,
  getOrgMember,
  deleteOrgMember,
} = require("../controllers/orgMemberControllers");

router.get("/", getAllOrgMembers);

router.post("/:userId", registerOrgMember);

router.get("/search", searchOrgMembers);

router.get("/:memberId", getOrgMember);

router.put("/:memberId", updateOrgMember);

router.delete("/:memberId", deleteOrgMember);

module.exports = router;
