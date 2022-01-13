module.exports = (Sequelize, DataTypes) => {

    const entries = Sequelize.define("entries", {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        body: {
            type: DataTypes.STRING,
            allowNull: false
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    entries.associate = models => {
        entries.hasMany(models.comments, {
            onDelete: 'cascade'
        });
    }
    return entries;
}