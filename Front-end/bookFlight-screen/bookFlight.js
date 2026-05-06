document.addEventListener('DOMContentLoaded', function(){
    const ticket = new TripInfo();
    ticket.retrieveJson();
})

//retriveing json file to input into the list dynamically
class TripInfo{

    async retrieveJson(){
        const params = new URLSearchParams(window.location.search)
        const response = await fetch('http://localhost:8080/trip/search', {
            method: 'POST',
            headers:{
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                fromCity: params.get('fromCity'),
                toCity: params.get('toCity'),
                departure: params.get('departure')
            })
        });
        const trips = await response.json();
        console.log(trips);
        return this.displayTrips(trips);
    }

    //displaying the trips from the inital function to retrieve from the other function
    displayTrips(trips){
        const ul = document.getElementById('tripList');

        //displaying the json file
        trips.forEach(trip => {
            const li = document.createElement('li');
            li.className = 'list-group-item d-flex justify-content-between align-items-start';
            li.innerHTML =`
                <div class="ms-2 me-auto">
                    <div class="fw-bold">${trip.airLine}</div>
                    <div class="departure">${trip.tripId.departure}</div>
                    <div>Departure: ${trip.tripId.depTime}</div>
                    <div>Arrival: ${trip.tripId.arvTime}</div>
                    <div>Available Seats: ${trip.avaSeat}</div>
                </div>
                <div>
                    <div>
                        <h4>$${trip.tPrice.toFixed(2)}</h4>
                    </div>
                    <div class="ms-4 mt-3">
                        <button type="button" class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#baggageModal" id="selectTrip">Select</button>
                    </div>
                </div>
            `;

            //attaching listener event when displaying information 
            const button = li.querySelector('#selectTrip');
            button.addEventListener('click', () => {
                document.getElementById('modalCities').textContent = `${trip.fromCity} → ${trip.toCity}`;
                document.getElementById('modalTimes').textContent = `${trip.tripId.depTime} → ${trip.tripId.arvTime}`;
                this.storeFlightInfo(trip);
            })
            ul.appendChild(li)
        });
    }




    //creating session-storage for the baggage info
    storeFlightInfo(trip){
        const confirmBtn = document.getElementById('confirmBtn');

        const handleConfirm = () =>{

            const carryOnWeight = document.querySelector('input[name="carryWeight"]:checked');
            const baggageWeight = document.querySelector('input[name="baggageWeight"]:checked')
            const carryValue = carryOnWeight.value;
            const baggageValue = baggageWeight.value;
            
            const tripInfo = {
            airline: trip.airLine,
            plane : trip.tripId.planeId, 
            date: trip.tripId.departure, 
            departure: trip.tripId.depTime, 
            arrival: trip.tripId.arvTime,
            carryOn: carryValue, 
            checkedBaggage : baggageValue
            };

            //caching into session file
            sessionStorage.setItem('tripInfo', JSON.stringify(tripInfo));
            window.location.href = 'bookSeat-screen.html';
        };
        //preventing double firing from happening when selecting the flight
        confirmBtn.removeEventListener('click', handleConfirm);
        confirmBtn.addEventListener('click', handleConfirm, {once:true})   
    };
}