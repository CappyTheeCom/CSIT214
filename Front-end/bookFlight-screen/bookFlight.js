document.addEventListener('DOMContentLoaded', function(){
    const ticket = new TicketInfo()

    ticket.retrieveJson();
})

//retriveing json file to input into the list dynamically
class TicketInfo{

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
        console.log(trips)
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
                    <div class="fw-bold">${trip.airline}</div>
                    <div>Departure: ${trip.depTime}</div>
                    <div>Arrival: ${trip.arvTime}</div>
                    <div>Available Seats: ${trip.avaSeat}</div>
                </div>
                <div>
                    <button type="button" class="btn btn-primary btn-sm">Select</button>
                </div>
            `;
            ul.appendChild(li)
        });
    }
}