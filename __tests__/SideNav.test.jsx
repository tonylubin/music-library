import SideNav from "@/components/SideNav";
import { render, screen } from "@testing-library/react";
import { test, expect, describe } from "vitest";
import mockRouter from 'next-router-mock';


describe("Side Navigation", () => {

  const setup = () => render(<SideNav />)

  test("should render links", () => {    
    setup();
    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(6);
  });

  test("link should have a name" , () => {
    setup();
    const name = screen.getByText('Library');
    expect(name).toHaveTextContent(/^Library$/);
  });

  test("link icon renders", () => {
    setup();
    const icon = screen.getByTitle('home');
    expect(icon).toBeInTheDocument();
  });

  test("current link & page selected is highlighted in red", () => {
    mockRouter.pathname = '/search';
    setup();
    const link = screen.getByTestId('link-search');
    expect(link).toHaveClass('text-primaryRed');
  })

})