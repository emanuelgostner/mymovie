package com.mymovie.controller;

import java.security.Principal;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import javax.validation.Valid;

import com.mymovie.dto.MovieDTO;
import com.mymovie.security.payloads.request.LoginRequest;
import com.mymovie.security.payloads.request.SignupRequest;
import com.mymovie.security.payloads.response.JwtResponse;
import com.mymovie.security.payloads.response.MessageResponse;
import com.mymovie.security.services.UserDetailsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.mymovie.dto.ERole;
import com.mymovie.dto.Role;
import com.mymovie.dto.User;

import com.mymovie.repository.RoleRepository;
import com.mymovie.repository.UserRepository;
import com.mymovie.security.jwt.JwtUtils;
import com.mymovie.security.services.UserDetailsImpl;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {
	@Autowired
	AuthenticationManager authenticationManager;

	@Autowired
	UserRepository userRepository;

	@Autowired
	RoleRepository roleRepository;

	@Autowired
	PasswordEncoder encoder;

	@Autowired
	JwtUtils jwtUtils;
	
	@Autowired
	private UserDetailsServiceImpl userDetailsService;

	@PostMapping("/signin")
	public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

		// Je nachdem die authentication erfolgreich war oder nicht enthält das authentication objekt den User oder einer Fehlermeldung
		Authentication authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));

		SecurityContextHolder.getContext().setAuthentication(authentication);
		String jwt = jwtUtils.generateJwtToken(authentication);
		
		UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
		List<String> roles = userDetails.getAuthorities().stream()
				.map(item -> item.getAuthority())
				.collect(Collectors.toList());
		
		return ResponseEntity.ok(new JwtResponse(jwt,
												 userDetails.getId(),
												 userDetails.getUsername(),
												 userDetails.getEmail(),
												 roles));
	}

	@PostMapping("/signup")
	public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
		if (userRepository.existsByUsername(signUpRequest.getUsername())) {
			return ResponseEntity
					.badRequest()
					.body(new MessageResponse("Error: Username is already taken!"));
		}

		if (userRepository.existsByEmail(signUpRequest.getEmail())) {
			return ResponseEntity
					.badRequest()
					.body(new MessageResponse("Error: Email is already in use!"));
		}

		// Create new user's account
		User user = new User(signUpRequest.getUsername(),
							 signUpRequest.getEmail(),
							 encoder.encode(signUpRequest.getPassword()));

		Set<String> strRoles = signUpRequest.getRole();
		Set<Role> roles = new HashSet<>();

		if (strRoles == null) {
			Role userRole = roleRepository.findByName(ERole.ROLE_USER)
					.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
			roles.add(userRole);
		} else {
			strRoles.forEach(role -> {
				switch (role) {
				case "admin":
					Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
							.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
					roles.add(adminRole);

					break;
				case "mod":
					Role modRole = roleRepository.findByName(ERole.ROLE_MODERATOR)
							.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
					roles.add(modRole);

					break;
				default:
					Role userRole = roleRepository.findByName(ERole.ROLE_USER)
							.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
					roles.add(userRole);
				}
			});
		}

		user.setRoles(roles);
		userRepository.save(user);

		return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
	}
	
	
	@PostMapping("/test")
	public String test(@RequestBody MovieDTO movie, // the effective payload sent by the post request and mapped directly to a MovieDTO Model
	                   @RequestHeader("Authorization") String jwt, // get jwt from the post header
	                   Principal principal, // get Principal
	                   @AuthenticationPrincipal UserDetailsImpl customUser) { // Injection, get the user details with the custom user details implementation
		
		// Method 1 to get the user Information directly from the injected UserDetailsImpl
		// get the user id from the userDetailsImpl Object. The standard UserDetails would not allow that, only getUsername
		//Long userId = customUser.getId();
		
		// Method 2 to access the Principal from the SecurityContextHolder and cast it to the UserDetailsimpl
		// This is the alternative way instead of the injection in the Method signature
		UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		userDetails.getId();
		
		// Method 3 to get the user Information, builds the whole User Object
		// get username by the jwtUtils function
		String username = jwtUtils.getUserNameFromJwtToken(jwt);
		UserDetails user = userDetailsService.loadUserByUsername(username);
		// remove Bearer and extract the token from the header
		if (jwt.startsWith("Bearer ")){
		     jwt = jwt.substring(7, jwt.length());
		} else {
		   //Error
		}
		
		return "Hallo";
	}
}