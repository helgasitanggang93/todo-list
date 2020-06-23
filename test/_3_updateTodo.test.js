process.env.NODE_ENV = 'test';
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
chai.use(chaiHttp);
let expect = chai.expect;
const Todo = require('../models/todos.model');
const {mockTodo} = require("./testHelper/mockCreateTodo");

const testCase = {
  positive: {
    updateTodo: 'As an user i want to success update todo'
  },
  negative: {
    invalidProperties: 'As an user, i should got error message when input invalid properties',
    invalidId: 'As an user, i should got error message when input invalid Id'
  }
}

const api = {
  updateTodo: "/api/todos/" 
}

const mockTodoDummy = {
  createTodo: {
    title: "test",
    description:"test me"
  },
  updateTodo: {
    title: "test",
    description:"kokok",
    status: true
  },
  invalidTodo: {
    title: "test"
  }
}

let firstTodo;

describe("/PUT Todos", () => {
  before(async () => {
    firstTodo = await mockTodo(mockTodoDummy.createTodo);
  })
  after(async () => {
    await Todo.deleteMany({})
  })

  it(testCase.positive.updateTodo, () => {
    chai
    .request(server)
      .put(`${api.updateTodo}${firstTodo._id}`)
      .send(mockTodoDummy.updateTodo)
      .end((err, res) => {
        expect(res).to.have.status(200)
      })
  }).timeout(10000);

  it(testCase.negative.invalidProperties, () => {
    chai
    .request(server)
      .put(`${api.updateTodo}${firstTodo._id}`)
      .send(mockTodoDummy.invalidTodo)
      .end((err, res) => {
        expect(res).to.have.status(400)
      })
  }).timeout(10000);

  it(testCase.negative.invalidId, () => {
    chai
    .request(server)
      .put(`${api.updateTodo}10101010101`)
      .send(mockTodoDummy.updateTodo)
      .end((err, res) => {
        expect(res).to.have.status(500)
      })
  }).timeout(10000);
})