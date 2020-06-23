const Todo = require("../models/todos.model");
const {httpStatusCodes} = require("../helpers/httpStatusCode");
const {messageHandler} = require("../helpers/messageHandler");
const path = require('path');
class TodoController {

  static async create(req, res, next){
    try {
      const {title, description} = req.body
      const createdTodo = await Todo.create({
        title,
        description,
        status: false,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      res.status(201).json({
        data: createdTodo,
        message: messageHandler.todo.successCreated
      });
    } catch (error) {
      next(error)
    }
  }

  static async readAll(req, res, next){
    try {
      const allTodos = await Todo.find();
      if(allTodos.length === 0){
       return res.status(httpStatusCodes._200_OK.code).json({
         data: null,
         message: messageHandler.todo.dataEmpty
       });
      }

      return res.status(httpStatusCodes._200_OK.code).json({
        data: allTodos,
        message: messageHandler.todo.successDataRetrieve
      });
    } catch (error) {
      next(error)
    }
  }

  static async readOne(req, res, next){
    try {
      const {todoId} = req.params;
      const oneTodo = await Todo.findOne({_id:todoId});
      return res.status(httpStatusCodes._200_OK.code).json({
        data: oneTodo,
        message: messageHandler.todo.successDataRetrieve
      });
    } catch (error) {
      next(error)
    }
  }

  static async update(req, res, next){
    try {
      const {todoId} = req.params;
      const {title, description, status} = req.body;
      const findTodo = await Todo.findOne({_id: todoId});
      if(!findTodo){
        throw ({status: httpStatusCodes._404_NOT_FOUND.code, 
          message: httpStatusCodes._404_NOT_FOUND.msg});
      }
      findTodo.title = title;
      findTodo.description = description;
      findTodo.status = status;
      findTodo.updatedAt = new Date();
      await findTodo.save();
      return res.status(httpStatusCodes._200_OK.code).json({
        data: findTodo,
        message: messageHandler.todo.updatedData
      });
    } catch (error) {
      next(error)
    }
  }

  static async delete(req, res, next){
    try {
      const {todoId} = req.params;
      const deletedData = await Todo.findOneAndDelete({_id: todoId});
      res.status(httpStatusCodes._200_OK.code).json({
        data: deletedData,
        message: messageHandler.todo.deletedData
      })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = TodoController;