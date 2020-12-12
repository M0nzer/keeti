let que = 'INSERT INTO table_name ';
let field = ['name' , 'phone' , 'level'];
let value = ['monzer' , '0121601505' , 'pre'];

function buildInsertQuery(query , fields , values){
    for (let index = 0; index <= fields.length-1; index++){
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
query += ' VALUES ';

    for (let index = 0; index <= values.length-1; index++){
        if (index == 0){
          let item = '( "' + values[index] + '" , '; 
          query += item; 
        } else if (index != 0 && index != values.length-1){
            let midItem = ' "' + values[index] + '" , ';
            query += midItem;
        } else if (index == values.length-1){
            let lastItem =' "'+ values[index] + '" )';
            query+= lastItem;
        }
    }

return query;
}

function buildSelectWhereQuery(query , fields , values){
let part = [];
let tempPart = '';
let partString = '';

    for(let index = 0; index <= fields.length-1; index++){
        for(let dex = 0; dex <= values.length-1; dex++){
            if (index == dex){
                tempPart = `${fields[index]} = "${values[dex]}" `
                part.push(tempPart);
            }
        }
    }

    for(let ind = 0; ind <= part.length-1; ind++){

        if (ind == 0){
            partString += `${query} ${part[ind]}`;
        } else if (ind != 0 && ind != values.length-1){
            partString += `${part[ind]}`;
        } else if (ind == values.length-1){
            partString += `${part[ind]}`;
        }
    }

return partString;

}

console.log(`you insert query to the function like this: \n\n ${que} \n\n you insert fields to the function like this:\n\n ${field} \n\n you insert values to the function like this:\n\n ${value}\n\n the output in buildSelectWhereQuery will be: \n\n ${buildSelectWhereQuery(que , field , value)} \n\n the output in buildSelectWhereQuery will be: \n\n ${buildInsertQuery(que , field , value)}`)