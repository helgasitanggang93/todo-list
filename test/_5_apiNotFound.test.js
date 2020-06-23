process.env.NODE_ENV = 'test';
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
chai.use(chaiHttp);
let expect = chai.expect;
const Todo = require('../models/todos.model');

const testCase = {
  negative: {
    invalidAPI: 'As an user, i should got error message when input invalid API'
  }
}

const api = {
  exp: "/api/todos/" 
}

describe("/* API Not Found", () => {
  after(async () => {
    await Todo.deleteMany({})
  })

  it(testCase.negative.invalidAPI, () => {
    chai
    .request(server)
      .put(`${api.exp}`)
      .end((err, res) => {
        expect(res).to.have.status(404)
      })
  }).timeout(10000);
})