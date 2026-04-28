package com.server.backend.tripinfo;

import java.io.Serializable;
import java.util.Date;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Embeddable
@Data
@NoArgsConstructor
@AllArgsConstructor
public class TripEmbeddableId implements Serializable {
    private String planeId;
    private Date departure;
    private Date arrival;
}