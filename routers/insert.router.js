const express = require('express');
//insert Query
const isRouter = express.Router();
const db = require('../config/database');
isRouter.use(express.json());
const sql = require("mssql");
//Query Builder
function buildInsertQuery(query , fields , values){
    for (let index = 0; index <= fields.length-1; index++){
        if(index == 0 && index == fields.length-1){
            let item = '(' + fields[index] + ') '; 
            query += item; 
        } else {
            if (index == 0){
                let item = '( ' + fields[index] + ', '; 
                query += item; 
              } else if (index != 0 && index != fields.length-1){
                  let midItem = fields[index] + ', ';
                  query += midItem;
              } else if (index == fields.length-1){
                  let lastItem = fields[index] + ' )';
                  query+= lastItem;
              }
        }
        
    }
query += ' VALUES ';

    for (let index = 0; index <= values.length-1; index++){
        if(index == 0 && index == values.length-1){
            let item = `('${values[index]}') `; 
            query += item; 
        } else {
            if (index == 0){
                let item = `( '${values[index]}' , `; 
                query += item; 
              } else if (index != 0 && index != values.length-1){
                  let midItem = ` '${values[index]}' , `;
                  query += midItem;
              } else if (index == values.length-1){
                  let lastItem =` '${values[index]}' )`;
                  query+= lastItem;
              }
        }
    }
console.log(query)
return query;
}

isRouter.post('/is' , (req , res)=>{
    let guery = buildInsertQuery(req.query.que ,req.query.field , req.query.value);
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
                 const result = await DB.request().query(guery);
         
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