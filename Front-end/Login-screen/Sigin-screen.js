 //creating DOM listener event to allow java script to pass 
document.addEventListener('DOMContentLoaded', function(){
    const user = new UserInfo();

    user.UserData();
});

//creating json file for the information created from the sign-up page
class UserInfo{

    //Checking user password to ensure to it works
    UserData(){
    //Have to put e to allow for the use of event since its only onsite. Use arrow function to allow fo this to remain in use!
    document.getElementById('submit').addEventListener('click', (e) =>{
        e.preventDefault()
        //creating variables from the form  
        const fname = document.getElementById('fname').value;
        const lname = document.getElementById('lname').value;
        const email = document.getElementById('email').value;
        const pass = document.getElementById('pass').value;
        const conPass = document.getElementById('conPass').value;

        

        if(pass != conPass){
            //prevents the typical task
            alert("Passwords typed are incorrect. Please try again!")

            }
        //Serialising the users information if the password does work and sending it over to the back-end
        else{
            const jsonData = JSON.stringify({email,pass,fname, lname});
            
            //sends a fetch request to the Java server itself. Allowing it to read the json data.
            fetch('http://localhost:8080/user/data', {
                method: 'POST',
                headers: {
                    'Content-type' : 'application/json'
                },
                body: jsonData
            })
            .then(response => {
                if (response.ok){
                    window.location.href= '/Front-end/Login-screen/Login-screen.html'
                }else{
                    alert("Something went wrong. Please try again!")
                }
            })
            .catch(error => console.error('Error:', error));
          }
        });
    }
    
}    
