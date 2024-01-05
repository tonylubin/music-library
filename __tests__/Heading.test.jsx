import Heading from "@/components/Heading";
import { render, screen } from "@testing-library/react";
import { test, expect, describe } from "vitest";

describe("Heading", () => {

  const setup = () => render(<Heading />)

  test("renders heading with red text", () => {
    setup();
    const heading = screen.getByRole("heading");
    expect(heading).toHaveTextContent(/^The Vinyl Lib.$/);
    expect(heading).toHaveClass('text-primaryRed');
  })
})