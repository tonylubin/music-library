import Genre from "@/pages/genres/[genre]";
import { render, screen } from "@testing-library/react";
import { test, expect, describe } from "vitest";
import mockdata from '../database/mockdata.json';
import { mockPlaceholders } from "@/database/mockPlaceholders";


describe("Genre page", () => {

  const mockPlaceholdersRequired = mockPlaceholders.slice(-2)

  const selectedData = mockdata.filter(track => track.genre === 'house');

  const setup = () => {
    return render(<Genre data={selectedData} genre='house' placeHolders={mockPlaceholdersRequired} />)
  };

  test("type of music genre should be shown", () => {
    setup();
    const musicGenre = screen.getByText('house');
    expect(musicGenre).toHaveTextContent('house');
  })

  test("should render 'X' amount of cards avaliable for genre", () => {
    setup();
    const cards = screen.getAllByRole("link");
    expect(cards).toHaveLength(2);
  });

  test("if no tracks avaliable, display text 'Nothing found in your library'", () => {
    render(<Genre data={[]} genre={'indie'} placeHolders={[]} />)
    const cards = screen.queryAllByRole("link");
    const msg = screen.getByText('Nothing found in your library');
    expect(cards).not.toHaveLength();
    expect(msg).toBeInTheDocument();
  });

});
