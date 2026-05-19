document.addEventListener('DOMContentLoaded', function(){

    const addOn = new Addons();

    addOn.storingFood();

})

class Addons{

    //loading food into user data 
    storingFood(){
        document.querySelectorAll('button[name="food"]').forEach(button => {
            button.addEventListener('click', (e) =>{
                const dataCache = sessionStorage.getItem('ticketInfo');
                const dataObject = JSON.parse(dataCache);
                let tripCost = parseFloat(dataObject["total"])
                let fCost = 0;

                if(e.currentTarget.value === 'chicken-curry'){
                    fCost += 16.50;
                    tripCost += 16.50;
                }
                else if(e.currentTarget.value === 'pasta'){
                    fCost += 22.50;
                    tripCost += 22.50;
                }
                else if (e.currentTarget.value === 'sandwitch'){
                    fCost += 15.50
                    tripCost += 15.50;
                }

                dataObject["food"] = e.currentTarget.value;
                dataObject["total"] = tripCost;
                dataObject["fCost"] = fCost;
                sessionStorage.setItem('ticketInfo', JSON.stringify(dataObject));
                window.location.href = '/bookFlight-screen/bookDetail.html';
            
            })
        });
    }
}