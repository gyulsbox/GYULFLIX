import { useState } from "react";
import ReactPlayer from "react-player";
import { useQuery } from "react-query";
import { useMatch, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getMoviesDetail, getMoviesTrailer, IGetMoviesDetail, IGetMoviesTrailer } from "../../Api/api";
import { makeImagePath, makeVideoPath, noPoster } from "../../Api/utils";
import Loading from "../../Styles/Loading";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import Error from "../../Styles/Error";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

export const Body = styled.div`
  font-family: "Raleway Sans";
  width: 100%;
  height: 100%;
`;

export const Banner = styled.div`
  width: 100%;
  height: calc(100vh);
  background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.5));
  position: absolute;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-between;
`;

export const BackGroundImage = styled.div<{ bgimg: string }>`
  width: 100%;
  height: 100vh;
  background-image: url(${(prop) => prop.bgimg});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
`;

const UpcomingContainer = styled.div`
  width: 100%;
  height: 100vh;
  position: absolute;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Container = styled.div`
  width: 95%;
  height: 95%;
  display: flex;
  align-items: center;
`;

export const PosterBox = styled.div`
  width: 40%;
  height: 90%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const PosterImage = styled.div<{ bgimg: string }>`
  width: 80%;
  min-height: 100%;
  background-image: url(${(prop) => prop.bgimg});
  background-position: center;
  background-size: cover;
  border-radius: 10px;
`;

export const DetailContainer = styled.div`
  width: 60%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const DetailBox = styled.div`
  width: 95%;
  height: 95%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const MainContainer = styled.div`
  width: 95%;
  height: 40%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`;

export const TitleBox = styled.div`
  width: 95%;
  height: 35%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Title = styled.div`
  width: 100%;
  span {
    font-size: 80px;
    font-weight: 600;
  }
`;

export const OverviewBox = styled.div`
  width: 95%;
  height: 35%;
  display: flex;
  justify-content: center;
`;

export const Overview = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 7px;
    border-radius: 50px;
  }
  &::-webkit-scrollbar-thumb {
    background: linear-gradient(#e0eafc, #cfdef3);
    border-radius: 50px;
  }
  span {
    font-size: 18px;
    font-weight: 400;
  }
`;

export const TimeBox = styled.div`
  width: 95%;
  height: 20%;
  display: flex;
  justify-content: center;
`;

export const Time = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  span {
    font-size: 18px;
    font-weight: 600;
  }
`;

export const TrailerContainer = styled.div`
  width: 95%;
  height: 60%;
`;

export const TrailerBox = styled.div`
  width: 95%;
  height: 70%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  border-radius: 10px;
  align-items: center;
`;

const BannerVolum = styled(motion.button)`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 0;
  background-color: #9ca7b2;
  position: absolute;
`;

export const MiniTrailerBox = styled.div`
  width: 100%;
  height: 35%;
  display: flex;
  align-items: center;
  overflow: hidden;
`;

export const MiniTrailer = styled.div`
  width: 95%;
  height: 95%;
  display: flex;
  overflow: hidden;
`;

const Back = styled.div`
  margin: auto;
`;

const btnVars = {
  animate: {
    opacity: 0,
    transition: {
      delay: 2,
    },
  },
  hover: {
    opacity: 1,
  },
};

const UpcmoingDetail = () => {
  const [volum, setVolum] = useState(false);
  const upcomingMatch = useMatch(`/upcoming/:upcomingId`);
  const { isLoading, data } = useQuery<IGetMoviesTrailer>("trailer", () => getMoviesTrailer(upcomingMatch?.params.upcomingId));
  const { data: info } = useQuery<IGetMoviesDetail>("MovieDetail", () => getMoviesDetail(upcomingMatch?.params.upcomingId));
  const volumClick = () => setVolum((prev) => !prev);
  const navigate = useNavigate();
  const onClick = () => {
    navigate(-1);
  };
  return (
    <>
      <Helmet>
        <title>{info?.original_title}</title>
      </Helmet>
      {isLoading ? (
        <Loading />
      ) : data?.results[0] === undefined ? (
        <Error />
      ) : (
        <Body>
          <BackGroundImage bgimg={info?.backdrop_path === null ? noPoster : makeImagePath(info?.backdrop_path || "")} />
          <Banner />
          <UpcomingContainer>
            <Container>
              <PosterBox>
                <PosterImage bgimg={info?.poster_path === null ? noPoster : makeImagePath(info?.poster_path || "")} />
              </PosterBox>
              <DetailContainer>
                <DetailBox>
                  <MainContainer>
                    <TitleBox>
                      <Title>
                        <span>{info?.original_title}</span>
                      </Title>
                      <Back>
                        <KeyboardBackspaceIcon onClick={onClick} style={{ width: "30px", height: "30px", cursor: "pointer" }} />
                      </Back>
                    </TitleBox>
                    <OverviewBox>
                      <Overview>
                        <span>{info?.overview}</span>
                      </Overview>
                    </OverviewBox>
                    <TimeBox>
                      <Time>
                        <span>{info?.release_date} / </span>
                        <span>
                          {info?.genres.slice(0, 3).map((genres, index) => {
                            return <span key={index}>&nbsp;{genres.name} /</span>;
                          })}
                        </span>
                        <span>&nbsp;{info?.runtime}min&nbsp; </span>
                        <span style={{ color: "red" }}>&nbsp;{info?.adult ? "/ Rated-R" : ""}</span>
                      </Time>
                    </TimeBox>
                  </MainContainer>
                  <TrailerContainer>
                    <TrailerBox>
                      <ReactPlayer
                        url={makeVideoPath(data?.results.find((x) => x.type === "Trailer")?.key || "")}
                        volume={volum ? 0.2 : 0}
                        controls={false}
                        playing={true}
                        loop={true}
                        width="180%"
                        height="180%"
                      ></ReactPlayer>
                      <BannerVolum variants={btnVars} animate="animate" whileHover="hover" onClick={volumClick}>
                        {volum ? <VolumeUpIcon /> : <VolumeOffIcon />}
                      </BannerVolum>
                    </TrailerBox>
                    <MiniTrailerBox>
                      {data.results === null ? (
                        <Loading />
                      ) : (
                        <MiniTrailer>
                          {data?.results === undefined ? (
                            <Loading />
                          ) : (
                            data.results.slice(1, 6).map((trailer) => {
                              return <ReactPlayer key={trailer.id} url={makeVideoPath(trailer.key)} volume={0} controls={true} playing={false} width="20%" height="100%"></ReactPlayer>;
                            })
                          )}
                        </MiniTrailer>
                      )}
                    </MiniTrailerBox>
                  </TrailerContainer>
                </DetailBox>
              </DetailContainer>
            </Container>
          </UpcomingContainer>
        </Body>
      )}
    </>
  );
};

export default UpcmoingDetail;
