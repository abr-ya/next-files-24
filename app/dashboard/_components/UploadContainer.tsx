import { SchemaType } from "../formSchema";
import UploadModal from "./UploadModal";

const UploadContainer = () => {
  const submitHandler: (data: SchemaType) => void = (data) => {
    console.log(data);
  };

  return <UploadModal submitHandler={submitHandler} />;
};

export default UploadContainer;
