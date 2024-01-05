import Playlists from "@/pages/playlists";
import { render, screen } from "@testing-library/react";
import { test, expect, describe } from "vitest";
import userEvent from "@testing-library/user-event";
import { mockPlaylists } from "@/database/mockPlaceholders";

// set up user event & render
const user = userEvent.setup();

const setup = () => render(<Playlists data={mockPlaylists} />)

describe("Playlists page - cards", () => {

  test("should render 2 playlists", () => {
    setup();
    const playlist = screen.getAllByRole("link");
    expect(playlist).toHaveLength(2);
  });

  test("should display playlist name", () => {
    setup();
    const playlistName = screen.getByText('winter mix');
    expect(playlistName).toHaveTextContent(mockPlaylists[1].table_name);
  })

  test("should render 'create playlist card'", () => {
    setup();
    const createCard = screen.getByText('Create a playlist');
    expect(createCard).toBeInTheDocument();
  });

});

describe("playlist - creation" , () => {

  test("create modal should appear when '+' button is clicked", async () => {
    setup();
    const addBtn = screen.getByLabelText('create');
    await user.click(addBtn);
    const modalHeading = await screen.findByRole("heading", {level: 3});
    expect(modalHeading).toBeInTheDocument();
  });

  test("modal should close by clicking away", async () => {
    setup();
    const addBtn = screen.getByLabelText('create');
    await user.click(addBtn);
    const backdrop = await screen.findByTestId('backdrop');
    await user.click(backdrop);
    expect(backdrop).not.toBeInTheDocument();
  });
  
  // bug in msw fetch call for node.js - due to relative url thus need absolute url
  // e.g add base url to api route url http://localhost:3000
  test("should display a successful message on playlist creation", async () => {
    setup();
    const addBtn = screen.getByLabelText('create');
    await user.click(addBtn);
    const formInput = await screen.findByLabelText('Enter playlist name');
    await user.type(formInput, 'example');
    const btn = screen.getByRole("button", {name: 'Create'});
    await user.click(btn);
    const successMsg = await screen.findByTestId('playlist-success');
    expect(successMsg).toHaveTextContent('Playlist was created');
    const closeBtn = screen.getByText('Close'); 
    expect(closeBtn).toBeInTheDocument();
  });

  test("should display a error message on unsuccessful playlist creation", async () => {
    setup();
    const addBtn = screen.getByLabelText('create');
    await user.click(addBtn);
    const formInput = await screen.findByLabelText('Enter playlist name');
    await user.type(formInput, 'winter mix');
    const btn = screen.getByRole("button", {name: 'Create'});
    await user.click(btn);
    const errorMsg = await screen.findByTestId('playlist-error');
    expect(errorMsg).toHaveTextContent('Playlist with that name already exists');
  });

});

describe("playlist - deletion", () => {

  test("on click delete modal should render", async () => {
    setup();
    const deleteBtn = screen.getAllByRole("button", {name: 'delete'});
    // 2 card thus array of results
    user.click(deleteBtn[0]);
    const modal = await screen.findByRole("heading", {level: 3});
    expect(modal).toBeInTheDocument();  
  });

  test("backdrop renders & clicking on it should close modal", async () => {
    setup();
    const deleteBtn = screen.getAllByRole("button", {name: 'delete'});
    user.click(deleteBtn[0]);
    const backdrop = await screen.findByTestId('backdrop');
    const modal = await screen.findByRole("heading", {level: 3});
    expect(backdrop).toBeInTheDocument();
    await user.click(backdrop);    
    expect(modal).not.toBeInTheDocument();
  });

  test("delete confirmation message on successfull deletion", async () => {
    render(<Playlists data={[mockPlaylists[0]]} />);
    const deleteBtn = screen.getByRole("button", {name: /delete/i });
    await user.click(deleteBtn);
    const confirmBtn = await screen.findByRole("button",{name: /confirm/i});
    await user.click(confirmBtn);
    const msgConfirmation = await screen.findByTestId('message-deleted');
    expect(msgConfirmation).toHaveTextContent("Playlist was successfully deleted");
  })

});