import { Doc } from "@/convex/_generated/dataModel";
import { Dispatch, FC, SetStateAction } from "react";

interface ITypeSelect {
  type: string;
  setType: Dispatch<SetStateAction<Doc<"files">["type"] | "all">>;
}

const TypeSelect: FC<ITypeSelect> = () => {
  return <div>TypeSelect</div>;
};

export default TypeSelect;
