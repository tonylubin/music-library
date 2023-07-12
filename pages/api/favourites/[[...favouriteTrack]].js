import { addFavouriteTrack, removeFavouriteTrack } from "@/database/musicLibrary";

export default async function handler(req, res) {
  try {
    if(req.method === "POST") {
      let { id } = req.body;
      await addFavouriteTrack(id);
      res.status(200).json({ msg: "Track added to your favourites list." });
    } 

    if(req.method === "DELETE") {
      let favTrackId = req.query.favouriteTrack; 
      await removeFavouriteTrack(favTrackId);
      res.status(200).json({ msg: "Track removed from your favourites list." });
    }
  } catch (err) {
    res
      .status(500)
      .json({ error: "There was a problem adding with the server." });
  }
};