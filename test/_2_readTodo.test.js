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
    readAllTodo: 'As an user i want to success get All todo',
    readOneTodo: 'As an user i want to success get One todo',
    readEmptyTodo: 'As an user i want to success empty todo'
  },
  negative: {
    invalidId: 'As an user, i should got error message when input invalid Id'
  }
}

const api = {
  readTodo: "/api/todos/" 
}

const mockTodoDummy = {
  firstTodo: {
    title: "test1",
    description:"test me"
  },
  secondTodo: {
    title: "test2",
    description:"kokok"
  }
}

let firstTodo;
let secondTodo;

describe("/GET Todos (3 test cases)", () => {
  before(async () => {
    firstTodo = await mockTodo(mockTodoDummy.firstTodo);
    secondTodo = await mockTodo(mockTodoDummy.secondTodo);
  })
  after(async () => {
    await Todo.deleteMany({})
  })

  it(testCase.positive.readAllTodo, () => {
    chai
    .request(server)
      .get(api.readTodo)
      .end((err, res) => {
        expect(res).to.have.status(200)
      })
  }).timeout(10000);

  it(testCase.positive.readOneTodo, () => {
    chai
    .request(server)
      .get(`${api.readTodo}${firstTodo._id}`)
      .end((err, res) => {
        expect(res).to.have.status(200)
      })
  }).timeout(10000);

  it(testCase.negative.invalidId, () => {
    chai
    .request(server)
      .get(`${api.createTodo}10101010101`)
      .end((err, res) => {
        expect(res).to.have.status(500)
      })
  }).timeout(10000);
})

describe("/GET todos (Empty Todo)", () => {
  after(async () => {
    await Todo.deleteMany({})
  });

  it(testCase.positive.readEmptyTodo, () => {
    chai
    .request(server)
      .get(api.readTodo)
      .end((err, res) => {
        expect(res).to.have.status(200)
      })
  }).timeout(10000);

})