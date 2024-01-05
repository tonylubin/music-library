import { render, screen } from "@testing-library/react";
import { test, expect, describe } from "vitest";
import mockdata from '../database/mockdata.json';
import MainCard from "@/components/MainCard";


describe('Main track card', () => {

  const data = {
    trackId: mockdata[0].track_id,
    title: mockdata[0].title,
    artist: mockdata[0].artist,
    imageUrl: mockdata[0].image_url,
    placeHolder: "data:image/png;base64,imagedata"
  }

  const setup = () => render(<MainCard {...data} />)

  test("displays track artist" , () => {
    setup();
    const trackArtist = screen.getByRole("heading", {level: 3});
    expect(trackArtist).toHaveTextContent(data.artist)
  });

  test("displays track title", () => {
    setup();
    const trackTitle = screen.getByText(data.title);
    expect(trackTitle).toBeInTheDocument();
  });

})