import Track from "@/pages/track/[trackId]";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { test, expect, describe, vi } from "vitest";
import mockdata from '../database/mockdata.json';
import { mockPlaceholders, mockPlaylists } from "@/database/mockPlaceholders";
import * as mockfuncs from "@/utils/utils";


const trackInfo = mockdata[0];

const user = userEvent.setup();

describe("Individual track", () => {

  const setup = () => render(<Track trackData={trackInfo} placeHolders={mockPlaceholders[0]} playlistData={[]} />);

  test("renders track info", () => {
    setup();
    const title = screen.getByText(trackInfo.title);
    expect(title).toBeInTheDocument();
  });

  test("icon is green to show that track is a favourite", () => {
    setup();
    const favIcon = screen.getByLabelText("favourite");
    expect(favIcon).toBeInTheDocument();
  });

  test("menu flip card shows on nav button click", async () => {
    setup();
    const menuBtn = screen.getByRole("button", {name: 'menu'});
    user.click(menuBtn);
    const menu = await screen.findByText("Delete from Library");
    expect(menu).toBeInTheDocument();
  });

});

describe("playlist menu", () => {

  const setup = () => render(<Track trackData={trackInfo} placeHolders={mockPlaceholders[0]} playlistData={[]} />);

  test("click on 'add to playlist' displays playlist menu", async () => {
    setup();
    const menuBtn = screen.getByRole("button", {name: 'menu'});
    user.click(menuBtn);
    const addPlaylist = await screen.findByText("Add to playlist");
    await user.click(addPlaylist);
    const playlists = await screen.findByRole("heading", {level: 3});
    expect(playlists).toBeInTheDocument();
  });

  test("click on 'remove from playlist' displays playlist menu and available playlists", async () => {
    render(<Track trackData={trackInfo} placeHolders={mockPlaceholders[0]} playlistData={mockPlaylists} />);
    const menuBtn = screen.getByRole("button", {name: 'menu'});
    user.click(menuBtn);
    const addPlaylist = await screen.findByText("Remove from playlist");
    await user.click(addPlaylist);
    const playlistName = await screen.findByText('summer mix');
    expect(playlistName).toBeInTheDocument();
  });

  test("clicking on 'set as favourite', displays fav icon", async () => {
    setup();
    const menuBtn = screen.getByRole("button", {name: 'menu'});
    user.click(menuBtn);
    const setFav = await screen.findByText('Set as favourite');
    await user.click(setFav);
    const favIcon = await screen.findByLabelText("favourite");
    expect(favIcon).toBeInTheDocument();
  });

  test("clicking on 'remove as favourite', confirmed with toast notification", async () => {
    const toast = vi.spyOn(mockfuncs, 'destroyNotification');
    setup();
    const menuBtn = screen.getByRole("button", {name: 'menu'});
    user.click(menuBtn);
    const unsetFav = await screen.findByText('Unset as favourite');
    await user.click(unsetFav);
    let msg = "Track, with id: 1, was removed from your favourites list";
    expect(toast).toHaveBeenCalledWith(msg);
  });

});

describe("audio player", () => {

  const setup = () => render(<Track trackData={trackInfo} placeHolders={mockPlaceholders[0]} playlistData={[]} />);

  test("clicking on forward button updates progress bar accordingly", async () => {
    setup();
    const seekForward = screen.getByLabelText('skip-forward');
    await user.click(seekForward);
    const bar = await screen.findByLabelText('progress-bar');
    expect(bar).toHaveStyle('width : 10%');
  })
})