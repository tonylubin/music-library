const sqlite3 = require('sqlite3');
const filepath = './musicLib.db';

const dbConnection = () => {
  const db = new sqlite3.Database(filepath, (error) => {
    if(error) console.error(error.message);
  });
  console.log('Successfull connection to sqlite database established!');
  return db;
}

