package com.mymovie.dao;

import com.mymovie.dto.MovieDTO;
import com.mymovie.repository.MovieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class MovieDAO implements  IMovieDAO{

    @Autowired
    MovieRepository movieRepository;

    @Override
    public boolean save(MovieDTO movieDTO) {
        movieRepository.save(movieDTO);
        return false;
    }

    @Override
    public List<MovieDTO> fetchMoviesByUserId(int userId) {
        return movieRepository.findByUserId(userId);
    }


    public long deleteByUserIdAndId(int userId, int id){
        return movieRepository.deleteByUserIdAndId(userId,id);
    }
}
