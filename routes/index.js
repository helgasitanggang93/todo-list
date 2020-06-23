const router = require("express").Router();
const todoRouter = require("./todos.routes");
const TodoValidation = require("../middlewares/todo.validation");
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

router.use("/todos", todoRouter);
router.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
router.use('*', TodoValidation.apiNotFound);

module.exports = router