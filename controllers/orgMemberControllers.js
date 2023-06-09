const OrgMember = require("../models/OrgMember");
const User = require("../models/User");

const getAllOrgMembers = async (req, res) => {
  try {
    const allMembers = await OrgMember.find({
      parentOrg: req.params.orgId,
    }).populate("user");

    res.json({
      success: true,
      params: req.params,
      message: "List of all members!",
      members: allMembers,
    });
  } catch (error) {
    res.json({ error: error.message });
  }
};

const registerOrgMember = async (req, res) => {
  try {
    const { orgId, userId } = req.params;
    const exists = await OrgMember.exists({ user: userId }).where({
      parentOrg: orgId,
    });

    if ( exists ) throw Error("User is already registered as a member.");

    const newMember = await OrgMember.register(userId, orgId);

    if (newMember.error) throw Error("Cannot add this member.");

    res.json({
      success: true,
      message: "New member registered!",
      member: newMember,
    });
  } catch (error) {
    res.json({ error: error.message });
  }
};

const getOrgMember = async (req, res) => {
  try {
    const member = await OrgMember.findById(req.params.memberId).populate(
      "user"
    );
    res.send({
      success: true,
      member,
    });
  } catch (error) {
    res.send({
      success: false,
      error: error.message,
    });
  }
};

const updateOrgMember = async (req, res) => {
  try {
    const updatedMember = await OrgMember.findOneAndUpdate(
      { _id: req.params.memberId },
      req.body,
      { new: true, runValidators: true }
    ).lean();

    res.send({
      success: true,
      updatedMember,
    });
  } catch (error) {
    res.send({
      success: false,
      error: error,
    });
  }
};

// TODO:
const verifyOrgMember = async (req, res) => {
  // TODO: This might be better as a middleware
  // try {
  //   const { id } = verifyToken(req.header("token"));
  //   const user = await User.findOne({ _id: id })
  //     .select("_id name email bio")
  //     .lean();
  //   res.json({
  //     user,
  //   });
  // } catch (error) {
  //   res.json({
  //     success: false,
  //     error,
  //   });
  // }
};

// TODO: verify
const searchOrgMembers = async (req, res, next) => {
  try {
    const name = req.query.name;
    const regex = new RegExp(name, "i"); // case-insensitive search
    const members = await OrgMember.find({ name: { $regex: regex } }).exec();
    res.json(members);
  } catch (error) {
    next(error);
  }
};

const deleteOrgMember = async (req, res, next) => {
  const { memberId } = req.params;
  try {
    const deleted = await OrgMember.findByIdAndDelete(memberId);

    res.json({
      success: true,
      deleted,
    });
  } catch (error) {
    res.json({ error: error.message });
  }
};
module.exports = {
  getAllOrgMembers,
  registerOrgMember,
  searchOrgMembers,
  updateOrgMember,
  verifyOrgMember,
  getOrgMember,
  deleteOrgMember,
};
