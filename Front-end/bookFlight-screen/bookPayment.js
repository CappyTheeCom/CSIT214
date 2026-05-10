document.addEventListener('DOMContentLoaded', function(){
    const pay = new PaymentInfo()

    pay.totalCost();
    pay.addingLocally();
})


class PaymentInfo{


    totalCost(){
        const dataCachce = sessionStorage.getItem('ticketInfo');
        const dataObject = JSON.parse(dataCachce); 

        let totalCount = 0;
        let finalCost = parseFloat(dataObject['total']);

        const travellerType = ['Adult', 'Child', 'Infant']
        travellerType.forEach(type => {
            
            if(dataObject?.[type]){

                const totalTravellers = parseInt(dataObject[type]);

                for(let i=1; i <= totalTravellers; i++){

                    totalCount ++;
                }

            }
        })


        //doing ticket costs 
        const ticketCost = document.getElementById('ticketCost');
        const summaryCost = document.getElementById('summaryCost');
        
        summaryCost.innerHTML = `
            <div>${finalCost} x ${totalCount}</div> 
            <div>${dataObject['carryOn']} + $${dataObject['cCost']}</div>
            <div>${dataObject['checkedBaggage']} + $${dataObject['bCost']}</div>
            <div>${dataObject['food']} + $${dataObject['fCost']}</div>
        `;

        ticketCost.textContent = `$${(finalCost * totalCount).toFixed(2)}`
    }


    addingLocally() {
    const uPay = document.getElementById('payConfirm');
    const dataObject = JSON.parse(sessionStorage.getItem('ticketInfo'));

    uPay.addEventListener('click', () => {
        const flightId = dataObject.plane || `flight_${Date.now()}`;

        // Shape the data to match what script 1's getFlights() expects
        const bookedFlights = JSON.parse(localStorage.getItem('bookedFlights') || '{}');

        bookedFlights[flightId] = {
            flight: {
                from: dataObject.departure,
                to: dataObject.arrival,
                date: dataObject.date,
                departTime: dataObject.depTime,
                arrivalTime: dataObject.arvTime,
                duration: dataObject.duration || 'N/A',
                price: parseFloat(dataObject.total),
                selectedSeats: dataObject.seats?.join(', ') || 'TBD',
                id: flightId,
            },
            bookingInfo: {
                passengerName: dataObject.passengerName || '',
                bookingDate: new Date().toISOString(),
            }
        };

            localStorage.setItem('bookedFlights', JSON.stringify(bookedFlights));
            window.location.href = '/Front-end/Home-screen/Home-screen.html';
        });
}   }