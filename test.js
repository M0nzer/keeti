let que = 'SELECT * FROM SET_users ';
//'nameEN' , 'nameAR' , 'password' , 'type', 'status' , 'phone'
//'monzer' , '---' , 123, 'none' , 'Enabled' , '0121601505'
let field = [];
let value = [];
let condField = ['nameEN' , 'nameAR'];
let condValue = ['monzer' , '---'];

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
                  let midItem = ` '${values[index]}' ,  `;
                  query += midItem;
              } else if (index == values.length-1){
                  let lastItem =` '${values[index]}' )`;
                  query+= lastItem;
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
    console.log(query)
    return query;
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
                    partString += `${part[ind]}`;
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
        
        return partString;
        
        }


console.log(`

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
the output in buildSelectWhereQuery will be:
${buildInsertQuery(que , field , value)}
condField for update query builder is:
${condField}
condValues for update query builder is:
${condValue}
Result of The BuildUpdateQuery function:
${buildUpdateQuery(que , field , value , condField , condValue)}
Result of The BuildDeleteQuery function:
${buildDeleteQuery(que , field , value)}
*/