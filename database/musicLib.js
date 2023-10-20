import { Pool, escapeIdentifier } from "pg";
const SQL = require("sql-template-strings");

// create connection to database
const db = new Pool({
  host: process.env.PGHOST,
  user: process.env.PGUSER,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});

// GET all tracks (rows)
const getTracks = async () => {
  try {
    const queryString = "SELECT * FROM music";
    const { rows } = await db.query(queryString);
    return rows;
  } catch (error) {
    console.error(error);
  }
};

// GET one track (row) & handles favourite status
const getTrack = async (id) => {
  try {
    const queryString = SQL`
    SELECT music.*, favourites.favourite_id
    FROM music 
    LEFT JOIN favourites ON music.track_id = favourites.track_id 
    WHERE music.track_id = ${id}`;
    const { rows } = await db.query(queryString);
    // rows is an array - fetching only 1 track thus 1st array obj
    const result = rows[0];
    return result;
  } catch (error) {
    console.error(error);
  }
};

// ADD track
const addTrack = async (
  title,
  artist,
  album,
  genre,
  year,
  image_url,
  duration,
  audio_url
) => {
  try {
    const formatedDuration = `00:${duration}`;
    const queryString = SQL`
    INSERT INTO music
    (title, artist, album, genre, year, image_url, duration, audio_url)
    VALUES (${title}, ${artist}, ${album}, ${genre}, ${year}, ${image_url}, ${formatedDuration}, ${audio_url})`;
    await db.query(queryString);
  } catch (error) {
    console.error(error);
  }
};

// DELETE track (row)
const deleteTrack = async (trackId) => {
  try {
    const queryString = SQL`
    DELETE FROM music WHERE track_id = ${trackId}`;
    await db.query(queryString);
  } catch (error) {
    console.error(error);
  }
};

//  get tables - playlists
const getTables = async () => {
  try {
    const queryString = SQL`
    SELECT table_name
    FROM information_schema.columns
    WHERE column_name = 'playlist'`;
    let { rows } = await db.query(queryString);
    return rows;
  } catch (error) {
    console.error(error);
  }
};

// add to playlist --> 'insert... conflict do nothing' handles/prevents duplicate records throwing error
// manually escape table name
const addToPlaylist = async (name, trackNum) => {
  try {
    const queryString = SQL`
    INSERT INTO `.append(escapeIdentifier(name))
    .append(SQL` (track_id) VALUES (${trackNum})
    ON CONFLICT (track_id) DO NOTHING`);
    await db.query(queryString);
  } catch (error) {
    console.error(error);
  }
};

//  remove from playlist
const removeFromPlaylist = async (name, id) => {
  try {
    const queryString = SQL`
    DELETE FROM `.append(escapeIdentifier(name))
    .append(SQL` WHERE track_id = ${id}`);
    await db.query(queryString);
  } catch (error) {
    console.error(error);
  }
};

//  Get Favourite tracks
const getAllFavouriteTracks = async () => {
  try {
    const queryString = SQL`
    SELECT music.*, favourites.favourite_id
    FROM music
    JOIN favourites
    ON music.track_id = favourites.track_id
    `;
    let { rows } = await db.query(queryString);
    return rows;
  } catch (error) {
    console.error(error);
  }
};

//  Add a Favourite track
const addFavouriteTrack = async (id) => {
  try {
    const queryString = SQL`
    INSERT INTO favourites (track_id)
    VALUES(${id})
    ON CONFLICT (track_id) DO NOTHING
    `;
    await db.query(queryString);
  } catch (error) {
    console.error(error);
  }
};

//  Delete a favourite track
const removeFavouriteTrack = async (id) => {
  try {
    const queryString = SQL`DELETE FROM favourites WHERE track_id = ${id}`;
    await db.query(queryString);
  } catch (error) {
    console.error(error);
  }
};

// get genre tracks
const getGenreLib = async (genre) => {
  try {
    const queryString = SQL`SELECT * FROM music WHERE genre = ${genre}`;
    const { rows } = await db.query(queryString);
    return rows;
  } catch (error) {
    console.error(error);
  }
};

// SEARCH - by letter input
const searchFunc = async (searchTerm) => {
  try {
    let text = searchTerm ? `${searchTerm}%` : "";
    const queryString = SQL`
    SELECT * FROM music
    WHERE artist LIKE ${text}
    OR title LIKE ${text}
    `;
    let { rows } = await db.query(queryString);
    return rows;
  } catch (error) {
    console.error(error);
  }
};

// Create playlist
const createPlaylist = async (name) => {
  try {
    const queryString = SQL`
    CREATE TABLE `.append(escapeIdentifier(name))
    .append(SQL` (
      track_number SERIAL,
      track_id INT UNIQUE,
      playlist BOOLEAN DEFAULT TRUE,
      created TIMESTAMP NOT NULL DEFAULT NOW(),
      PRIMARY KEY (track_number),
      FOREIGN KEY (track_id) REFERENCES music (track_id) ON DELETE CASCADE 
    )`);
    let { rows } = await db.query(queryString);
    return rows;
  } catch (error) {
    console.error(error);
    return error;
  }
};

// Delete playlist
const deletePlaylist = async (name) => {
  try {
    const queryString = SQL`DROP TABLE `.append(escapeIdentifier(name));
    await db.query(queryString);
  } catch (error) {
    console.error(error);
    return error
  }
};

// get playlist tracks
const getPlaylistTable = async (name) => {
  try {
    const queryString = SQL`
    SELECT music.*, track_number 
    FROM music
    INNER JOIN `
    .append(escapeIdentifier(name))
    .append(SQL` ON music.track_id = `)
    .append(escapeIdentifier(name))
    .append(SQL`.track_id`);
    let { rows } = await db.query(queryString);
    return rows;
  } catch (error) {
    console.error(error);
  }
};

// error handling with pool connection
db.on("error", (error) =>
  console.error("\x1b[31m%s\x1b[0m", "Error occured with database!", error)
);

db.on("connect", () =>
  console.log("\x1b[34m%s\x1b[0m", "Successfull database connection!")
);

export {
  getTrack,
  getTracks,
  addTrack,
  searchFunc,
  deleteTrack,
  getAllFavouriteTracks,
  addFavouriteTrack,
  removeFavouriteTrack,
  getTables,
  getPlaylistTable,
  addToPlaylist,
  removeFromPlaylist,
  getGenreLib,
  createPlaylist,
  deletePlaylist,
};
