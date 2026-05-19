document.addEventListener('DOMContentLoaded', function(){
    const ticket = new TripInfo();
    ticket.retrieveJson();
})

//retriveing json file to input into the list dynamically
class TripInfo{

    async retrieveJson(){
        const params = new URLSearchParams(window.location.search)
        const response = await fetch('https://csit214-production.up.railway.app/trip/search', {
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
            li.className = 'list-group-item d-flex justify-content-between align-items-start border-2';
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


            let total = parseFloat(trip.tPrice);
            let carryCost = 0;
            let baggageCost = 0;
            
            const tripInfo = {
            airline: trip.airLine,
            plane : trip.tripId.planeId, 
            date: trip.tripId.departure,
            departure: trip.fromCity,
            arrival: trip.toCity, 
            depTime: trip.tripId.depTime, 
            arvTime: trip.tripId.arvTime,
            total: trip.tPrice.toFixed(2),
            carryOn: carryValue, 
            checkedBaggage : baggageValue
            };

            //adding baggage costs 
            if(carryValue === '20kg'){
                total+= 20;
                carryCost+= 20;
            }


            if(baggageValue === '15kg'){
                total += 29;
                baggageCost+= 29;
            }
            else if(baggageValue === '20kg'){
                total+= 36;
                baggageCost+= 36;
            }
            else if(baggageValue === '30kg'){
                total+= 54
                baggageCost+= 54;
            };


            tripInfo.total = total.toFixed(2);
            tripInfo.cCost = carryCost;
            tripInfo.bCost = baggageCost;

            //caching into session file
            sessionStorage.setItem('ticketInfo', JSON.stringify(tripInfo));
            window.location.href = '/bookFlight-screen/bookSeat-screen.html';
        };
        //preventing double firing from happening when selecting the flight
        confirmBtn.removeEventListener('click', handleConfirm);
        confirmBtn.addEventListener('click', handleConfirm, {once:true})   
    };
}