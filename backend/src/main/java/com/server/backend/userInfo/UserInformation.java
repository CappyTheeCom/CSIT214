package com.server.backend.userinfo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


//Allows for the file to be accessed locally on the laptop 
@RestController 
@RequestMapping("/user")
@CrossOrigin(origins = "http://127.0.0.1:5500") 
public class UserInformation{

	@Autowired
	private final UserRepository userRepository;  // Creates the userRepository class from the other java file into here

    public UserInformation(UserRepository userRepository) {  // Creates the repository class as an instance variable 
        this.userRepository = userRepository;
    }


	//Creates a call point for the json file to be made for the https
	@PostMapping("/data")
	public ResponseEntity<User> recieveData(@RequestBody User user){
		// Spring Boot automatically converts the JSON body to the User object
		User saved = userRepository.save(user);
		System.out.println("Saved: " + saved.getFname() + " ID: " + saved.getEmail());
		return ResponseEntity.ok(user);
	}


	//creating instance for the email to be used 
	//Checking if the user has already been validated within the database 
	@PostMapping("/validate-data")
	public boolean  validateUser(@RequestBody String email){
		return userRepository.existsByEmail(email);
	}
}
