const mongoose = require('mongoose');
const {Schema} = mongoose;

const todoSchema = new Schema({
    title: String,
    description:String,
    status: String,
    due_date: String,
    createdAt: Date,
    updatedAt: Date
});

const Todo = mongoose.model('Todo', todoSchema)
module.exports = Todo;