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

app.get('/api/:tabla/:id', (req, res) => {

    let con = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password : "",
        database: "serviceabogados"
    });

    let sql;

    switch (req.params.tabla) {
        case "asuntos":
            sql = "SELECT * FROM " + req.params.tabla + " where id_asunto = " + req.params.id;
            break;
            case "clientes":
                sql = "SELECT * FROM " + req.params.tabla + " where id_cliente = " + req.params.id;
                break;
                case "estados":
                    sql = "SELECT * FROM " + req.params.tabla + " where id_estado = " + req.params.id;
                    break;
                    case "procesos":
                        sql = "SELECT * FROM " + req.params.tabla + " where id_proceso = " + req.params.id;
                        break;
                        case "procuradores":
                            sql = "SELECT * FROM " + req.params.tabla + " where id_procurador = " + req.params.id;
                            break;
        default:
            break;
    }

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

app.post('/api/:tabla/', function (req, res) {

    let con = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password : "",
        database: "serviceabogados"
    });
    
    let sql;
    let parametros;

    switch (req.params.tabla) {
        case "asuntos":
            sql = "insert into " + req.params.tabla + " (fecha_inicio, fecha_finalizacion, id_cliente, id_estado) " 
            + "values (" + req.body.fecha_inicio +","+ req.body.fecha_finalizacion + "," + req.body.id_cliente + "," + req.body.id_estado + ")";
            break;
            case "clientes":
                sql = "insert into " + req.params.tabla + " (nombre_cliente, apellido_cliente, dni_cliente, direccion_cliente) " 
                + "values (" + req.body.nombre_cliente +","+ req.body.apellido_cliente + "," + req.body.dni_cliente + "," + req.body.direccion_cliente + ")";
            break;
            case "estados":
                sql = "insert into " + req.params.tabla + " (estado_actual) " 
                + "values (" + req.body.estado_actual +")";
            break;
            case "procesos":
                sql = "insert into " + req.params.tabla + " (id_asunto, id_procurador) " 
                + "values (" + req.body.id_asunto + "," + req.body.id_procurador +")";
            break;
            case "procuradores":
                sql = "insert into " + req.params.tabla + " (nombre_procurador, apellido_procurador, dni_procurador) " 
                + "values (?, ?, ?)";
                parametros = [req.body.nombre_procurador, req.body.apellido_procurador, req.body.dni_procurador];
            break;
    
        default:
            break;
    }

        con.connect(function (err){
        if (err) {
            res.send(err);
        }
        else {
            con.query(sql,parametros, function (err,result) {
                if (err) {
                    res.send(err);
                }
                else {
                    res.send(result);
                }
            });
        }
    });

})

app.listen(3000);