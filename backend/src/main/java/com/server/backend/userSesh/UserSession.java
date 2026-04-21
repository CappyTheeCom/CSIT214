package com.server.backend.usersesh;

import java.time.LocalDateTime;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.server.backend.userinfo.User;
import com.server.backend.userinfo.UserRepository;

import jakarta.servlet.http.Cookie;
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

        //creating user cookies
        Cookie cookie = new Cookie("session_token", token); 
        cookie.setHttpOnly(true);
     
        //adds cook to the server response. Checking for cross user response. 
        response.setHeader("Set-Cookie",
        "session_token=" + token + "; Path=/; HttpOnly; SameSite=None; Secure; Max-Age=3600");
        return ResponseEntity.ok(email);
    }

    //creating cleanup 
    @Scheduled(fixedRate = 30 * 60000)
    public void deleteExpiredSession(){
        //deletes the session where the expired date meets the date time
        sessionRepository.deleteByExpiresBefore(LocalDateTime.now());
    }

    //Reading cookie information 
    @GetMapping("/profile")
    public ResponseEntity getProfile(@CookieValue(value = "session_token", defaultValue="guest")String session_token){

        //creating unauthorization for the user if they're not logged in 
        if(session_token.equals("guest")){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Not logged in");
        }
        //Runtime error is thrown to see if the session-token is found 
        Session session = sessionRepository.findByToken(session_token)
            .orElseThrow(() -> new RuntimeException("Session not found!")); 

        // check if session is expired
        if (session.getExpires().isBefore(LocalDateTime.now())) {
        sessionRepository.delete(session);
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Session expired");
        }

        return ResponseEntity.ok(session.getUserEmail());
    }









    


}