'use strict';
const express = require('express');
const bodyParser = require('body-parser');

const {CompletedMaintenance} = require('./models');

const router = express.Router();

const jsonParser = bodyParser.json();


//GET scheduled maintenance

router.get('/', (req, res) => {
    CompletedMaintenance
        .find({
            user: req.user._id
        })
        .then(completedmaintenance => {
            res.json({
                completedmaintenance
            });
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({
                message: 'internal server error' 
        });
    });
});

//GET scheduled maintenance by id
router.get('/:id', (req, res) => {
    CompletedMaintenance
        .findById(req.params.id)
        .then(completedmaintenance => {
            if (completedmaintenance) {
                res.json(completedmaintenance)
            } else {
                return res.status(404).send();
            }
        })

        .catch(err => {
            console.error(err);
            res.status(500).json({ 
                message: 'internal server error' 
            });
        });
});

//POST new scheduled maintenance to database
router.post('/', (req, res) => {
    const data = req.body;
    data.user = req.user._id
    CompletedMaintenance
        .create(data)
        .then(completedmaintenanceevent => res.status(201).json(completedmaintenanceevent))
        .catch(err => {
        console.error(err);
        res.status(500).json({ 
            error: 'Something went wrong' 
        });
    });
});

//update completed maintenance in database
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
    CompletedMaintenance
        .findByIdAndUpdate(req.params.id, {
            $set: req.body
        })
        .then(completedmaintenanceevent => res.status(204).end())
        .catch(err => res.status(500).json({
            message: "Internal server error"
        }));
});

// DELETE scheduled maintenance 

router.delete('/:id', (req, res) => {
    CompletedMaintenance.findByIdAndRemove(req.params.id)
        .then(completedmaintenanceevent => res.status(204).end())
        .catch(err => res.status(500).json({
            message: "Internal server error"
        }));
});

module.exports = {router};