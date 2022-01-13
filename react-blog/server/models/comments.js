module.exports = (Sequelize, DataTypes) => {

    const comments = Sequelize.define("comments", {
        body: {
            type: DataTypes.STRING,
            allowNull: false
        },
        username: {
            type:DataTypes.STRING,
            allowNull: false
        }
    });

    return comments;
}