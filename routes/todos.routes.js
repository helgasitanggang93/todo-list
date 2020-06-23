const router = require("express").Router();
const TodoController = require("../controllers/todos.controller");
  router.post("/", TodoController.create);
  router.get("/", TodoController.readAll);
  router.get("/:todoId", TodoController.readOne);
  router.put("/:todoId", TodoController.update);
  router.delete("/:todoId", TodoController.delete);
module.exports = router