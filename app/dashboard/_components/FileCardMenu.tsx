import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FileIcon, MoreVertical, TrashIcon } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { FC, useState } from "react";

interface IFileCardMenu {
  id: string;
  url: string | null;
}

const FileCardMenu: FC<IFileCardMenu> = ({ id, url }) => {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  // todo: async to show toast after delete?
  const deleteHandler = () => {
    console.log("Delete file...", id);
    // todo: delete and toast
  };

  const loadHandler = () => {
    console.log("Load ", url);
    if (url) window.open(url, "_blank");
  };

  return (
    <>
      <AlertDialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action will mark the file for our deletion process. Files are deleted periodically
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={deleteHandler}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <DropdownMenu>
        <DropdownMenuTrigger>
          <MoreVertical />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={loadHandler} className="flex gap-1 items-center cursor-pointer">
            <FileIcon className="w-4 h-4" /> Open New Tab
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          {/* todo: protect this function */}
          <DropdownMenuItem onClick={() => setIsConfirmOpen(true)} className="flex gap-1 items-center cursor-pointer">
            <div className="flex gap-1 text-red-600 items-center cursor-pointer">
              <TrashIcon className="w-4 h-4" /> Delete
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default FileCardMenu;
