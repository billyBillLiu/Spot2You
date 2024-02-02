const express = require('express');
const app = express();
const mysql = require('mysql')

const db = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: '123456',
    database: 'spot2youdb'
});


app.get('/', (req, res) => {
    const sqlInsert = "INSERT INTO token_info (access_token) VALUES ('test')"
    db.query(sqlInsert, (err, result)=> {
        res.send("HELLO WORLD");})
});

app.listen(3001, () => {
    console.log('running on port 3001');
});