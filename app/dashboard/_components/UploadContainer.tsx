import { useMutation } from "convex/react";
import { SchemaType } from "../formSchema";
import UploadModal from "./UploadModal";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";

const UploadContainer = () => {
  const generateUploadUrl = useMutation(api.files.generateUploadUrl);
  const createFileMutation = useMutation(api.files.createFile);

  const submitHandler: ({ file, title }: SchemaType) => void = async ({ file, title }) => {
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
      "application/pdf": "pdf",
      "text/csv": "csv",
    } as Record<string, Doc<"files">["type"]>;

    try {
      await createFileMutation({
        name: title,
        fileId: storageId,
        type: types[loadingFile.type],
        ownerId: "",
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
