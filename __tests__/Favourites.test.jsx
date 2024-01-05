import { render, screen } from "@testing-library/react";
import { test, expect, describe } from "vitest";
import mockdata from '../database/mockdata.json';
import Favourites from "@/pages/favourites";
import { mockPlaceholders } from "@/database/mockPlaceholders";


describe("Favourites page", () => {

  // only require 3 array items
  const mockPlaceHoldersRequired = mockPlaceholders.slice(-3);

  const favTracks = mockdata.filter(track => track.favourite === true);

  const setup = () => render(<Favourites data={favTracks} placeHolders={mockPlaceHoldersRequired} />);

  test("should render correct amount favourites", () => {
    setup();
    const cards = screen.getAllByRole("link");
    expect(cards).toHaveLength(3);
  });

  
})