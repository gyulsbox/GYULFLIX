import {useLocation} from 'react-router-dom';

// Make Search Tab that shows tv show or movies by Multi Search API

function Search() {
  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get('keyword');
  console.log(keyword);

  return null;
}

export default Search;
