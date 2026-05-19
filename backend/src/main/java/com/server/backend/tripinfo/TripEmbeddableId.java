package com.server.backend.tripinfo;

import java.io.Serializable;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Embeddable
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class TripEmbeddableId implements Serializable {
    private String planeId;
    private String departure;
    private String depTime;
    private String arvTime;
}