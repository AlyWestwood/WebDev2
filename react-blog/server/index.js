const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

const db = require('./models')

// Routers

const entryRouter = require('./routes/entries');
app.use("/entries", entryRouter);

const commentRouter = require('./routes/comments');
app.use("/comments", commentRouter);

const userRouter = require('./routes/users');
app.use("/auth", userRouter);


db.sequelize.sync();

app.listen(3001, () => {
    console.log("Server running on port 3001");
});



