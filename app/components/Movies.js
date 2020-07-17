import React from "react";
import { render } from 'react-dom';
import "./Movies.css";
import MovieItem from "./MovieItem";

const Movies = ({movieList, toggleFavourite})=>{
  return (
      <div className="movieList" >
              <div className="filter">
              </div>
              <div className="movieItems">
                  {movieList.map(
                      (movie,i)=>
                      <MovieItem index={i} key={i} movie={movie} toggleFavourite={toggleFavourite}/>
                  )}
              </div>
          </div>
  )
};

export default Movies;