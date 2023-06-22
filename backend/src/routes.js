const TodoController = require("./controllers/TodoController");

module.exports = (app) => {
  app.post("/status", TodoController.status);
  app.get("/todo", TodoController.index);
  app.post("/create", TodoController.createData);
  app.put("/todo/:dataId", TodoController.putData);
  app.delete("/delete/:dataId", TodoController.deleteData);
};
