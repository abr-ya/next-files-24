import { FC } from "react";
import Image from "next/image";

interface IEmptyResult {
  filter?: string;
}

const EmptyResult: FC<IEmptyResult> = ({ filter }) => (
  <div className="flex flex-col gap-4 w-full items-center mt-8">
    <Image alt="an image of a picture and directory icon" width="300" height="300" src="/empty.svg" />
    <div className="text-2xl">You have no files, upload one now...</div>
    {filter && <div className="text-xl">... or reset filter == current filter is "{filter}"</div>}
  </div>
);

export default EmptyResult;
