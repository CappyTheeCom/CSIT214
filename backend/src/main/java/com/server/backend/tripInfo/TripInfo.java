package com.server.backend.tripinfo;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/trip")
@CrossOrigin(origins = "http://127.0.0.1:5500", allowCredentials="true")
public class TripInfo{

    @Autowired
    private  final TripRepository tripRepository;


    public TripInfo(TripRepository tripRepository){
        this.tripRepository = tripRepository;
    }

    //getting flight information from the home-page
    @PostMapping(value = "/search", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<Trip>> getTripInfo(@RequestBody Map<String, Object> body) throws ParseException{
        //created get methods to allow for the specific params to be taken rather than the whole class
        String departureStr = (String) body.get("departure");
        Date departure = new SimpleDateFormat("yyyy-MM-dd").parse(departureStr);
        String fromCity = (String) body.get("fromCity");
        String toCity = (String) body.get("toCity");

        List<Trip> flightInfo = tripRepository.findByTripIdDepartureAndFromCityAndToCity(departure, fromCity, toCity); //spag code !!FIX later

        //checks if the input list is empty for the search
        if(flightInfo.isEmpty()){
            System.out.println("No flight information exists!");
            return ResponseEntity.noContent().build();
        }
        //else it returns the given responses
        System.out.println("Flight info: " + flightInfo);
        return ResponseEntity.ok(flightInfo);
    }
        
}