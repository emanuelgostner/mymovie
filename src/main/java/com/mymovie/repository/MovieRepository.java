package com.mymovie.repository;

import com.mymovie.dto.MovieDTO;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface MovieRepository extends CrudRepository <MovieDTO,Integer> {
    List<MovieDTO> findByUserId(int userId);
    long deleteByUserIdAndId(int userId, int id);
}
