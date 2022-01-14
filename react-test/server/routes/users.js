const express = require('express');
const router = express.Router();
const {users} = require('../models');
const bcrypt = require('bcrypt');
const { sign } = require('jsonwebtoken');
const { validateToken } = require("../misc/authware");

router.post("/", async (req, res) => {
    const { email, password } = req.body;
    if(!email) {
        res.json("email cannot be null");
        return;
    }
    if(!password) {
        res.json("password cannot be null");
        return;
    }

    bcrypt.hash(password, 10, (err, hash) => {
        users.create({
            email: email,
            password: hash
        });
        res.json(err ? err : "success");
    });
});

router.post("/login", async (req, res) => {
    const {email, password} = req.body;

    const user = await users.findOne({ where: {email: email}});
    if(!user) {
        res.json({error: "email not found"});
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

        const accessToken = sign({email: user.email, id: user.id}, 
            "supersecretsecret"
        );
        res.json(accessToken);
    });
});

router.get("/", validateToken, (req, res) => {
    res.json(req.user);
});

module.exports = router;