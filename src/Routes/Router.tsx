import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../Components/Home/Home";
import Latest from "../Components/Latest/Latest";
import Search from "../Components/Search/Search";
import Tv from "../Components/Tv/Tv";
import { ReactQueryDevtools } from "react-query/devtools";
import Main from "../Components/Main/Main";
import Upcoming from "../Components/Upcoming/Upcoming";
import Header from "./Header";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/movies" element={<Home />}>
            <Route path=":movieId" element={<Home />}></Route>
          </Route>
          <Route path="/tv" element={<Tv />} />
          <Route path="/Latest" element={<Latest />} />
          <Route path="/Upcoming" element={<Upcoming />} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </Router>
      <ReactQueryDevtools />
    </>
  );
}

export default App;
