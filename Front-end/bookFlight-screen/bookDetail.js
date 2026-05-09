document.addEventListener('DOMContentLoaded', function(){
    const ticket = new TicektDetials()

    ticket.displayTickets();
});

class TicektDetials{


    //displaying user-tickets
    displayTickets(){
        
        const dataCache = sessionStorage.getItem('ticketInfo');
        const dataObject = JSON.parse(dataCache);

        const container = document.getElementById('ticket-info');
        const travellerType = ['Adult','Child','Infant']
        const form = document.createElement('form');
    
        form.id = 'travellerForm';
        form.className = 'border border-2'

        travellerType.forEach(type => {
            if(dataObject?.[type]){
                
                const count = parseInt(dataObject[type]);

                for (let i =  1; i <= count; i++){
                    const fieldset =  document.createElement('fieldset')

                    fieldset.innerHTML = `
                            <legend class="text-center mt-3">${type}${i}</legend>
                            <div class="d-flex flex-column align-items-center gap-2 m-4">
                                <div class="w-75">
                                    <label for="${type}${i}Fname">First Name:</label>
                                    <input type="text" class="form-control"id="${type}${i}Fname" name="${type}${i}Fname">
                                </div>
                                <div class="w-75">
                                    <label for="${type}${i}Lname">Last Name:</label>
                                    <input type="text" class="form-control" id="${type}${i}Lname" name="${type}${i}Lname">
                                </div>
                                <div class="w-75">
                                    <label for="${type}${i}DOB">DOB:</label>
                                    <input type="text" class="form-control" id="${type}${i}DOB" name="${type}${i}DOB">
                                </div>
                            </div>
                    `;
                    form.appendChild(fieldset);
                }
            }
        });

        container.appendChild(form);
    }

}

