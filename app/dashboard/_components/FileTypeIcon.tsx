import { Doc } from "@/convex/_generated/dataModel";
import { FileArchiveIcon, FileImageIcon, FileSpreadsheetIcon, FileTextIcon, LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

const fileTypeIcons: Record<Doc<"files">["type"], LucideIcon> = {
  image: FileImageIcon,
  csv: FileSpreadsheetIcon,
  pdf: FileTextIcon,
  txt: FileTextIcon,
  zip: FileArchiveIcon,
};

interface IFileTypeIcon {
  type: Doc<"files">["type"];
  className?: string;
}

const FileTypeIcon = ({ type, className }: IFileTypeIcon) => {
  const Icon = fileTypeIcons[type];

  return <Icon className={cn("h-5 w-5", className)} />;
};

export default FileTypeIcon;
