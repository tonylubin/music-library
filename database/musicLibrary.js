// NOTE: to remove quotes from json object string use mysql.raw(string)

const mysql = require("mysql2");

// creating connection to database
const connectionPool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORTNUMBER,
});

// enabling connection to use asyn/await
const db = connectionPool.promise();

// NOTE: mysql query returns ROWS(an array of objects(rows in table)) & FIELDS(metadata about fields in the table) --> we only need ROWS so deconstruct array result

// GET all tracks (rows)
const getTracks = async () => {
  const query = "SELECT * FROM music";
  let [rows] = await db.query(query);
  return rows;
};

// GET one track (row) & handles favourite status
const getTrack = async (id) => {
  const query = `SELECT music.*, favourites.favouriteId
   FROM music
   LEFT JOIN favourites
   ON music.trackId = favourites.trackId
   WHERE music.trackId = ?;
   `;
  let [rows] = await db.query(query, [id]);
  // only 1 result/track thus return 1st object in rows array
  return rows[0];
};

// SEARCH - by letter input
const searchFunc = async (searchTerm) => {
  let text = `${searchTerm}%`;
  const query = "SELECT * FROM music WHERE artist LIKE ? OR title LIKE ?";
  let [rows] = await db.query(query, [text, text]);
  return rows;
};

// ADD track (row)
const addTrack = async (title, artist, album, genre, year, imageUrl) => {
  const query = `INSERT INTO music (title, artist, album, genre, year, imageUrl) VALUES (?,?,?,?,?,?)`;
  await db.query(query, [title, artist, album, genre, year, imageUrl]);
};

// DELETE track (row)
const deleteTrack = async (trackId) => {
  const query = "DELETE FROM music WHERE trackId = ?";
  await db.query(query, [trackId]);
};

// UPDATE track
const updateTrack = async (title, artist, album, genre, year, imageUrl, id) => {
  const query = `
  UPDATE music
  SET title = ?, artist = ?, album = ?, genre = ?, year = ?, imageUrl = ?
  WHERE id = ?
  `;
  await db.query(query, [title, artist, album, genre, year, imageUrl, id]);
};

//  Get Favourite tracks
const getAllFavouriteTracks = async () => {
  const query = `SELECT music.*, favourites.favouriteId 
    FROM music
    JOIN favourites
    ON music.trackId = favourites.trackId;
    `;
  let [rows] = await db.query(query);
  return rows;
};

//  Add a favourite track
const addFavouriteTrack = async (id) => {
  const query = `INSERT INTO favourites (trackId) VALUES (?)`;
  await db.query(query, [id]);
};

//  Delete a favourite track
const removeFavouriteTrack = async (id) => {
  const query = "DELETE FROM favourites WHERE trackId = ?";
  await db.query(query, [id]);
};

//  Create Playlist
const createPlaylist = async (name) => {
  // make sql string e.g: removes quotes from string that query method adds
  let playlistName = mysql.raw(name);
  const query = `CREATE TABLE ? (
      trackNumber INT AUTO_INCREMENT,
      trackId INT,
      playlist BOOLEAN DEFAULT TRUE, 
      created TIMESTAMP NOT NULL DEFAULT NOW(),
      PRIMARY KEY (trackNumber),
      FOREIGN KEY (trackId) REFERENCES music(trackId)
    )`;
  let queryString = mysql.format(query, [playlistName]);
  await db.query(queryString);
};

//  delete playlist
const deletePlaylist = async (name) => {
  let tableName = mysql.raw(name);
  const query = "DROP TABLE ?";
  await db.query(query, [tableName]);
};

//  get tables - playlists
const getTables = async () => {
  const queryString = `SELECT DISTINCT table_name
  FROM information_schema.columns
  WHERE column_name = 'playlist'
  `;
  let [ rows ] = await db.query(queryString);
  return rows;
};

//  get playlist tracks
const getPlaylistTable = async (name) => {
  const playlistCol = mysql.raw(`${name}.trackNumber`);
  const foreignKeyName = mysql.raw(`${name}.trackId`);
  const playlistName = mysql.raw(name);
  const query = `
  SELECT music.*, ?
  FROM music
  JOIN ?
  ON music.trackId = ?
  `;
  let queryString = mysql.format(query, [playlistCol, playlistName, foreignKeyName]);
  let [ rows ] = await db.query(queryString,[playlistCol, playlistName, foreignKeyName]);
  return rows;
};

// add to playlist
const addToPlaylist = async (name, trackNum) => {
  let trackName = mysql.raw(name);
  const query = "INSERT INTO ? (trackId) VALUES (?)";
  let queryString = mysql.format(query,[trackName,trackNum])
  await db.query(queryString, [trackName, trackNum]);
};

//  remove from playlist
const removeFromPlaylist = async (name, id) => {
  let trackName = mysql.raw(name);
  const queryString = "DELETE FROM ? WHERE trackId = ?";
  await db.query(queryString, [trackName, id]);
};

// Testing connection
connectionPool.getConnection((err, connection) => {
  if (err) {
    console.log(`Error connecting to database: ${err.code}: ${err.message}`);
  } else {
    console.log("\x1b[34m", "Successfull database connection!");
    connection.release();
  }
});

module.exports = {
  db,
  getTrack,
  getTracks,
  addTrack,
  searchFunc,
  deleteTrack,
  updateTrack,
  getAllFavouriteTracks,
  addFavouriteTrack,
  removeFavouriteTrack,
  createPlaylist,
  deletePlaylist,
  getTables,
  getPlaylistTable,
  addToPlaylist,
  removeFromPlaylist
};


// NOTE - resetting auto increment

// To find the highest number
// query --> SELECT MAX( `column` ) FROM `table`;
// Replace ‘column’ with the name of the auto incrementing column. Replace table with the   name of the table. 

// Reset the auto increment field
// query --> ALTER TABLE `table` AUTO_INCREMENT = 'number';
// Replacing ‘number’ with the result of the previous command plus one and replacing table with the table name.