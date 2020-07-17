package com.mymovie.service;

import com.mymovie.dao.IMovieDAO;
import com.mymovie.dto.MovieDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;


@Component
public class MovieService {
    @Autowired
    IMovieDAO movieDAO;

    public boolean save(MovieDTO movieDTO){
        movieDAO.save(movieDTO);
        return false;
    }

    public List<MovieDTO> fetchMoviesByUserId(int userId){
        return movieDAO.fetchMoviesByUserId(userId);
    }

    public long  deleteByUserIdAndId(int userId, int id){
        return movieDAO.deleteByUserIdAndId(userId,id);
    }
}
