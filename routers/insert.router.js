const express = require('express');
//insert Query
const isRouter = express.Router();
const db = require('../config/database');
isRouter.use(express.json());
const sql = require("mssql");
//Query Builder

/**
 * @author Monzer Abdullaziz
 * @summary query builder build query from the given array
 * @param {string} `query` - for e.g `INSERT INTO NES_Database (name , phone , address)`
 * @param {array} `values` - for e.g `['monzer' , '---' , 123, 'none' , 'Enabled' , '0121601505']`
 * @returns {string} query - for e.g `INSERT INTO table_name (column1, column2, column3, ...) VALUES (value1, value2, value3, ...)`
 */
function buildInsertQuery(query , values){
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
    let values = req.query.value;
    if ( values.length == 0){
        return res.status(500).json({error: "no values!"})
    }
    let query = buildInsertQuery(req.query.que , values);
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

module.exports = isRouter;