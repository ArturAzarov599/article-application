import { ChangeEvent } from "react";

import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

import { useArticlesActions } from "src/store/articles/hooks/useArticlesActions";

const SearchInput = () => {
  const { setTitle } = useArticlesActions();

  const onChangeHandler = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    setTitle(event.target.value);
  };

  return (
    <TextField
      onChange={onChangeHandler}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchOutlinedIcon />
          </InputAdornment>
        ),
      }}
      variant="outlined"
      style={{
        minWidth: "600px",
      }}
      placeholder="type here for finding articles"
    />
  );
};

export default SearchInput;
