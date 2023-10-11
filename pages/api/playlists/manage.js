import { createPlaylist, deletePlaylist } from "@/database/musicLib";

export default async function handler(req,res) {
  try {
    const playlistName = req.body;

    if(req.method === "POST") {
      let playlistResponse = await createPlaylist(playlistName);   
      if (playlistResponse.name === 'error') {
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
  } catch (error) {
    console.log(error)
    res
    .status(500)
    .json({ error: "There was a problem adding with the server." });
  }
};