import { Dispatch, FC, SetStateAction } from "react";

interface ISearchBar {
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
}

const SearchBar: FC<ISearchBar> = () => {
  return <div>SearchBar</div>;
};

export default SearchBar;
