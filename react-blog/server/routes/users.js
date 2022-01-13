const express = require('express');
const router = express.Router();
const {users} = require('../models');
const bcrypt = require('bcrypt');
const { sign } = require('jsonwebtoken');
const { validateToken } = require("../middleware/authware");

router.post("/", async (req, res) => {
    const { username, password } = req.body;
    if(!username) {
        res.json("username cannot be null");
        return;
    }
    if(!password) {
        res.json("password cannot be null");
        return;
    }

    bcrypt.hash(password, 10, (err, hash) => {
        users.create({
            username: username,
            password: hash
        });
        res.json(err ? err : "success");
    });
});

router.post("/login", async (req, res) => {
    const {username, password} = req.body;

    const user = await users.findOne({ where: {username: username}});
    if(!user) {
        res.json({error: "Username not found"});
        return;
    }
    if(!password){
        res.json({error: "password required"});
        return;
    }

    bcrypt.compare(password, user.password, (err, match) => {
        if(!match){
            res.json({error: "wrong password"});
            return;
        }

        const accessToken = sign({username: user.username, id: user.id}, 
            "importantsecret"
        );
        res.json(accessToken);
    });
});

router.get("/auth", validateToken, (req, res) => {
    res.json(req.user);
});

module.exports = router;