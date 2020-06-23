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
    deleteTodo: 'As an user i want to success delete todo'
  },
  negative: {
    invalidId: 'As an user, i should got error message when input invalid Id'
  }
}

const api = {
  deleteTodo: "/api/todos/" 
}

const mockTodoDummy = {
  createTodo: {
    title: "test",
    description:"test me"
  },
  secondTodo: {
    title: "test",
    description:"kokok",
    status: true
  },
  invalidTodo: {
    title: "test"
  }
}

let firstTodo;
let secondTodo;

describe("/DELETE Todos", () => {
  before(async () => {
    firstTodo = await mockTodo(mockTodoDummy.createTodo);
    secondTodo = await mockTodo(mockTodoDummy.secondTodo);
  })
  after(async () => {
    await Todo.deleteMany({})
  })

  it(testCase.positive.deleteTodo, () => {
    chai
    .request(server)
      .delete(`${api.deleteTodo}${firstTodo._id}`)
      .end((err, res) => {
        expect(res).to.have.status(200)
      })
  }).timeout(10000);

  it(testCase.negative.invalidId, () => {
    chai
    .request(server)
      .delete(`${api.deleteTodo}10101010101`)
      .end((err, res) => {
        expect(res).to.have.status(500)
      })
  }).timeout(10000);
})