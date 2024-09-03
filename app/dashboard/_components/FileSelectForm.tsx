"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { FC } from "react";
import { formSchema, SchemaType } from "../formSchema";

interface IFileSelectForm {
  submitHandler: (data: SchemaType) => void;
}

const FileSelectForm: FC<IFileSelectForm> = ({ submitHandler }) => {
  const formProps = useForm<SchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      file: undefined,
    },
  });

  const {
    control,
    formState: { isSubmitting },
    handleSubmit,
    register,
  } = formProps;

  const fileRef = register("file");

  return (
    <Form {...formProps}>
      <form onSubmit={handleSubmit(submitHandler)} className="space-y-8">
        <FormField
          control={control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="file"
          render={() => (
            <FormItem>
              <FormLabel>File</FormLabel>
              <FormControl>
                <Input type="file" {...fileRef} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isSubmitting} className="flex gap-1">
          {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default FileSelectForm;
