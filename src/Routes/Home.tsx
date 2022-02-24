import {motion, AnimatePresence, useViewportScroll} from 'framer-motion';
import {useState} from 'react';
import {useQuery} from 'react-query';
import {useMatch, useNavigate} from 'react-router-dom';
import styled from 'styled-components';
import {getMovies, IGetMoviesResult} from '../api';
import {makeImagePath} from '../utils';

const Wrapper = styled.div`
  height: 200vh;
  background: black;
`;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Banner = styled.div<{bgphoto: string}>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.9)),
    url(${props => props.bgphoto});
  background-size: cover;
`;

const Title = styled.h2`
  font-size: 68px;
  margin-bottom: 20px;
`;

const Overview = styled.p`
  font-size: 34px;
  width: 50%;
`;

const Slider = styled.div`
  position: relative;
  top: -220px;
  h2 {
    padding: 15px;
    font-size: 32px;
    font-weight: 300;
  }
`;

const Row = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 8px;
  position: absolute;
  width: 100%;
`;

const Box = styled(motion.div)<{bgphoto: string}>`
  background-color: white;
  height: 200px;
  border-radius: 4px;
  background-image: url(${props => props.bgphoto});
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
  background-color: ${props => props.theme.black.lighter};
  opacity: 0;
  position: absolute;
  width: 100%;
  bottom: 0;
  h4 {
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

const Modal = styled(motion.div)`
  position: absolute;
  width: 40vw;
  height: 80vh;
  left: 0;
  right: 0;
  margin: 0 auto;
  border-radius: 15px;
  overflow: hidden;
  background-color: ${props => props.theme.black.lighter};
`;

const ModalCover = styled.div`
  width: 100%;
  height: 400px;
  background-size: cover;
  background-position: center center;
`;

const ModalTitle = styled.h3`
  color: ${props => props.theme.white.lighter};
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
  color: ${props => props.theme.white.lighter};
`;

const rowVars = {
  invisible: {
    x: window.outerWidth + 10,
  },
  visible: {
    x: 0,
  },
  exit: {
    x: -window.outerWidth - 10,
  },
};

const boxVars = {
  normal: {scale: 1},
  hover: {
    scale: 1.5,
    y: -80,
    transition: {
      delay: 0.3,
      type: 'tween',
    },
  },
};

const infoVars = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.3,
      type: 'tween',
    },
  },
};

const offset = 6;

// ====== getMovieVideoPath =======
// 1. Refactoring Modal to Componet
// 2. getParams that movieId by react-router-dom's getParams();
// 3. fetching JSON within Modal Components

function Home() {
  const history = useNavigate();
  const ModalMatch = useMatch('/movies/:movieId');
  const stateMovieId = localStorage.getItem('movieId');
  console.log(stateMovieId);
  
  // const {movieId} = useParams();
  // const [modalIdState, setModalIdState] =
  //   useRecoilState<string>(clickedMovieIdState);
  const {scrollY} = useViewportScroll();
  const {data, isLoading} = useQuery<IGetMoviesResult>(
    ['movies', 'nowPlaying'],
    getMovies,
  );
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const incraseIndex = () => {
    if (data) {
      if (leaving) return;
      toggleLeaving();
      const totalMovies = data.results.length - 1;
      const maxIndex = Math.floor(totalMovies / offset) - 1;
      setIndex(prev => (prev === maxIndex ? 0 : prev + 1));
    }
  };
  const toggleLeaving = () => setLeaving(prev => !prev);
  const onBoxClicked = (movieId: number) => {
    history(`/movies/${movieId}`);
    // setModalIdState(movieId + '');
    // console.log(modalIdState);
  };
  const onOverlayClicked = () => {
    history(`/`);
    // setModalIdState('');
    // console.log(modalIdState);
  };
  const clickedMovie =
    ModalMatch?.params.movieId &&
    data?.results.find(movie => movie.id + '' === ModalMatch.params.movieId);
  // function getVideos() {
  //   return fetch(
  //     `${BASE_PATH}/movie/${movieId}/videos?api_key=${API_KEY}&language=en-US`,
  //   ).then(response => response.json());
  // }
  // const {data: video, isLoading: videos} = useQuery<IGetMoviesVideo>(
  //   ['vido', 'videos'],
  //   getVideos,
  // );
  // console.log(movieId);

  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner
            onClick={incraseIndex}
            bgphoto={makeImagePath(data?.results[0].backdrop_path || '')}
          >
            <Title>{data?.results[0].title}</Title>
            <Overview>{data?.results[0].overview}</Overview>
          </Banner>
          <Slider>
            <h2>Now Playing</h2>
            <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
              <Row
                variants={rowVars}
                initial="invisible"
                animate="visible"
                exit="exit"
                transition={{type: 'tween', duration: 1}}
                key={index}
              >
                {data?.results
                  .slice(1)
                  .slice(offset * index, offset * index + offset)
                  .map(movie => (
                    <Box
                      layoutId={movie.id + ''}
                      key={movie.id}
                      whileHover="hover"
                      initial="normal"
                      variants={boxVars}
                      transition={{type: 'tween'}}
                      onClick={() => onBoxClicked(movie.id)}
                      bgphoto={makeImagePath(movie.backdrop_path, 'w500')}
                    >
                      <InfoBox variants={infoVars}>
                        <h4>{movie.title}</h4>
                      </InfoBox>
                    </Box>
                  ))}
              </Row>
            </AnimatePresence>
          </Slider>
          <AnimatePresence>
            {ModalMatch ? (
              <>
                <Overlay
                  onClick={onOverlayClicked}
                  animate={{opacity: 1}}
                  exit={{opacity: 0}}
                />
                <Modal
                  style={{top: scrollY.get() + 100}}
                  layoutId={ModalMatch.params.movieId}
                >
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
