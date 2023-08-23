export default async function handler(req, res) {
  try {
    let { title, artist, album, genre, year, imageUrl, duration, audioUrl } = req.body;
    let formDetails = {
      TITLE: title,
      ARTIST: artist,
      ALBUM: album,
      GENRE: genre,
      YEAR: year,
      DURATION: duration,
      IMAGE: imageUrl,
      MUSIC: audioUrl,
    }
    console.log(formDetails)
    res.status(200).json({ title, artist });
  } catch (err) {
    res
      .status(500)
      .json({ error: "There was a problem adding with the server." });
  }
}