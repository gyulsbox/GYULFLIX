import { motion, AnimatePresence, useViewportScroll } from "framer-motion";
import { useCallback, useState } from "react";
import ReactPlayer from "react-player";
import { useQuery } from "react-query";
import { useMatch, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { getMovieImages, getMovies, getMoviesTrailer, IGetMovieImages, IGetMoviesResult, IGetMoviesTrailer } from "../../Api/api";
import { makeImagePath, makeVideoPath } from "../../Api/utils";
import { isSoundAtom, SoundEnums } from "../../Recoil/atoms";
import Loading from "../../Styles/Loading";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeHigh, faVolumeMute } from "@fortawesome/free-solid-svg-icons";
import { width } from "@mui/system";

const Wrapper = styled.div`
  height: 200vh;
  background: black;
`;

const PlayerWrapper = styled.div`
  min-width: 100%;
  height: 90vh;
  background-color: black;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const Banner = styled.div<{ bgphoto: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.9)), url(${(props) => props.bgphoto});
  background-size: cover;
`;

const Title = styled(motion.img)`
  width: 30%;
  margin-bottom: 20px;
  padding: 0 20px;
`;

const Overview = styled(motion.p)`
  font-size: 34px;
  width: 50%;
  padding: 20px;
`;

const SoundBtn = styled(motion.button)`
  position: absolute;
  top: 65%;
  right: 0;
  font-size: 25px;
  height: 30px;
  font-weight: 600;
  border: none;
  outline: none;
  z-index: 30;
  width: 5%;
  height: 4.5%;
  background-color: rgba(255, 255, 255, 0.5);
  color: ${(props) => props.theme.white.darker};
  display: flex;
  align-items: center;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
`;

const SoundSvg = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 55%;
  height: 100%;
  right: 110px;
  border: 1px solid white;
  border-radius: 50%;
`;

const PageChange = styled.div`
  width: 100%;
  height: 400px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: absolute;
`;

export const Increase = styled(motion.div)`
  width: 50px;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3;
  transform-origin: center right;
`;

export const Decrease = styled(motion.div)`
  width: 50px;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3;
  opacity: 0.7;
`;

export const Span1 = styled(motion.span)`
  color: white;
  z-index: 30;
  font-size: 30px;
  margin-left: 40px;
  margin-right: 20px;
  font-weight: 600;
  position: absolute;
  top: -150px;
  left: 20px;
`;

export const SliderContainer = styled(motion.div)`
  height: 200px;
  width: 100%;
  position: relative;
`;

const Slider = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Row = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 3px;
  position: absolute;
  width: 95%;
`;

const Box = styled(motion.div)<{ bgphoto: string }>`
  position: relative;
  background-color: white;
  height: 200px;
  border-radius: 4px;
  background-image: url(${(props) => props.bgphoto});
  background-size: cover;
  background-position: center center;
  cursor: pointer;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;

const InfoBox = styled(motion.div)`
  padding: 10px;
  background-color: ${(props) => props.theme.black.lighter};
  opacity: 0;
  position: absolute;
  width: 100%;
  bottom: 0;
  p {
    font-size: 18px;
    text-align: center;
  }
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;

const Overlays = styled(motion.div)`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(0deg, rgba(0, 0, 15, 0.1643251050420168) 85%, rgba(0, 0, 15, 1) 100%), linear-gradient(0deg, rgba(0, 0, 15, 1) 14%, rgba(0, 0, 15, 0.15592174369747902) 28%);
`;

const Modal = styled(motion.div)`
  position: absolute;
  width: 40vw;
  height: 80vh;
  left: 0;
  right: 0;
  margin: 0 auto;
  border-radius: 15px;
  overflow: hidden;
  background-color: ${(props) => props.theme.black.lighter};
`;

const ModalCover = styled.div`
  width: 100%;
  height: 400px;
  background-size: cover;
  background-position: center center;
`;

const ModalTitle = styled.h3`
  color: ${(props) => props.theme.white.lighter};
  text-align: start;
  font-size: 46px;
  position: relative;
  padding: 20px;
  top: -80px;
`;

const ModalOverview = styled.p`
  position: relative;
  padding: 20px;
  top: -80px;
  color: ${(props) => props.theme.white.lighter};
`;

export const MovieCover = styled(motion.div)<{ bgimg?: string }>`
  width: 100%;
  height: 50%;
  background-image: url(${(props) => props.bgimg});
  background-size: cover;
  background-position: center;
`;

export const rowVars = {
  invisible: (back: boolean) => ({
    x: back ? -window.outerWidth - 10 : window.outerWidth + 10,
  }),
  visible: {
    x: 0,
  },
  exit: (back: boolean) => ({
    x: back ? window.outerWidth + 10 : -window.outerWidth - 10,
  }),
};

const boxVars = {
  normal: {
    scale: 1,
  },
  hover: {
    zIndex: 2000,
    scale: 1.1,
    y: -40,
    transition: {
      delay: 0.1,
      type: "tween",
    },
  },
  exit: {
    zIndex: 2000,
  },
};

const infoVars = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.5,
      duaration: 0.1,
      type: "tween",
    },
  },
};

const titleVars = {
  animate: {
    scale: 0.8,
    y: 150,
    x: -20,
    transition: {
      delay: 5,
      duration: 1,
    },
  },
};

const descVars = {
  animate: {
    opacity: 0,
    transition: {
      delay: 5,
      duration: 0.5,
    },
  },
};

