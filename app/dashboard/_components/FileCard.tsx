import { FC } from "react";
import Image from "next/image";
import { Doc } from "@/convex/_generated/dataModel";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import FileCardMenu from "./FileCardMenu";
import FileTypeIcon from "./FileTypeIcon";

interface IFileCard {
  file: Doc<"files"> & { url: string | null };
  hasLike: boolean;
}

const FileCard: FC<IFileCard> = ({ file, hasLike }) => (
  <Card>
    <CardHeader className="relative">
      <CardTitle className="flex gap-2 text-base font-normal">
        <div className="flex justify-center">
          <FileTypeIcon type={file.type} />
        </div>
        {file.name}
      </CardTitle>
      <div className="absolute top-2 right-2">
        <FileCardMenu id={file._id} url={file.url} hasLike={hasLike} />
      </div>
    </CardHeader>
    <CardContent className="h-[200px] flex justify-center items-center">
      {file.type === "image" && file.url && <Image alt={file.name} width="200" height="100" src={file.url} />}
      {file.type !== "image" && <FileTypeIcon type={file.type} className="h-20 w-20" />}
    </CardContent>
    {/* <CardFooter className="flex justify-between">CardFooter</CardFooter> */}
  </Card>
);

export default FileCard;
