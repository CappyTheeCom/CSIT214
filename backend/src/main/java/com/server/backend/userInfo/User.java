package com.server.backend.userinfo;

import com.server.backend.usersesh.Session;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;

//Makes the class a file that can be used to identify and make the current database from the json data 
@Entity 
@Table(name = "UserData.db", uniqueConstraints = {@UniqueConstraint(columnNames = {"email"})})
public class User {
    //creating the primary key on email and json structure 
    @Id
    private String email;
    private String pass;
    private String fname;
    private String lname;

    //allowing for the mapping of the foreign key towards the session database
    @OneToOne(optional=false, mappedBy="user")
    private Session session;

    //Initalising the class to make it functional
    public User() {}


    //creating the getter and setter methods for the json to adapt the information and store into the database
    public Session getSession(){return session;}
    public String getEmail() { return email; }
    public String getPass() { return pass;}
    public String getFname() { return fname; }
    public String getLname() { return lname; }
}