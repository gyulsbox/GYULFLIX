import { motion, AnimatePresence, useViewportScroll } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { useQuery } from "react-query";
import { useMatch, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { getTv, getTvAir, getTvImages, getTvTop, getTvTrailer, IGetTvImages, IGetTvResult, IGetTvTrailer } from "../../Api/api";
import { makeImagePath, makeVideoPath, noPoster } from "../../Api/utils";
import { isSoundAtom, SoundEnums } from "../../Recoil/atoms";
import Loading from "../../Styles/Loading";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle, faPlay, faVolumeHigh, faVolumeMute } from "@fortawesome/free-solid-svg-icons";
import TvDetail from "../Details/TvDetail";

const Wrapper = styled.div`
  height: 100%;
  background: #141414;
  overflow-x: hidden;
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

const Title = styled(motion.img)`
  width: 30%;
  margin-left: 20px;
  margin-bottom: 20px;
  padding: 0 20px;
`;

const Overview = styled(motion.p)`
  font-size: 34px;
  width: 50%;
  padding: 20px;
  margin-left: 20px;
  @media screen and (max-width: 1280px) {
    font-size: 20px;
  }
`;

const MainBox = styled(motion.div)`
  position: absolute;
  width: 30%;
  padding: 20px;
  margin-left: 20px;
  top: 60%;
  left: 3.5%;
  display: flex;
  opacity: 0;
  button {
    padding: 10px 0;
    border-radius: 5px;
    border: none;
    margin-right: 2%;
    cursor: pointer;
  }
`;

const MainPlayBtn = styled(motion.button)`
  width: 25%;

  background-color: white;
  color: black;
  span {
    font-size: 1.6rem;
  }
  svg {
    margin-right: 10px;
  }
  @media screen and (max-width: 1280px) {
    span {
      font-size: 1rem;
    }
  }
`;

const MainInfoBtn = styled(motion.button)`
  width: 40%;
  background-color: rgba(109, 109, 110, 0.7);
  color: white;
  span {
    font-size: 1.6rem;
  }
  svg {
    margin-right: 10px;
  }
  @media screen and (max-width: 1280px) {
    width: 35%;
    span {
      font-size: 1rem;
    }
  }
`;

const SoundBtn = styled(motion.button)`
  position: absolute;
  top: 62%;
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
  @media screen and (max-width: 1280px) {
    top: 64%;
    font-size: 18px;
  }
`;

const SoundSvg = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 52%;
  height: 100%;
  right: 110px;
  border: 1px solid white;
  border-radius: 50%;
  cursor: pointer;
  @media screen and (max-width: 1280px) {
    right: 70px;
  }
`;

const PageChange = styled.div`
  width: 100%;
  height: 400px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  @media screen and (max-width: 1280px) {
    height: 150px;
  }
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
  transform-origin: center left;
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
  @media screen and (max-width: 1280px) {
    font-size: 20px;
    top: -110px;
    margin-left: 20px;
  }
`;

export const SliderContainer = styled(motion.div)`
  height: 200px;
  width: 100%;
  position: relative;
  margin-bottom: 5%;
  @media screen and (max-width: 1280px) {
    margin-bottom: 1%;
  }
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
  @media screen and (max-width: 1280px) {
    height: 150px;
  }
`;

export const InfoBox = styled(motion.div)`
  padding: 10px;
  background-color: ${(props) => props.theme.black.lighter};
  opacity: 0;
  position: absolute;
  z-index: 5;
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
  background-image: linear-gradient(0deg, rgba(20, 20, 20, 0.1643251050420168) 85%, rgba(20, 20, 20, 1) 100%), linear-gradient(0deg, rgba(20, 20, 20, 1) 14%, rgba(20, 20, 20, 0.15592174369747902) 28%);
`;

export const Modal = styled(motion.div)`
  width: 50%;
  height: 90vh;
  position: absolute;
  left: 0;
  right: 0;
  margin: 0 auto;
  z-index: 200;
`;

