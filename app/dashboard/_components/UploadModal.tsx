import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FC, useState } from "react";
import FileSelectForm from "./FileSelectForm";
import { SchemaType } from "../formSchema";

interface IUploadModal {
  submitHandler: (data: SchemaType) => void;
}

const UploadModal: FC<IUploadModal> = ({ submitHandler }) => {
  const [isFileDialogOpen, setIsFileDialogOpen] = useState(false);

  const onSubmit = (data: SchemaType) => {
    submitHandler(data);
    setIsFileDialogOpen(false);
  };

  return (
    <Dialog open={isFileDialogOpen} onOpenChange={(isOpen) => setIsFileDialogOpen(isOpen)}>
      <DialogTrigger asChild>
        <Button>Upload File</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-8">Upload your File Here</DialogTitle>
          <DialogDescription>This file will be accessible by anyone in your organization</DialogDescription>
        </DialogHeader>

        <div>
          <FileSelectForm submitHandler={onSubmit} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UploadModal;
