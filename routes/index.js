const router = require("express").Router();
const todoRouter = require("./todos.routes");
const TodoValidation = require("../middlewares/todo.validation");

router.use("/todos", todoRouter);
router.use('*', TodoValidation.apiNotFound);

module.exports = router