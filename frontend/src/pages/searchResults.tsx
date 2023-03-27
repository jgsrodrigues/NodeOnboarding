import { Container, CircularProgress, Button, Grid, Box, TextField, TextFieldProps } from "@mui/material";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import TMDBAPI from "../services/TMDB";
import SearchIcon from '@mui/icons-material/Search';
import MovieBox from "../components/movieBox";
import { useRef } from "react";

const SearchResults = () => {
  let navigate = useNavigate();

  let params = new URLSearchParams(window.location.search);

  let x = params.get('term');
  const { isLoading, data } = useQuery(['moviesSearch', x], () => {
    if (x && x.length >= 3) {
      return TMDBAPI.searchMovies(x);
    }
  });

  const onSearch = (term?: string) => {
    if (term && term.length >= 3) {
      params.set('term', term || '')
      navigate({
        search: params.toString()
      });
    }
  }

  const searchTermRef = useRef<TextFieldProps>();

  return (
    <Container>
      <Container maxWidth="xs">
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <TextField
            id="movieSearch"
            label="Movie Search"
            variant="outlined"
            required
            fullWidth
            margin="normal"
            type={'search'}
            inputRef={searchTermRef}
            defaultValue={x}
          />
          <Button
            onClick={() => onSearch(searchTermRef.current?.value as string)}
            variant="text"
          >
            <SearchIcon />
          </Button>
        </Box>
      </Container>

      {isLoading ? <CircularProgress /> :
        <Grid container spacing={2} mt={5}>
          {data?.map(movie =>
            <Grid item xs={2} key={movie.id}>
              <MovieBox movie={movie} key={movie.id} />
            </Grid>
          )}
        </Grid>
      }
    </Container>
  )
};

export default SearchResults;
