import { useMutation } from "convex/react";

import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { useOrganization, useUser } from "@clerk/nextjs";
import { useToast } from "@/hooks/use-toast";

import UploadModal from "./UploadModal";
import { SchemaType } from "../formSchema";

const UploadContainer = () => {
  const organization = useOrganization();
  const user = useUser();
  const { toast } = useToast();

  const generateUploadUrl = useMutation(api.files.generateUploadUrl);
  const createFileMutation = useMutation(api.files.createFile);

  let ownerId: string | undefined = undefined;
  if (organization.isLoaded && user.isLoaded) {
    ownerId = organization.organization?.id ?? user.user?.id;
  }

  const submitHandler: ({ file, title }: SchemaType) => void = async ({ file, title }) => {
    if (!ownerId) {
      console.log("Cant get owner ID!");
      return;
    }
    const postUrl = await generateUploadUrl();
    const loadingFile = file[0];

    console.log(loadingFile);

    const result = await fetch(postUrl, {
      method: "POST",
      headers: { "Content-Type": loadingFile.type },
      body: loadingFile,
    });
    const { storageId } = await result.json();

    console.log(title, storageId);

    const types = {
      "image/png": "image",
      "image/jpeg": "image",
      "application/pdf": "pdf",
      "text/csv": "csv",
    } as Record<string, Doc<"files">["type"]>;

    if (!types[loadingFile.type]) {
      console.log("Not found file type!");
      return;
    }

    try {
      await createFileMutation({
        name: title,
        fileId: storageId,
        type: types[loadingFile.type],
        ownerId,
      });

      console.log("success!!1");
      toast({
        title: "File Uploaded",
        description: "Now everyone can view your file",
      });
    } catch (err) {
      console.log("errorrrrrrr!!!");
      toast({
        variant: "destructive",
        title: "Something went wrong",
        description: "Your file could not be uploaded, try again later",
      });
    }
  };

  return <UploadModal submitHandler={submitHandler} />;
};

export default UploadContainer;
