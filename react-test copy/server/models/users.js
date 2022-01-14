module.exports = (Sequelize, DataTypes) => {

    const users = Sequelize.define("users", {
        email: {
            type: DataTypes.STRING(360),
            allowNull: false
        },
        password: {
            type: DataTypes.STRING(60),
            allowNull: false
        }
    });

    users.associate = models => {
        users.hasMany(models.todos, {
            onDelete: 'cascade',
            foreignKey: 'ownerId'
        });
    }
    return users;
}