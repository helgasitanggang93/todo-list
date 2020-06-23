const router = require("express").Router();
const todoRouter = require("./todos.routes");

router.use("/todos", todoRouter);

module.exports = router