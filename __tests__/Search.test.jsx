import Search from "@/pages/search";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { test, expect, describe, vi } from "vitest";
import mockRouter from 'next-router-mock';
import { mockPlaceholders } from "@/database/mockPlaceholders";
import mockdata from '../database/mockdata.json';


const user = userEvent.setup();

const setup = () => render(<Search searchResults={[]} query={''} />)

describe("Search page", () => {

  test("initially starts with a 'awaiting...' message", () => {
    setup();
    const startupMsg = screen.getByText('Awaiting search query...')
    expect(startupMsg).toBeInTheDocument();
  });

  test("search form", async () => {
    setup();
    const input = screen.getByRole("textbox");
    await user.type(input, 's');    
    expect(input).toHaveValue('s');
  });

  test("search request query is set to url", async () => {
    setup();
    const input = screen.getByRole("textbox");
    await user.type(input, 's');
    const searchBtn = screen.getByText('Search');
    await user.click(searchBtn);
    expect(mockRouter.asPath).toBe("/search?term=s");
  });

  test("page displays correct number of search results", () => {
    const results = mockdata.filter((track) => {
      const song = track.title.startsWith('s') || track.artist.startsWith('s');
      return song;
    });
    const placeholders = mockPlaceholders.slice(-parseInt(results.length));

    render(<Search searchResults={results} placeHolders={placeholders} query={'s'} />);
    const cards = screen.getAllByRole("link");
    expect(cards).toHaveLength(2);
  });

  test("no results message displayed when no searches found", () => {
    const results = mockdata.filter((track) => {
      const song = track.title.startsWith('z') || track.artist.startsWith('z');
      return song;
    });
    const placeholders = mockPlaceholders.slice(-parseInt(results.length));

    render(<Search searchResults={results} placeHolders={placeholders} query={'z'} />);
    const msg = "Sorry, no results were found that matched your query!";
    const noResMsg = screen.getByText(msg);
    expect(noResMsg).toBeInTheDocument();
  });

})

describe("Search bar", () => {

  test("renders search bar input", () => {
    setup();
    const searchBar = screen.getByPlaceholderText('Search artist/title...')
    expect(searchBar).toBeInTheDocument();
  });

  test("on click search button indicates searching", async () => {
    setup();
    const searchBtn = screen.getByText('Search');
    user.click(searchBtn);
    const searchingBtn = await screen.findByText("Searching...");
    expect(searchingBtn).toBeInTheDocument();
  })
})