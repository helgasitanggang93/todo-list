const mongoose = require('mongoose');
const {Schema} = mongoose;

const todoSchema = new Schema({
    title: String,
    description:String,
    status: String,
    createdAt: Date,
    updatedAt: Date
});

const Todo = mongoose.model('Todo', todoSchema)
module.exports = Todo;