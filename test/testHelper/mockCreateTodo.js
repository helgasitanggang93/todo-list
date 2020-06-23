const Todo = require("../../models/todos.model");

const mockTodo = async (mockData) => {
  try {
    const {title, description} = mockData
    const todoModel = {
      title,
      description,
      status: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }

    const createdTodo = await Todo.create(todoModel)
    return createdTodo
  } catch (error) {
    return error.message
  }
}

module.exports = {
  mockTodo
}