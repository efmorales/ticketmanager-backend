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
    issues: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Issue'
        }
    ],

    // Add any additional fields after here
}, { timestamps: true });

module.exports = mongoose.model('Project', ProjectSchema);
