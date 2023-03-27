import { Container, CircularProgress, Button } from "@mui/material";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import TMDBAPI from "../services/TMDB";
import SearchIcon from '@mui/icons-material/Search';

const SearchResults = () => {
  let navigate = useNavigate();

  let params = new URLSearchParams(window.location.search);

  let x = params.get('term');
  const { isLoading, data } = useQuery(['popular', x], () => {
    if (x) {
      return TMDBAPI.searchMovies(x);
    }
  });

  const onSearch = (term: string) => {
    // const queryString = new URLSearchParams({ ...Object.fromEntries(params.entries()), term, term2: '1' }).toString();
    params.set('term', term)

    // navigate(`/searchResults?${queryString}`);
    navigate({
      search: params.toString()
    });
  }

  return (
    <Container>
      <Button
        onClick={() => onSearch('asd')}
        variant="text"
      >
        <SearchIcon />
      </Button>
      {isLoading ? <CircularProgress /> : data?.map(movie => <p key={movie.id}>{movie.title}</p>)}
    </Container>
  )
};

export default SearchResults;
