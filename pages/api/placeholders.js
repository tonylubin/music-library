import { cloudinaryBasePath } from "@/utils/utils";
import { getPlaiceholder } from "plaiceholder";

export default async function handler(req, res) {

  // Function -- handle getting placholder(s) for remote images
  const getPlaceHolders = async (arr) => {
    const imgUrls = arr.map((url) => {
      const filePath = `${cloudinaryBasePath}/${url}`;
      return filePath;
    });

    const fetchedImgs = await Promise.all(
      imgUrls.map(async (imgUrl) => {
        let trackImg = await fetch(imgUrl);
        return trackImg;
      })
    );

    const buffers = await Promise.all(
      fetchedImgs.map(async (img) => {
        const imgFile = await img.arrayBuffer();
        return Buffer.from(imgFile);
      })
    );

    const placeHolders = await Promise.all(
      buffers.map(async (buffer) => {
        const { base64 } = await getPlaiceholder(buffer);
        return base64;
      })
    );

    return placeHolders;
  };


  try {

    const imgUrlData = req.body;

    const placeHolders = await getPlaceHolders(imgUrlData); 

    res.status(200).json({ placeHolders });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "There was a problem with handling image placeholders." });
  }
};