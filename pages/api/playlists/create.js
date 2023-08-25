import { createPlaylist, db } from "@/database/musicLibrary";

export default async function handler(req,res) {
  try {
    const playlistName = req.body;
    // get all table names in database
    let [rows] = await db.query("SHOW tables");
    let tablesArr = await rows.flatMap((table) => Object.values(table));
    // check if playlist name exists
    let searchPlaylists = await tablesArr.includes(playlistName) ?  true : false;
   
    if (searchPlaylists === true) {
      res.status(400).send({ msg: `${playlistName.toUpperCase()} playlist already exists, choose another name!` });
    }
    
    if (searchPlaylists === false) {
      await createPlaylist(playlistName)
      res.status(200).json({ msg: `Playlist ${playlistName.toUpperCase()} was created` });
    }

  } catch (error) {
    res
    .status(500)
    .json({ error: "There was a problem adding with the server." });
  }
};