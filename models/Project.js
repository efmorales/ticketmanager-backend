const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    members: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    tickets: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Ticket'
        }
    ],

    // Add any additional fields after here
}, { timestamps: true });

module.exports = mongoose.model('Project', ProjectSchema);
