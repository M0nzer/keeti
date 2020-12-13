const express = require('express');
//update query
const uqRouter = express.Router();
const db = require('../config/database');
uqRouter.use(express.json());
const sql = require("mssql");

//Query Builder
function buildUpdateQuery(query , fields , values , condFields , condValues){
    let part = [];
    let tempPart = '';
    let partString = '';
    let fullPart = [];
    let fullString = '';
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
                partString += `${part[ind]}`;
            }else {
                if (ind == 0 && values.length != 1){
                    partString += `${query} ${part[ind]} ,`;
                } else if (ind != 0 && ind != values.length-1){
                    partString += ` ${part[ind]} ,`;
                } else if (ind == values.length-1){
                    partString += ` ${part[ind]}`;
                }
            }
    
        }

        fullString = partString + 'WHERE ';

        for(let index = 0; index <= condFields.length-1; index++){
            for(let dex = 0; dex <= condValues.length-1; dex++){
                if (index == dex){
                    tempPart = `${condFields[index]} = '${condValues[dex]}' `
                    fullPart.push(tempPart);
                }
            }
        }
    
        for(let ind = 0; ind <= fullPart.length-1; ind++){
            if(ind == 0 && ind == condValues.length-1){
                fullString += `${fullPart[ind]}`;
            }else {
                if (ind == 0 && condValues.length != 1){
                    fullString += `${fullPart[ind]} and`;
                } else if (ind != 0 && ind != condValues.length-1){
                    fullString += ` ${fullPart[ind]} and`;
                } else if (ind == condValues.length-1){
                    fullString += ` ${fullPart[ind]}`;
                }
            }
    
        }

console.log(fullString)
    return fullString;
    
    }

uqRouter.put('/uq' , (req , res)=>{
        let guery = buildUpdateQuery(req.query.que ,req.query.field , req.query.value , req.query.condf , req.query.condv);
            async function connectDB() {
                 const pool = new sql.ConnectionPool(db);
             
                 try {
                     await pool.connect();
                     console.log('Connected to database');
             
                     return pool;
                 }
                 catch(err) {
                     console.log('Database connection failed!', err);
             
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
                     console.log('Error querying database', err);
             
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

module.exports =uqRouter;