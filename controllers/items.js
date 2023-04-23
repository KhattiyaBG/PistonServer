const db = require('../models');
const { Op } = require('sequelize');

const getItems = async (req, res) => {
    const inventory = await db.Inventory.findAll({where: { user_id: req.user.id}});
    let ids = [];
    inventory?.map( (items, index) => {
        ids.push(items.id)
    });

    const items = await db.Items.findAll( { where: { inventory_id : { [Op.in]: ids, }} });
    res.status(200).send({items});
};

const addItems = async (req, res) => {

    const inventory = await db.Inventory.findAll({where: {itemType: req.body.itemType, user_id: req.user.id}});
    const targetItems = await db.Items.findOne({
        where: {
            itemName: req.body.itemName
        }
    });
    if(targetItems){
        res.status(400).send({ message: " itemName already taken" });
    } else if(!inventory[0]?.dataValues.id) {
        res.status(400).send({ message: " Not itemType" });
    } else {
        const newitems = await db.Items.create({
            itemName: req.body.itemName,
            description: req.body.description,
            price: req.body.price,
            image: req.file.path,
            inventory_id: inventory[0]?.dataValues.id
        });
    
        res.status(201).send(newitems);
    }
};

const deleteItems = async (req, res) => {
    const targetId = Number(req.params.id);
    console.log(targetId);
    const targetItems = await db.Items.findOne({where: {id : targetId}});
    if(targetItems){
        await targetItems.destroy();
        res.status(200).send({message: "Delete item successfully"});
    } else {
        res.status(404).send({message: "Todolist Not found"});
    }
};

const updateItems = async (req, res) => {
    const targetTodo = await db.Items.findOne({where: {id : req.body.id}});
    if(targetTodo){
        await targetTodo.update({
            itemName: req.body.itemName,
            description: req.body.description,
            price: req.body.price,
            image: req.file.path,
        });
        res.status(200).send({ message: "updating is success" });
    } else {
        res.status(404).send({ message: "TodoList not found" });
    }
};

module.exports = {
    getItems,
    addItems,
    deleteItems,
    updateItems
};