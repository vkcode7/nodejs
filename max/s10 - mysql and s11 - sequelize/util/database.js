
/*
//this is needed for s10 changes if mysql2 is needs to be used
//used for direct SQL statements executions
const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'node-complete',
    password: 'gurgaon123'
});

module.exports = pool.promise();
*/

//s11 - for sequelize where SQL statements are not needed and 
//are executed by sequelize behind the scenes

const Sequelize = require('sequelize');
const sequelize = new Sequelize('node-complete', 'root', 'gurgaon123', {
    dialect: 'mysql', host: 'localhost'
});

module.exports = sequelize; //<-- the sequelize here will provide connection pool