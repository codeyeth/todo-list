const { Todo } = require("../models");
const { Op } = require("sequelize");

module.exports = {
  status(req, res) {
    res.send({
      message: "hello world TODO!",
    });
  },
  async index(req, res) {
    try {
      const page = parseInt(req.query.page) || 1;
      const pageSize = parseInt(req.query.size) || 10;
      const offset = (page - 1) * pageSize;

      await Todo.findAndCountAll({
        offset: offset,
        limit: pageSize,
        order: [["id", "DESC"]],
      }).then((data) => {
        const count = data.count;
        const totalPages = Math.ceil(count / pageSize);
        const pageData = data.rows;
        res.json({
          page,
          pageSize,
          totalRecords: count,
          totalPages,
          pageData,
        });
      });
    } catch (err) {
      console.log(err);
      res.status(500).send({
        error: "an error has occured trying to fetch the data.",
      });
    }
  },
  async createData(req, res) {
    try {
      const todo = await Todo.create(req.body);
      res.send(todo.toJSON());
    } catch (err) {
      console.log(err);
      res.status(400).send({
        error: "Error occured.",
      });
    }
  },
  async deleteData(req, res) {
    try {
      const { dataId } = req.params;
      const todo = await Todo.findOne({
        where: {
          id: dataId,
        },
      });
      await todo.destroy();
      res.send(todo);
    } catch (err) {
      res.status(500).send({
        error: "an error has occured trying to delete the data",
      });
    }
  },
  async putData(req, res) {
    try {
      await Todo.update(req.body, {
        where: {
          id: req.params.dataId,
        },
      });
      res.send(req.body);
    } catch (err) {
      res.status(500).send({
        error: "an error has occured trying to update the data",
      });
    }
  },
};
