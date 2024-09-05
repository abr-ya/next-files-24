import { Dispatch, FC, SetStateAction } from "react";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, SearchIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";

// todo: in type file?
const formSchema = z.object({
  query: z.string().min(0).max(200),
});

export type SearchSchemaType = z.infer<typeof formSchema>;

interface ISearchBar {
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
}

const SearchBar: FC<ISearchBar> = ({ query }) => {
  const submitHandler = (data: SearchSchemaType) => {
    console.log(data);
  };

  const formProps = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      query,
    },
  });

  const {
    control,
    formState: { isSubmitting },
    handleSubmit,
  } = formProps;

  return (
    <Form {...formProps}>
      <form onSubmit={handleSubmit(submitHandler)} className="flex gap-2 items-center">
        <FormField
          control={control}
          name="query"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input {...field} placeholder="search your files" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button size="sm" type="submit" disabled={isSubmitting} className="flex gap-1">
          {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
          <SearchIcon /> Search
        </Button>
      </form>
    </Form>
  );
};

export default SearchBar;
