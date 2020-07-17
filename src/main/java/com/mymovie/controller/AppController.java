package com.mymovie.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class AppController {
	
	@GetMapping("/app")
	public String index(){
		return "index";
	}
	
	@GetMapping("/login")
	public String login(){
		return "index";
	}
	
	@GetMapping("/register")
	public String register(){
		return "index";
	}
}
