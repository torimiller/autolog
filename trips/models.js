'use strict';

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const TripSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: [true,'No user id found']},
    tripName: {
        type: String,
        require: true
    },
    flightInfo: {
        boarding: {type: String},
        departure: {type: String},
        arrival: {type: String},
        terminal: {type: String},
        gate: {type: String} 
    },
    hotelInfo: {
        name: {type: String},
        address: {
            building: String,
            street: String,
            zipcode: String
          },
        checkIn: {type: String},
        checkOut: {type: String}
    },
    carRental: {
        name: {type: String},
        confNumber: {type: String}
    },
    activities: [{
        name: {type: String},
        date: {type: Date},
        time: {type: String}
    }]
});


TripSchema.virtual("addressString").get(function() {
    return `${this.address.building} ${this.address.street}`.trim();
  });

  const Trip = mongoose.model('Trip', TripSchema);
  module.exports = {Trip};