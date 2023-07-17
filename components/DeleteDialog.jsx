import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { XCircle } from "lucide-react"


export default function DeleteDialog({ playlistName, removePlaylist }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="h-5 w-5" className="rounded-full">
          <XCircle className="text-indigo-500"/>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-black border-indigo-500">
        <DialogHeader>
          <DialogTitle className="text-indigo-500">Delete Playlist</DialogTitle>
          <DialogDescription className="text-neutral-300">
           Do you want to remove the playlist <span className="uppercase text-indigo-500 underline px-1">{playlistName} </span>from your library? To delete this playlist press confirm.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button type="submit" className="bg-indigo-500 hover:bg-indigo-400 hover:text-black" onClick={() => removePlaylist(playlistName)} >Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
};
