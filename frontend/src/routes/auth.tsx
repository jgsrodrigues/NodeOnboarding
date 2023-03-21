import { Navigate, Outlet } from 'react-router-dom'

const AuthRoute = () => {
  const token = sessionStorage.getItem('token');
  return token ? <Outlet /> : <Navigate to="/login" state={{ referrer: window.location.pathname }}/>
};

export default AuthRoute;
