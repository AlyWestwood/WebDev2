module.exports = (Sequelize, DataTypes) => {

    const todos = Sequelize.define("todos", {
        task: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        dueDate: {
            type: DataTypes.DATE,
            allowNull: false
        },
        isDone: {
            type: DataTypes.BOOLEAN
        }
    });
    return todos;
}