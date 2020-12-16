const express = require('express');
//Delete Query
const dqRouter = express.Router();
const db = require('../config/database');
dqRouter.use(express.json());
const sql = require("mssql");
//Query Builder
function buildDeleteQuery(query , fields , values){
    let part = [];
    let tempPart = '';
    let partString = '';
    
        for(let index = 0; index <= fields.length-1; index++){
            for(let dex = 0; dex <= values.length-1; dex++){
                if (index == dex){
                    tempPart = `${fields[index]} = '${values[dex]}' `
                    part.push(tempPart);
                }
            }
        }
    
        for(let ind = 0; ind <= part.length-1; ind++){
            if(ind == 0 && ind == values.length-1){
                partString += `${query} ${part[ind]}`;
            }else {
                if (ind == 0 && values.length != 1){
                    partString += `${query} ${part[ind]} and`;
                } else if (ind != 0 && ind != values.length-1){
                    partString += ` ${part[ind]} and`;
                } else if (ind == values.length-1){
                    partString += ` ${part[ind]}`;
                }
            }
    
        }
    console.log(partString);
    return partString;
    
}

dqRouter.delete('/dq', (req , res)=>{
    let guery = buildDeleteQuery(req.query.que ,req.query.field , req.query.value);
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

module.exports = dqRouter;