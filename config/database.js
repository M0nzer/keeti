// let sql = require("mssql");

    // config for your database
const config = {
    user: 'citcsudan2_SQLLogin_1',
    password: '12345asdfg',
    server: 'jazatt2020.mssql.somee.com',
    database: 'jazatt2020',
    options: {
        encrypt: true
    }
}

    // connect to your database
// sql.connect(config, function (err) {
//     if (err) console.log(err);
// });

// const request = new sql.Request();

module.exports = config;