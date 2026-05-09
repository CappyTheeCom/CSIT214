document.addEventListener('DOMContentLoaded', function(){
    const pay = new PaymentInfo()

    pay.totalCost();
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
}