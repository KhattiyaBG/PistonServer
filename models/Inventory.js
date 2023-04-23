module.exports = (sequelize, DataTypes) =>{
    const model = sequelize.define('Inventory', 
    {
        itemType: {
            type: DataTypes.STRING(255),
            unique: true
        },
    }, {
        tablename: 'inventory',
        timestamps: false,
    });


    model.associate = models => {
        model.hasMany(models.Items, { foreignKey: 'inventory_id' });
        model.belongsTo(models.user, { foreignKey: 'user_id' });
    };
    return model;
};