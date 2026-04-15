package com.server.backend;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

//Makes the class a file that can be used to identify and make the current database from the json data 
@Entity 
@Table(name = "UserData.db")
public class User {
    //creating the primary key on email and json structure 
    @Id
    private String email;
    private String pass;

    private String fname;
    private String lname;


    //Initalising the class to make it functional
    public User() {}

    //creating the getter and setter methods for the json to adapt the information and store into the database
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPass() { return pass;}
    public void setPass(String pass) { this.pass = pass; }

    public String getFname() { return fname; }
    public void setFname(String fname) { this.fname = fname; }

    public String getLname() { return lname; }
    public void setLname(String lname) { this.lname = lname; }
}