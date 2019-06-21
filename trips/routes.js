'use strict';
const express = require('express');
const bodyParser = require('body-parser');


const {
    Trip
} = require('./models');

const router = express.Router();

const jsonParser = bodyParser.json();

//GET Trips 

router.get('/', (req, res) => {
    // console.log(req.user);
    Trip
        .find({
            user: req.user._id
        })
        .then(trips => {
            res.json({
                trips
            });
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({
                message: "Internal server error"
            });
        });
});

// GET by Id 

router.get('/:id', (req, res) => {
    Trip
        .findById(req.params.id)
        .then(trip => {
            if (trip) {
                res.json(trip)
            } else {
                return res.status(404).send();
            }
        })

        .catch(err => {
            console.error(err);
            res.status(500).json({
                message: "Internal server error"
            });
        });
});

//POST Trip

router.post('/', (req, res) => {
    const requiredField = ['tripName'];
    for (let i = 0; i < requiredField.length; i++) {
        const field = requiredField[i];
        if (!(field in req.body)) {
            const message = `Missing \`${field}\` in request form`;
            alert(message);
            console.error(message);
            return res.status(400).send(message);
        }
    }
    const data = req.body;
    data.user = req.user._id
    Trip
        .create(data)
        .then(trip => res.status(201).json(trip))
        .catch(err => {
            console.error(err);
            res.status(500).json({
                error: 'Something went wrong'
            });
        });
});

//PATCH Trip

router.put('/:id', (req, res) => {
    // ensure that the id in the request path and the one in request body match
    if (!(req.params.id && req.body.id && req.params.id === req.body.id)) {
        const message =
            `Request path id (${req.params.id}) and request body id ` +
            `(${req.body._id}) must match`;
        console.error(message);
        return res.status(400).json({
            message: message
        });
    }
    Trip
        .findByIdAndUpdate(req.params.id, {
            $set: req.body
        })
        .then(trip => res.status(204).end())
        .catch(err => res.status(500).json({
            message: "Internal server error"
        }));
});

// DELETE Trip 

router.delete('/:id', (req, res) => {
    Trip.findByIdAndRemove(req.params.id)
        .then(blogPost => res.status(204).end())
        .catch(err => res.status(500).json({
            message: "Internal server error"
        }));
});


module.exports = {
    router
};