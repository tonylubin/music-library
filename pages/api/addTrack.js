import { addTrack } from "@/database/musicLibrary";

export default async function handler(req, res) {
  try {
    let { title, artist, album, genre, year, imageUrl, duration, audioUrl } = req.body;
  
    await addTrack(title, artist, album, genre, year, imageUrl, duration, audioUrl);

    res.status(200).json({ artist, title });
  } catch (err) {
    res
      .status(500)
      .json({ error: "There was a problem adding with the server." });
  }
}
