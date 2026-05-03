//creating document listen to allow for the process of java-script
document.addEventListener('DOMContentLoaded', function(){
    const flight = new flightInfo()

    flight.getFlightInfo()
})

class flightInfo{

    //creating constructor
    constructor(){
        this.__fromCity = document.getElementById('fromCity')
        this.__toCity = document.getElementById('toCity')
        this.__departure = document.getElementById('departure')
    }

    //getting flight information to allow for the processing of additional 
    getFlightInfo(){
        document.getElementById('submit').addEventListener('click', (e)=>{
            e.preventDefault()

            const fromCity = this.__fromCity.value
            const toCity = this.__toCity.value 
            const departure = this.__departure.value 

            const JsonData = JSON.stringify({departure,fromCity,toCity})

            fetch(`http://localhost:8080/trip/search`, {
                method : 'POST', 
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JsonData
            })
            .then(response => {
                if(!response.ok) throw new Error('Request Failed')
                return response.json()
            })
            .then(data => {
                let params = new URLSearchParams();
                params.append("fromCity", fromCity);
                params.append("toCity", toCity);
                params.append("departure", departure); 
                window.location.href = '/Front-end/bookFlight-screen/bookFlight-screen.html?' + params.toString();
            })
            .catch(error => {console.log('Error', error)})
        })
    
    }

}