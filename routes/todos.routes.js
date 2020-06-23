const router = require("express").Router();
const TodoController = require("../controllers/todos.controller");
const TodoValidation = require("../middlewares/todo.validation");

router.post("/", TodoValidation.propertiesValidation, TodoController.create);
router.get("/", TodoController.readAll);
router.get("/:todoId", TodoController.readOne);
router.put("/:todoId", TodoValidation.propertiesValidation, TodoController.update);
router.delete("/:todoId", TodoController.delete);

module.exports = router;
