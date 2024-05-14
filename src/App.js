import React, { useState, useEffect } from "react";
import { Card, CardContent, Grid, CircularProgress } from "@mui/material";
import { styled } from "@mui/system";
import Search from "./components/search";
import ModalPopup from "./components/modal";
import Page from "./components/pagniantion";
import { API_URL, IMG_URL } from "./constants";

const CardContainer = styled(Card)({
  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)",
  cursor: "pointer",
  transition: "transform 0.3s ease",
  "&:hover": {
    backgroundColor: "#eb99ff",
    transform: "scale(1.01)",
  },
});

const App = () => {
  const [characters, setCharacters] = useState([]);
  const [fetchedCharacters, setFetchedCharacters] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCharacters(currentPage);
  }, [currentPage]);

  const fetchCharacters = async (page) => {
    setLoading(true);
    const response = await fetch(`${API_URL}?page=${page}`);
    const data = await response.json();

    setCharacters(data.results);
    setFetchedCharacters(data.results);
    setTotalPages(Math.ceil(data.count / 10));
    setLoading(false);
  };

  const handleCardClick = async (url) => {
    setLoading(true);
    const response = await fetch(url);
    const data = await response.json();
    setSelectedCharacter(data);

    const homeworldResponse = await fetch(data.homeworld);
    const homeworldData = await homeworldResponse.json();
    setSelectedCharacter((prevCharacter) => ({
      ...prevCharacter,
      homeworldDetails: homeworldData,
    }));

    setLoading(false);
  };

  return (
    <div>
      <Search
        setSearchTerm={setSearchTerm}
        searchTerm={searchTerm}
        fetchedCharacters={fetchedCharacters}
        setCharacters={setCharacters}
        setTotalPages={setTotalPages}
      />

      {loading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={2} sx={{ padding: "10px" }}>
          {characters.map((character) => (
            <Grid item key={character.url} xs={12} sm={6} md={4} lg={3}>
              <CardContainer onClick={() => handleCardClick(character.url)}>
                <CardContent>
                  <h3>{character.name}</h3>
                  <img
                    src={`${IMG_URL}/${character.url
                      .split("/")
                      .filter(Boolean)
                      .pop()}.jpg`}
                    alt={character.name}
                    loading="lazy"
                    width="99%"
                  />
                </CardContent>
              </CardContainer>
            </Grid>
          ))}
        </Grid>
      )}

      <Page
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />

      <ModalPopup
        selectedCharacter={selectedCharacter}
        setSelectedCharacter={setSelectedCharacter}
      />
    </div>
  );
};

export default App;
