module.exports = (Sequelize, DataTypes) => {

    const users = Sequelize.define("users", {
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    // users.associate = models => {
    //     users.hasMany(models.entries, {
    //         onDelete: 'cascade'
    //     });
    // }
    return users;
}