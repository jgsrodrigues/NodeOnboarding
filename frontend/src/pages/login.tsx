import { useForm } from 'react-hook-form'
import { NavigateFunction, useLocation, useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query'

import Button from '@mui/material/Button';
import EmailIcon from '@mui/icons-material/Email';
import PasswordIcon from '@mui/icons-material/Password';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import CssBaseline from '@mui/material/CssBaseline';
import { Avatar, Box, Container, InputAdornment, TextField, Typography } from '@mui/material';

import API from '../services/backend';

type loginForm = {
  email: string;
  password: string;
}

const Login = ({ state, navigate }: { state: any, navigate: NavigateFunction }) => {
  const { handleSubmit, formState, register } = useForm<loginForm>();

  const onLoginSuccess = (response: { token: string }) => {
    sessionStorage.setItem('token', response.token);
    if (!state || state.referrer === window.location.pathname) {
      navigate('/');
    } else {
      navigate(state.referrer);
    }
  }

  const onLoginError = (e: any) => {
    console.log(e)
    navigate('/error-page');
  }

  const mutation = useMutation(({ email, password }: { email: string, password: string }) => API.authenticate(email, password).then(onLoginSuccess).catch(onLoginError));

  const onSubmit = (data: loginForm) => {
    console.log(data);
    mutation.mutate(data);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box sx={{ mt: 1 }}>
          <TextField
            id="email"
            label="Email"
            variant="standard"
            required
            fullWidth
            margin="normal"
            type={'email'}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon />
                </InputAdornment>
              )
            }}
            {...register('email', { required: "Email is required", })}
            error={formState.errors.email ? true : false}
          />
          <TextField
            id="password"
            label="Password"
            variant="standard"
            required
            fullWidth
            margin="normal"
            type={'password'}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PasswordIcon />
                </InputAdornment>
              )
            }}
            {...register('password', { required: "Password required", })}
            error={formState.errors.password ? true : false}
          />
          <Button
            onClick={handleSubmit(onSubmit)}
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Log in
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

const LoginRouterWraper = () => {
  let { state } = useLocation();
  let navigate = useNavigate();

  return <Login state={state} navigate={navigate} />
}

export default LoginRouterWraper;
