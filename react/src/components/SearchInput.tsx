import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { useRef } from "react";
import { BsSearch } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import useSearchParamsStore from "../stores/search";

const SearchInput = () => {
  const ref = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const setSearchText = useSearchParamsStore((s) => s.setSearchText);

  const onSearch = (queryStr: string) => {
    setSearchText(queryStr);
    navigate("/search");
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (ref.current) {
          onSearch(ref.current.value);
        }
      }}
    >
      <InputGroup>
        <InputLeftElement children={<BsSearch />} />
        <Input
          ref={ref}
          borderRadius={20}
          placeholder="Search for a movie, TV show... "
          variant="filled"
        />
      </InputGroup>
    </form>
  );
};

export default SearchInput;
