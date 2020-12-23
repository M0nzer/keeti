const express = require('express');
//Select Where
const swRouter = express.Router();
const db = require('../config/config').database;
swRouter.use(express.json());
const sql = require("mssql");

const isAuth = require('../middleware/auth').auth;

//bodyParser Setup
const bodyParser = require('body-parser');
swRouter.use(bodyParser.urlencoded({ extended: false }));
swRouter.use(bodyParser.json());

//setup cookieParser
const cookieParser = require('cookie-parser');
swRouter.use(cookieParser());

//Query Builder

/**
 * @author Monzer Abdullaziz
 * @summary query builder build query from the given array
 * @param {string} `query` - for e.g `SELECT students , schools FROM NES_Database`
 * @param {array} `fields` - for e.g `['nameEN' , 'nameAR' , 'password' , 'type', 'status' , 'phone']`
 * @param {array} `values` - for e.g `['monzer' , '---' , 123, 'none' , 'Enabled' , '0121601505']`
 * @returns {string} query - for e.g `SELECT name , school , class FROM NES_Database WHERE name = ali AND id = 4`
 */
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

    swRouter.get('/sw' , isAuth, (req , res)=>{
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

module.exports = swRouter;