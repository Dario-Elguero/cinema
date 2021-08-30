require("dotenv").config();
const mysql = require("mysql");
const {
  createTableMovies,
  createTableUsers,
  createTableFavorites,
  createTableMovGen,
  createTableGenres,
  createTableRoles,
} = require("../schema/schema");

const { DB_HOST, DB_PASSWORD, DB_USER, DB_DATABASE } = process.env;

// const createDataBase = (connec) => {
//     connec.query("CREATE DATABASE if not exists prue", (err, result) => {
//       if (err) throw err;
//       console.log("Database created");

//     });

//      return connec

// }

function connection() {
  const connection = mysql.createConnection({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE,
  });

  connection.connect((error) => {
    if (error) throw error;
    // eslint-disable-next-line no-console
    console.log("Established connection");
    // createDataBase(connection)
  });

  createTableMovies(connection);

  createTableUsers(connection);

  createTableFavorites(connection);

  createTableGenres(connection);

  createTableMovGen(connection);

  createTableRoles(connection);

  return connection;
}

module.exports = connection;
