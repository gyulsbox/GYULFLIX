import { motion } from "framer-motion";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { getUpcoming, IGetMoviesResult } from "../../Api/api";
import { makeImagePath, noPoster } from "../../Api/utils";
import Loading from "../../Styles/Loading";

const Body = styled.div`
  font-family: "Raleway Sans";
  width: 100%;
  height: 100vh;
  position: relative;
`;

const Container = styled(motion.div)`
  width: 100%;
  height: calc(100vh - 86px);
  position: absolute;
  bottom: 0;
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  grid-template-rows: repeat(2, 1fr);
  justify-content: center;
  gap: 0.1%;
`;

const Box = styled(motion.div)<{ bgimg: string }>`
  width: 100%;
  height: 100%;
  background-image: url(${(prop) => prop.bgimg});
  background-position: center;
  background-size: cover;
  border-radius: 10px;
`;

const DetailBox = styled(motion.div)`
  width: 100%;
  height: 100%;
  background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.7));
  border-radius: 10px;
  opacity: 0;
  display: flex;
  align-content: space-between;
`;

const FooterBox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  text-align: center;
`;
const Date = styled.div``;

const Average = styled.div``;

const Upcoming = () => {
  const { isLoading, data } = useQuery<IGetMoviesResult>("Upcoming", () => getUpcoming(1));

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <Body>
          <Container>
            {data?.results.map((upcoming, index) => {
              return (
                <Link key={index} to={`/upcoming/${upcoming.id}`}>
                  <Box bgimg={upcoming.backdrop_path === null ? noPoster : makeImagePath(upcoming.poster_path, "w500")}>
                    <DetailBox whileHover={{ opacity: 1 }}>
                      <FooterBox>
                        <Average>⭐{upcoming.vote_average}</Average>
                        <Date>
                          Release Date <br />
                          {upcoming.release_date}
                        </Date>
                      </FooterBox>
                    </DetailBox>
                  </Box>
                </Link>
              );
            })}
          </Container>
        </Body>
      )}
    </>
  );
};
export default Upcoming;
