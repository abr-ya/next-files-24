"use client";

import { useOrganization, useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { GridIcon, Loader2, RowsIcon } from "lucide-react";
import { FC, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Doc } from "../../../convex/_generated/dataModel";
import SearchBar from "./SearchBar";
import TypeSelect from "./TypeSelect";
import EmptyResult from "./EmptyResult";
import UploadContainer from "./UploadContainer";
import FileCard from "./FileCard";

interface IFileList {
  title: string;
  onlyLiked?: boolean;
}

const FileList: FC<IFileList> = ({ title }) => {
  const organization = useOrganization();
  const user = useUser();
  const [query, setQuery] = useState("");
  const [type, setType] = useState<Doc<"files">["type"] | "all">("all");

  let ownerId: string | undefined = undefined;
  if (organization.isLoaded && user.isLoaded) {
    ownerId = organization.organization?.id ?? user.user?.id;
  }

  const files = useQuery(api.files.getFiles, ownerId ? { ownerId, query } : "skip");
  const isLoading = files === undefined;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">{title}</h1>
        <SearchBar query={query} setQuery={setQuery} />
        <UploadContainer />
      </div>

      <Tabs defaultValue="grid">
        <div className="flex justify-between items-center">
          <TabsList className="mb-2">
            <TabsTrigger value="grid" className="flex gap-2 items-center">
              <GridIcon />
              Grid
            </TabsTrigger>
            <TabsTrigger value="table" className="flex gap-2 items-center">
              <RowsIcon /> Table
            </TabsTrigger>
          </TabsList>

          {/* todo: TypeSelect */}
          <TypeSelect type={type} setType={setType} />
        </div>

        {isLoading && (
          <div className="flex flex-col gap-8 w-full items-center mt-24">
            <Loader2 className="h-32 w-32 animate-spin text-gray-500" />
            <div className="text-2xl">Loading your files...</div>
          </div>
        )}

        <TabsContent value="grid">
          <div className="grid grid-cols-3 gap-4">
            {files?.map((file) => <FileCard file={file} hasLike={false} key={file._id} />)}
          </div>
        </TabsContent>
        <TabsContent value="table">
          <h2>todo: table for FilesData</h2>
          {/* todo: table for FilesData */}
        </TabsContent>
      </Tabs>

      {files?.length === 0 ? <EmptyResult filter={query} /> : null}
    </div>
  );
};

export default FileList;
