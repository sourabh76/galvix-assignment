import React from "react";
import CloseIcon from "../assets/images/close.svg";
import { Modal } from "@mui/material";
import { styled } from "@mui/system";

const ModalPopup = ({ selectedCharacter, setSelectedCharacter }) => {
  const ModalContent = styled("div")({
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "white",
    boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
    padding: "20px",
    minWidth: "300px",
    maxWidth: "600px",
    outline: "none",
    borderRadius: "8px",
  });

  const handleCloseModal = () => {
    setSelectedCharacter(null);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <Modal open={!!selectedCharacter} onClose={handleCloseModal}>
      <ModalContent>
        {selectedCharacter && (
          <div>
            <h2 style={{ textAlign: "center", color: "#000080" }}>
              {selectedCharacter.name}
            </h2>
            <p>
              <span style={{ fontWeight: "bold" }}>Height:</span>{" "}
              {selectedCharacter.height / 100} m
            </p>
            <p>
              <span style={{ fontWeight: "bold" }}>Mass:</span>{" "}
              {selectedCharacter.mass} kg
            </p>
            <p>
              <span style={{ fontWeight: "bold" }}>Added on Date:</span>{" "}
              {formatDate(selectedCharacter.created)}
            </p>
            <p>
              <span style={{ fontWeight: "bold" }}>Number of Films:</span>{" "}
              {selectedCharacter.films.length}
            </p>
            <p>
              <span style={{ fontWeight: "bold" }}>Birth Year:</span>{" "}
              {selectedCharacter.birth_year}
            </p>
            <p>
              <span style={{ fontWeight: "bold" }}>Home World:</span>{" "}
              {selectedCharacter.homeworldDetails?.name}
            </p>
            {selectedCharacter.homeworldDetails && (
              <div>
                <p>
                  <span style={{ fontWeight: "bold" }}>Terrain:</span>{" "}
                  {selectedCharacter.homeworldDetails.terrain}
                </p>
                <p>
                  <span style={{ fontWeight: "bold" }}>Climate:</span>{" "}
                  {selectedCharacter.homeworldDetails.climate}
                </p>
                <p>
                  <span style={{ fontWeight: "bold" }}>Residents:</span>{" "}
                  {selectedCharacter.homeworldDetails.residents.length}
                </p>
              </div>
            )}
          </div>
        )}
        <img
          src={CloseIcon}
          alt="close"
          onClick={handleCloseModal}
          style={{
            position: "absolute",
            top: "5px",
            right: "5px",
          }}
        />
      </ModalContent>
    </Modal>
  );
};

export default ModalPopup;
