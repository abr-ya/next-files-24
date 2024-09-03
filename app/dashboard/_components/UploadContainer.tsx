import { useMutation } from "convex/react";
import { SchemaType } from "../formSchema";
import UploadModal from "./UploadModal";
import { api } from "@/convex/_generated/api";

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

    try {
      await createFileMutation({
        name: title,
        // fileId: storageId,
        ownerId: "org_2lJtMxdJK4J4Hl9R3hA8xZwsl2V", // todo: use Really ID!!!
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
