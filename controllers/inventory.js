const db = require('../models');

const getInventory = async (req, res) => {
    const inventory = await db.Inventory.findAll({where: {user_id: req.user.id}});
    res.status(200).send(inventory);
};

const addInventory = async (req, res) => {
    const newInventory = await db.Inventory.create({
        itemType: req.body.itemType,
        user_id: req.user.id
    });

    res.status(201).send(newInventory);
};

const deleteInventory = async (req, res) => {
    const targetId = Number(req.params.id);
    const targetToDelete = await db.Inventory.findOne({where: {id : targetId}});
    if(targetToDelete){
        await targetToDelete.destroy();
        res.status(204).send();
    } else {
        res.status(404).send({message: "Todolist Not found"});
    }
};

const updateInventory = async (req, res) => {
    const targetupdate = await db.Inventory.findOne({where: {id : req.body.id, user_id: req.user.id}});
    if(targetupdate){
        await targetupdate.update({
            itemType: req.body.itemType,
        });
        res.status(200).send({ message: "updating is success" });
    } else {
        res.status(404).send({ message: "TodoList not found" });
    }
};

module.exports = {
    getInventory,
    addInventory,
    deleteInventory,
    updateInventory
};