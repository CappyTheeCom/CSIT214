//creating document listen to allow for the process of java-script
document.addEventListener('DOMContentLoaded', function(){
    const flight = new flightInfo()

    flight.getFlightInfo()
})

class flightInfo{

    //creating constructor
    constructor(){
        this.__from = document.getElementById('from')
        this.__to = document.getElementById('to')
        this.__departure = document.getElementById('departure')
    }

    //getting flight information to allow for the processing of additional 
    getFlightInfo(){
        document.getElementById('submit').addEventListener('click', (e)=>{
            e.preventDefault()

            const from = this.__from.value
            const to = this.__to.value 
            const departure = this.__departure.value 

            const JsonData = JSON.stringify({departure,from,to})

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
                console.log('Flight info:', data)
            })
            .catch(error => {console.log('Error', error)})
        })
    
    }

}