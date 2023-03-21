import { useForm } from 'react-hook-form'
import { NavigateFunction, useLocation, useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query'

import API from '../../services/backend';

const Login = ({ state, navigate }: { state: any, navigate: NavigateFunction}) => {
  const { register, handleSubmit, formState } = useForm();

  const onLoginSuccess = (response: { token: string }) => {
    sessionStorage.setItem('token', response.token);
    if (!state || state.referrer === window.location.pathname) {
      navigate('/');
    } else {
      navigate(state.referrer);
    }
  }

  const onLoginError = () => {
    navigate('/error-page');
  }

  const postLogin = ({ username, password }: { username: string, password: string }) => API.authenticate(username, password)
  const mutation = useMutation(postLogin, {
    onSuccess: onLoginSuccess,
    onError: onLoginError,
  })

  return (
    <div>
      <form onSubmit={handleSubmit(data => {
        mutation.mutate({ username: data.username, password: data.password })
      })}>
        <input {...register('username', { required: "username required", })} placeholder="Username" />
        <p>{formState.errors.username?.message?.toString()}</p>
        <input {...register('password', { required: "password required", })} placeholder="Password" />
        <p>{formState.errors.password?.message?.toString()}</p>
        <input type="submit" />
      </form>
    </div>
  );
};

const LoginRouterWraper = () => {
  let { state } = useLocation();
  let navigate = useNavigate();

  return <Login state={state} navigate={navigate} />
}

export default LoginRouterWraper;
