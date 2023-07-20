import { addToPlaylist, removeFromPlaylist } from "@/database/musicLibrary";


export default async function handler(req, res) {
  try {

    if(req.method === 'POST') {
      let { name, trackNum } = req.body;
      await addToPlaylist(name, trackNum);
      res.status(200).json({ msg: `Track was added to the playlist - ${name}`});
    };

    if(req.method === 'DELETE') {
      let {name, id} = req.query;
      await removeFromPlaylist(name, id);
      res.status(200).json({ msg: `Track was deleted from the playlist - ${name.toUpperCase()}`});
    }
    
  } catch (error) {
    res
    .status(500)
    .json({ error: "There was a problem adding with the server." });
  }
}; 