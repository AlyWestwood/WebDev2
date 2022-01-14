const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

const db = require('./models');

// Routers

const todoRouter = require('./routes/todos');
app.use("/todos", todoRouter);

const userRouter = require('./routes/users');
app.use("/auth", userRouter);


db.sequelize.sync();

app.listen(3001, () => {
    console.log("Server running on port 3001");
});
