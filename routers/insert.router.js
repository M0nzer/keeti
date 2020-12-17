const express = require('express');
//insert Query
const isRouter = express.Router();
const db = require('../config/database');
isRouter.use(express.json());
const sql = require("mssql");
//Query Builder
function buildInsertQuery(query , fields , values){
    for (let index = 0; index <= fields.length-1; index++){
        if(fields.length == 1){
            query += `( ${fields[index]} ) `;  
        } else {
            if (index == 0){
                query +=`( ${fields[index]} , `; 
              } else if (index < fields.length-1){
                query += `${fields[index]} , `;
              } else if (index == fields.length-1){
                query += `${fields[index]} )`;
              }
        }
        
    }
    query += ' VALUES ';

    for (let index = 0; index <= values.length-1; index++){
        if(values.length == 1){
            query +=`( '${values[index]}') `; 
        } else {
            if (index == 0){
                query += `( '${values[index]}' , `; 
              } else if (index < values.length-1){
                query += `'${values[index]}' , `;
              } else if (index == values.length-1){
                query +=`'${values[index]}' )`;
              }
        }
    }
    console.log(query);
    return query;
}

isRouter.post('/is' , (req , res)=>{
    let fields = req.query.field;
    let values = req.query.value;
    if (fields.length != values.length || fields === undefined){
        return res.status(500).json({})
    }
    let query = buildInsertQuery(req.query.que ,fields , values);
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

module.exports = isRouter;