import { FC } from "react";
import { Doc } from "@/convex/_generated/dataModel";

import FileCardMenu from "./FileCardMenu";
import FileTypeIcon from "./FileTypeIcon";

type FileRow = Doc<"files"> & { url: string | null };

interface IFilesTable {
  files: FileRow[];
}

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "short",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

const FilesTable: FC<IFilesTable> = ({ files }) => (
  <div className="w-full overflow-x-auto rounded-lg border bg-card">
    <table className="w-full min-w-[720px] table-fixed text-sm">
      <thead className="border-b bg-muted/50 text-left text-muted-foreground">
        <tr>
          <th className="w-[48%] px-4 py-3 font-medium">Name</th>
          <th className="w-[16%] px-4 py-3 font-medium">Type</th>
          <th className="w-[26%] px-4 py-3 font-medium">Uploaded</th>
          <th className="w-[10%] px-4 py-3 text-right font-medium">Actions</th>
        </tr>
      </thead>
      <tbody>
        {files.map((file) => (
          <tr key={file._id} className="border-b last:border-b-0 hover:bg-muted/40">
            <td className="px-4 py-3">
              <div className="flex min-w-0 items-center gap-3">
                <FileTypeIcon type={file.type} className="shrink-0 text-muted-foreground" />
                <span className="truncate font-medium">{file.name}</span>
              </div>
            </td>
            <td className="px-4 py-3 uppercase text-muted-foreground">{file.type}</td>
            <td className="px-4 py-3 text-muted-foreground">{dateFormatter.format(new Date(file._creationTime))}</td>
            <td className="px-4 py-3">
              <div className="flex justify-end">
                <FileCardMenu id={file._id} url={file.url} hasLike={false} />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default FilesTable;
