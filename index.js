const mysql = require('mysql');
const express = require('express');
const app = express();

app.use(express.json());


app.get('/api/:tabla/', (req, res) => {

    let con = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password : "",
        database: "serviceabogados"
    });

    let sql = "SELECT * FROM " + req.params.tabla;


    con.connect(function (err){
        if (err) {
            res.send(err);
        }
        else {
            con.query(sql, function (err,result) {
                if (err) {
                    res.send(err);
                }
                else {
                    res.send(result);
                }
            });
        }
    });
});

app.listen(3000);