import { render, screen } from "@testing-library/react";
import { test, expect, describe } from "vitest";
import mockdata from "../database/mockdata.json";
import Library from "@/pages/library";
import { mockPlaceholders } from "@/database/mockPlaceholders";
import MusicCard from "@/components/MusicCard";


describe("Library page", () => {
  
  test("should render 'X' amount of cards in database", () => {
    render(<Library data={mockdata} placeHolders={mockPlaceholders} />);
    const cards = screen.getAllByRole("link");
    expect(cards).toHaveLength(7);
  });

  test("music card should display correct track details", () => {
    const { track_id, title, artist, image_url } = mockdata[0];

    render(
      <MusicCard
        trackId={track_id}
        title={title}
        artist={artist}
        imageUrl={image_url}
        placeHolder={mockPlaceholders[0]}
      />
    );

    const artistName = screen.getByRole("heading", { level: 3 });
    const titleTrack = screen.getByText(title);
    expect(titleTrack).toHaveTextContent("treat me right");
    expect(artistName).toHaveTextContent("kim english");
  });

});
