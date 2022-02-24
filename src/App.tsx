import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Header from './Components/Header';
import Home from './Routes/Home';
import Latest from './Routes/Latest';
import Movies from './Routes/Movies';
import Search from './Routes/Search';
import Tv from './Routes/Tv';
import {ReactQueryDevtools} from 'react-query/devtools';

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/*" element={<Home />} />
          <Route path="/tv" element={<Tv />} />
          <Route path="/movies" element={<Movies />}>
            <Route path="movies/:movieId"></Route>
          </Route>
          <Route path="/Latest" element={<Latest />} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </Router>
      <ReactQueryDevtools />
    </>
  );
}

export default App;
