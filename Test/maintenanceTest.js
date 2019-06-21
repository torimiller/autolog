const chai = require("chai");
const chaiHttp = require("chai-http");
const faker = require('faker');
const mongoose = require('mongoose');

const expect = chai.expect;

const {
    Trip
} = require('../trips/models');

const {
    app,
    runServer,
    closeServer
} = require("../server");
const {
    TEST_DATABASE_URL
} = require('../config');

chai.use(chaiHttp);

function seedTripData() {
    console.info('seeding trip data');
    const seedData = [];
    for (let i = 1; i < 10; i++) {
        seedData.push({
            tripName: faker.name.findName(),
            flightInfo: {
                boarding: "1:00 pm",
                departure: "3:00 pm",
                arrival: "6:00 pm",
                terminal: "H",
                gate: "5"
            },
            hotelInfo: {
                name: faker.name.findName(),
                address: {
                    building: faker.address.streetAddress(),
                    street: faker.address.streetName(),
                    zipcode: faker.address.zipCode()
                },
                checkIn: "4:00 pm",
                checkOut: "11:00 am"

            },
            carRental: {
                name: faker.name.findName(),
                confNumber: faker.random.number()

            }

        });
    }
    return Trip.insertMany(seedData);
}

function tearDownDb() {
    return new Promise((resolve, reject) => {
        console.warn('Deleting database');
        mongoose.connection.dropDatabase()
            .then(result => resolve(result))
            .catch(err => reject(err));
    });
}


describe('Trip Logger API resource', function () {
    before(function () {
        return runServer(TEST_DATABASE_URL);
    });
    beforeEach(function () {
        return seedTripData();
    });
    afterEach(function () {
        return tearDownDb();
    });
    after(function () {
        return closeServer();
    });

    describe('GET endpoint', function () {


        it('it should list all existing trips', function () {
            let res;
            return chai.request(app)
                .get('/api/trips')
                .then(_res => {
                    res = _res;
                    res.should.have.status(200);
                    res.body.should.have.lengthOf.at.least(1);

                    return Trip.count();
                })
                .then(count => {
                    res.body.should.have.lengthOf(count);
                });
        });
    });
    describe('POST endpoint', function () {
        // strategy: make a POST request with data,
        // then prove that the post we get back has
        // right keys, and that `id` is there (which means
        // the data was inserted into db)
        it('should add a new trip', function () {

            const newTrip = {
                tripName: faker.name,
                flightInfo: {
                    boarding: "1:00 pm",
                    departure: "3:00 pm",
                    arrival: "6:00 pm",
                    terminal: "H",
                    gate: "5"
                },
                hotelInfo: {
                    name: faker.name,
                    address: {
                        building: faker.address.streetAddress,
                        street: faker.address.streetName,
                        zipcode: faker.address.zipCode
                    },
                    checkIn: "4:00 pm",
                    checkOut: "11:00 am"

                },
                carRental: {
                    name: faker.name,
                    confNumber: faker.number

                }
            };

            return chai.request(app)
                .post('/api/trips')
                .send(newTrip)
                .then(function (res) {
                    res.should.have.status(201);
                    res.should.be.json;
                    res.body.should.be.a('object');
                    res.body.should.include.keys('tripName');
                    res.body.id.should.not.be.null;
                    res.body.content.should.equal(newTrip.content);
                    return Trip.findById(res.body.id);
                })
                .then(function (post) {
                    trip.content.should.equal(newTrip.content);
                });
        });
    });

    describe('PUT endpoint', function () {

        it('should update fields you send over', function () {
            const updateData = {
                tripName: 'cats cats cats',
                flightInfo: {
                    boarding: "2:00 pm",
                    departure: "3:00 pm",
                    arrival: "11:00 pm",
                    terminal: "D",
                    gate: "9"
                },
            };

            return Trip
                .findOne()
                .then(trip => {
                    updateData.id = trip.id;

                    return chai.request(app)
                        .put(`api/trips${trip.id}`)
                        .send(updateData);
                })
                .then(res => {
                    res.should.have.status(204);
                    return Trip.findById(updateData.id);
                })
                .then(post => {
                    post.tripname.should.equal(updateData.tripName);
                    post.content.should.equal(updateData.content);
                });
        });
    });

    describe('DELETE endpoint', function () {
        it('should delete a post by id', function () {

            let trip;

            return blogPost
                .findOne()
                .then(_trip => {
                    trip = _trip;
                    return chai.request(app).delete(`/posts/${trip.id}`);
                })
                .then(res => {
                    res.should.have.status(204);
                    return Trip.findById(trip.id);
                })
                .then(_trip => {
                    should.not.exist(_trip);
                });
        });
    });

});