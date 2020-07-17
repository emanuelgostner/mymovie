package com.mymovie.controller;

import com.mymovie.dto.User;
import com.mymovie.repository.UserRepository;
import com.mymovie.security.services.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.util.JSONPObject;
import com.mymovie.dto.MovieDTO;
import com.mymovie.security.services.UserDetailsImpl;
import com.mymovie.service.MovieService;
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

@CrossOrigin(origins = "*", maxAge = 3600)
@Controller
public class UserController {

    @Autowired
    private UserRepository userRepository;

    //Function to change username
    //PUT to /api/user/current
    //changes the username in the DB to the username in the request body
    @PutMapping(value = "/api/user/current")
    public ResponseEntity<String> changeUsername(@RequestBody String newUsername, @AuthenticationPrincipal UserDetailsImpl customUser) {
        System.out.println("test");
        User user = userRepository.getOne(customUser.getId());
        user.setUsername(newUsername);
        userRepository.save(user);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
