import {
  Star,
  StarOff,
  XCircle,
  Plus,
  ListMusic,
  ChevronDown,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

function DropDownMenu({
  removeFromFavourites,
  addToFavourites,
  trackId,
  playlistData,
  removeFromPlaylist,
  addToPlaylist
}) {

  // get playlists - remove function 
  const removeFuncPlaylistTables = playlistData.map((table, index) => (
    <DropdownMenuItem
      key={index}
      className="hover:bg-slate-200 rounded-lg"
    >
      <ListMusic className="mr-2 h-4 w-4" />
      <span onClick={() => removeFromPlaylist(table.TABLE_NAME,trackId)}>{table.TABLE_NAME}</span>
    </DropdownMenuItem>
  ));

  //  get playlists - add function
  const addFuncPlaylistTables = playlistData.map((table, index) => (
    <DropdownMenuItem
      key={index}
      className="hover:bg-slate-200 rounded-lg"
    >
      <ListMusic className="mr-2 h-4 w-4" />
      <span onClick={() => addToPlaylist(table.TABLE_NAME,trackId)}>{table.TABLE_NAME}</span>
    </DropdownMenuItem>
  ));

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 py-4 pl-4 bg-neutral-50">
        <DropdownMenuGroup>
          <DropdownMenuItem className="hover:cursor-pointer hover:bg-slate-200 rounded-lg">
            <Star className="mr-2 h-4 w-4" />
            <span onClick={() => addToFavourites(trackId)}>
              Set as favourite
            </span>
          </DropdownMenuItem>
          <DropdownMenuItem className="hover:cursor-pointer hover:bg-slate-200 rounded-lg">
            <StarOff className="mr-2 h-4 w-4" />
            <span onClick={() => removeFromFavourites(trackId)}>
              Unset as favourite
            </span>
          </DropdownMenuItem>
          <DropdownMenuSeparator className="bg-slate-300 mr-4" />
          <DropdownMenuSub>
            <DropdownMenuSubTrigger className="hover:bg-slate-200 rounded-lg">
              <Plus className="mr-2 h-4 w-4" />
              <span>Add to playlist</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent className="bg-neutral-50">
                {addFuncPlaylistTables}
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger className="hover:bg-slate-200 rounded-lg">
              <XCircle className="mr-2 h-4 w-4" />
              <span>Remove from playlist</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent className="bg-neutral-50">
                {removeFuncPlaylistTables}
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default DropDownMenu;
