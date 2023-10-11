import { getAllFavouriteTracks } from "@/database/musicLib";

export default async function handler(req,res) {
  try {    
    const result = await getAllFavouriteTracks();
    res.status(200).json(result);     
  } catch (error) {
    console.log(error)
    res
    .status(500)
    .json({ error: "There was a problem adding with the server." });
  }
};