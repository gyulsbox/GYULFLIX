import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { getMovies, getNewPopular, getTv, IGetMoviesResult, IGetTvResult } from "../../Api/api";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Loading from "../../Styles/Loading";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { motion } from "framer-motion";
import gyulflix from "../../resources/img/gyulflix.png";

const Body = styled.div`
  font-family: "Raleway Sans";
  min-width: 1024px;
  max-height: 100%;
  word-break: keep-all;
  @media screen and (max-width: 1023px) {
  }
`;

const MainContainer = styled.div`
  width: 100%;
  height: 100%;
  background-image: url("https://assets.nflxext.com/ffe/siteui/vlv3/ed0b5df9-ba9d-4534-bd09-57993daeda56/ad1fd8bb-8268-44ae-bfca-3da8cfc5726f/KR-en-20220214-popsignuptwoweeks-perspective_alpha_website_large.jpg");
  background-repeat: no-repeat;
  background-size: cover;
`;

const MainOpacity = styled.div`
  background: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.8));
`;

const MainHeader = styled.div`
  width: 100%;
  height: 150px;
  position: relative;
  display: flex;
  z-index: 10;
  @media screen and (max-width: 1280px) {
    align-items: center;
    height: 100px;
  }
`;

const HeaderWrapper = styled.header`
  width: 98%;
  height: 100px;
  position: absolute;
  display: flex;
  justify-content: space-between;
`;

const LogoBox = styled.div`
  width: 25rem;
  height: 120px;
  margin: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Logo = styled(motion.div)`
  margin-right: 50px;
  width: 150px;
  height: 50px;
  fill: ${(props) => props.theme.red};
  img {
    width: 100%;
  }
  @media screen and (max-width: 1280px) {
    img {
      width: 80%;
    }
  }
`;

const LoginBtnBox = styled.div`
  width: 10rem;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LoginBox = styled.div`
  width: 100px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  button {
    cursor: pointer;
    width: 100px;
    height: 40px;
    font-size: 18px;
    border-radius: 5px;
    border: 0;
    background-color: red;
    color: white;
    text-align: center;
  }
  a {
    border: none;
    margin: 0;
    padding: 0;
  }
  @media screen and (max-width: 1280px) {
    button {
      width: 80px;
      font-size: 16px;
    }
  }
`;

const SectionWrapper = styled.div`
  width: 100%;
  height: 65vh;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 8px solid #222;
  position: relative;
  z-index: 3000;
  @media screen and (max-width: 1280px) {
    height: 75vh;
  }
`;

const SectionContainer = styled.div`
  min-width: 700px;
  height: 40vh;
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  h1 {
    font-size: 60px;
    font-weight: 600;
    text-align: center;
  }
  h4 {
    text-align: center;
    font-size: 23px;
  }
  @media screen and (max-width: 1280px) {
    h1 {
      font-size: 50px;
    }
    h4 {
      font-size: 18px;
    }
  }
`;

const SectionBtnContainer = styled.div`
  width: 300px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  @media screen and (max-width: 1280px) {
    width: 200px;
    height: 60px;
  }
`;

const SectionBtnBox = styled(Link)`
  width: 80%;
  height: 80%;
  font-size: 35px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: red;
  @media screen and (max-width: 1280px) {
    font-size: 23px;
  }
`;

const SectionBtn = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PlayContainer = styled.div`
  width: 100%;
  height: 50%;
  padding: 70px 45px;
  border-bottom: 8px solid #222;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PlayBox = styled.div`
  width: 80%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TextContainer = styled.div`
  min-width: 650px;
  display: flex;
  align-items: center;
  justify-content: center;
  h1 {
    font-size: 60px;
    font-weight: 600;
    padding-bottom: 20px;
  }
  h4 {
    font-size: 23px;
  }
  @media screen and (max-width: 1280px) {
    min-width: 420px;
    h1 {
      font-size: 40px;
      font-weight: 600;
      padding-bottom: 20px;
    }
    h4 {
      font-size: 17px;
    }
  }
`;

const VideoContainer = styled.div`
  min-width: 400px;
  max-height: 100%;
  position: relative;
  overflow: hidden;
  @media screen and (max-width: 1280px) {
    img {
      max-width: 450px;
    }
  }
`;

const VideoImg = styled.img`
  max-width: auto;
  max-height: auto;
  border: 0;
  position: relative;
  z-index: 2;
  @media screen and (max-width: 1280px) {
    max-width: 450px;
  }
`;

const VideoWrapper = styled.div`
  width: 100%;
  height: 100%;
  max-width: 73%;
  max-height: 30%;
  position: absolute;
  top: 34%;
  left: 48%;
  transform: translate(-50%, -50%);
  @media screen and (max-width: 1280px) {
  }
`;

const SecondVideoWrapper = styled.div`
  width: 100%;
  height: 100%;
  max-width: 63%;
  max-height: 47%;
  position: absolute;
  top: 34%;
  left: 50%;
  transform: translate(-50%, -50%);
  video {
    object-fit: contain;
    width: 100%;
    height: 100%;
  }
`;

