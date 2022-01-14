const express = require('express');
const { validateToken } = require('../misc/authware');
const router = express.Router();
const {todos} = require('../models');

router.get("/", async (req, res) => {
    const ownerId = req.header("ownerId");
    if(ownerId){
        console.log(ownerId)
        const todoList = await todos.findAll({where: {ownerId: ownerId}});
        res.json(todoList);
        console.log(todoList);
    } else {
        res.json("not logged in")
    }
});

router.get("/:id", async (req, res) => {
    const id = req.params.id;
    const todo = await todos.findByPk(id);
    res.json(todo);
});

router.post("/", validateToken, async (req, res) => {
    const todo = req.body;
    todo.ownerId = req.user.id;
    const sendTodo = await todos.create(todo);
    res.json(sendTodo);
});

router.delete("/:id", async (req, res) => {
    const id = req.params.id
    const deleteTodo = await todos.findByPk(id);
    if(!deleteTodo){
        return res.json(false);
    }
    console.log(deleteTodo);
    await deleteTodo.destroy();
    await todos.findByPk(id);
    res.json(true);
    
});

router.patch("/:id", async (req, res) => {
    const id = req.params.id;
    const todo = await todos.findByPk(id);
    todo.isDone = req.isDone;
    await todo.save();
})
module.exports = router;