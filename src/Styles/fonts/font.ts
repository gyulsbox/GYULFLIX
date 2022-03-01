import { createGlobalStyle } from "styled-components";
import Raleway from "../fonts/raleway-v26-latin-regular.woff2";

export default createGlobalStyle`
    @font-face {
    font-family: 'Raleway Sans';
    src: local("Raleway Sans");
    font-weight: 100;
    font-display: fallback;
    src: url(${Raleway}) format('woff2')
  }
`;
