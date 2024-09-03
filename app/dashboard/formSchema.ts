import { z } from "zod";

export const formSchema = z.object({
  title: z.string().min(1).max(100),
  file: z
    .custom<FileList>((val) => val instanceof FileList, "Required")
    .refine((files) => files.length > 0, "Required"),
});

export type SchemaType = z.infer<typeof formSchema>;

export const defaultValues = {
  title: "",
  file: undefined,
};
