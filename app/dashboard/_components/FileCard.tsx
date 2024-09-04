import { FC, ReactNode } from "react";
import Image from "next/image";
import { Doc } from "@/convex/_generated/dataModel";
import { FileTextIcon, GanttChartIcon, ImageIcon } from "lucide-react";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const typeIcons = {
  image: <ImageIcon />,
  pdf: <FileTextIcon />,
  csv: <GanttChartIcon />,
} as Record<Doc<"files">["type"], ReactNode>;

interface IFileCard {
  file: Doc<"files"> & { url: string | null };
  hasLike: boolean;
}

const FileCard: FC<IFileCard> = ({ file }) => (
  <Card>
    <CardHeader className="relative">
      <CardTitle className="flex gap-2 text-base font-normal">
        <div className="flex justify-center">{typeIcons[file.type]}</div> {file.name}
      </CardTitle>
      <div className="absolute top-2 right-2">todo: Actions</div>
    </CardHeader>
    <CardContent className="h-[200px] flex justify-center items-center">
      {file.type === "image" && file.url && <Image alt={file.name} width="200" height="100" src={file.url} />}
      {file.type === "csv" && <GanttChartIcon className="w-20 h-20" />}
      {file.type === "pdf" && <FileTextIcon className="w-20 h-20" />}
    </CardContent>
    <CardFooter className="flex justify-between">CardFooter</CardFooter>
  </Card>
);

export default FileCard;
