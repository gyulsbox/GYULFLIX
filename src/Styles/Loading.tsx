import styled from "styled-components";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const Container = styled.div`
  font-family: "Raleway Sans";
  width: 100%;
  height: calc(100vh - 86px);
  display: flex;
  flex-direction: column;
  position: absolute;
  justify-content: center;
  align-items: center;
  background-color: black;
`;

const Loading = () => {
  return (
    <>
      <Container>
        <Box>
          <CircularProgress />
        </Box>
        Loading...
      </Container>
    </>
  );
};

export default Loading;
