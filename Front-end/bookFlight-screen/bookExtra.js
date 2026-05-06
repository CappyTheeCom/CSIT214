document.addEventListener('DOMContentLoaded', function(){

    const addOn = new Addons();

    addOn.storingFood();

})

class Addons{

    //loading food into user data 
    storingFood(){
        document.querySelectorAll('button[name="food"]').forEach(button => {
            button.addEventListener('click', (e) =>{
                const dataCache = sessionStorage.getItem('tripInfo');
                const dataObject = JSON.parse(dataCache);

                dataObject["food"] = e.currentTarget.value;

                sessionStorage.setItem('tripInfo', JSON.stringify(dataObject));
                window.location.href = 'bookDetail.html';
            
            })
        });
    }
}