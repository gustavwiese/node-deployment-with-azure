import mysql from "mysql2"; // using mysql2 - installed npm library
import "dotenv/config";
import fs from "fs/promises";

// using the variables from the .env file
// and creates the connection to database
const dbConfig = {
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    user: process.env.MYSQL_USER,
    database: process.env.MYSQL_DATABASE,
    password: process.env.MYSQL_PASSWORD,
    multipleStatements: true
};

if (process.env.MYSQL_CERT) {
    dbConfig.ssl = { cs: fs.readFile("DigiCertGlobalRootCA.crt.pem") };
}

const dbConnection = mysql.createConnection(dbConfig);

// exports database connection
export default dbConnection;
