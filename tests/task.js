/* eslint-disable comma-dangle */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-tabs */
/* eslint-disable no-undef */

// Require the dev-dependencies
import chai from 'chai';
import chaiHttp from 'chai-http';

import Task from '../models/taskModel.js';
import User from '../models/userModel.js';

import server from '../index.js';

const should = chai.should();

chai.use(chaiHttp);

// Our parent block
describe('Tasks', () => {
  beforeEach(() => { // Before each test we empty the database
    Task.deleteMany({}, (err) => {

    });
  });
  beforeEach(() => { // before each test we empty the database
    User.deleteMany({}, (err) => {

    });
  });
  /*
  * Test the /GET route
  */
  describe('/GET task', () => {
	  it('it should authenticate and GET all the tasks', () => {
      after(() => {
        chai.request(server)
        // register request
          .post('/api/users')
        // send user registration details
          .send({
            first_name: 'John',
            last_name: 'Doe',
            address: '2A, Blue Avenue',
            email: 'testing@gmail.com',
            password: 'tester',
          }) // this is like sending $http.post
          .end((err, res) => { // when we get a resonse from the endpoint
          // in other words,
          // the res object should have a status of 201
            res.should.have.status(201);
            res.body.should.be.a('object');
          });
      });
      chai.request(server)
        .post('/api/users/login')
        // send user login details
        .send({
          email: 'testing@gmail.com',
          password: 'tester',
        })
        .end((err, res) => {
          res.body.should.have.property('token');
          const { token } = res.body;
          chai.request(server)
		    .get('/api/tasks')
            .set({ Authorization: `Bearer Bearer ${token}` })
		    .end((err, res) => {
			  	res.should.have.status(200);
			  	res.body.tasks.should.be.a('array');
			  	res.body.tasks.length.should.be.eql(0);
		    });
        });
	  });
  });
  /*
  * Test the /POST route
  */
  describe('/POST task', () => {
	  it('it should authenticate and not POST a task without title field', () => {
      after(() => {
        chai.request(server)
        // register request
          .post('/api/users')
        // send user registration details
          .send({
            first_name: 'John',
            last_name: 'Doe',
            address: '2A, Blue Avenue',
            email: 'testing@gmail.com',
            password: 'tester',
          }) // this is like sending $http.post
          .end((err, res) => { // when we get a resonse from the endpoint
          // in other words,
          // the res object should have a status of 201
            res.should.have.status(201);
            res.body.should.be.a('object');
          });
      });
      chai.request(server)
        .post('/api/users/login')
        // send user login details
        .send({
          email: 'testing@gmail.com',
          password: 'tester',
        })
        .end((err, res) => {
          res.body.should.have.property('token');
          const { token } = res.body;
          const task = {
            description: 'Watch a movie',
            status: 'pending',
          };
          chai.request(server)
            .post('/api/tasks')
            .set({ Authorization: `Bearer Bearer ${token}` })
            .send(task)
            .end((err, res) => {
              res.should.have.status(500);
              res.body.should.be.a('object');
              res.body.should.have.property('error');
            });
        });
	  });
	  it('it should authenticate and POST a task ', () => {
      after(() => {
        chai.request(server)
        // register request
          .post('/api/users')
        // send user registration details
          .send({
            first_name: 'John',
            last_name: 'Doe',
            address: '2A, Blue Avenue',
            email: 'testing@gmail.com',
            password: 'tester',
          }) // this is like sending $http.post
          .end((err, res) => { // when we get a resonse from the endpoint
          // in other words,
          // the res object should have a status of 201
            res.should.have.status(201);
            res.body.should.be.a('object');
          });
      });
      chai.request(server)
        .post('/api/users/login')
        // send user login details
        .send({
          email: 'testing@gmail.com',
          password: 'tester',
        })
        .end((err, res) => {
          res.body.should.have.property('token');
          const { token } = res.body;
          const task = {
            title: 'Leisure',
            description: 'Watch football',
            status: 'pending',
          };
          chai.request(server)
            .post('/api/tasks')
            .set({ Authorization: `Bearer Bearer ${token}` })
            .send(task)
            .end((err, res) => {
              res.should.have.status(201);
              res.body.should.be.a('object');
              res.body.should.have.property('message').eql('Task created');
              res.body.should.have.property('title');
              res.body.should.have.property('description');
              res.body.should.have.property('status');
            });
        });
	  });
  });
  /*
  * Test the /GET/:id route
  */
  describe('/GET/:id task', () => {
	  it('it should authenticate and GET a task by the given id', () => {
      after(() => {
        chai.request(server)
        // register request
          .post('/api/users')
        // send user registration details
          .send({
            first_name: 'Joe',
            last_name: 'Doe',
            address: '2A, Blue Avenue',
            email: 'testing1@gmail.com',
            password: 'tester',
          }) // this is like sending $http.post
          .end((err, res) => { // when we get a resonse from the endpoint
          // in other words,
          // the res object should have a status of 201
            res.should.have.status(201);
            res.body.should.be.a('object');
          });
      });
      chai.request(server)
        .post('/api/users/login')
        // send user login details
        .send({
          email: 'testing1@gmail.com',
          password: 'tester',
        })
        .end((err, res) => {
          res.body.should.have.property('token');
          const { token } = res.body;
          const task = new Task({
            title: 'Laundry', description: 'Clean the rugs and chairs'
          });
          task.save((err, task) => {
            chai.request(server)
              .get(`/api/tasks/${task.id}`)
              .set({ Authorization: `Bearer Bearer ${token}` })
              .send(task)
              .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('title');
                res.body.should.have.property('description');
                res.body.should.have.property('status');
                res.body.should.have.property('id').eql(task.id);
              });
          });
        });
	  });
  });
  /*
  * Test the /PUT/:id route
  */
  describe('/PUT/:id task', () => {
	  it('it should authenticate and UPDATE a task given the id', () => {
      after(() => {
        chai.request(server)
        // register request
          .post('/api/users')
        // send user registration details
          .send({
            first_name: 'Jan',
            last_name: 'Doe',
            address: '2A, Blue Avenue',
            email: 'testing2@gmail.com',
            password: 'tester',
          }) // this is like sending $http.post
          .end((err, res) => { // when we get a resonse from the endpoint
          // in other words,
          // the res object should have a status of 201
            res.should.have.status(201);
            res.body.should.be.a('object');
          });
      });
      chai.request(server)
        .post('/api/users/login')
        // send user login details
        .send({
          email: 'testing2@gmail.com',
          password: 'tester',
        })
        .end((err, res) => {
          res.body.should.have.property('token');
          const { token } = res.body;
          const task = new Task({
            title: 'Laundry', description: 'Clean the rugs and chairs'
          });
          task.save((err, task) => {
            chai.request(server)
              .put(`/api/tasks/${task.id}`)
              .set({ Authorization: `Bearer Bearer ${token}` })
              .send({
                title: 'Laundry', description: 'Clean the rug and chairs', status: 'completed',
              })
              .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.task.should.have.property('status').eql('completed');
              });
          });
        });
	  });
  });
  /*
  * Test the /DELETE/:id route
  */
  describe('/DELETE/:id task', () => {
	  it('it should authenticate and DELETE a task given the id', () => {
      after(() => {
        chai.request(server)
        // register request
          .post('/api/users')
        // send user registration details
          .send({
            first_name: 'Jane',
            last_name: 'Doe',
            address: '2A, Blue Avenue',
            email: 'testing3@gmail.com',
            password: 'tester',
          }) // this is like sending $http.post
          .end((err, res) => { // when we get a resonse from the endpoint
          // in other words,
          // the res object should have a status of 201
            res.should.have.status(201);
            res.body.should.be.a('object');
          });
      });
      chai.request(server)
        .post('/api/users/login')
        // send user login details
        .send({
          email: 'testing3@gmail.com',
          password: 'tester',
        })
        .end((err, res) => {
          res.body.should.have.property('token');
          const { token } = res.body;
          const task = new Task({
            title: 'Laundry', description: 'Clean the rugs and chairs'
          });
          task.save((err, task) => {
            chai.request(server)
              .delete(`/api/tasks/${task.id}`)
              .set({ Authorization: `Bearer Bearer ${token}` })
              .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('message').eql('Task removed');
              });
          });
        });
	  });
  });
});
