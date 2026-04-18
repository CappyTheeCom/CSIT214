document.addEventListener('DOMContentLoaded', function(){
    const user = new userLogin()

    user.userValidation()
})

//Creating user login class
class userLogin{

    //creating the constructor for the login page
    constructor(){
        this._email = document.getElementById('email')
        this._pass = document.getElementById('pass')
    }

    //checking user validation 
    userValidation(){
        document.getElementById('submit').addEventListener('click', (e) =>{
            e.preventDefault()
            
            const email = this._email.value 
            const pass = this._pass.value 

            //fetching the mapped java function 
            fetch(`http://localhost:8080/user/login?email=${encodeURIComponent(email)}&pass=${encodeURIComponent(pass)}`,{
                method : 'POST'
            })
            .then(response =>{return response.text()})//returns the variable statement to check if its true 
            .then(text => {
                const accountValid = text.trim()
                if(accountValid === 'true'){

                    const JsonData = JSON.stringify({email: this._email.value})

                    //creating token info from backend 
                    fetch(`http://localhost:8080/sesh/setToken`,{
                    method : 'POST',
                    headers : {
                        'Content-type' : 'application/json'
                    },
                    body : JsonData
                    })
                    .then(response =>{
                        if(response.ok){
                            window.location.href = '/Front-end/Home-screen/Home-screen.html'
                        }
                    })
                    .catch(error => {console.error('Error', error)})

                //else if the account or password are wrong!    
                }else{
                    alert("Account or password is wrong! Please try again!")
                }
            })
            .catch(error => { console.error('Error', error)})

        })
    }



}