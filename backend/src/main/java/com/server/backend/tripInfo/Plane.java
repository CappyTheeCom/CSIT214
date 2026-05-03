package com.server.backend.tripinfo;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
//plane associative class
@Entity
@Table(name = "Plane.db")
public class Plane{

    @Id
    private String planeId;
    private int avaSeat;
    private String brandName; 

    //creating initalisation for JPA-repository 
    public Plane(){}

    //mapping for the Trip class to allow for the connection 
    @OneToOne(optional=false, mappedBy="plane")
    @JsonIgnore
    private Trip trip;


    public String getPlaneId() {return planeId;}
    public String getBrandName() {return brandName;}
    public int getAvaSeat() {return avaSeat;}
    public Trip getTrip() {return trip;}
}