import { render, screen } from "@testing-library/react";
import { test, expect, describe } from "vitest";
import Home from "@/pages/home";
import data from '../database/homePageData.json';
import userEvent from "@testing-library/user-event";
import { mockPlaceholders } from '../database/mockPlaceholders';


describe("Home Page", () => {

  const user = userEvent.setup();

  const setup = () => {
    return render(<Home data={data} placeHolders={mockPlaceholders} />)
  };

  test("renders all home card components", () => {
    setup();
    const cards = screen.getAllByRole("link");   
    expect(cards).toHaveLength(7);
  });

  test("renders genre name", () => {
    setup();
    const cardName = screen.getByText(data[0].genre); 
    expect(cardName).toHaveTextContent(/house/i);
  })

  test("on hover styles applied", () => {
    setup();
    const cards = screen.getAllByRole("link");
    const card = cards[0];  
    user.hover(card);
    expect(card).toHaveClass('hover:scale-95 hover:bg-neutral-50 hover:opacity-80');
  })
})