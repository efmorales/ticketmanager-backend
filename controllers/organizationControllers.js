const Organization = require("../models/Organization");
const OrgMember = require("../models/OrgMember");

// // Allow nested routes
// if (!req.body.thingINeed) req.body.thingINeed = req.params.thingINeed
// if (!req.body.otherThingINeed) req.body.otherThingINeed = req.params.otherThingINeed

const getAllOrgs = async (req, res) => {
  try {
    const allOrgs = await Organization.find({});

    res.json({
      success: true,
      message: "List of all organizations!",
      organizations: allOrgs,
    });
  } catch (error) {
    res.json({ error: error.message });
  }
};

const registerOrg = async (req, res) => {
  const { name, owner, description } = req.body;
  try {
    const newOrg = await Organization.register(req.body);

    const newOwnerMember = await OrgMember.register(owner, newOrg._id, "owner");

    newOrg.members = [newOwnerMember];

    newOrg.save();

    if (!newOrg || !newOwnerMember) throw Error("Error!");

    res.json({
      success: true,
      message: "New organization created!",
      organization: newOrg,
      member: newOwnerMember,
    });
  } catch (error) {
    res.json({ error: error.message });
  }
};

const getOrg = async (req, res) => {
  try {
    const organization = await Organization.findById(req.params.orgId);
    res.send({
      success: true,
      organization,
    });
  } catch (error) {
    res.send({
      success: false,
      error: error.message,
    });
  }
};

const updateOrg = async (req, res) => {
  try {
    const updatedOrg = await Organization.findOneAndUpdate(
      { _id: req.params.orgId },
      req.body,
      { new: true }
    ).lean();

    res.send({
      success: true,
      updatedOrg,
    });
  } catch (error) {
    res.send({
      success: false,
      error: error,
    });
  }
};

// TODO: verify
const searchOrgs = async (req, res, next) => {
  try {
    const name = req.query.name;
    const regex = new RegExp(name, "i"); // case-insensitive search
    const organizations = await Organization.find({
      name: { $regex: regex },
    }).exec();
    res.json(organizations);
  } catch (error) {
    res.send({
      success: false,
      error: error,
    });
  }
};

module.exports = {
  getAllOrgs,
  registerOrg,
  searchOrgs,
  updateOrg,
  getOrg,
};
