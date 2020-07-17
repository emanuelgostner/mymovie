package com.mymovie.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.util.JSONPObject;
import com.mymovie.dto.MovieDTO;
import com.mymovie.security.services.UserDetailsImpl;
import com.mymovie.service.MovieService;
import org.hibernate.internal.util.xml.XmlDocument;
import org.json.JSONArray;
import org.json.JSONObject;
import org.json.XML;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@Controller
public class MainController {

    @Autowired
    private MovieService movieService;

    //Function for saving in DB
    //POST to /api/favourites
    //needs a JSON of the movie which should be saved in the request body
    //maps the JSON to a movieDTO object and saves this in the DB
    @PostMapping(value = "/api/favourites")
    public ResponseEntity<String> saveMovie(@RequestBody String json,@AuthenticationPrincipal UserDetailsImpl customUser) throws JsonProcessingException {
        ObjectMapper objectMapper=new ObjectMapper();
        MovieDTO movieDTO = objectMapper.readValue(json,MovieDTO.class);
        movieDTO.setUserId(customUser.getId().intValue());
        movieService.save(movieDTO);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    //Function for loading from DB
    //GET to /api/favourites
    //returns all the saved movie from the currently logged in user
    //maps the movieDTO object to a json and returns it
    @GetMapping("/api/favourites")
    public ResponseEntity<String> requestMovie(@AuthenticationPrincipal UserDetailsImpl customUser,
                                               @RequestHeader(value = "XML", required = false) String xmlHeader)
            throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        List<MovieDTO> movieDTOs = movieService.fetchMoviesByUserId(customUser.getId().intValue());
        String json = objectMapper.writeValueAsString(movieDTOs);
        if(xmlHeader!=null){
            if(xmlHeader.equals("yes")) {
                JSONArray jsonArray = new JSONArray(json);
                String xmlString = xmlHandle(XML.toString(jsonArray,"movie"),movieDTOs);

                if(movieDTOs.size()>0){
                    return new ResponseEntity<>(xmlString, HttpStatus.OK);
                }
                else {
                    return new ResponseEntity<>(HttpStatus.NO_CONTENT);
                }
            }
        }
        else{
            if(movieDTOs.size()>0){
                return new ResponseEntity<>(json, HttpStatus.OK);
            }
            else {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
        }

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }


    //Function for deleting in DB
    //DELETE to /api/favourites
    //returns the number of deleted rows
    //needs a JSON of the movie which should be deleted in the request body
    @DeleteMapping(value = "/api/favourites")
    @Transactional
    public ResponseEntity<String> deleteMovie(@RequestBody String json, @AuthenticationPrincipal UserDetailsImpl customUser) throws JsonProcessingException {
        ObjectMapper objectMapper=new ObjectMapper();
        MovieDTO movieDTO = objectMapper.readValue(json,MovieDTO.class);
        long result = movieService.deleteByUserIdAndId(customUser.getId().intValue(),movieDTO.getId());
        if(result>0){
            return new ResponseEntity<>(HttpStatus.OK);
        }
        else{
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }
    

	private String xmlHandle(String xmlString, List<MovieDTO> movieDTOs){
        StringBuilder sb = new StringBuilder(xmlString);

        //insert id attributes for movie-tag
        int count =1;
        int index = sb.indexOf("<movie>")+6;
        while (count<=movieDTOs.size()) {
            sb.replace(index, index, " id:\"" + count + "\"");
            index = sb.indexOf("<movie>", index) + 6;
            count++;
        }

        //insert id attributes for genre_ids-tag
        count =1;
        index = sb.indexOf("<genre_ids>")+10;
        int arraylen=0, i=0, countlist=0, listindex=0, countDTO=1;
        List<Integer> ints = new ArrayList<>();
        for (MovieDTO movieDTO:movieDTOs) {
            arraylen+=movieDTO.getGenre_ids().size();
            ints.add(movieDTO.getGenre_ids().size());
        }
        countlist=ints.get(listindex);
        while (count<=arraylen) {
            if(countDTO>countlist){
                listindex++;
                countlist=ints.get(listindex);
                countDTO=1;
            }
            sb.replace(index, index, " id:\"" + countDTO + "\"");
            index = sb.indexOf("<genre_ids>", index) + 10;
            count++;
            countDTO++;
        }

        count =1;
        index = sb.indexOf("</userId>")+9;
        while (count<=movieDTOs.size()) {
            sb.replace(index, index, "<genres>");
            index = sb.indexOf("</userId>", index) + 9;
            count++;
        }

        count =1;
        index = sb.indexOf("<poster_path>");
        while (count<=movieDTOs.size()) {
            sb.replace(index, index, "</genres>");
            index+=13;
            index = sb.indexOf("<poster_path>", index);
            count++;
        }

        //insert start and end-tag
        sb.insert(0,"<movies>");
        sb.append("</movies>");
        return  sb.toString();
    }
}