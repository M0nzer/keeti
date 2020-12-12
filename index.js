//Setup Express
const express = require('express');
const app = express();
const db = require('./config/database');
const port = 3232;
app.use(express.json());

const sql = require("mssql");

// DB credentials
const config = {
    user: 'citcsudan2_SQLLogin_1',
    password: '12345asdfg',
    server: 'jazatt2020.mssql.somee.com',
    database: 'jazatt2020',
    options: {
        encrypt: true
    }
}

//Routers
// const auth = require('./Auth/index');
//0923595393
//1234
//Routers Setup
// app.use('/keeti/users' , auth);

app.get('/keeti/auth', (req, res) => {
   async function connectDB() {
        const pool = new sql.ConnectionPool(config);
    
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
            const result = await DB.request().query(`select US.mySchoolID,S.id,S.nameEN,S.addressEN,S.dbServer,S.meetingServer,S.avatarURL,S.videoURL,S.audioURL, S.attachmentsURL,S.logo,S.background from SET_schools S left outer join users_schools US on S.id = US.sID where US.uID = (select id from SET_users where phone = '${req.query.username}' and password ='${req.query.password}')`);
    
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
    
        res.send(result)
        // return JSON.stringify(result);
    }
    
    execute();
});

//app.get('*', (req, res) => {
//   res.status(404).json({error : 'Not Found!'});
//});

app.post('*', (req, res) => {
    res.status(404).json({error : 'Not Found!'});
});

app.put('*', (req, res) => {
    res.status(404).json({error : 'Not Found!'});
});

app.delete('*', (req, res) => {
    res.status(404).json({error : 'Not Found!'});
});

//listening at 3000
app.listen(process.env.PORT);