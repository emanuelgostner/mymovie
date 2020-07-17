import React from "react";
import "./MovieItem.css";

const MovieItem = ({index, movie, toggleFavourite})=> {
    return (
    <div className={"movieItem"} key={index}>
        <div className={"movieItem_top"}>
            <div className={"movieItem_number"}>{index+1}</div>
            <div>
                <img src={"https://image.tmdb.org/t/p/original/"+movie.poster_path} className={"movieItem_image"} alt={movie.title}/>
                <div className={"movieItem_information"}>
                    <div className={"movieItem_favourite"} onClick={() => toggleFavourite(movie)}>
                        <svg className={"bi bi-heart-fill " + movie.fav} width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor"
                             xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd"
                                  d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
                        </svg>
                    </div>
                    <div className={"movieItem_pop"}>
                        <svg className="bi bi-trophy" width="1em" height="1em" viewBox="0 0 16 16" fill="#8e44ad"
                             xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M3 1h10c-.495 3.467-.5 10-5 10S3.495 4.467 3 1zm0 15a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1H3zm2-1a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1H5z"/>
                            <path fillRule="evenodd"
                                  d="M12.5 3a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-3 2a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm-6-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-3 2a3 3 0 1 1 6 0 3 3 0 0 1-6 0z"/>
                            <path d="M7 10h2v4H7v-4z"/>
                            <path d="M10 11c0 .552-.895 1-2 1s-2-.448-2-1 .895-1 2-1 2 .448 2 1z"/>
                        </svg>
                         {movie.popularity}
                    </div>
                    <div className={"movieItem_rating"}>
                        <svg className="bi bi-star-fill" width="1em" height="1em" viewBox="0 0 16 16" fill="#f5f358"
                             xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.283.95l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                        </svg>
                        {movie.vote_average}
                    </div>
                </div>
            </div>
        </div>
    </div>
)}

export default MovieItem;