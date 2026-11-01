
import React from "react";
import PageTemplate from "../components/templateMovieListPage";
import { getPopularMovies } from "../api/tmdb-api";
import AddToWatchListIcon from "../components/cardIcons/addToWatchList";
import { useQuery } from '@tanstack/react-query';
import Spinner from '../components/spinner';

const PopularMoviesPage = (props) => {
  const { data, error, isPending, isError  } = useQuery({
    queryKey: ['popular'],
    queryFn: getPopularMovies,
  })

  if (isPending) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }

  const movies = data;

  const favorites = movies.filter(m => m.favorite);
  localStorage.setItem('favorites', JSON.stringify(favorites));

  return (
    <PageTemplate
      title='Popular Movies'
      movies={movies}
      action={(movie) => {
        return <AddToWatchListIcon movie={movie} />;
      }}
    />
  );
};

export default PopularMoviesPage;
