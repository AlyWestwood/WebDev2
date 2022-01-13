const express = require('express');
// const { default: Entry } = require('../../client/src/pages/Entry');
const router = express.Router();
const {entries} = require('../models');

router.get("/", async (req, res) => {
    // res.send("hello world or whatever");
    const entryList = await entries.findAll();
    res.json(entryList);
    console.log(entryList);
});

router.get("/:id", async (req, res) => {
    const id = req.params.id;
    const entry = await entries.findByPk(id);
    res.json(entry);
})

router.post("/", async (req, res) => {
    const entry = req.body;
    await entries.create(entry);
    res.json(entry);
});

module.exports = router;