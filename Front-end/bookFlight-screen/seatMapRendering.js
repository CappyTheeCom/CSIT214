document.addEventListener('DOMContentLoaded', function(){
    const seatMapping = new SeatMap();

    seatMapping.seatRender();

})


class SeatMap{

    //creating seat rendering
    seatRender(){
        const seatMapDiv = document.getElementById('seat-map')
        if (seatMapDiv){
            const rows = ['A','B','C','D','E','F','G','H']; 
            const cols = [1, 3, 5];
            
            //creating each individual row 
            rows.forEach(row =>{
                const rowDiv = document.createElement('div');
                rowDiv.className = 'row g-2 justify-content-center mb-4';


                //loops through columns list to allow for addition 
                cols.forEach((col, colIdx) =>{
                    
                    const colDiv = document.createElement('div');
                    colDiv.className = 'col-auto px-2 d-flex flex-row gap-2';

                    [col, col+1].forEach(seatNum => {
                        const seatBtn = document.createElement('input');
                        seatBtn.type = 'checkbox';
                        seatBtn.className = 'btn-check';
                        seatBtn.id = `${row}${seatNum}`
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
}