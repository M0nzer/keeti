const jwt = require("jsonwebtoken");
const { secrut } = require("../config/config");
const db = require('../config/config').database;
const sql = require("mssql");


module.exports = {
    auth: (req , res , next)=>{
        
        const token = req.query.token;

        if (!token) {

            res.status(401).json({auth : "Please Login"});

        }
            try {
               const decoded =  jwt.verify(token, secrut);
               req.auth = decoded;
        
            } catch (err) {
        
                return res.status(400).send({ message: 'Authentication error!' });
        
            }

            async function connectDB() {
                const pool = new sql.ConnectionPool(db);
            
                try {
                    await pool.connect();
                    console.log('Connected to database');
            
                    return pool;
                }
                catch(err) {
             
                    res.status(500).json({Error: err});

                }
            }
            
            async function getAll() {
                
                
                const DB = await connectDB();
            
                try {

                    const result = await DB.request().query(`select id , token , phone from SET_users where status = 'Enabled' and token = '${token}'`);

                    return result.recordset;
                }
                catch (err) {
            
                    return err
                }
                finally {
                    DB.close();
                }
            }
            
            async function execute() {
                let result = await getAll();
        
                if (result.length >= 1){

                    next();
            
                } else {
        
                   return res.status(401).send({ Error: 'Authentication Error!  Non-Authoritative Token'});
        
                }
            }
         execute();

    }
}