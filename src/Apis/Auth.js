import { serverApiUrl, serverBaseUrl } from "../Components/config";



//api for checking user credentials , will be used for logging in
export const validate_user=(email,password,macAddr,callback)=>{
    fetch(serverApiUrl+'appointment.php', {
        method: 'POST',
        headers: {
        Accept: 'application/json',
        'Content-Type':'application/json' 
        },  
        body: JSON.stringify({
            email: email,
            password: password, 
            macAddr:macAddr, 
            login:"true"
        })
    })
    .then((response) => response.json())
    .then(result=>{  
        callback(result)
    })
    .catch((error) => {
        console.error(error.message," error");
    });
    
 
   }


//api for resetting user password
export const  resetUserPassword = (email,callback) => {  
  
          fetch(serverApiUrl+'appointment.php', {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type':'application/json' 
              },
              body: JSON.stringify({
                  email:  email,
                  forgotPass: "true",
              })
            })
            .then((response) => response.json())
            .then(result=>{  
                callback(result) 
            })
            .catch((error) => {
               console.error(error);
            }); 
      
   }

//api to make user account in database with default values 
//NOTE: this api will always be called after getting total user count and using this count for genrating unique user id  for regiatering user in tattbook server
//++++++++++++++++++++++++this is deprecated and can be removed in this release if no use found++++++++++++++++++++++++++++++++++++++++++
export const saveUserWithDefaultDetails = (user_id)=>{
    fetch(serverBaseUrl+'appointment.php', {
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type':'application/json' 
                },
                body: JSON.stringify({
                  makeUser:user_id 
                })
              })
              .then((response) => response.json())
              .then(result=>{  
                   callback(result)
              })
              .catch((error) => {
                 console.error(error);
              });
  }

//get total usercount api so that automatic id can be generated for new user 
//NOTE: this api will be called  initially  for regiatering user in tattbook server
 export const getTotalUserCount=(callback)=>{
    fetch(serverApiUrl+'appointment.php', {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type':'application/json' 
              },
              body: JSON.stringify({
                  userCount: true,     
              })
            })
            .then((response) => response.json())
            .then(result=>{  
                 callback(result)
            })
            .catch((error) => {
               console.error(error);
            });
  }




//api for registering user
  export const signup=(email,password,user_id,userStatus,macAddr,callback) => { 
    fetch(serverApiUrl+'appointment.php', {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type':'application/json'
              },
              body: JSON.stringify({
                  email: email,
                  password: password,
                  user_id: user_id, 
                  mode:userStatus, 
                  macAddr:macAddr,
                  signup:"true" 
              })
            })
            .then((response) => response.json())
            .then(result=>{
               callback(result)
            })
            .catch((error) => {
               console.error(error);
            });
  }

