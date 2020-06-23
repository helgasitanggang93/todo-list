process.env.NODE_ENV = 'test';
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
chai.use(chaiHttp);
let expect = chai.expect;
const Todo = require('../models/todos.model');

const testCase = {
  positive: {
    createTodo: 'As an user i want to success create todo'
  },
  negative: {
    invalidProperties: 'As an user, i should got error message when input invalid properties'
  }
}

const api = {
  createTodo: "/api/todos/" 
}

const mockTodo = {
  successTodo: {
    title: "test",
    description:"test me"
  },
  invalidTodo: {
    title: "test",
    description:"kokok",
    addition: "addition"
  }
}

describe("/POST Todos", () => {
  after(async () => {
    await Todo.deleteMany({})
  })

  it(testCase.positive.createTodo, () => {
    chai
    .request(server)
      .post(api.createTodo)
      .send(mockTodo.successTodo)
      .end((err, res) => {
        expect(res).to.have.status(201)
      })
  }).timeout(10000);

  it(testCase.negative.invalidProperties, () => {
    chai
    .request(server)
      .post(api.createTodo)
      .send(mockTodo.invalidTodo)
      .end((err, res) => {
        expect(res).to.have.status(400)
      })
  }).timeout(10000);
})