
const express = require('express')
, authRouter = express.Router()
, jwt = require('jsonwebtoken')
, db = require('../config/config').database
, sec = require('../config/config').secrut
, isAuth = require('../middleware/virefy').auth
, sql = require('mssql');

//bodyParser Setup
const bodyParser = require('body-parser');
authRouter.use(bodyParser.urlencoded({ extended: false }));
authRouter.use(bodyParser.json());

authRouter.get('/auth', isAuth , (req, res) => {
    async function connectDB() {
         const pool = new sql.ConnectionPool(db);
     
         try {
             await pool.connect();
             console.log('Connected to database');
     
             return pool;
         }
         catch(err) {

            return res.status(500).json({Error: err});

         }
     }
     
     async function getAll() {
         const DB = await connectDB();
     
         try {
             const result = await DB.request().query(`select * from SET_users where phone = '${req.query.username}' and status = 'Enabled' and password ='${req.query.password}'`);
     
             return result.recordset;
         }
         catch (err) {
             return res.status(500).json({Error: err});     

         }
         finally {
             DB.close();
         }
     }
     
     async function execute() {
        let result = await getAll();

        return result
     }

    async function giveJWT(){
        let result = await execute();
        let data = {}
        data = result[0];
        if (result.length == 0){
            return res.status(404).json(result);
        } else {
           let token = jwt.sign({
            userId: result[0].id
        }, sec , { expiresIn: '99 years' });
        data.token = token;


        async function connectToDB() {
            const pool = new sql.ConnectionPool(db);
        
            try {
                await pool.connect();
        
                return pool;
            }
            catch(err) {

               return res.status(500).json(err);

            }
        }
        
        async function conDatabase() {
            const DB = await connectToDB();
        
            try {
                const result = await DB.request().query(`UPDATE SET_users SET token = '${token}' WHERE phone = '${req.query.username}'`);
        
                return result.recordset;
            }
            catch (err) {
               return res.status(500).json(err);        
            }
            finally {
                DB.close();
            }
        }
        
        async function executeQuery() {
           let result = await conDatabase();

           return result
        }

        executeQuery();

        res.status(200).json(data);

        }
    }
    giveJWT();
 });

module.exports = authRouter;