export const ModalCover = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 8px;
    border-radius: 50px;
    background: black;
  }
  &::-webkit-scrollbar-thumb {
    background: linear-gradient(#e0eafc, #cfdef3);
    border-radius: 50px;
  }
  border-radius: 50px 0 0 50px;
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

export const infoVars = {
  hover: {
    opacity: 1,
    transition: {
      duaration: 0.1,
      type: "tween",
    },
  },
};

const titleVars = {
  animate: (lowR: boolean) => ({
    scale: 0.8,
    y: lowR ? 95 : 150,
    x: -20,
    transition: {
      delay: 5,
      duration: 1,
    },
  }),
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

const btnVars = {
  animate: {
    opacity: 1,
    transition: {
      delay: 6,
    },
  },
};

const hoverVars = {
  hover: {
    opacity: 0.7,
  },
};

function Tv() {
  // navigate URL using with useNavigate() that belongs react-router-dom
  const navigate = useNavigate();
  // boolean that matching with URL
  const ModalMatch = useMatch("/tv/:tvId");
  // Y axis scroll progress indicator that belongs framer-motion
  const { scrollY } = useViewportScroll();
  // import movieId key
  const stateTvId = localStorage.getItem("tvId");

  // API fetching
  const { data: info, isLoading: infoLoading } = useQuery<IGetTvResult>(["tvs", "nowPlaying"], getTv);
  const { data: aInfo } = useQuery<IGetTvResult>(["tvsAir", "airPlaying"], getTvAir);
  const { data: tInfo } = useQuery<IGetTvResult>(["tvsTop", "topPlaying"], getTvTop);
  const { data: trailer } = useQuery<IGetTvTrailer>("startTvTrailer", () => getTvTrailer(String(stateTvId)));
  const { data: logo } = useQuery<IGetTvImages>("tvLogo", () => getTvImages(String(stateTvId)));

  // some of state
  const [index, setIndex] = useState(0);
  const [aIndex, setAIndex] = useState(0);
  const [tIndex, setTIndex] = useState(0);

  const [leaving, setLeaving] = useState(false);
  const [isBack, setIsBack] = useState(false);
  const [isVolum, setIsVolum] = useState(false);

  const [aDex, setADex] = useState(false);
  const [tDex, setTDex] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);
  const [lowR, setLowR] = useState(false);

  // is width 1280px up or down
  const handleResize = () => setWidth(window.innerWidth);
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    if (width <= 1280) {
      setLowR(true);
    } else {
      setLowR(false);
    }
  }, [width, lowR]);

  // Recoil State Management about Trailer Sound
  const [isSound, setIsSound] = useRecoilState<SoundEnums>(isSoundAtom);
  const { OFF, ON } = SoundEnums;

  // Sound ON, OFF
  const handleChangeSound = useCallback((): void => {
    if (isSound === OFF) {
      localStorage.setItem("sound", ON);
      setIsSound(ON);
      return;
    }
    localStorage.setItem("sound", OFF);
    setIsSound(OFF);
  }, [OFF, ON, isSound, setIsSound]);

  // amount of movie that showing
  let offset = 6;

  // a Index of Movie Box
  const increaseIndex = () => {
    if (info) {
      if (leaving) return;
      toggleLeaving();
      setIsBack(false);
      const totalTvs = info.results.length;
      const maxIndex = Math.floor(totalTvs / offset) - 1;
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };

  const decreaseIndex = () => {
    if (info) {
      if (leaving) return;
      toggleLeaving();
      setIsBack(true);
      const totalTvs = info.results.length - 1;
      const maxIndex = Math.floor(totalTvs / offset) - 1;
      setIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
    }
  };

  const increaseAIndex = () => {
    if (aInfo) {
      if (leaving) return;
      toggleLeaving();
      setIsBack(false);
      const totalTvs = aInfo.results.length;
      const maxIndex = Math.floor(totalTvs / offset) - 1;
      setAIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };

  const decreaseAIndex = () => {
    if (aInfo) {
      if (leaving) return;
      toggleLeaving();
      setIsBack(true);
      const totalTvs = aInfo.results.length - 1;
      const maxIndex = Math.floor(totalTvs / offset) - 1;
      setAIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
    }
  };

  const increaseTIndex = () => {
    if (tInfo) {
      if (leaving) return;
      toggleLeaving();
      setIsBack(false);
      const totalTvs = tInfo.results.length;
      const maxIndex = Math.floor(totalTvs / offset) - 1;
      setTIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };

  const decreaseTIndex = () => {
    if (tInfo) {
      if (leaving) return;
      toggleLeaving();
      setIsBack(true);
      const totalTvs = tInfo.results.length - 1;
      const maxIndex = Math.floor(totalTvs / offset) - 1;
      setTIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
    }
  };

  // boolean that movie box's leaved state
  const toggleLeaving = () => setLeaving((prev) => !prev);

  // Pop-up Modal about movie by Click & Set Volum
  const onBoxClicked = (tvId: number) => {
    navigate(`/tv/${tvId}`);
    setIsVolum(true);
  };

  const onABoxClicked = (tvId: number) => {
    navigate(`/tv/${tvId}`);
    setADex((prev) => !prev);
    setIsVolum(true);
  };

  const onTBoxClicked = (tvId: number) => {
    navigate(`/tv/${tvId}`);
    setTDex((prev) => !prev);
    setIsVolum(true);
  };

  const onOverlayClicked = () => {
    navigate(`/tv`);
    setIsVolum(false);
    if (aDex === true) {
      setADex((prev) => !prev);
    }
    if (tDex === true) {
      setTDex((prev) => !prev);
    }
  };

  // Make same that movieId what i Clicked one
  const clickedTv = ModalMatch?.params.tvId && info?.results.find((tv) => tv.id + "" === ModalMatch.params.tvId);
  const clickedATv = ModalMatch?.params.tvId && aInfo?.results.find((tv) => tv.id + "" === ModalMatch.params.tvId);
  const clickedTTv = ModalMatch?.params.tvId && tInfo?.results.find((tv) => tv.id + "" === ModalMatch.params.tvId);

  const ModalID = aDex ? ModalMatch?.params.tvId + "a" : tDex ? ModalMatch?.params.tvId + "t" : ModalMatch?.params.tvId;

  return (
    <Wrapper>
      {infoLoading ? (
        <Loading />
      ) : (
        <>
          <PlayerWrapper>
            <Overlays>
              <Title custom={lowR} variants={titleVars} animate="animate" src={makeImagePath(logo?.logos[0].file_path + "")} />
              <Overview variants={descVars} animate="animate">
                {info?.results[2].overview}
              </Overview>
              <SoundBtn onClick={handleChangeSound}>
                <SoundSvg>
                  <FontAwesomeIcon icon={isSound === "0" ? faVolumeMute : faVolumeHigh} />
                </SoundSvg>
              </SoundBtn>
              <MainBox variants={btnVars} animate="animate">
                <MainPlayBtn variants={hoverVars} whileHover="hover" onClick={() => alert("Please Sign in first.")}>
                  <span>
                    <FontAwesomeIcon icon={faPlay} />
                    Play
                  </span>
                </MainPlayBtn>
                <MainInfoBtn variants={hoverVars} whileHover="hover" onClick={() => onBoxClicked(Number(stateTvId))}>
                  <span>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    More Info
                  </span>
                </MainInfoBtn>
              </MainBox>
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
            <Span1>Trending Now</Span1>
            <Slider>
              <PageChange>
                <Decrease whileHover={{ scale: 1.2 }} onClick={decreaseIndex}>
                  <ArrowBackIosIcon style={{ marginLeft: 20 }} fontSize="large" />
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
                    .map((tv) => (
                      <Box
                        layoutId={tv.id + ""}
                        key={tv.id}
                        whileHover="hover"
                        initial="normal"
                        exit="exit"
                        variants={boxVars}
                        transition={{ type: "tween" }}
                        onClick={() => onBoxClicked(tv.id)}
                        bgphoto={tv.backdrop_path === null ? noPoster : makeImagePath(tv.backdrop_path, "w500")}
                      >
                        <InfoBox variants={infoVars}>
                          <p>{tv.name}</p>
                        </InfoBox>
                      </Box>
                    ))}
                </Row>
              </AnimatePresence>
            </Slider>
          </SliderContainer>
          <SliderContainer>
            <Span1>Top Rated Tv Show</Span1>
            <Slider>
              <PageChange>
                <Decrease whileHover={{ scale: 1.2 }} onClick={decreaseTIndex}>
                  <ArrowBackIosIcon style={{ marginLeft: 20 }} fontSize="large" />
                </Decrease>
                <Increase whileHover={{ scale: 1.2 }} onClick={increaseTIndex}>
                  <ArrowForwardIosIcon fontSize="large" />
                </Increase>
              </PageChange>
              <AnimatePresence custom={isBack} initial={false} onExitComplete={toggleLeaving}>
                <Row custom={isBack} variants={rowVars} initial="invisible" animate="visible" exit="exit" transition={{ type: "tween", duration: 1 }} key={tIndex}>
                  {tInfo?.results
                    .slice(1)
                    .slice(offset * tIndex, offset * tIndex + offset)
                    .map((tv) => (
                      <Box
                        layoutId={tv.id + "t"}
                        key={tv.id}
                        whileHover="hover"
                        initial="normal"
                        exit="exit"
                        variants={boxVars}
                        transition={{ type: "tween" }}
                        onClick={() => onTBoxClicked(tv.id)}
                        bgphoto={tv.backdrop_path === null ? noPoster : makeImagePath(tv.backdrop_path, "w500")}
                      >
                        <InfoBox variants={infoVars}>
                          <p>{tv.name}</p>
                        </InfoBox>
                      </Box>
                    ))}
                </Row>
              </AnimatePresence>
            </Slider>
          </SliderContainer>
          <SliderContainer>
            <Span1>On Air TV Show</Span1>
            <Slider>
              <PageChange>
                <Decrease whileHover={{ scale: 1.2 }} onClick={decreaseAIndex}>
                  <ArrowBackIosIcon style={{ marginLeft: 20 }} fontSize="large" />
                </Decrease>
                <Increase whileHover={{ scale: 1.2 }} onClick={increaseAIndex}>
                  <ArrowForwardIosIcon fontSize="large" />
                </Increase>
              </PageChange>
              <AnimatePresence custom={isBack} initial={false} onExitComplete={toggleLeaving}>
                <Row custom={isBack} variants={rowVars} initial="invisible" animate="visible" exit="exit" transition={{ type: "tween", duration: 1 }} key={aIndex}>
                  {aInfo?.results
                    .slice(1)
                    .slice(offset * aIndex, offset * aIndex + offset)
                    .map((tv) => (
                      <Box
                        layoutId={tv.id + "a"}
                        key={tv.id}
                        whileHover="hover"
                        initial="normal"
                        exit="exit"
                        variants={boxVars}
                        transition={{ type: "tween" }}
                        onClick={() => onABoxClicked(tv.id)}
                        bgphoto={tv.backdrop_path === null ? noPoster : makeImagePath(tv.backdrop_path, "w500")}
                      >
                        <InfoBox variants={infoVars}>
                          <p>{tv.name}</p>
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
                <Modal style={{ top: scrollY.get() + 100 }} layoutId={ModalID}>
                  {(clickedTv || clickedATv || clickedTTv) && (
                    <>
                      <ModalCover>
                        <TvDetail />
                      </ModalCover>
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
export default Tv;
