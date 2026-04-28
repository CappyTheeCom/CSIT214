package com.server.backend.tripinfo;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/Trip")
@CrossOrigin(origins = "http://127.0.0.1:5500", allowCredentials="true")
public class TripInfo{

    @Autowired
    private TripRepository tripRepository;


    public TripInfo(TripRepository tripRepository){
        this.tripRepository = tripRepository;
    }

    //getting flight information from the home-page
    @GetMapping("/search")
    public ResponseEntity<Object> getTripInfo(@RequestParam Date depature, @RequestParam Date arrival){
        List<Trip> flightInfo = tripRepository.findByDepatureAndArrival(depature, arrival);

        //checks if the input list is empty for the search
        if(flightInfo.isEmpty()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("No flights found for the given depature and arrival dates");
        }
        //else it returns the given responses
        return ResponseEntity.status(HttpStatus.OK).body(flightInfo);
    } 

}