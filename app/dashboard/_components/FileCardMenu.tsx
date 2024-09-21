import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FileIcon, MoreVertical, StarHalf, StarIcon, TrashIcon } from "lucide-react";
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
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

interface IFileCardMenu {
  id: Id<"files">;
  url: string | null;
  hasLike: boolean;
}

const FileCardMenu: FC<IFileCardMenu> = ({ hasLike, id, url }) => {
  const toggleFavoriteMutation = useMutation(api.files.toggleFavorite);

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

  const toggleFavorite = () => {
    console.log("toggleFavorite");
    toggleFavoriteMutation({ fileId: id });
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

          <DropdownMenuItem onClick={toggleFavorite} className="flex gap-1 items-center cursor-pointer">
            <div className="flex gap-1 items-center">
              {hasLike ? (
                <>
                  <StarIcon className="w-4 h-4" /> Unfavorite
                </>
              ) : (
                <>
                  <StarHalf className="w-4 h-4" /> Favorite
                </>
              )}
            </div>
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
