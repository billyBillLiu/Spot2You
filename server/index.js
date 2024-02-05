const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const mysql = require('mysql');

app.use(cors());
app.use(express.static('public'));
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

const db = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: '123456',
    database: 'spot2youdb'
});

app.get("/api/delete", (req, res) => {
    const sqlDelete = "DELETE FROM token_info";
    db.query(sqlDelete, (err, result) => {
        res.send(result);
        console.log(result);
    })
})

app.get("/api/get", (req, res) => {
    const sqlSelect = "SELECT * FROM token_info";
    db.query(sqlSelect, (err, result) => {
        console.log("GETTING:")
        res.send(result);
        console.log(result);
    })
})

app.post("/api/insertSpotifyToken", (req, res)=> {
    const spotify_token = req.body.spotify_token;
    const sqlInsert = "INSERT INTO token_info (spotify_token) VALUES (?)";
    db.query(sqlInsert, [spotify_token], (err, result)=> {
        console.log(result);
    });
});

app.post("/api/insertYouTubeToken", (req, res)=> {
    const youtube_token = req.body.youtube_token;
    const id = req.body.id;
    const sqlUpdate = "UPDATE token_info SET youtube_token = ? WHERE id = ?";
    db.query(sqlUpdate, [youtube_token, id], (err, result)=> {
        console.log("YOUTUBE INSERT:")
        console.log(result);
        console.log(err);
    });
});

app.get("/", (req, res) => {
    res.send("YO");
})

app.listen(3001, () => {
    console.log('running on port 3001');
});