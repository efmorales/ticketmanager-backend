const Project = require('../models/Project');

const getOneProject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        res.status(200).json(project);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAllProjects = async (req, res, next) => {
    try {
    if (req.params.orgId) {
        const projects = await Project.find({
            organizationRef: req.params.orgId,
        }).exec();
        
        res.json(projects);
    } else {
        // Find projects where the user is a team member
        const projects = await Project.find({ members: req.userId }).exec();

        res.json(projects);
    }
    } catch (error) {
        next(error);
    }
};

const newProject = async (req, res) => {
    try {
        const { name, description, members } = req.body;
        const createdBy = req.userId; // Get the user ID from the request object

        // Check if the members array exists in the request body
        const combinedMembers = members
            ? [...new Set([...members, createdBy])] // Combine the existing members array with the createdBy user ID
            : [createdBy]; // Create a new array containing just the createdBy user ID
        
        const { orgId } = req.params;
        const organizationRef = orgId ? orgId : "";

        const project = new Project({
            name,
            description,
            createdBy,
            members: combinedMembers, // Set the members array to the combined array
            organizationRef,
        });


        const savedProject = await project.save();
        res.status(201).json(savedProject);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const editOneProject = async (req, res) => {
    try {
        const updatedProject = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedProject);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteOneProject = async (req, res) => {
    try {
        await Project.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Project deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getProjectMembers = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id).populate("members");
    
        if (!project) {
          return res.status(404).json({ success: false, error: "Project not found" });
        }
    
        res.status(200).json({ success: true, members: project.members });
      } catch (error) {
        res.status(500).json({ success: false, error: "Internal Server Error" });
      }
};

module.exports = {
    getOneProject,
    getAllProjects,
    newProject,
    editOneProject,
    deleteOneProject,
    getProjectMembers
};