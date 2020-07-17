package com.mymovie.dao;

import com.mymovie.dto.MovieDTO;

import java.util.List;

public interface IMovieDAO {
    boolean save(MovieDTO movieDTO);

    List<MovieDTO> fetchMoviesByUserId(int userId);

    long deleteByUserIdAndId(int userId, int id);
}
