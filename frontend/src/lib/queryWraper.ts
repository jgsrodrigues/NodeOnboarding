import { useQuery } from "react-query";
import NodeAPI, { User } from "../services/backend";
import TMDBAPI from "../services/TMDB";

import queryClient from './queryClient';

type Type = "movie" | "show";

export const GetTop5Movies = () => useQuery('popular', TMDBAPI.getPopularMovies);

export const GetMovieDetails = (movieId?: string) => useQuery(['movieDetails', movieId], () => {
  if (movieId)
    return TMDBAPI.getMovieDetails(movieId)
});

export const MultiSearch = (term: string | null) => useQuery(['multiSearch', term], () => {
  if (term && term.length >= 3)
    return TMDBAPI.multiSearch(term);
});

export const useUserData = () => useQuery('user', () => NodeAPI.getProfile());

export const AddFavourite = async (id: number, type: Type) => {
  const email = sessionStorage.getItem('email');
  if (email) {
    await NodeAPI.addFavourite(email, id, type);
  }
};

export const RemoveFavourite = async (id: number, type: Type) => {
  const email = sessionStorage.getItem('email');
  if (email) {
    await NodeAPI.removeFavourite(email, id, type);
  }
};

export const AddRating = async (id: number, type: Type, rating: number) => {
  const email = sessionStorage.getItem('email');
  if (email) {
    await NodeAPI.addRating(email, id, type, rating);
    queryClient.invalidateQueries('user');
  }
};

export const UpdateProfile = (profileData: FormData) => {
  NodeAPI.updateProfile(profileData);
};
