const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TicketSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,

  },
  status: {
    type: String,
    enum: ['open', 'in_progress', 'closed'],
    default: 'open'
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  assignedTo: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  // Add any additional fields after here
}, { timestamps: true });

module.exports = mongoose.model('Ticket', TicketSchema);
