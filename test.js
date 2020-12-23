const jwt = require('jsonwebtoken');
const ch = require('child_process');
const {Buffer} = require('safe-buffer');

let hi = ch.spawn('help' , ['cd']);

hi.stdout.on('data' , (data)=>{
    data = Buffer.from(data).toString('utf8' , 0 , 80000000);
    console.log(data)
});



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
function testJWT(res){
    if (res.length == 0){
        console.log({message:"no user!" , data: res});
    } else {
       let token = jwt.sign({
        userId: res[0].id,
        server: 'keeti',
        developer: 'MonzerOmer'
      }, 'omerkeeti', { expiresIn: '7 days' });
       return token;
    // console.log({message:"no user!" , data: res});
    }
}
console.log(testJWT(result));