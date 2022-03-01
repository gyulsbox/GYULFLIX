import styled from "styled-components";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import gyulflix from "../resources/img/gyulflix.png";

const Container = styled(motion.nav)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  top: 0;
  background-color: transparent;
  font-size: 14px;
  padding: 20px 60px;
  color: white;
  z-index: 100;
`;

const Box = styled.div`
  width: 95%;
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled(motion.div)`
  margin-right: 50px;
  width: 95px;
  height: 25px;
  img {
    width: 100%;
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

const Back = () => {
  const navigate = useNavigate();
  const onClick = () => {
    navigate(-1);
  };
  return (
    <Container>
      <Box>
        <Link to="/">
          <Logo variants={logoVars} whileHover="active" initial="normal">
            <img src={gyulflix} alt="" />
          </Logo>
        </Link>
        <KeyboardBackspaceIcon onClick={onClick} style={{ width: "30px", height: "30px", cursor: "pointer" }} />
      </Box>
    </Container>
  );
};

export default Back;
