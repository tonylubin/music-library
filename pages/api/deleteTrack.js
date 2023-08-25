import { deleteTrack } from "@/database/musicLibrary";

export default async function handler(req, res) {
  try {
    let { trackNum } = req.query;
    // query params is typeof string thus convert to number
    await deleteTrack(trackNum);
    let msg = "The track was successfully deleted from your Library.";
    res.status(200).json({ msg });
  } catch (err) {
    res
      .status(500)
      .json({ error: "There was a problem with the server." , err});
  }
}