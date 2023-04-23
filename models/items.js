module.exports = (sequelize, DataTypes) =>{
    const model = sequelize.define('Items', 
    {
        itemName: {
            type: DataTypes.STRING(255),
            unique: true
        },
        description: {
            type: DataTypes.STRING(255)
        },
        price: {
            type: DataTypes.STRING(255)
        },
        image: {
            type: DataTypes.STRING(255)
        }
    }, {
        tablename: 'items',
        timestamps: false,
    });


    model.associate = models => {
        model.belongsTo(models.Inventory, { foreignKey: 'inventory_id' });
    };
    return model;
};