function Home() {
  const navigate = useNavigate();
  const ModalMatch = useMatch("/movies/:movieId");
  const { scrollY } = useViewportScroll();
  const stateMovieId = localStorage.getItem("movieId");
  const { data: info, isLoading: infoLoading } = useQuery<IGetMoviesResult>(["movies", "nowPlaying"], getMovies);
  const { data: trailer } = useQuery<IGetMoviesTrailer>("startTrailer", () => getMoviesTrailer(String(stateMovieId)));
  const { data: logo } = useQuery<IGetMovieImages>("movieLogo", () => getMovieImages(String(stateMovieId)));
  console.log(logo);

  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [isBack, setIsBack] = useState(false);
  const [isVolum, setIsVolum] = useState(false);
  const [isSound, setIsSound] = useRecoilState<SoundEnums>(isSoundAtom);
  const { OFF, ON } = SoundEnums;
  const handleChangeSound = useCallback((): void => {
    if (isSound === OFF) {
      localStorage.setItem("sound", ON);
      setIsSound(ON);
      return;
    }
    localStorage.setItem("sound", OFF);
    setIsSound(OFF);
  }, [OFF, ON, isSound, setIsSound]);
  let offset = 6;
  const increaseIndex = () => {
    if (info) {
      if (leaving) return;
      toggleLeaving();
      setIsBack(false);
      const totalMovies = info.results.length;
      const maxIndex = Math.floor(totalMovies / offset) - 1;
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };
  const decreaseIndex = () => {
    if (info) {
      if (leaving) return;
      toggleLeaving();
      setIsBack(true);
      const totalMovies = info.results.length - 1;
      const maxIndex = Math.floor(totalMovies / offset) - 1;
      setIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
    }
  };
  const toggleLeaving = () => setLeaving((prev) => !prev);
  const onBoxClicked = (movieId: number) => {
    navigate(`/movies/${movieId}`);
    setIsVolum(true);
  };
  const onOverlayClicked = () => {
    navigate(`/movies`);
    setIsVolum(false);
  };
  const clickedMovie = ModalMatch?.params.movieId && info?.results.find((movie) => movie.id + "" === ModalMatch.params.movieId);

  return (
    <Wrapper>
      {infoLoading ? (
        <Loading />
      ) : (
        <>
          <PlayerWrapper>
            <Overlays>
              <Title variants={titleVars} animate="animate" src={makeImagePath(logo?.logos[0].file_path + "")} />
              <Overview variants={descVars} animate="animate">
                {info?.results[0].overview}
              </Overview>
              <SoundBtn onClick={handleChangeSound}>
                <SoundSvg>
                  <FontAwesomeIcon icon={isSound === "0" ? faVolumeMute : faVolumeHigh} />
                </SoundSvg>
              </SoundBtn>
            </Overlays>
            <ReactPlayer
              style={{ backgroundColor: `linear-gradient(to top, black, transparent)` }}
              url={makeVideoPath(trailer?.results.find((x) => x.type === "Trailer")?.key || "")}
              volume={isVolum ? 0 : 0.3}
              controls={false}
              playing={true}
              muted={isSound === "0" ? true : false}
              loop={true}
              width="200vw"
              height="calc(110vh)"
            />
          </PlayerWrapper>
          <SliderContainer>
            <Span1>Now Playing</Span1>
            <Slider>
              <PageChange>
                <Decrease whileHover={{ scale: 1.2 }} onClick={decreaseIndex}>
                  <ArrowBackIosIcon fontSize="large" />
                </Decrease>
                <Increase whileHover={{ scale: 1.2 }} onClick={increaseIndex}>
                  <ArrowForwardIosIcon fontSize="large" />
                </Increase>
              </PageChange>
              <AnimatePresence custom={isBack} initial={false} onExitComplete={toggleLeaving}>
                <Row custom={isBack} variants={rowVars} initial="invisible" animate="visible" exit="exit" transition={{ type: "tween", duration: 1 }} key={index}>
                  {info?.results
                    .slice(1)
                    .slice(offset * index, offset * index + offset)
                    .map((movie) => (
                      <Box
                        layoutId={movie.id + ""}
                        key={movie.id}
                        whileHover="hover"
                        initial="normal"
                        exit="exit"
                        variants={boxVars}
                        transition={{ type: "tween" }}
                        onClick={() => onBoxClicked(movie.id)}
                        bgphoto={makeImagePath(movie.backdrop_path, "w500")}
                      >
                        <InfoBox variants={infoVars}>
                          <p>{movie.title}</p>
                        </InfoBox>
                      </Box>
                    ))}
                </Row>
              </AnimatePresence>
            </Slider>
          </SliderContainer>
          <AnimatePresence>
            {ModalMatch ? (
              <>
                <Overlay onClick={onOverlayClicked} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
                <Modal style={{ top: scrollY.get() + 100 }} layoutId={ModalMatch.params.movieId}>
                  {clickedMovie && (
                    <>
                      <ModalCover
                        style={{
                          backgroundImage: `
                            linear-gradient(to top, black, transparent),
                          url(${makeImagePath(clickedMovie.backdrop_path)})`,
                        }}
                      />
                      <ModalTitle>{clickedMovie.title}</ModalTitle>
                      <ModalOverview>{clickedMovie.overview}</ModalOverview>
                    </>
                  )}
                </Modal>
              </>
            ) : null}
          </AnimatePresence>
        </>
      )}
    </Wrapper>
  );
}
export default Home;
