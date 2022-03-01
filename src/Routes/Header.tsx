import styled from "styled-components";
import { motion, useAnimation, useViewportScroll } from "framer-motion";
import { Link, useMatch, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import gyulflix from "../resources/img/gyulflix.png";

const Nav = styled(motion.nav)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  width: 100%;
  top: 0;
  background-color: black;
  font-size: 14px;
  padding: 20px 60px;
  color: white;
  z-index: 100;
`;

const Col = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled(motion.div)`
  margin-right: 50px;
  width: 95px;
  height: 25px;
  img {
    width: 100%;
  }
`;

const Items = styled.ul`
  display: flex;
  align-items: center;
`;

const Item = styled.li`
  margin-right: 20px;
  color: ${(props) => props.theme.white.darker};
  transition: color 0.3s ease-in-out;
  position: relative;
  display: flex;
  justify-content: center;
  flex-direction: column;
  a:hover {
    color: ${(props) => props.theme.red};
    transition: all 0.3s ease-in-out;
  }
`;

const Search = styled.form`
  color: white;
  display: flex;
  align-items: center;
  position: relative;
  svg {
    height: 25px;
  }
`;

const Circle = styled(motion.span)`
  position: absolute;
  width: 5px;
  height: 5px;
  border-radius: 5px;
  bottom: -7px;
  left: 0;
  right: 0;
  margin: 0 auto;
  background-color: ${(props) => props.theme.red};
`;

const Input = styled(motion.input)`
  transform-origin: right center;
  position: absolute;
  right: 0px;
  padding: 5px 10px;
  padding-left: 40px;
  z-index: -1;
  color: white;
  font-size: 16px;
  background-color: transparent;
  border: 1px solid ${(props) => props.theme.white.lighter};
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

const navVars = {
  top: {
    backgroundColor: "rgba(0,0,0,0)",
  },
  scroll: {
    backgroundColor: "rgba(0,0,0,1)",
  },
};

interface IForm {
  keyword: string;
}

function Header() {
  const [searchOpen, setSearchOpen] = useState(false);
  const movieMatch = useMatch("/movies");
  const movieDetailMatch = useMatch("/movies/:movieId");
  const tvMatch = useMatch("/tv");
  const tvDetailMatch = useMatch("/tv/:tvId");
  const upcomingMatch = useMatch("/upcoming");
  const upcomingDetailMatch = useMatch("/upcoming/:upcomingId");
  const inputAnimation = useAnimation();
  const navAnimation = useAnimation();
  const { scrollY } = useViewportScroll();
  const toggleSearch = () => {
    setFocus("keyword");
    if (searchOpen) {
      // trigger the close animation
      inputAnimation.start({
        scaleX: 0,
      });
    } else {
      // trigger the open animation
      inputAnimation.start({ scaleX: 1 });
      setTimeout(() => {
        setSearchOpen((perv) => !perv);
        inputAnimation.start({
          scaleX: 0,
        });
      }, 10000);
    }
    setSearchOpen((prev) => !prev);
  };
  useEffect(() => {
    scrollY.onChange(() => {
      if (scrollY.get() > 80) {
        navAnimation.start("scroll");
      } else {
        navAnimation.start("top");
      }
    });
  }, [scrollY, navAnimation]);
  const navigate = useNavigate();
  const { register, handleSubmit, setFocus } = useForm<IForm>();
  const onVaild = (data: IForm) => {
    navigate(`/search?query=${data.keyword}`);
  };

  if (movieMatch === null && movieDetailMatch === null && tvMatch === null && tvDetailMatch === null && upcomingMatch == null && upcomingDetailMatch === null) return null;

  return (
    <Nav variants={navVars} initial={"top"} animate={navAnimation}>
      <Col>
        <Logo variants={logoVars} whileHover="active" initial="normal">
          <a href="https://github.com/gyulsbox/gyulfilx">
            <img src={gyulflix} alt="" />
          </a>
        </Logo>
        <Items>
          <Item>
            <Link to="/">Home</Link>
          </Item>
          <Item>
            <Link to="movies">
              Movies
              {movieMatch || movieDetailMatch ? <Circle layoutId="circle" /> : null}
            </Link>
          </Item>
          <Item>
            <Link to="tv">
              Tv Shows
              {tvMatch || tvDetailMatch ? <Circle layoutId="circle" /> : null}
            </Link>
          </Item>
          <Item>
            <Link to="upcoming">
              Upcoming
              {upcomingMatch && <Circle layoutId="circle" />}
            </Link>
          </Item>
        </Items>
      </Col>
      <Col>
        <Search onSubmit={handleSubmit(onVaild)}>
          <motion.svg onClick={toggleSearch} animate={{ x: searchOpen ? -180 : 0 }} transition={{ type: "linear" }} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path>
          </motion.svg>
          <Input
            {...register("keyword", { required: true, minLength: 2 })}
            animate={inputAnimation}
            initial={{ scaleX: 0 }}
            transition={{ type: "linear" }}
            placeholder="Search for movie or tv show..."
          />
        </Search>
      </Col>
    </Nav>
  );
}

export default Header;
