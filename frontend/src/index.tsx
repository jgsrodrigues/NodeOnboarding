import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query'
import reportWebVitals from './reportWebVitals';
import AuthRoute from './routes/auth';
import Login from './pages/login';
import Home from './pages/home';
import SearchResults from './pages/searchResults';
import MovieDetails from './pages/details';

const queryClient = new QueryClient();

const App = () =>
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AuthRoute />}>
            <Route index element={<Home />} />
            <Route path='searchResults' element={<SearchResults />} />
            <Route path='details/:id' element={<MovieDetails />} />
          </Route>
          <Route path='/login' element={<Login />} />
          <Route path="*" element={<h1>404</h1>} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<App />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
