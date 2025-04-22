const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'notification'
  });


const connectDb = () => {
    db.connect((err) => {
        if(err){
            console.log("Error connecting to the database",err);
        }else{
            console.log("Connected to the database");
        }
    })
    return db;  
}

module.exports = connectDb
  
  