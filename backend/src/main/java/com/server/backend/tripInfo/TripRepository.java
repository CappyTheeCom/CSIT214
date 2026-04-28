package com.server.backend.tripinfo;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

//creates an interface to allow for the databse to insert the information from java
@Repository
public interface TripRepository extends JpaRepository<Trip, List> {
    List<Trip> findByDepatureAndArrival (Date depature, Date arrival);
}