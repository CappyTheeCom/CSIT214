package com.server.backend.usersesh;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.server.backend.userinfo.User;
import com.server.backend.userinfo.UserRepository;

import jakarta.servlet.http.HttpServletResponse;




@RestController
@RequestMapping("/sesh")
@CrossOrigin(origins = "http://127.0.0.1:5500")
public class UserSession{

    @Autowired
    private final SessionRepository sessionRepository; 

    @Autowired 
    private final UserRepository userRepository;

    public UserSession(SessionRepository sessionRepository, UserRepository userRepository){
        this.sessionRepository = sessionRepository;
        this.userRepository = userRepository;
    }


    //genearting the user cookie and token for persistent logins
    @PostMapping("/setToken")
    public ResponseEntity setToken(HttpServletResponse response,@RequestBody User email){
        User existingUser = userRepository.findByEmail(email.getEmail())
            .orElseThrow(() -> new RuntimeException("User not found: " + email.getEmail()));
        //creating session token
        String token = UUID.randomUUID().toString();
        Session saved = sessionRepository.save(new Session(token,existingUser));
        System.out.println("Saved: " + saved.getToken());

        return ResponseEntity.ok(email);
    }












    


}