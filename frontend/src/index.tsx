import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query'
import Root from './routes/root';
import reportWebVitals from './reportWebVitals';
import AuthRoute from './routes/auth';
import Login from './routes/Login';
import Profile from './routes/Profile';

const queryClient = new QueryClient()

const App = () =>
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Root />} errorElement={<h1>ERROR</h1>}>
            <Route path='/profile/:id?' element={<AuthRoute />} >
              <Route index element={<Profile />} />
            </Route>
          </Route>
          <Route path='/login' element={<Login />} errorElement={<h1>ERROR</h1>} />
          <Route path="*" element={<h1>Ooops</h1>} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<App />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
