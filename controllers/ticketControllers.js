const Ticket = require("../models/Ticket");
const Project = require("../models/Project");

const createTicket = async (req, res) => {
  try {
    const ticket = new Ticket({ ...req.body, createdBy: req.userId });
    const savedTicket = await ticket.save();

    // Update the project's tickets array
    const project = await Project.findById(ticket.projectId);
    project.tickets.push(savedTicket._id);
    await project.save();

    res.status(201).json({ success: true, ticket: savedTicket });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getTicketsByProject = async (req, res) => {
  try {
    const projectId = req.params.projectId;
    const tickets = await Ticket.find({ projectId }).populate("assignedTo", "name");
    res.json({ success: true, tickets });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getTicketById = async (req, res) => {
  try {
    const ticketId = req.params.ticketId;
    const ticket = await Ticket.findById(ticketId).populate("assignedTo", "name");
    if (!ticket) {
      return res.status(404).json({ error: "Ticket not found" });
    }
    res.json({ success: true, ticket });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateTicket = async (req, res) => {
  try {
    const ticketId = req.params.ticketId;
    const updatedTicket = await Ticket.findByIdAndUpdate(ticketId, req.body, {
      new: true,
      runValidators: true,
    }).populate("assignedTo", "name");

    if (!updatedTicket) {
      return res.status(404).json({ error: "Ticket not found" });
    }
    res.json({ success: true, ticket: updatedTicket });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteTicket = async (req, res) => {
  try {
    const ticketId = req.params.ticketId;
    const deletedTicket = await Ticket.findByIdAndDelete(ticketId);

    if (!deletedTicket) {
      return res.status(404).json({ error: "Ticket not found" });
    }
    // Remove the ticket from the project's tickets array
    const project = await Project.findById(deletedTicket.projectId);
    project.tickets.pull(deletedTicket._id);
    await project.save();
    
    res.json({ success: true, message: "Ticket deleted" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAssignedTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find({ assignedTo: req.userId }).populate("projectId", "name");
    res.json({ success: true, tickets });
  } catch (error) {
    console.error("Error in getAssignedTickets:", error);
    res.status(400).json({ error: error.message });
  }
};


module.exports = {
  createTicket,
  getTicketsByProject,
  getTicketById,
  updateTicket,
  deleteTicket,
  getAssignedTickets,
};