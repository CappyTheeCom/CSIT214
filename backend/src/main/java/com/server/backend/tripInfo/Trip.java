package com.server.backend.tripinfo;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
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
    @JoinColumn(name="planeId", unique=true, nullable=false, updatable=false)
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

