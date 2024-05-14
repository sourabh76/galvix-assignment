import React from "react";
import SearchIcon from "../assets/images/search.svg";
import { TextField } from "@mui/material";

const Search = ({
  setSearchTerm,
  searchTerm,
  fetchedCharacters,
  setCharacters,
  setTotalPages,
}) => {
  const handleSearch = () => {
    const filteredCharacters = fetchedCharacters.filter((character) =>
      character.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (searchTerm.trim() === "") {
      setCharacters(fetchedCharacters);
      return;
    }

    setCharacters(filteredCharacters);
    setTotalPages(1);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };
  return (
    <div>
      <TextField
        label="Search"
        variant="outlined"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyPress={handleKeyPress}
        sx={{ margin: "10px" }}
      />
      <button style={{ margin: "10px", borderRadius: "20%" }}>
        <img src={SearchIcon} alt="search" onClick={handleSearch} />
      </button>
    </div>
  );
};

export default Search;
