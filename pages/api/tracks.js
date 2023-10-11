import { addTrack, deleteTrack } from "@/database/musicLib";

export default async function handler(req,res) {
  try {

    if(req.method === "POST") {
      let { title, artist, album, genre, year, imageUrl, duration, audioUrl } = req.body;
  
      await addTrack(title, artist, album, genre, year, imageUrl, duration, audioUrl);
  
      res.status(200).json({ artist, title });     
    }

    if(req.method === "DELETE") {
      let { trackNum } = req.query;
      // query params is typeof string thus convert to number
      await deleteTrack(trackNum);
      let msg = "The track was successfully deleted from your Library.";
      res.status(200).json({ msg });
    }

  } catch (error) {
    console.log(error)
    res
    .status(500)
    .json({ error: "There was a problem adding with the server." });
  }
};