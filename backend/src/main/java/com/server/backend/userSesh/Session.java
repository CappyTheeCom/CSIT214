package com.server.backend.usersesh;

import java.time.LocalDateTime;

import com.server.backend.userinfo.User;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "Session.db")
public class Session{
    //primary key
    @Id
    private String token;

    //creates the foreign key from the user class
    @OneToOne(optional=false)
    @JoinColumn(name="email",unique=true,nullable=false,updatable=false)
    private User user;
    
    //creating localdatetime variable 
    private LocalDateTime expires;



    //initalising the class for JPA repository 
    public Session(){}

    //creating constructor
    public Session(String token, User user){
        this.token =  token;
        this.user = user;
        this.expires = LocalDateTime.now().plusHours(1);
    }


    //creates the token table to allow for the User email to be a foreign key
    public User getUserEmail(){return user;}
    public String getToken(){return token;}
    public LocalDateTime getExpires(){return expires;}
}