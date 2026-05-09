document.addEventListener('DOMContentLoaded', function(){
   
    const traveller = new Travellers().getTravelType(); 
    const seatMapping = new SeatMap(traveller);
    const travel = new travellersAmount(traveller);

    travel.renderTravellers();
    seatMapping.seatRender();
    seatMapping.seatLimit();
})


class Travellers{

    constructor(){
        this.travelType = ['Adult','Child','Infant']
    }

    getTravelType(){
        return this.travelType;
    }
}



class travellersAmount{

    constructor(travelType) {
        this.travelType = travelType;
    }
    
    renderTravellers(){
        const container = document.getElementById('travellerList');

        this.travelType.forEach(traveller => {
            const div = document.createElement('div')

            let totalAmount = 0;
            
            div.innerHTML = `
                    <div class="container text-center">
                         <div class="row rows-cols-auto bg-primary-subtle align-items-center rounded-4 mb-5">
                            <div class="col">
                               <h4 class="">${traveller}: </h4>
                            </div>   
                            <div class="col bg-body-teritary">
                                <input class="form-control-lg w-50" type="text" id ="${traveller}Display" name="${traveller}" value="${totalAmount}" readonly>
                            </div>
                            <div class="col px-0">
                                <div class="d-grid col-12">
                                    <button type="button" class="btn btn-secondary btn-sm rounded-0" id="${traveller}Add">+</button>
                                    <button type="button" class="btn btn-secondary btn-sm rounded-0" id="${traveller}Remove">-</button>
                                </div>    
                            </div>
                        </div>    
                    </div>
            `
            container.appendChild(div)
            
            //getting element id's 
            const display = document.getElementById(`${traveller}Display`)
            const addBtn = document.getElementById(`${traveller}Add`)
            const removeBtn = document.getElementById(`${traveller}Remove`)


            //updating display value
            addBtn.addEventListener('click', () =>{
                totalAmount += 1; 
                display.value = totalAmount;
            })

            removeBtn.addEventListener('click', () => {
                if(totalAmount > 0){
                    totalAmount -=1;
                    display.value = totalAmount;
                }
            })
        })

    }
}



class SeatMap{

    constructor(traveller){
        this.traveller = traveller;
    }

    //creating seat rendering
    seatRender(){
        const seatMapDiv = document.getElementById('seat-map')
        if (seatMapDiv){
            const rows = ['A','B','C','D','E','F','G','H']; 
            const cols = [1, 3, 5];
            
            //creating each individual row 
            rows.forEach(row =>{
                const rowDiv = document.createElement('div');
                rowDiv.className = 'd-flex gap-3 justify-content-center mb-4';


                //loops through columns list to allow for addition 
                cols.forEach((col, colIdx) =>{
                    
                    const colDiv = document.createElement('div');
                    colDiv.className = 'px-2 d-flex gap-2';

                    [col, col+1].forEach(seatNum => {
                        const seatBtn = document.createElement('input');
                        seatBtn.type = 'checkbox';
                        seatBtn.className = 'btn-check';
                        seatBtn.id = `${row}${seatNum}`;
                        seatBtn.name = `flightSeat`;
                        seatBtn.value = `${row}${seatNum}`;
                        seatBtn.autocomplete = 'off';

                        const seatName = document.createElement('label');
                        seatName.className = 'btn btn-primary';
                        seatName.htmlFor = `${row}${seatNum}`;
                        seatName.textContent = `${row}${seatNum}`;

                        colDiv.appendChild(seatBtn);
                        colDiv.appendChild(seatName);
                    });
                    rowDiv.appendChild(colDiv);

                    if(colIdx !== cols.length -1){
                        const aisle = document.createElement('div');
                        aisle.className = 'col';
                        rowDiv.appendChild(aisle);
                    }

                });
                seatMapDiv.appendChild(rowDiv); //Appends into the row div
            });
        }
    }


    seatLimit(){

        document.getElementById('confirmTrip').addEventListener('click', () => {
            const checkCount = document.querySelectorAll('input[type="checkbox"]:checked').length;    
            let totalAmount = 0;
        
            this.traveller.forEach(travelType => {
                
                const traveller = document.getElementById(`${travelType}Display`);
                const travelAmount = traveller.value;

                totalAmount += parseInt(travelAmount); 
            });


            if( checkCount > totalAmount){
                alert(`You can only select up to ${totalAmount} seats!!`)
                return false;
            }
            else if (checkCount < totalAmount){
                alert(`You need to select ${totalAmount - checkCount} more seats`)
                return false
            }
            else {
              new DataStorage(this.traveller).userStorage()
            }

        })
        
    }
}

class DataStorage{

    constructor(traveller){
        this.traveller = traveller;
    }

    //transfering user seat selection in relation to the flyers-info
    userStorage(){
        
            const cacheData = sessionStorage.getItem('ticketInfo');
            if(cacheData !== null){
                //retrieiving Seat Information 
                const dataObject = JSON.parse(cacheData);
                const seatSelect = document.querySelectorAll('input[type="checkbox"]:checked');
                const seatValue = [...seatSelect].map(check => check.value); // turns node-list into a proper-arrary 

                //retrieving trallever information 
                this.traveller.forEach(travelType => {
                    const traveller = document.getElementById(`${travelType}Display`)

                    if(traveller.value > 0){
                        dataObject[`${travelType}`] = traveller.value;
                    }

                });

                //Parsing the data into the session-flie
                dataObject["seats"] = seatValue;

                sessionStorage.setItem('ticketInfo', JSON.stringify(dataObject));
                window.location.href = 'bookExtra-screen.html';
                   
            }
    }

}    