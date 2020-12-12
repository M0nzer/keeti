//Setup Express
const express = require('express');
const app = express();
var cors = require('cors')
const db = require('./config/database');
const port = 3232;
app.use(express.json());
app.use(cors())
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

//Query Builders
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

function buildSelectWhereQuery(query , fields , values){
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
    console.log(partString)
    return partString;
    
    }

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

//0923595393
//1234
//Routers
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

app.get('/keeti/sw' , (req , res)=>{
    let guery = buildSelectWhereQuery(req.query.que ,req.query.field , req.query.value);
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

app.post('/keeti/is' , (req , res)=>{
    let guery = buildInsertQuery(req.query.que ,req.query.field , req.query.value);
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

app.put('/keeti/uq' , (req , res)=>{
    let guery = buildUpdateQuery(req.query.que ,req.query.field , req.query.value , req.query.condf , req.query.condv);
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

app.delete('/keeti/dq', (req , res)=>{
    let guery = buildDeleteQuery(req.query.que ,req.query.field , req.query.value);
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

app.get('*', (req, res) => {
  res.status(404).json({error : 'Not Found!'});
});

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
app.listen(3000);