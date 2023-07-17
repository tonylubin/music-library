import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus } from "lucide-react"
import Form from "./Form"


export default function CreateDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="icon" className="bg-transparent hover:bg-transparent">
          <Plus className="text-indigo-500 h-full w-full" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-black border-indigo-500">
        <DialogHeader>
          <DialogTitle className="text-indigo-500">Create a playlist</DialogTitle>
        </DialogHeader>
        <Form />
      </DialogContent>
    </Dialog>
  )
};