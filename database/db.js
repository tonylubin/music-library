const sqlite3 = require("sqlite3");
const filepath = "./musicLib.db";

// duration TIME format - "hh:mm:ss"
const createDb = (db) => {
  db.exec(`
  CREATE TABLE music (
    trackId INT AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    artist VARCHAR(255) NOT NULL,
    album VARCHAR(255),
    duration TIME,  
    genre VARCHAR(255) NOT NULL,
    imageUrl VARCHAR(255),
    year INT NOT NULL,
    created TIMESTAMP NOT NULL DEFAULT NOW()
    PRIMARY KEY(trackId)
    ); 
    `);
  };