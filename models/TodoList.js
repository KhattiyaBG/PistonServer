module.exports = (sequelize, DataTypes) => {
    const model = sequelize.define('TodoList', {
        task: {
            type: DataTypes.STRING(255)
        },
        image: {
            type: DataTypes.STRING
        }
    }, {
        tableName: 'todolists',
        timestamps: false,
    });

    model.associate = models => {
        model.belongsTo(models.user, { foreignKey: 'user_id' });
    };
    return model;
};