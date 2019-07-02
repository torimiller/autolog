'use strict';
const express = require('express');
const bodyParser = require('body-parser');

const {FutureMaintenance} = require('./models');

const router = express.Router();

const jsonParser = bodyParser.json();


//GET scheduled maintenance

router.get('/', (req, res) => {
    FutureMaintenance
        .find({
            user: req.user._id
        })
        .then(futuremaintenance => {
            res.json({
                futuremaintenance
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
    FutureMaintenance
        .findById(req.params.id)
        .then(futuremaintenance => {
            if (futuremaintenance) {
                res.json(futuremaintenance)
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
    FutureMaintenance
        .create(data)
        .then(futuremaintenanceevent => res.status(201).json(futuremaintenanceevent))
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
    FutureMaintenance
        .findByIdAndUpdate(req.params.id, {
            $set: req.body
        })
        .then(futuremaintenanceevent => res.status(204).end())
        .catch(err => res.status(500).json({
            message: "Internal server error"
        }));
});

// DELETE scheduled maintenance 

router.delete('/:id', (req, res) => {
    FutureMaintenance.findByIdAndRemove(req.params.id)
        .then(futuremaintenanceevent => res.status(204).end())
        .catch(err => res.status(500).json({
            message: "Internal server error"
        }));
});

module.exports = {router};