import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Search from "../Components/Search/Search";
import Tv from "../Components/Tv/Tv";
import { ReactQueryDevtools } from "react-query/devtools";
import Main from "../Components/Main/Main";
import Upcoming from "../Components/Upcoming/Upcoming";
import Header from "./Header";
import Movie from "../Components/Movie/Movie";
import UpcomingDetail from "../Components/Details/UpcomingDetail";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/movies" element={<Movie />}>
            <Route path=":movieId" element={<Movie />} />
          </Route>
          <Route path="/tv" element={<Tv />}>
            <Route path=":tvId" element={<Tv />} />
          </Route>
          <Route path="/upcoming" element={<Upcoming />} />
          <Route path="/upcoming/:upcomingId" element={<UpcomingDetail />} />
          <Route path="/search/*" element={<Search />} />
        </Routes>
      </Router>
      <ReactQueryDevtools />
    </>
  );
}

export default App;
