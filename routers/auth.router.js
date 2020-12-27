
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
             const result = await DB.request().query(`select US.mySchoolID,S.id,S.nameEN,S.addressEN,S.dbServer,S.meetingServer,S.avatarURL,S.videoURL,S.audioURL, S.attachmentsURL,S.logo,S.background from SET_schools S left outer join users_schools US on S.id = US.sID where US.uID = (select id from SET_users where phone = '${req.query.username}' and password ='${req.query.password}')`);
     
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
        //JSON.stringify(result);
             
        //res.status(200).json(result);
          return result
     }

    async function giveJWT(){
        let result = await execute();
        let data = {}
        data = result[0];
        if (result.length == 0){
            res.status(404).json({message:"no user!" , data: result});
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

               return res.status(500).json({Error: err});

            }
        }
        
        async function conDatabase() {
            const DB = await connectToDB();
        
            try {
                const result = await DB.request().query(`UPDATE SET_users SET token = '${token}' WHERE phone = '${req.query.username}'`);
        
                return result.recordset;
            }
            catch (err) {
               return res.status(500).json({Error: err});        
            }
            finally {
                DB.close();
            }
        }
        
        async function executeQuery() {
           let result = await conDatabase();
           //JSON.stringify(result);
                
           //res.status(200).json(result);
             return result
        }

        executeQuery();

        //res.status(200).json(data)
        res.status(200).send({ message: 'Login is successful' , data: data });
        // console.log({message:"no user!" , data: res});
        }
    }
    giveJWT();
 });

module.exports = authRouter;


/*
"mySchoolID": 1,
        "id": 1,
        "nameEN": "Royal British International Schools",
        "addressEN": null,
        "dbServer": null,
        "meetingServer": "https://live.smartschool.sd/",
        "avatarURL": "https://www.smartschool.sd/avatars/1/",
        "videoURL": "http://www.keeti.sd/media/1/",
        "audioURL": null,
        "attachmentsURL": null,
        "logo": {
            "type": "Buffer",
            "data": [
                255,
*/