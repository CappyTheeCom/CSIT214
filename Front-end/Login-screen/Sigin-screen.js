 //creating DOM listener event to allow java script to pass 
document.addEventListener('DOMContentLoaded', function(){
    const user = new UserInfo();

    user.UserData();
});

//creating json file for the information created from the sign-up page
class UserInfo{

    constructor(){
        this.data = new FormData();
    }

    //Checking user password to ensure to it works
    UserData(){
    //Have to put e to allow for the use of event since its only onsite. Use arrow function to allow fo this to remain in use!
    document.getElementById('submit').addEventListener('click', (e) =>{
        //creating variables from the form  
        const fname = document.getElementById('fname').value;
        const lname = document.getElementById('lname').value;
        const email = document.getElementById('email').value;
        const pass = document.getElementById('pass').value;
        const conPass = document.getElementById('conPass').value;

        

        if(pass != conPass){
            //prevents the typical task
            e.preventDefault()
            alert("Passwords typed are incorrect. Please try again!")

            }
        //Serialising the users information if the password does work and sending it over to the back-end
        else{
            this.data.append("fname", fname);
            this.data.append("lname", lname);
            this.data.append("email", email);
            this.data.append("password", pass);

            const jsonData = JSON.stringify(Object.fromEntries(this.data));
            
            //sends a fetch request to the Java server itself. Allowing it to read the json data.
            fetch('/Back-end/Database/UserData/SignInData', {
                method: 'POST',
                headers: {
                    'Content-type' : 'application/json'
                },
                body: jsonData
            })
        }
        })
    }
    
}    
