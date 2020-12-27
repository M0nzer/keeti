const jwt = require('jsonwebtoken');
const ch = require('child_process');
const {Buffer} = require('safe-buffer');
const db = require('./config/config').database;
const sql = require("mssql");

// let hi = ch.spawn('help' , ['cd']);

// hi.stdout.on('data' , (data)=>{
//     data = Buffer.from(data).toString('utf8' , 0 , 80000000);
//     console.log(data)
// });


let req = {};
let que = 'DELETE FROM SET_users ';
//
//
let field = ['nameEN' , 'nameAR' , 'password' , 'type', 'status' , 'phone'];
let value = ['monzer' , '---' , 123, 'none' , 'Enabled' , '0121601505'];
let condField = ['nameEN' , 'nameAR'];
let condValue = ['monzer' , '---'];
let result = [{
    "mySchoolID": 1,
    "id": 1,
    "nameEN": "Royal British International Schools",
    "addressEN": null,
    "dbServer": null,
    "meetingServer": "https://live.smartschool.sd/",
    "avatarURL": "https://www.smartschool.sd/avatars/1/",
    "videoURL": "http://www.keeti.sd/media/1/",
    "audioURL": null,
    "attachmentsURL": null
    }
];

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

return query;
}

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
    return query;
}

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
            query += ` ${fields[ind]} = '${values[ind]}' ,`;
        } else if (ind == fields.length-1){
            query += ` ${fields[ind]} = '${values[ind]}'`;
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

    return query;
}

/**
 * @author Monzer Abdullaziz
 * @summary query builder build query from the given array
 * @param {string} `query` - for e.g `DELETE FROM table_name`
 * @param {array} `fields` - for e.g `['nameEN' , 'nameAR' , 'password' , 'type', 'status' , 'phone']`
 * @param {array} `values` - for e.g `['monzer' , '---' , 123, 'none' , 'Enabled' , '0121601505']`
 * @returns {string} query - for e.g `DELETE FROM table_name WHERE condition`
 */
function buildDeleteQuery(query , fields , values){

    query += 'WHERE ';
    for(let ind = 0; ind <= fields.length-1; ind++){
        if (ind < fields.length-1){
            query += ` ${fields[ind]} = '${values[ind]}' ,`;
            } else if (ind == fields.length-1){
                query += ` ${fields[ind]} = '${values[ind]}'`;
            }
       }
        
    return query;
        
}


// console.log(`
// Result of The BuildDeleteQuery function:
// ${buildDeleteQuery(que , field , value)}

// the output in buildInsertIntoQuery will be:
// ${buildInsertQuery(que , field , value)}

// Result of The BuildUpdateQuery function:
// ${buildUpdateQuery(que , field , value , condField , condValue)}

// the output in buildSelectWhereQuery will be:
// ${buildSelectWhereQuery(que , field , value)}
// `)

//DELETE FROM table_name WHERE condition;
//UPDATE table_name SET column1 = value1, column2 = value2, ... WHERE condition;
//INSERT INTO table_name (column1, column2, column3, ...) VALUES (value1, value2, value3, ...);
//value[]
//que

/*
you insert query to the function like this:
${que}
you insert fields to the function like this:
${field}
you insert values to the function like this:
${value}
condField for update query builder is:
${condField}
condValues for update query builder is:
${condValue}
*/


// result = JSON.stringify(result);
// result = JSON.parse(result);

/**
 * @param {array} res - Database Result
 * 
 * @returns {string} token
 */

// let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInNlcnZlciI6ImtlZXRpIiwiZGV2ZWxvcGVyIjoiTW9uemVyT21lciIsImlhdCI6MTYwOTA3NDQ5MSwiZXhwIjo0NzMzMjc2ODkxfQ.ZYTRX-FFnAt3MKBH1C08vDIOUnFec1NDH_dP2qpyPdU'

//     async function connectDB() {
//         const pool = new sql.ConnectionPool(db);
    
//         try {
//             await pool.connect();
//             console.log('Connected to database');
    
//             return pool;
//         }
//         catch(err) {
     
//             return {error :"Database error:\n" + err};
//         }
//     }
    
//     async function getAll() {
        
        
//         const DB = await connectDB();
    
//         try {
//             let query= `select id , token , phone from SET_users where status = 'Enabled' and token = '${token}'`;
//             console.log(query);
//             const result = await DB.request().query(query);
            
//             return result.recordset;
//         }
//         catch (err) {
    
//             return err
//         }
//         finally {
//             DB.close();
//         }
//     }
    
//     async function execute() {
//         let result = await getAll();

//         if (result.length >= 1){
//             req.authVar = 'Authenticated';
//             next();
    
//         } else {

//             res.status(401).send({ Error: 'Authentication Error!  Non-Authoritative Token'});

//         }
//     }
//     execute();




    

    function testJWT(res){
        if (res.length == 0 || !res){
            console.log({message:"no user!" , data: res});
        } else {
           let token = jwt.sign({
            id: 1,
          }, 'omerkeeti', { expiresIn: '99 years' });
           return token;
        // console.log({message:"no user!" , data: res});
        }
    }
    console.log(testJWT(result));


// jwt.verify('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInNlcnZlciI6ImtlZXRpIiwiZGV2ZWxvcGVyIjoiTW9uemVyT21lciIsImlhdCI6MTYwOTA3NDQ5MSwiZXhwIjo0NzMzMjc2ODkxfQ.ZYTRX-FFnAt3MKBH1C08vDIOUnFec1NDH_dP2qpyPdU' , 'omerkeeti' , function(err, decoded) {
//     console.log(decoded)
//   });

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInNlcnZlciI6ImtlZXRpIiwiZGV2ZWxvcGVyIjoiTW9uemVyT21lciIsImlhdCI6MTYwOTA3NDQ5MSwiZXhwIjo0NzMzMjc2ODkxfQ.ZYTRX-FFnAt3MKBH1C08vDIOUnFec1NDH_dP2qpyPdU