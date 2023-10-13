import { searchFunc } from "@/database/musicLib";

export default async function handler(req, res) {
  try {
    let searchTerm = req.query;
    let searchResults = await searchFunc(searchTerm);

    res.status(200).json({searchResults});
  } catch (err) {
    res
      .status(500)
      .json({ error: "There was a problem with the server." });
  }
}
