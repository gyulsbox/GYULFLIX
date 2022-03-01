import Router from "./Routes/Router";
import { GlobalStyle } from "./Styles/GlobalStyle";
import GlobalFonts from "./Styles/fonts/font";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

function App() {
  return (
    <>
      <GlobalFonts />
      <GlobalStyle />
      <Router />
    </>
  );
}

export default App;
