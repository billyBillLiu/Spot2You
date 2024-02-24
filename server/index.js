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


app.post("/api/getUser", (req, res) => {
    const user_id = req.body.user_id;
    const sqlSelect = "SELECT * FROM spotify_info WHERE user_id = ?";
    db.query(sqlSelect,[user_id] ,(err, result) => {
        if (err) {
            res.send({err: err});
        }
        res.send(result);
    })
})

app.post("/api/register", (req, res)=> {
    const username = req.body.username;
    const password = req.body.password;
    const sqlInsert = "INSERT INTO spotify_info (username, password) VALUES (?, ?)";
    db.query(sqlInsert, [username, password], (err, result)=> {
        console.log(err);
    });
});

app.post('/api/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const sqlSelect = 'SELECT * FROM spotify_info WHERE username = ? AND password = ?';
    db.query(sqlSelect, [username, password], (err, result) => {
        if(err) {
            res.send({err: err});
        }
        res.send(result);
    });
});

app.post("/api/updateToken", (req, res)=> {
    const user_id = req.body.user_id;
    const access_token = req.body.access_token;
    const sqlUpdate = "UPDATE spotify_info SET access_token = ? WHERE user_id = ?";
    db.query(sqlUpdate, [access_token, user_id], (err, result)=> {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
        }
    });
});

app.get("/", (req, res) => {
    res.send("YO");
})

app.listen(3001, () => {
    console.log('running on port 3001');
});