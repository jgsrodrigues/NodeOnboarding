import { Container, TextField, Button, Box, CircularProgress, Grid, Avatar } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import MovieBox from "../components/movieBox";
import { GetTop5Movies } from "../lib/queryWraper";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const Home = () => {
  let navigate = useNavigate();

  const { isLoading, data } = GetTop5Movies();
  const { handleSubmit, register } = useForm<{ term: string }>();

  const onSearch = ({ term }: { term: string }) => {
    const queryString = new URLSearchParams({ term }).toString();
    navigate(`/searchResults?${queryString}`)
  }

  const onProfileClick = () => {
    navigate('/profile');
  }

  return (
    <>
      <Button onClick={onProfileClick}>
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
      </Button>
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
        <Grid container spacing={2} mt={5} sx={{ flexGrow: 1 }} justifyContent="center">
          {data?.slice(0, 5).map(movie =>
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
