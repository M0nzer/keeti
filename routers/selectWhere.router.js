const express = require('express');
//Select Where
const swRouter = express.Router();
const db = require('../config/database');
swRouter.use(express.json());
const sql = require("mssql");

//Query Builder
function buildSelectWhereQuery(query , fields , values){    
    if(fields.length > 0){
        query += `WHERE `;
        for(let ind = 0; ind <= fields.length-1; ind++){
            if (ind < fields.length-1){
                query += ` ${fields[ind]} = '${values[ind]}' and`;
            } else if (ind == fields.length-1){
                query += ` ${fields[ind]} = '${values[ind]}'`;
            }
        }
    }
    console.log(query);
    return query;
}

    swRouter.get('/sw' , (req , res)=>{
        let fields = req.query.field;
        let values = req.query.value;
        if (fields.length != values.length || fields === undefined){
            return res.status(500).json({})
        }
        let query = buildSelectWhereQuery(req.query.que ,fields , values);
            async function connectDB() {
                 const pool = new sql.ConnectionPool(db);
             
                 try {
                     await pool.connect();
                     console.log('Connected to database');
             
                     return pool;
                 }
                 catch(err) {
                    console.log('Database connection failed!!\n Error Details:\n', err);
             
                     return err;
                 }
             }
             
             async function getAll() {
                 const DB = await connectDB();
             
                 try {
                     const result = await DB.request().query(query);
             
                     return result.recordset;
                 }
                 catch (err) {
                    console.log('Error querying database!!\n Error Details:\n', err);
             
                     return err;
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

module.exports = swRouter;