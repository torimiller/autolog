'use strict';

const chai = require("chai");
const chaiHttp = require("chai-http");
//const faker = require('faker');
const jwt = require('jsonwebtoken');

//const mongoose = require('mongoose');

const expect = chai.expect;

// const {
//     FutureMaintenance
// } = require('../futuremaintenance/models');

// const {
//     CompletedMaintenance
// } = require('../completedmaintenance/models');

const { app, runServer, closeServer } = require("../server");
const { User } = require('../users/models');
const { JWT_SECRET, TEST_DATABASE_URL } = require('../config');

chai.use(chaiHttp);

describe('Protected endpoint', function () {
    const username = 'exampleUser';
    const password = 'examplePass';

  
    before(function () {
      return runServer(TEST_DATABASE_URL);
    });
  
    after(function () {
      return closeServer();
    });
  
    beforeEach(function () {
      return User.hashPassword(password).then(password =>
        User.create({
          username,
          password
        })
      );
    });
  
    afterEach(function () {
      return User.remove({});
    });
  
    describe('/api/futuremaintenance', function () {
      it('Should reject requests with no credentials', function () {
        return chai
          .request(app)
          .get('/api/futuremaintenance')
          .then(() =>
            expect.fail(null, null, 'Request should not succeed')
          )
          .catch(err => {
            if (err instanceof chai.AssertionError) {
              throw err;
            }
  
            const res = err.response;
            expect(res).to.have.status(401);
          });
      });
  
      it('Should reject requests with an invalid token', function () {
        const token = jwt.sign(
          {
            username
          },
          'wrongSecret',
          {
            algorithm: 'HS256',
            expiresIn: '7d'
          }
        );
  
        return chai
          .request(app)
          .get('/api/futuremaintenance')
          .set('Authorization', `Bearer ${token}`)
          .then(() =>
            expect.fail(null, null, 'Request should not succeed')
          )
          .catch(err => {
            if (err instanceof chai.AssertionError) {
              throw err;
            }
  
            const res = err.response;
            expect(res).to.have.status(401);
          });
      });
      it('Should reject requests with an expired token', function () {
        const token = jwt.sign(
          {
            user: {
              username
            },
            exp: Math.floor(Date.now() / 1000) - 10 // Expired ten seconds ago
          },
          JWT_SECRET,
          {
            algorithm: 'HS256',
            subject: username
          }
        );
  
        return chai
          .request(app)
          .get('/api/futuremaintenance')
          .set('authorization', `Bearer ${token}`)
          .then(() =>
            expect.fail(null, null, 'Request should not succeed')
          )
          .catch(err => {
            if (err instanceof chai.AssertionError) {
              throw err;
            }
  
            const res = err.response;
            expect(res).to.have.status(401);
          });
      });
      it('Should send protected data', function () {
        const token = jwt.sign(
          {
            user: {
              username
            }
          },
          JWT_SECRET,
          {
            algorithm: 'HS256',
            subject: username,
            expiresIn: '7d'
          }
        );
  
        return chai
          .request(app)
          .get('/api/futuremaintenance')
          .set('authorization', `Bearer ${token}`)
          .then(res => {
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('object');
            //expect(res.body.data).to.equal('rosebud');
          });
      });
      it('Should send protected data', function () {
        const token = jwt.sign(
          {
            user: {
              username
            }
          },
          JWT_SECRET,
          {
            algorithm: 'HS256',
            subject: username,
            expiresIn: '7d'
          }
        );
  
        return chai
          .request(app)
          .get('/api/completedmaintenance')
          .set('authorization', `Bearer ${token}`)
          .then(res => {
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('object');
            //expect(res.body.data).to.equal('rosebud');
          });
      });
    });
  });