import { useMutation } from "convex/react";
import { SchemaType } from "../formSchema";
import UploadModal from "./UploadModal";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { useOrganization, useUser } from "@clerk/nextjs";

const UploadContainer = () => {
  const organization = useOrganization();
  const user = useUser();

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

      // todo: message!
      console.log("success!!1");
    } catch (err) {
      // todo: message!
      console.log("errorrrrrrr!!!");
    }
  };

  return <UploadModal submitHandler={submitHandler} />;
};

export default UploadContainer;
