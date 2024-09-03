import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import FileSelectForm from "./FileSelectForm";
import { SchemaType } from "../formSchema";

const UploadModal = () => {
  const [isFileDialogOpen, setIsFileDialogOpen] = useState(false);

  const submitHandler: (data: SchemaType) => void = (data) => {
    console.log(data);
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
          <FileSelectForm submitHandler={submitHandler} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UploadModal;
