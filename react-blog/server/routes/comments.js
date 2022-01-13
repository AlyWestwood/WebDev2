const express = require('express');
const router = express.Router();
const { comments } = require('../models');
const {validateToken} = require('../middleware/authware')

router.get("/:entryId", async (req, res) => {
    const entryId = req.params.entryId;
    const commentList = await comments.findAll({ where: { entryId: entryId } });
    res.json(commentList);
  });
  
router.post("/", validateToken, async (req, res) => {
const comment = req.body;
const username = req.user.username;
comment.username = username;
const sendcomment = await comments.create(comment);
res.json(sendcomment);
});
  
  module.exports = router;