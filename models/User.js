
module.exports = (sequelize, DataTypes) => {
    const model = sequelize.define('user', {
        username: {
            type: DataTypes.STRING(255),
            unique: true
        },
        password: {
            type: DataTypes.STRING(255)
        },
        email: {
            type: DataTypes.STRING(100)
        },
        address: {
            type: DataTypes.STRING(100)
        },
        status: {
            type: DataTypes.STRING(100),
        },

    });

    model.associate = models => {
        model.hasMany(models.TodoList, { foreignKey: 'user_id' });
        model.hasOne(models.Inventory, { foreignKey: 'user_id' });
    };

    return model;
};