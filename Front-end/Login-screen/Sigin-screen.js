 //creating DOM listener event to allow java script to pass 
document.addEventListener('DOMContentLoaded', function(){
    const user = new UserInfo();

    user.UserValidation()
});

//creating json file for the information created from the sign-up page
class UserInfo{


    //creating instances for the constructor to apply variables to=
    constructor(){
            this._fname = document.getElementById('fname');
            this._lname = document.getElementById('lname');
            this._email = document.getElementById('email');
            this._pass = document.getElementById('pass');
            this._conpass = document.getElementById('conPass');
    }

    //Checking user password to ensure to it works
    UserValidation(){
    //Have to put e to allow for the use of event since its only onsite. Use arrow function to allow fo this to remain in use!
    document.getElementById('submit').addEventListener('click', (e) =>{
        e.preventDefault()
        
        const pass = this._pass.value
        const conPass = this._conpass.value
        const email = this._email.value

        if(pass != conPass){
            //prevents the typical task
            alert("Passwords typed are incorrect. Please try again!");
            return;
            }
        //Serialising the users information if the password does work and sending it over to the back-end
        else{
            //validating user email to ensure that it wont change the database
            fetch('http://localhost:8080/user/validate-data', {
                method: 'POST', 
                headers: { 
                    'Content-Type' : 'text/plain'
                }, 
                body: email
            })
            .then(response =>{
                if(response.ok){
                    return response.text()
                }
            })
            //checking if the function returns as true in the database 
            .then(text =>{
                const emailExist = text.trim() === 'true';
                if(emailExist){
                   alert("Email already in use. Try a different email!")
                   return;
                }

                //sends the data to the serialised function if the email is in place 
                this.UserData();
            })
            //gives feed-back error if it does not work!
            .catch(error => console.error('Error', error))
            
        }
    });
    }
    

    //storing current user data to a json file
    UserData(){
        //stringify user information
        const jsonData = JSON.stringify({email:this._email.value,
                                        pass:this._pass.value,
                                        fname:this._fname.value, 
                                        lname:this._lname.value});

        //fetches the java backend information 
        fetch('http://localhost:8080/user/data',{
            method : 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: jsonData
        })
        //checks if the entity response is true to allow for the continuation of web-pages
        .then(response =>{
            if(response.ok){
                window.location.href = '/Front-end/Login-screen/Login-screen.html'
            } else{
                alert('Something went wrong, please try again!')
            }
        })
        .catch(error => console.error('Error', error))
    }
}    
