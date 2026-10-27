
import React, { useState, useEffect } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { getPopularMovies } from "../api/tmdb-api";
import AddToWatchListIcon from "../components/cardIcons/addToWatchList";

const PopularMoviesPage = (props) => {
  const [movies, setMovies] = useState([]);

  const favorites = movies.filter(m => m.favorite);
  localStorage.setItem('favorites', JSON.stringify(favorites));

  const addToFavorites = (movieId) => {
    const updatedMovies = movies.map((m) =>
      m.id === movieId ? { ...m, favorite: true } : m
    );
    setMovies(updatedMovies);
  };

  useEffect(() => {
    getPopularMovies().then(movies => {
      setMovies(movies);
    });
  }, []);

  return (
    <PageTemplate
      title='Popular Movies'
      movies={movies}
      selectFavorite={addToFavorites}
      action={(movie) => {
        return <AddToWatchListIcon movie={movie} />;
      }}
    />
  );
};

export default PopularMoviesPage;
