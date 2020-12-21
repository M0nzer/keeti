const express = require('express');
//update query
const uqRouter = express.Router();
const db = require('../config/database');
uqRouter.use(express.json());
const sql = require("mssql");

//Query Builder

/**
 * @author Monzer Abdullaziz
 * @summary query builder build query from the given array
 * @param {string} `query` - for e.g `UPDATE table_name SET`
 * @param {array} `fields` - for e.g `['nameEN' , 'nameAR' , 'password' , 'type', 'status' , 'phone']`
 * @param {array} `values` - for e.g `['monzer' , '---' , 123, 'none' , 'Enabled' , '0121601505']`
 * @param {array} `condition field` - for e.g `['nameEN']`
 * @param {array} `condition value` - for e.g `['monzer']
 * @returns {string} query - for e.g `UPDATE table_name SET column1 = value1, column2 = value2, ... WHERE condition`
 */
function buildUpdateQuery(query , fields , values , condFields , condValues){

    for(let ind = 0; ind <= fields.length-1; ind++){
        if (ind < fields.length-1){
            query += ` ${fields[ind]} = ${values[ind]} ,`;
        } else if (ind == fields.length-1){
            query += ` ${fields[ind]} = ${values[ind]}`;
        }
    }

    query += ' WHERE';

    for(let ind = 0; ind <= condFields.length-1; ind++){
        if (ind < condFields.length-1){
            query += ` ${condFields[ind]} = '${condValues[ind]}' ,`;
        } else if (ind == condField.length-1){
            query += ` ${condFields[ind]} = '${condValues[ind]}'`;
        }
    }
    console.log(query);
    return query;
}

uqRouter.put('/uq' , (req , res)=>{
    let fields = req.query.field;
    let values = req.query.value;
    if (fields.length != values.length || fields === undefined){
        return res.status(500).json({})
    }
        let query = buildUpdateQuery(req.query.que ,fields , values , req.query.condf , req.query.condv);
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

module.exports =uqRouter;