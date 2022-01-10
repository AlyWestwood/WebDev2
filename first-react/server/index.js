const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const mysql = require('mysql');

const db = mysql.createPool({
    host: 'localhost',
    user: 'firstreact',
    password: 'firstReact1',
    database: 'firstreact'
});


app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.send('Welcome to the back end');
});

app.get("/api/get", (req, res) => {
    const allReviews = "SELECT * FROM reviews"
    db.query(allReviews, (err, result) => {
        res.send(result);
    });
});

app.post("/api/insert", (req, res) => {

    const movieName = req.body.movieName
    const movieReview = req.body.movieReview

    const sqlInsert = "INSERT INTO reviews (movie_name, review_body) VALUES (?, ?)"
    db.query(sqlInsert, [movieName, movieReview], (err, result) => {
        console.log(result)
    })
});

app.listen(3001, () => {
    console.log('running in the back on port 3001');
})