const express = require('express');
//Delete Query
const dqRouter = express.Router();
const db = require('../config/database');
dqRouter.use(express.json());
const sql = require("mssql");
//Query Builder
function buildDeleteQuery(query , fields , values){

    query += 'WHERE ';
    
    for(let ind = 0; ind <= fields.length-1; ind++){
        if (ind < fields.length-1){
            query += ` ${fields[ind]} = '${values[ind]}' ,`;
            } else if (ind == fields.length-1){
                query += ` ${fields[ind]} = '${values[ind]}'`;
            }
       }
    console.log(query);
    return query;   
}

dqRouter.delete('/dq', (req , res)=>{
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
                console.log('Database connection failed!!\n Error Details:\n', err);
         
                 return {error :"Database error:\n" + err};
             }
         }
         
         async function getAll() {
             const DB = await connectDB();
         
             try {
                 const result = await DB.request().query(query);
         
                 return "true";
             }
             catch (err) {
                console.log('Error querying database!!\n Error Details:\n', err);
         
                 return "false";
             }
             finally {
                 DB.close();
             }
         }
         
         async function execute() {
             let result = await getAll();
             JSON.stringify(result)
         
             res.status(200).json(result)
             // return JSON.stringify(result);
         }
         
         execute();
});

module.exports = dqRouter;