const logoVars = {
  normal: {
    fillOpacity: 1,
    pathLength: 0,
  },
  active: {
    x: -5,
  },
};

const Main = () => {
  const { isLoading, data } = useQuery<IGetMoviesResult>("start", getMovies);
  const { data: tvInfo } = useQuery<IGetTvResult>(["tvs"], getTv);
  const { data: newInfo } = useQuery<IGetTvResult>(["new"], getNewPopular);
  localStorage.setItem("movieId", String(data?.results[0].id));
  localStorage.setItem("tvId", String(tvInfo?.results[2].id));
  localStorage.setItem("latestId", String(newInfo?.results[0].id));
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <Body>
          <HelmetProvider>
            <Helmet>
              <title>Gyulflix</title>
            </Helmet>
          </HelmetProvider>
          <MainContainer>
            <MainOpacity>
              <MainHeader>
                <HeaderWrapper>
                  <LogoBox>
                    <span>
                      <a href="https://github.com/gyulsbox/gyulfilx">
                        <Logo variants={logoVars} whileHover="active" initial="normal">
                          <img src={gyulflix} alt="" />
                        </Logo>
                      </a>
                    </span>
                  </LogoBox>
                  <LoginBtnBox>
                    <LoginBox>
                      <a href="https://www.netflix.com/kr/login">
                        <button>Sign in</button>
                      </a>
                    </LoginBox>
                  </LoginBtnBox>
                </HeaderWrapper>
              </MainHeader>
              <SectionWrapper>
                <SectionContainer>
                  <h1>
                    Unlimited movies, TV <br /> shows, and more.
                  </h1>
                  <h4>Watch anywhere. Cancel anytime.</h4>
                  <SectionBtnContainer>
                    <SectionBtnBox to="/movies">
                      <SectionBtn>
                        Get Started <ArrowForwardIosIcon fontSize="medium" />
                      </SectionBtn>
                    </SectionBtnBox>
                  </SectionBtnContainer>
                </SectionContainer>
              </SectionWrapper>
            </MainOpacity>
          </MainContainer>
          <PlayContainer>
            <PlayBox>
              <TextContainer>
                <div>
                  <h1>Enjoy on your TV.</h1>
                  <h4>
                    Watch on Smart TVs, Playstation, Xbox,
                    <br /> Chromecast, Apple TV, Blu-ray players, and
                    <br /> more.
                  </h4>
                </div>
              </TextContainer>
              <VideoContainer>
                <VideoImg alt="" src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/tv.png" data-uia="our-story-card-img" />
                <VideoWrapper>
                  <video autoPlay playsInline muted loop>
                    <source src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/video-tv-0819.m4v" type="video/mp4" />
                  </video>
                </VideoWrapper>
              </VideoContainer>
            </PlayBox>
          </PlayContainer>
          <PlayContainer>
            <PlayBox>
              <VideoContainer>
                <img alt="" src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/mobile-0819.jpg" data-uia="our-story-card-img" />
              </VideoContainer>
              <TextContainer>
                <div>
                  <h1>
                    Download your shows
                    <br /> to watch offline.
                  </h1>
                  <h4>
                    Save your favorites easily and always have <br /> something to watch.
                  </h4>
                </div>
              </TextContainer>
            </PlayBox>
          </PlayContainer>
          <PlayContainer>
            <PlayBox>
              <TextContainer>
                <div>
                  <h1>Enjoy on your TV.</h1>
                  <h4>
                    Watch on Smart TVs, Playstation, Xbox,
                    <br /> Chromecast, Apple TV, Blu-ray players, and
                    <br /> more.
                  </h4>
                </div>
              </TextContainer>
              <VideoContainer>
                <VideoImg alt="" src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/device-pile.png" data-uia="our-story-card-img" />
                <SecondVideoWrapper>
                  <video autoPlay playsInline muted loop>
                    <source src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/video-devices.m4v" type="video/mp4" />
                  </video>
                </SecondVideoWrapper>
              </VideoContainer>
            </PlayBox>
          </PlayContainer>
          <PlayContainer>
            <PlayBox>
              <VideoContainer>
                <img
                  alt=""
                  src="https://occ-0-988-325.1.nflxso.net/dnm/api/v6/19OhWN2dO19C9txTON9tvTFtefw/AAAABdFTpLmANuJpYneLq8L5m7CunMCi8e8Nl4y7xaPVWzG3IeoDoq17egTQAthApKg_4sdRWdwuR8KadWu1frjL3JQImpwq.png?r=fcd"
                  data-uia="our-story-card-img"
                />
              </VideoContainer>
              <TextContainer>
                <div>
                  <h1>Create profiles for kids.</h1>
                  <h4>
                    Send kids on adventures with their favorite <br /> characters in a space made just for them— <br /> free with your membership.
                  </h4>
                </div>
              </TextContainer>
            </PlayBox>
          </PlayContainer>
        </Body>
      )}
    </>
  );
};
export default Main;
