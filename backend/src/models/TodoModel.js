module.exports = (sequelize, DataTypes) => {
  const Todo = sequelize.define(
    "Todo",
    {
      todo_item: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      is_done: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      is_done_at: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    { tableName: "todos", paranoid: true }
  );

  return Todo;
};
