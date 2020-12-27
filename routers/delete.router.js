const express = require('express');
//Delete Query
const dqRouter = express.Router();
const db = require('../config/config').database;
dqRouter.use(express.json());
const sql = require("mssql");

const isAuth = require('../middleware/auth').auth;

//bodyParser Setup
const bodyParser = require('body-parser');
dqRouter.use(bodyParser.urlencoded({ extended: false }));
dqRouter.use(bodyParser.json());


//setup cookieParser
const cookieParser = require('cookie-parser');
dqRouter.use(cookieParser());

//Query Builder

/**
 * @author Monzer Abdullaziz
 * @summary query builder build query from the given array
 * @param {string} `query` - for e.g `DELETE FROM table_name`
 * @param {array} `fields` - for e.g `['nameEN' , 'nameAR' , 'password' , 'type', 'status' , 'phone']`
 * @param {array} `values` - for e.g `['monzer' , '---' , 123, 'none' , 'Enabled' , '0121601505']`
 * @returns {string} query - for e.g `DELETE FROM table_name WHERE condition`
 */
function buildDeleteQuery(query , fields , values){

    query += 'WHERE ';
    
    for(let ind = 0; ind <= fields.length-1; ind++){
        if (ind < fields.length-1){
            query += ` ${fields[ind]} = '${values[ind]}' ,`;
            } else if (ind == fields.length-1){
                query += ` ${fields[ind]} = '${values[ind]}'`;
            }
       }
    return query;   
}

dqRouter.delete('/dq', isAuth, (req , res)=>{
    let fields = req.query.field;
    let values = req.query.value;
    if (fields.length != values.length || fields === undefined){
        return res.status(500).json({})
    }
    let query = buildDeleteQuery(req.query.que ,fields , values);
        async function connectDB() {
             const pool = new sql.ConnectionPool(db);
         
             try {
                 await pool.connect();
                 console.log('Connected to database');
         
                 return pool;
             }
             catch(err) {
                 return res.status(500).send("false");
         
             }
         }
         
         async function getAll() {
             const DB = await connectDB();
         
             try {
                 const result = await DB.request().query(query);
         
                 return res.status(200).send("true");
             }
             catch (err) {
         
                return res.status(500).send("false");
             }
             finally {
                 DB.close();
             }
         }
         
         async function execute() {
             let result = await getAll();
         
             //res.status(200).json(result)
            return JSON.stringify(result);
         }
         
         execute();
});

module.exports = dqRouter;