const client = require('./connection.js')
const express = require('express');
const app = express();

app.listen();

client.connect();

app.get('/api/branch', (req, res)=>{
    let query = res.body;
    client.query(`select * from branches where branch ILike '${req.query.q}%' order by ifsc LIMIT ${req.query.limit} OFFSET ${req.query.offset};`, (err, result)=>{
        if(!err){
            res.send({"branches":result.rows});
        }
    });
    client.end;
})


app.get('/api/search', (req, res)=>{
    let query = res.body;
    client.query(`select * from branches where branch ILike '%${req.query.q}%' or city ILike '%${req.query.q}%' or ifsc ILike '%${req.query.q}%' or district ILike '%${req.query.q}%' or state ILike '%${req.query.q}%'  order by ifsc LIMIT ${req.query.limit} OFFSET ${req.query.offset};`, (err, result)=>{
        if(!err){
            res.send({"branches":result.rows});
        }
    });
    client.end;
})
