import { Container, CircularProgress, Button, Grid, Box, TextField, TextFieldProps, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Movie, Person, TVShow } from "../services/TMDB";
import SearchIcon from '@mui/icons-material/Search';
import MovieBox from "../components/movieBox";
import { useRef } from "react";
import TVShowBox from "../components/tvShowBox";
import PersonBox from "../components/personBox";
import { MultiSearch } from "../lib/queryWraper";

const SearchResults = () => {
  let navigate = useNavigate();

  let params = new URLSearchParams(window.location.search);

  let searchTerm = params.get('term');
  const { isLoading, data } = MultiSearch(searchTerm);

  const movies = data?.filter(item => item.media_type === 'movie').slice(0, 5) as Movie[];
  const tvShows = data?.filter(item => item.media_type === 'tv').slice(0, 5) as TVShow[];
  const persons = data?.filter(item => item.media_type === 'person').slice(0, 5) as Person[];

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
            defaultValue={searchTerm}
          />
          <Button
            onClick={() => onSearch(searchTermRef.current?.value as string)}
            variant="text"
          >
            <SearchIcon />
          </Button>
        </Box>
      </Container>
      <Container>
        <Typography mt={5}>Movies</Typography>
        {isLoading ? <CircularProgress /> :
          <Grid container spacing={2} sx={{}}>
            {movies?.length ? movies?.map(movie =>
              <Grid item xs={2} key={movie.id}>
                <MovieBox movie={movie} />
              </Grid>
            ) :
              <Typography mt={5}>No results</Typography>
            }
          </Grid>
        }
        <Typography mt={5}>TV Shows</Typography>
        {isLoading ? <CircularProgress /> :
          <Grid container spacing={2} sx={{}}>
            {tvShows.length ? tvShows?.map(show =>
              <Grid item xs={2} key={show.id}>
                <TVShowBox show={show} />
              </Grid>
            ) :
              <Typography mt={5}>No results</Typography>
            }
          </Grid>
        }
        <Typography mt={5}>Person</Typography>
        {isLoading ? <CircularProgress /> :
          <Grid container spacing={2} sx={{}}>
            {persons.length ? persons?.map(person =>
              <Grid item xs={2} key={person.id}>
                <PersonBox person={person} />
              </Grid>
            ) :
              <Typography mt={5}>No results</Typography>
            }
          </Grid>
        }
      </Container>
    </Container>
  )
};

export default SearchResults;
