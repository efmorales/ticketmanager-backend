const express = require("express");
const router = express.Router({ mergeParams: true });
const authenticate = require("../middleware/authenticate");

const {
    createTicket,
    getTicketsByProject,
    getTicketById,
    updateTicket,
    deleteTicket,
    getAssignedTickets,
} = require("../controllers/ticketControllers");


router.post("/", authenticate, createTicket);
router.get("/project/:projectId", authenticate, getTicketsByProject);
router.get("/assigned", authenticate, getAssignedTickets);
router.get("/:ticketId", authenticate, getTicketById);
router.put("/:ticketId", authenticate, updateTicket);
router.delete("/:ticketId", authenticate, deleteTicket);

module.exports = router;