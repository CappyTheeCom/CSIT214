package com.server.backend.tripinfo;

import com.fasterxml.jackson.annotation.JsonUnwrapped;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.MapsId;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;


//Trip main class
@Entity
@Table(name = "Trip.db")
public class Trip{

    @EmbeddedId
    private TripEmbeddableId tripId;

    @OneToOne(optional=false)
    @MapsId("planeId")
    @JsonUnwrapped
    private Plane plane;
 
    private String fromCity; 
    private String toCity;  

    //creaitng JPA access 
    public Trip(){}
    public Plane getPlane() {return plane;}
    public String getFromCity() {return fromCity;}
    public String getToCity() {return toCity;}
    public TripEmbeddableId getTripId() { return tripId; }
}

