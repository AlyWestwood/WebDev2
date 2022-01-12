const express = require('express');
const router = express.Router();
const {entries} = require('../models');

router.get("/", async (req, res) => {
    // res.send("hello world or whatever");
    const entryList = await entries.findAll();
    res.json(entryList);
    console.log(entryList);
});

router.post("/", async (req, res) => {
    const entry = req.body;
    await entries.create(entry);
    res.json(entry);
});

module.exports = router;