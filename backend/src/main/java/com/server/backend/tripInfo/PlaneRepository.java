package com.server.backend.tripinfo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

//creates an interface to allow for the databse to insert the information from java
@Repository
public interface PlaneRepository extends JpaRepository<Plane, String> {
    Plane findByplaneId (String planeId);
}