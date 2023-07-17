import { deletePlaylist } from "@/database/musicLibrary";

export default async function handler(req,res) {
  try {
    const { tableName } = req.query;
    await deletePlaylist(tableName);
    res.status(200).json({ msg : `The playlist ${tableName} was deleted` });
    
  } catch (error) {
    res
    .status(500)
    .json({ error: "There was a problem adding with the server." }); 
  }
};