import { Container, TextField, Button, Box, CircularProgress, Grid } from "@mui/material";
import { useQuery } from "react-query";
import TMDBAPI from "../services/TMDB";
import SearchIcon from '@mui/icons-material/Search';
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import MovieBox from "../components/movieBox";

const Home = () => {
  let navigate = useNavigate();

  const { isLoading, data } = useQuery('popular', TMDBAPI.getPopularMovies);
  const { handleSubmit, register } = useForm<{ term: string }>();

  const onSearch = ({ term }: { term: string }) => {
    const queryString = new URLSearchParams({ term }).toString();
    navigate(`/searchResults?${queryString}`)
  }

  return (
    <>
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
            variant="standard"
            required
            fullWidth
            margin="normal"
            type={'search'}
            {...register('term', { required: "Required", })}
          />
          <Button
            onClick={handleSubmit(onSearch)}
            variant="text"
          >
            <SearchIcon />
          </Button>
        </Box>

      </Container>
      {isLoading ? <CircularProgress /> :
        <Grid container spacing={2} mt={5}>
          {data?.slice(0, 6).map(movie =>
            <Grid item xs={2} key={movie.id}>
              <MovieBox movie={movie} key={movie.id} />
            </Grid>
          )}
        </Grid>
      }
    </>
  )
};

export default Home;
