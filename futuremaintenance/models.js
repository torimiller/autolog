'use strict';

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

var futureMaintenanceSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: [true,'No user id found']},
    date: {
        type: String
    },
    maintenance: {
        type: String
    },
    details: {
        type: String
    },
    notes: {
        type: String
    }
});

//this refers to the document that came back from the database
futureMaintenanceSchema.methods.serialize = function() {
    return {
        id: this._id,
        date: this.date,
        maintenance: this.maintenance,
        details: this.details,
        notes: this.notes
    };
};

//after creating the schema, create a model off that schema
//call the model method. First pass the name of this model, then the schema that will 
//be used as the blueprint for this model
const FutureMaintenance = mongoose.model('FutureMaintenance', futureMaintenanceSchema);

module.exports = {FutureMaintenance};