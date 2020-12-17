let que = 'DELETE FROM SET_users ';
//
//
let field = ['nameEN' , 'nameAR' , 'password' , 'type', 'status' , 'phone'];
let value = ['monzer' , '---' , 123, 'none' , 'Enabled' , '0121601505'];
let condField = ['nameEN' , 'nameAR'];
let condValue = ['monzer' , '---'];

function buildInsertQuery(query , fields , values){
    for (let index = 0; index <= fields.length-1; index++){
        if(fields.length == 1){
            query += `( ${fields[index]} ) `;  
        } else {
            if (index == 0){
                query +=`( ${fields[index]} , `; 
              } else if (index < fields.length-1){
                query += `${fields[index]} , `;
              } else if (index == fields.length-1){
                query += `${fields[index]} )`;
              }
        }
        
    }
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


console.log(`
Result of The BuildDeleteQuery function:
${buildDeleteQuery(que , field , value)}

the output in buildInsertIntoQuery will be:
${buildInsertQuery(que , field , value)}

Result of The BuildUpdateQuery function:
${buildUpdateQuery(que , field , value , condField , condValue)}

the output in buildSelectWhereQuery will be:
${buildSelectWhereQuery(que , field , value)}
`)

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