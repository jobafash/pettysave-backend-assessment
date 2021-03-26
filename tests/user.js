/* eslint-disable import/extensions */
/* eslint-disable no-undef */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-shadow */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
// Endpoint testing with mocha and chai and chai-http

// Import libraries
import chai from 'chai';
import chaiHttp from 'chai-http';

// Import server
import server from '../index.js';
// use chaiHttp for making the actual HTTP requests
chai.use(chaiHttp);

const should = chai.should();

describe('Users', () => {
  describe('Task API', () => {
    it('should register a new user', () => {
      chai.request(server)
        // register request
        .post('/api/users')
        // send user registration details
        .send({
          first_name: 'John',
          last_name: 'Doe',
          address: '2A, Blue Avenue',
          email: 'test01@gmail.com',
          password: 'tester',
        }) // this is like sending $http.post
        .end(async (err, res) => { // when we get a resonse from the endpoint
          // in other words,
          // the res object should have a status of 201
          res.should.have.status(201);
          await res.body.should.be.a('object');
        });
    });
  });
  // follow up with login
  describe('Task API', () => {
    it('it should log an already registered user in, check token, create a task, get all tasks, and delete a task on /api/tasks/<id>', () => {
      chai.request(server)
        // register request
        .post('/api/users')
        // send user registration details
        .send({
          first_name: 'John',
          last_name: 'Doe',
          address: '2A, Blue Avenue',
          email: 'test02@gmail.com',
          password: 'tester',
        }) // this is like sending $http.post
        .end(async (err, res) => { // when we get a resonse from the endpoint
          // in other words,
          // the res object should have a status of 201
          res.should.have.status(201);
          await res.body.should.be.a('object');
        });
      chai.request(server)
        .post('/api/users/login')
        // send user login details
        .send({
          email: 'test02@gmail.com',
          password: 'tester',
        })
        .end(async (err, res) => {
          await res.body.should.have.property('token');
          const { token } = res.body;

          chai.request(server)
            .post('/api/tasks')
            .set({ Authorization: `Bearer Bearer ${token}` })

            .send({
              title: 'Leisure',
              description: 'Watch football',
              status: 'pending',
            })
            .end(async (err, res) => {
              res.should.have.status(201);
              await res.body.should.be.a('object');
              await res.body.should.have.property('message').eql('Task created');
              await res.body.should.have.property('title');
              await res.body.should.have.property('description');
              await res.body.should.have.property('status');
            });

          // follow up with requesting user protected page
          chai.request(server)
            .get('/api/tasks')
            .set({ Authorization: `Bearer Bearer ${token}` })
            .end((err, res) => {
              chai.request(server)
                .delete(`/api/tasks/${res.body.tasks[0].id}`)
                .set({ Authorization: `Bearer Bearer ${token}` })

                // we set the auth header with our token
                .end(async (error, resonse) => {
                  resonse.should.have.status(200);
                  await resonse.body.should.have.property('message');
                });
            });
        });
    });
  });
});
