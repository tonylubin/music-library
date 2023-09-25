import { createPlaylist, deletePlaylist } from "@/database/musicLibrary";

export default async function handler(req,res) {
  try {
    const playlistName = req.body;

    if(req.method === "POST") {
      let playlistResponse = await createPlaylist(playlistName);
      if (playlistResponse[0].warningStatus) {
        return res.status(400).json({ msg : "Playlist with that name already exists"});
      } else {
        return res.status(200).json({ msg: "Playlist was created"});
      }      
    }

    if(req.method === "DELETE") {
      const { tableName } = req.query;
      await deletePlaylist(tableName);
      res.status(200).json({ msg: "Playlist was successfully deleted"});
    }
  
    // // get all table names in database
    // let [rows] = await db.query("SHOW tables");
    // let tablesArr = await rows.flatMap((table) => Object.values(table));
    // // check if playlist name exists
    // let searchPlaylists = await tablesArr.includes(playlistName) ?  true : false;
   
    // if (searchPlaylists === true) {
    //   res.status(400).send({ msg: `${playlistName.toUpperCase()} playlist already exists, choose another name!` });
    // }
    
    // if (searchPlaylists === false) {
    //   await createPlaylist(playlistName)
    //   res.status(200).json({ msg: `Playlist ${playlistName.toUpperCase()} was created` });
    // }

  } catch (error) {
    console.log(error)
    res
    .status(500)
    .json({ error: "There was a problem adding with the server." });
  }
};