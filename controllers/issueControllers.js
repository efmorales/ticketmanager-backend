const Issue = require('../models/Issue');

const getOneIssue = async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id);
    res.status(200).json(issue);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllIssues = async (req, res) => {
  try {
    const issues = await Issue.find();
    res.status(200).json(issues);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const newIssue = async (req, res) => {
  try {
    const issue = new Issue(req.body);
    const savedIssue = await issue.save();
    res.status(201).json(savedIssue);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const editOneIssue = async (req, res) => {
  try {
    const updatedIssue = await Issue.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedIssue);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteOneIssue = async (req, res) => {
  try {
    await Issue.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Issue deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
    getOneIssue,
    getAllIssues,
    newIssue,
    editOneIssue,
    deleteOneIssue
};