import mysql2 from 'mysql2';
import * as dotenv from 'dotenv';
dotenv.config();


export const mysqlDB = mysql2.createConnection({
    host: process.env.API_HOST,
    user: process.env.API_USER,
    password: process.env.API_PASSWORD,
    database: process.env.API_DATABASE
});