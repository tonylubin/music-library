const format = require('pg-format');
import { sql } from "@vercel/postgres";

// GET all tracks (rows)
const getTracks = async () => {
  try {
    const { rows } = await sql`SELECT * FROM music;`;
    return rows;
  } catch (error) {
    console.error(error);
  }
};

// GET one track (row) & handles favourite status
const getTrack = async (id) => {
  try {
    const { rows } = await sql`
    SELECT music.*, favourites.favourite_id
    FROM music 
    LEFT JOIN favourites ON music.track_id = favourites.track_id 
    WHERE music.track_id = ${id};`;
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
    const queryString = sql`
    INSERT INTO music
    (title, artist, album, genre, year, image_url, duration, audio_url)
    VALUES (${title}, ${artist}, ${album}, ${genre}, ${year}, ${image_url}, ${formatedDuration}, ${audio_url});`;
    await db.query(queryString);
  } catch (error) {
    console.error(error);
  }
};

// DELETE track (row)
const deleteTrack = async (trackId) => {
  try {
    const queryString = sql`
    DELETE FROM music WHERE track_id = ${trackId};`;
    await db.query(queryString);
  } catch (error) {
    console.error(error);
  }
};

//  get tables - playlists
const getTables = async () => {
  try {
    const colName = 'playlist';
    const { rows } = await sql`
    SELECT table_name
    FROM information_schema.columns
    WHERE column_name = ${colName};`;
    return rows;
  } catch (error) {
    console.error(error);
  }
};

// add to playlist --> 'insert... conflict do nothing' handles/prevents duplicate records throwing error
// manually escape table name
const addToPlaylist = async (name, trackNum) => {
  try {
    const queryString = format('INSERT INTO %1$I (track_id) VALUES (%2$L) ON CONFLICT (track_id) DO NOTHING', name, trackNum);
    const formatQueryString = queryString.replace(`'${trackNum}'`, trackNum);
    await sql.query(formatQueryString);
  } catch (error) {
    console.error(error);
  }
};

//  remove from playlist
const removeFromPlaylist = async (name, id) => {
  try {
    const queryString = format('DELETE FROM %1$I WHERE track_id = %2$L', name, id);
    // string to number for id param
    const formatQueryString = queryString.replace(`'${id}'`, id);
    await sql.query(formatQueryString);
  } catch (error) {
    console.error(error);
  }
};

//  Get Favourite tracks
const getAllFavouriteTracks = async () => {
  try {
    const { rows } = await sql`
    SELECT music.*, favourites.favourite_id
    FROM music
    JOIN favourites
    ON music.track_id = favourites.track_id;    
    `;
    return rows;
  } catch (error) {
    console.error(error);
  }
};

//  Add a Favourite track
const addFavouriteTrack = async (id) => {
  try {
    await sql`
    INSERT INTO favourites (track_id)
    VALUES(${id})
    ON CONFLICT (track_id) DO NOTHING;
    `;
  } catch (error) {
    console.error(error);
  }
};

//  Delete a favourite track
const removeFavouriteTrack = async (id) => {
  try {
    await sql`DELETE FROM favourites WHERE track_id = ${id};`;
  } catch (error) {
    console.error(error);
  }
};

// get genre tracks
const getGenreLib = async (genre) => {
  try {
    const { rows } = await sql`SELECT * FROM music WHERE genre = ${genre};`;
    return rows;
  } catch (error) {
    console.error(error);
  }
};

// SEARCH - by letter input
const searchFunc = async (searchTerm) => {
  try {
    let text = searchTerm ? `${searchTerm}%` : "";
    const { rows } = await sql`
    SELECT * FROM music
    WHERE artist LIKE ${text}
    OR title LIKE ${text};
    `;
    return rows;
  } catch (error) {
    console.error(error);
  }
};

// Create playlist
const createPlaylist = async (name) => {
  try {
    const queryString = format(`
    CREATE TABLE %I (
      track_number SERIAL,
      track_id INT UNIQUE,
      playlist BOOLEAN DEFAULT TRUE,
      PRIMARY KEY (track_number),
      FOREIGN KEY (track_id) REFERENCES music (track_id) ON DELETE CASCADE
    )`, name);  
    const { rows } = await sql.query(queryString);
    return rows;
  } catch (error) {
    console.error(error);
    return error;
  }
};

// Delete playlist
const deletePlaylist = async (name) => {
  try {
    const queryString = format('DROP TABLE %I', name);
    await sql.query(queryString);
  } catch (error) {
    console.error(error);
    return error
  }
};

// get playlist tracks
const getPlaylistTable = async (name) => {
  try {
    const queryString = format(`
    SELECT music.*, track_number
    FROM music
    INNER JOIN %1$I
    ON music.track_id = %1$I.track_id`, name);
    const { rows } = await sql.query(queryString);
    return rows;
  } catch (error) {
    console.error(error);
  }
};


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
