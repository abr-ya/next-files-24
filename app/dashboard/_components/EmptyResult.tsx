import Image from "next/image";

import UploadButton from "./UploadModal";

const EmptyResult = () => (
  <div className="flex flex-col gap-8 w-full items-center mt-24">
    <Image alt="an image of a picture and directory icon" width="300" height="300" src="/empty.svg" />
    <div className="text-2xl">You have no files, upload one now</div>
    <UploadButton />
  </div>
);

export default EmptyResult;
