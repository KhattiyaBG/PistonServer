const db = require('../models');

const getTodoList = async (req, res) => {
    // const todoList = await db.TodoList.findAll({where: {user_id: req.user.id}});
    res.status(200).send("Test Success");
};

const addTodoList = async (req, res) => {
    const newTodo = await db.TodoList.create({
        task: req.body.task,
        image: req.file.path,
        user_id: req.user.id
    });

    res.status(201).send(newTodo);
};

const deleteTodoList = async (req, res) => {
    const targetId = Number(req.params.id);
    const targetTodo = await db.TodoList.findOne({where: {id : targetId, user_id: req.user.id}});
    if(targetTodo){
        await targetTodo.destroy();
        res.status(204).send();
    } else {
        res.status(404).send({message: "Todolist Not found"});
    }
};

const updateTodoList = async (req, res) => {
    const targetTodo = await db.TodoList.findOne({where: {id : req.body.id, user_id: req.user.id}});
    if(targetTodo){
        await targetTodo.update({
            task: req.body.task,
            image: req.file.path,
        });
        res.status(200).send({ message: "updating is success" });
    } else {
        res.status(404).send({ message: "TodoList not found" });
    }
};

module.exports = {
    getTodoList,
    addTodoList,
    deleteTodoList,
    updateTodoList
};