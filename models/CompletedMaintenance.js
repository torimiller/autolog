const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CompletedMaintenanceSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    maintenanceType: {
        type: String,
        // required: true
    },
    date: {
        type: Date,
        // required: true
    },
    notes: {
        type: String,
        // required: true
    }
});

module.exports = Post = mongoose.model('completedMaintenance', CompletedMaintenanceSchema);