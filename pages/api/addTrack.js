import { addTrack } from "@/database/musicLibrary";
import { capitaliseWord } from "@/utils/utils";

export default async function handler(req, res) {
  try {
    let { title, artist, album, genre, year, imageUrl } = req.body;

    await addTrack(title, artist, album, genre, year, imageUrl);

    let trackTitle = capitaliseWord(title);
    let trackArtist = capitaliseWord(artist);

    res.status(200).json({ trackTitle, trackArtist });
  } catch (err) {
    res
      .status(500)
      .json({ error: "There was a problem adding with the server." });
  }
}
